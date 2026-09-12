import { kyzzGet } from './client.js'

export async function getCecanChina() {
    return kyzzGet('/api/cecan/China')
}

export async function getCecanHijaber() {
    return kyzzGet('/api/cecan/Hijaber')
}

export async function getCecanIndonesia() {
    return kyzzGet('/api/cecan/Indonesia')
}

export async function getCecanJapan() {
    return kyzzGet('/api/cecan/Japan')
}

export async function getCecanJiso() {
    return kyzzGet('/api/cecan/Jiso')
}

export async function getCecanJustinaxie() {
    return kyzzGet('/api/cecan/Justinaxie')
}

export async function getCecanKorea() {
    return kyzzGet('/api/cecan/Korea')
}

export async function getCecanMalaysia() {
    return kyzzGet('/api/cecan/Malaysia')
}

export async function getCecanRose() {
    return kyzzGet('/api/cecan/Rose')
}

export async function getCecanRyujin() {
    return kyzzGet('/api/cecan/Ryujin')
}

export async function getCecanThailand() {
    return kyzzGet('/api/cecan/Thailand')
}

export async function getCecanVietnam() {
    return kyzzGet('/api/cecan/Vietnam')
}