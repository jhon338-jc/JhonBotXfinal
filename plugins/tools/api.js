import config from '../../config.json' with { type: 'json' }

let handler = async (m) => {
    const text = `╭───『 *KYZZ API* 』───⬣
│
│  🤖 *Semua fitur Kyzz* (51 endpoint)
│
│  💳 *AI*
│  ├ .editimage <prompt> -> reply gambar
│  ├ .aiimage <deskripsi>
│
│  🍭 *Anime*
│  ├ .hanime judul | .hentaigenres <genre>
│  └ .hentaitrending
│
│  👻 *Asupan*
│  ├ .asupanbocil | .asupangheayubi
│  ├ .asupankayes | .asupannotnot
│  ├ .asupanpanrika | .asupansantuy
│  ├ .asupantiktokgirl | .asupanukhty
│
│  🖼️ *Canvas*
│  ├ .ffduo user1 user2
│  ├ .ffgirl username
│  ├ .fflobby username
│  ├ .gopay saldo [koin terpakai bulan]
│  ├ .fakeml [avatar username rank border]
│  ├ .fakengl teks | .fakeovo saldo
│  ├ .ustadz teks
│  ├ .goodbye Nama | Grup | Member -> reply gambar
│  ├ .qcwa text -> reply gambar
│
│  📷 *Cecan*
│  ├ .cecanchina .cecanhijaber .cecanindonesia
│  ├ .cecanjapan .cecanjiso .cecanjustinaxie
│  ├ .cecankorea .cecanmalaysia .cecanrose
│  ├ .cecanryujin .cecanthailand .cecanvietnam
│
│  ⬇️ *Download*
│  ├ .kyzzfb url | .kyzzig url
│  ├ .kyzztt url | .kyzzgit repo
│
│  🕌 *Islamic*
│  ├ .asmaulhusna [nomor] | .ayatkursi
│  ├ .bacaansholat | .jadwalsholat wilayah
│  ├ .kisahnabi nama | .niatsholat waktu
│  ├ .tafsir query
│
│  🎀 *Random*
│  ├ .andin | .seegore | .tobrut
│
│  👑 *User Kyzz*
│  ├ .kyzzprofile | .kyzzstats
│  ├ .kyzzrenew role days coupon (owner)
│
╰──────────────────⬣

🔗 ${config.channelLink}`
    m.reply(text)
}

handler.command = ['kyzz', 'kyzzhelp']
export default handler