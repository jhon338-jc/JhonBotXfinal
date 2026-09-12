import http from 'node:http'
import crypto from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = parseInt(process.env.PORT || '8000', 10)

const PASSPHRASE = process.env.PASSPHRASE || 'jhon338-flow-rahasia'
const APP_SECRET = process.env.APP_SECRET || ''

const hasPrivateKey = existsSync(join(__dirname, 'private.pem'))

const PRIVATE_KEY = hasPrivateKey
    ? readFileSync(join(__dirname, 'private.pem'))
    : null

const GAME_SCREEN = 'GAME'
const GAME_OVER_SCREEN = 'GAMEOVER'

const sessions = new Map()

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function decryptRequest(body, privateKey, passphrase) {
    const { encrypted_flow_data, encrypted_aes_key, initial_vector } = body

    const aesKey = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(encrypted_aes_key, 'base64')
    )

    const iv = Buffer.from(initial_vector, 'base64')
    const encrypted = Buffer.from(encrypted_flow_data, 'base64')

    const authTag = encrypted.subarray(encrypted.length - 16)
    const data = encrypted.subarray(0, encrypted.length - 16)

    const decipher = crypto.createDecipheriv('aes-128-gcm', aesKey, iv)
    decipher.setAuthTag(authTag)
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()])

    return { decryptedBody: JSON.parse(decrypted.toString('utf8')), aesKey, iv }
}

function encryptResponse(responseObj, aesKey, initialVector) {
    const inverted = Buffer.from(initialVector.map((b) => b ^ 0xff))

    const cipher = crypto.createCipheriv('aes-128-gcm', aesKey, inverted)
    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(responseObj), 'utf8'),
        cipher.final()
    ])
    const authTag = cipher.getAuthTag()

    return Buffer.concat([encrypted, authTag]).toString('base64')
}

function verifySignature(rawBody, header, appSecret) {
    if (!appSecret) return true
    const expected = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
    const received = header && header.startsWith('sha256=') ? header.slice(7) : header || ''
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received))
}

function emptyBoard() {
    return ['', '', '', '', '', '', '', '', '']
}

function renderBoard(board) {
    const cells = board.map((c, i) => (c || i + 1).toString())
    return [
        cells.slice(0, 3).join(' | '),
        cells.slice(3, 6).join(' | '),
        cells.slice(6, 9).join(' | ')
    ]
}

function checkWinner(board) {
    for (const [a, b, c] of WIN_PATTERNS) {
        if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a]
    }
    return board.every(Boolean) ? 'draw' : null
}

function newSession() {
    return { board: emptyBoard(), turn: 'X', scoreX: 0, scoreO: 0 }
}

function gameScreenData(session) {
    const [r1, r2, r3] = renderBoard(session.board)
    const winner = checkWinner(session.board)
    let status = `Giliran kamu (${session.turn})`
    if (winner) {
        const isDraw = winner === 'draw'
        status = isDraw
            ? 'Seri!'
            : winner === 'X'
                ? '🎉 Kamu menang!'
                : '🤖 Bot menang!'
    }
    return {
        screen: GAME_SCREEN,
        data: {
            row_1: r1,
            row_2: r2,
            row_3: r3,
            score: `X:${session.scoreX} | O:${session.scoreO}`,
            status
        }
    }
}

function botMove(session) {
    callCount = 0
    const best = minimax(session.board, 'O')
    session.board[best.index] = 'O'
    const winner = checkWinner(session.board)
    if (winner === 'O') session.scoreO++
    return winner
}

let callCount = 0
function minimax(board, player) {
    callCount++
    if (callCount > 100000) return { index: board.indexOf(''), score: 0 }

    const winner = checkWinner(board)
    if (winner === 'X') return { index: -1, score: -10 }
    if (winner === 'O') return { index: -1, score: 10 }
    if (winner === 'draw') return { index: -1, score: 0 }

    const moves = []
    for (let i = 0; i < 9; i++) {
        if (board[i]) continue
        board[i] = player
        const result = minimax(board, player === 'O' ? 'X' : 'O')
        moves.push({ index: i, score: result.score })
        board[i] = ''
    }

    if (player === 'O') {
        return moves.reduce((best, m) => (m.score > best.score ? m : best), { index: -1, score: -Infinity })
    }
    return moves.reduce((best, m) => (m.score < best.score ? m : best), { index: -1, score: Infinity })
}

