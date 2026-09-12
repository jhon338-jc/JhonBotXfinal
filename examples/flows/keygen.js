import crypto from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PASSPHRASE = process.env.PASSPHRASE || 'jhon338-flow-rahasia'

if (!existsSync(join(__dirname, 'private.pem'))) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: PASSPHRASE
        }
    })
    writeFileSync(join(__dirname, 'private.pem'), privateKey)
    writeFileSync(join(__dirname, 'public.pem'), publicKey)
    console.log('✔ private.pem + public.pem dibuat')
}
console.log('✔ private.pem sudah ada (private.pem + public.pem)')
console.log('PASSPHRASE dipakai:', PASSPHRASE)
console.log('Upload public.pem ke: WhatsApp Manager → API Setup → Flows Encrypted Endpoint → Public Key')