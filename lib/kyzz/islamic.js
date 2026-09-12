import { kyzzGet } from './client.js'

export async function getAsmaulHusna(nomor) {
    const params = {}
    if (nomor !== undefined && nomor !== null && nomor !== '') {
        params.nomor = nomor
    }

    return kyzzGet('/api/islamic/asmaul-husna', params)
}

export async function getAyatKursi() {
    return kyzzGet('/api/islamic/ayat-kursi')
}

export async function getBacaanSholat() {
    return kyzzGet('/api/islamic/bacaan-sholat')
}

export async function getJadwalSholat(wilayah) {
    if (!wilayah) throw new Error('wilayah is required')

    return kyzzGet('/api/islamic/jadwal-sholat', { wilayah })
}

export async function getKisahNabi(nama) {
    if (!nama) throw new Error('nama is required')

    return kyzzGet('/api/islamic/kisah-nabi', { nama })
}

export async function getNiatSholat(waktu) {
    if (!waktu) throw new Error('waktu is required')

    return kyzzGet('/api/islamic/niat-sholat', { waktu })
}

export async function getTafsir(query) {
    if (!query) throw new Error('query is required')

    return kyzzGet('/api/islamic/tafsir', { query })
}