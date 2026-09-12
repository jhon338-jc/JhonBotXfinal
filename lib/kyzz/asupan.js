import { kyzzGet } from './client.js'

export async function getAsupanBocil() {
    return kyzzGet('/api/asupan/bocil')
}

export async function getAsupanGheayubi() {
    return kyzzGet('/api/asupan/gheayubi')
}

export async function getAsupanKayes() {
    return kyzzGet('/api/asupan/kayes')
}

export async function getAsupanNotnot() {
    return kyzzGet('/api/asupan/notnot')
}

export async function getAsupanPanrika() {
    return kyzzGet('/api/asupan/panrika')
}

export async function getAsupanSantuy() {
    return kyzzGet('/api/asupan/santuy')
}

export async function getAsupanTiktokgirl() {
    return kyzzGet('/api/asupan/tiktokgirl')
}

export async function getAsupanUkhty() {
    return kyzzGet('/api/asupan/ukhty')
}