function handleGameOver(session, winner, flowToken) {
    const isDraw = winner === 'draw'
    return {
        screen: GAME_OVER_SCREEN,
        data: {
            result: isDraw ? 'Seri!' : winner === 'X' ? '🎉 Kamu menang!' : '🤖 Bot menang!',
            score: `X:${session.scoreX} | O:${session.scoreO}`
        }
    }
}

function handle(data, flowToken) {
    let session = sessions.get(flowToken)
    if (!session) {
        session = newSession()
        sessions.set(flowToken, session)
    }

    if (data?.action === 'restart') {
        sessions.set(flowToken, newSession())
        return gameScreenData(sessions.get(flowToken))
    }

    const cellNum = parseInt(data?.cell, 10)
    if (Number.isNaN(cellNum)) {
        return gameScreenData({ ...session, turn: 'X', scoreX: session.scoreX, scoreO: session.scoreO })
    }

    const index = cellNum - 1
    if (index < 0 || index > 8) return gameScreenData(session)
    if (session.board[index]) return gameScreenData(session)

    session.board[index] = 'X'
    let winner = checkWinner(session.board)
    if (winner === 'X') session.scoreX++

    if (!winner) {
        botMove(session)
        winner = checkWinner(session.board)
    }

    if (winner) {
        sessions.delete(flowToken)
        return handleGameOver(session, winner, flowToken)
    }

    session.turn = 'X'
    return gameScreenData(session)
}

function respond(res, statusCode, rawBody, payload) {
    const encrypted = encryptResponse(payload, rawBody.aesKey, rawBody.iv)
    res.writeHead(statusCode, {
        'Content-Type': 'text/plain',
        'X-Hub-Signature-256': `sha256=${crypto.createHmac('sha256', APP_SECRET).update(encrypted).digest('hex')}`
    })
    res.end(encrypted)
}

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' })
        res.end('POST only')
        return
    }

    let raw = ''
    req.on('data', (chunk) => {
        raw += chunk
        if (raw.length > 1e6) req.destroy()
    })
    req.on('end', () => {
        try {
            if (!PRIVATE_KEY) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('private.pem belum ada. Jalankan: node keygen.js')
                return
            }

            if (!verifySignature(raw, req.headers['x-hub-signature-256'], APP_SECRET)) {
                res.writeHead(401, { 'Content-Type': 'text/plain' })
                res.end('invalid signature')
                return
            }

            const parsed = JSON.parse(raw)
            const { decryptedBody, aesKey, iv } = decryptRequest(parsed, PRIVATE_KEY, PASSPHRASE)
            const { action, screen, data, version, flow_token } = decryptedBody

            if (action === 'ping') {
                respond(res, 200, { aesKey, iv }, { version: version || '3.0', data: { status: 'active' } })
                return
            }

            if (action === 'INIT' || action === 'data_exchange') {
                const responsePayload = handle(data || {}, flow_token || '')
                respond(res, 200, { aesKey, iv }, responsePayload)
                return
            }

            respond(res, 200, { aesKey, iv }, { screen: GAME_SCREEN, data: { status: 'Terima kasih' } })
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end(`endpoint error: ${err.message}`)
        }
    })
})

if (import.meta.main) {
    server.listen(PORT, () => {
        console.log(`WhatsApp Flows endpoint jalan di http://localhost:${PORT}`)
        console.log('Pastikan URL ini bisa diakses publik via HTTPS (mis: https://domain-kamu.com)')
    })
}

export { decryptRequest, encryptResponse, verifySignature, handle, emptyBoard, checkWinner }