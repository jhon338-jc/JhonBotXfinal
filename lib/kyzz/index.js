import { editImage } from './ai-image.js'
import { getHanimeTrending, getHentaiTvGenres, getHentaiTvTrending } from './anime.js'
import {
    getAsupanBocil,
    getAsupanGheayubi,
    getAsupanKayes,
    getAsupanNotnot,
    getAsupanPanrika,
    getAsupanSantuy,
    getAsupanTiktokgirl,
    getAsupanUkhty
} from './asupan.js'
import {
    fakeFfDuo,
    fakeFfGirl,
    fakeFf,
    fakeGopay,
    fakeMl,
    fakeNgl,
    fakeOvo,
    fakePakUstadz,
    goodbyeCard,
    qcwa
} from './canvas.js'
import {
    getCecanChina,
    getCecanHijaber,
    getCecanIndonesia,
    getCecanJapan,
    getCecanJiso,
    getCecanJustinaxie,
    getCecanKorea,
    getCecanMalaysia,
    getCecanRose,
    getCecanRyujin,
    getCecanThailand,
    getCecanVietnam
} from './cecan.js'
import { downloadFacebook, downloadGithub, downloadInstagram, downloadTiktok } from './download.js'
import {
    getAsmaulHusna,
    getAyatKursi,
    getBacaanSholat,
    getJadwalSholat,
    getKisahNabi,
    getNiatSholat,
    getTafsir
} from './islamic.js'
import { randomAndin, randomSeegore, randomTobrut } from './random.js'
import { getUserProfile, renewMembership, getUserStats } from './user.js'

export const kyzzApi = {
    ai: {
        editImage
    },

    anime: {
        hanimeTrending: getHanimeTrending,
        hentaiTvGenres: getHentaiTvGenres,
        hentaiTvTrending: getHentaiTvTrending
    },

    asupan: {
        bocil: getAsupanBocil,
        gheayubi: getAsupanGheayubi,
        kayes: getAsupanKayes,
        notnot: getAsupanNotnot,
        panrika: getAsupanPanrika,
        santuy: getAsupanSantuy,
        tiktokgirl: getAsupanTiktokgirl,
        ukhty: getAsupanUkhty
    },

    canvas: {
        ffduo: fakeFfDuo,
        ffgirl: fakeFfGirl,
        fakeFf,
        fakeGopay,
        fakeMl,
        fakeNgl,
        fakeOvo,
        pakUstadz: fakePakUstadz,
        goodbye: goodbyeCard,
        qcwa
    },

    cecan: {
        China: getCecanChina,
        Hijaber: getCecanHijaber,
        Indonesia: getCecanIndonesia,
        Japan: getCecanJapan,
        Jiso: getCecanJiso,
        Justinaxie: getCecanJustinaxie,
        Korea: getCecanKorea,
        Malaysia: getCecanMalaysia,
        Rose: getCecanRose,
        Ryujin: getCecanRyujin,
        Thailand: getCecanThailand,
        Vietnam: getCecanVietnam
    },

    download: {
        facebook: downloadFacebook,
        github: downloadGithub,
        instagram: downloadInstagram,
        tiktok: downloadTiktok
    },

    islamic: {
        asmaulHusna: getAsmaulHusna,
        ayatKursi: getAyatKursi,
        bacaanSholat: getBacaanSholat,
        jadwalSholat: getJadwalSholat,
        kisahNabi: getKisahNabi,
        niatSholat: getNiatSholat,
        tafsir: getTafsir
    },

    random: {
        andin: randomAndin,
        seegore: randomSeegore,
        tobrut: randomTobrut
    },

    user: {
        profile: getUserProfile,
        renew: renewMembership,
        stats: getUserStats
    }
}