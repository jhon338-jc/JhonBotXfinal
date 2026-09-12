import crypto from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''
const WABA_ID = process.env.WABA_ID || ''
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || ''
const TO = process.env.TO || ''

const GRAPH = 'https://graph.facebook.com'
const API_VERSION = 'v20.0'

async function graph(path, method, body) {
    const res = await fetch(`${GRAPH}/${API_VERSION}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
    const json = await res.json()
    if (!res.ok) {
        console.error('Graph API error:', json?.error)
        process.exit(1)
    }
    return json
}

async function createFlow(dataChannelUri) {
    const flowJson = readFileSync(join(__dirname, 'flow.json'), 'utf8')
    const res = await graph(`/${WABA_ID}/flows`, 'POST', {
        name: 'jhon338_tic_tac_toe',
        categories: ['SERVICE'],
        validation_rule: 'non_payment',
        data_channel_uri: dataChannelUri,
        follows_previous_flow_message: true,
        flow_json: flowJson
    })
    const flowId = res?.id
    console.log('✔ Flow dibuat. ID:', flowId)
    return flowId
}

async function publishFlow(flowId) {
    const res = await graph(`/${flowId}/publish`, 'POST', {})
    console.log('✔ Flow published:', JSON.stringify(res))
    return res
}

async function sendFlow(flowId) {
    const token = crypto.randomUUID()
    const res = await graph(`/${PHONE_NUMBER_ID}/messages`, 'POST', {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: TO,
        type: 'interactive',
        interactive: {
            type: 'flow',
            header: { type: 'text', text: '🎮 Jhon338 Tic-Tac-Toe' },
            body: { text: 'Main langsung di dalam chat WhatsApp!' },
            footer: { text: 'Ketuk tombol di bawah untuk mulai.' },
action: {
                    name: 'flow',
                    parameters: {
                        flow_message_version: '3',
                        flow_token: token,
                        flow_id: flowId,
                        flow_cta: '🕹️ Mulai Main',
                        flow_action: 'data_exchange'
                    }
                }
        }
    })
    console.log('✔ Pesan flow terkirim:', JSON.stringify(res?.messages?.[0]?.id || res))
    return res
}

const [, , cmd, second] = process.argv

switch (cmd) {
    case 'create': {
        if (!ACCESS_TOKEN || !WABA_ID) {
            console.error('Perlu env: ACCESS_TOKEN, WABA_ID, dan argumen kedua = data_channel_uri (https)')
            process.exit(1)
        }
        const uri = second
        const flowId = await createFlow(uri)
        await publishFlow(flowId)
        break
    }
    case 'publish': {
        if (!second) {
            console.error('Perlu argumen kedua = flow_id')
            process.exit(1)
        }
        await publishFlow(second)
        break
    }
    case 'send': {
        if (!ACCESS_TOKEN || !PHONE_NUMBER_ID || !TO || !second) {
            console.error('Perlu env: ACCESS_TOKEN, PHONE_NUMBER_ID, TO, dan argumen kedua = flow_id')
            process.exit(1)
        }
        await sendFlow(second)
        break
    }
    default:
        console.log('Cara pakai:')
        console.log('  node send.js create <https://domain-kamu/endpoint>')
        console.log('  node send.js publish <flow_id>')
        console.log('  node send.js send <flow_id>')
        console.log('Env: ACCESS_TOKEN, WABA_ID, PHONE_NUMBER_ID, TO')
        break
}