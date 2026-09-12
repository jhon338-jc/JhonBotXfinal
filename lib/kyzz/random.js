import { kyzzGet } from './client.js'

export async function randomAndin() {
    return kyzzGet('/api/random/andin')
}

export async function randomSeegore() {
    return kyzzGet('/api/random/seegore')
}

export async function randomTobrut() {
    return kyzzGet('/api/random/tobrut')
}