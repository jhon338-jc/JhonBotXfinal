<div align="center">

# 🤖 JHON338 WhatsApp Bot

**Jhon3382 — WhatsApp Multi Device Bot**
Modern • Lightweight • Fast • Modular • PC Terminal Compatible (Windows / Linux)

<p>
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Module-ESM-1E90FF?style=for-the-badge">
<img src="https://img.shields.io/badge/Plugins-Dynamic-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Platform-PC%20Terminal-brightgreen?style=for-the-badge">
<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Version-3.4.0-blue?style=for-the-badge">
</p>

**DEVELOPER BY JHON338**

</div>

---

## 📌 Info Bot & Promosi Sosmed

> Bot hanya **respon di grup yang dipilih Owner** — jadi bot tidak akan menusak-ruasak grup lain dan **tidak respon di DM/chat pribadi sama sekali**.

- 🔗 **Linktree (Sosmed):** https://jhon338-jc.github.io/Linktree/
- 💻 **GitHub:** https://github.com/jhon338-jc/JhonBotXfinal

---

## ✨ Features

- Full ESM Module
- Dynamic Plugin Loader (hot-reload)
- Multi Device WhatsApp (pakai pairing code, bukan QR)
- **Hanya respon di grup yang dipilih Owner** (lewat DM / `.sg`)
- **Tidak merespon di DM/chat pribadi** — semua perintah DM diblokir
- Anti-spam + Auto-delete link (khusus grup pantauan)
- Monitor join/leave member (notifikasi grup)
- Semua log terminal memakai **warna RGB** yang konsisten
- Fast Startup, Clean Structure, Easy Plugin Development
- PC Terminal Compatible (Windows / Linux) — tanpa Termux

---

## 🚦 Cara Kerja Pemilihan Grup

1. Saat pertama konek, bot otomatis mengirim **daftar grup** ke Owner lewat DM.
2. Owner membalas dengan angka nomor grup, contoh: `1,2,3`.
3. Bot mulai memantau **hanya grup terpilih** — grup lain diabaikan.
4. Ubah pilihan kapan saja dengan perintah `.sg` (owner, dipakai di grup).
5. Di DM/chat pribadi, **semua perintah tidak akan direspon** (kecuali memilih angka grup saat fase awal).

---

## 📂 Project Structure

```
.
├── plugins/
│   ├── owner/       (fitur khusus owner - 1 fitur 1 file)
│   ├── group/       (manajemen grup)
│   ├── tools/       (tool / fungsi umum)
│   └── menu/        (menu utama)
├── lib/
│   ├── rgb.js       (warna RGB terminal)
│   ├── msg.js       (parser pesan & helper)
│   ├── autoMod.js   (anti spam & link)
│   └── antiSpam.js  (rate-limit command)
├── src/img/
├── database/
│   ├── monitor.json (grup yang dipantau)
│   └── role.json    (daftar owner/premium)
├── handler.js       <-- Brain (Otak Bot)
├── index.js         <-- Main entry
├── config.json
├── scripts/
└── package.json
```

---

## 🖥️ Installation (PC - Windows/Linux)

### Prerequisites
- **Node.js 18+** (https://nodejs.org)
- **FFmpeg** (untuk stiker video - https://ffmpeg.org)
- **ImageMagick** (opsional, untuk image to webp)

### Setup

```bash
git clone https://github.com/jhon338-jc/JhonBotXfinal
cd JhonBotXfinal
npm install
npm start
```

### Windows / Linux

```bash
npm install
npm start
```

**Catatan:** jalankan bot dengan `npm start` atau `node index.js`. Saat pertama kali akan diminta nomor HP untuk pairing code, dan nomor tersebut otomatis dijadikan Owner.

---

## 🔌 Daftar Fitur (1 Fitur = 1 File Plugin)

| Kategori | Plugin | Perintah |
|----------|--------|----------|
| Owner | `addowner.js` | `.addowner` |
| Owner | `delowner.js` | `.delowner` |
| Owner | `selectgroup.js` | `.selectgroup` `.sg` `.pilihgrup` `.pg` |
| Owner | `public.js` | `.public` |
| Owner | `self.js` | `.self` |
| Owner | `setbio.js` | `.setbio` |
| Owner | `setnamebot.js` | `.setnamebot` `.setbotname` |
| Owner | `setpp.js` | `.setpp` `.setppgroup` |
| Owner | `leave.js` | `.leave` |
| Group | `add.js` | `.add` |
| Group | `kick.js` | `.kick` |
| Group | `addadmin.js` | `.addadmin` `.promote` |
| Group | `deladmin.js` | `.deladmin` `.demote` |
| Group | `setname.js` | `.setname` |
| Group | `setdesc.js` | `.setdesc` |
| Group | `totag.js` | `.totag` |
| Group | `hidetag.js` | `.hidetag` `.ht` |
| Group | `grouplist.js` | `.grouplist` `.gl` `.monitor` `.mylist` |
| Group | `notif.js` | hook `before` (join/leave otomatis) |
| Tools | `ping.js` | `.ping` |
| Tools | `info.js` | `.info` `.botinfo` |
| Tools | `owner.js` | `.owner` `.dev` |
| Tools | `stiker.js` | `.stiker` `.s` |
| Tools | `simg.js` | `.simg` `.stikergambar` `.stikervideo` |
| Tools | `toimg.js` | `.toimg` `.tovid` `.stickertoimg` |
| Tools | `canvas.js` | `.canvas` `.html` `.render` |
| Tools | `htmlfile.js` | `.htmlfile` `.htmls` |
| Tools | `iqc.js` | `.iqc` `.iq` |
| Tools | `fakedana.js` | `.fakedana` |
| Tools | `fakeff.js` | `.fakeff` |
| Tools | `tt.js` | `.tt` `.tiktok` `.ttdl` |
| Tools | `ig.js` | `.ig` `.instagram` `.igdl` |
| Tools | `fb.js` | `.fb` `.facebook` `.fbdl` |
| Tools | `mp3.js` | `.mp3` `.ytmp3` `.ytaudio` |
| Tools | `mediafie.js` | `.mediafie` `.mediafire` |
| Tools | `lirik.js` | `.lirik` `.lyrics` |
| Tools | `detik.js` | `.detik` `.berita` `.news` |
| Tools | `rvo.js` | `.rvo` `.readvo` `.viewonce` |
| Menu | `menu.js` | `.menu` `.help` |

**Cara buat plugin baru:** buat file baru di `plugins/<kategori>/`, satu fitur satu file.

```javascript
let handler = async (m, { conn, text }) => {
    m.reply('Hello World!')
}

handler.command = ['test']

export default handler
```

Tersedia flag akses: `handler.owner = true` (khusus owner), `handler.creator = true`, `handler.group = true`, `handler.admin = true`, `handler.botAdmin = true`.

---

## 📋 Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Node.js | 18.0.0 | 20.x LTS |
| RAM | 256 MB | 512 MB+ |
| OS | Windows 10 / Ubuntu 20.04 | Windows 11 / Ubuntu 22.04 |
| FFmpeg | 4.x | 5.x+ |

---

## 🔒 Privasi & Keamanan

- File `auth/` (sesi WhatsApp) **tidak di-commit** ke GitHub.
- File `node_modules/` dan `tmp/` juga di-ignore.
- Bot tidak merespon DM sehingga aman dari penyalahgunaan perintah.
- Anti-spam membatasi command non-owner (5 command / 10 detik).

---

## ⚠ Disclaimer

- Jangan dijual.
- Jangan hapus kredit asli.
- Bebas dimodifikasi & dipelajari.
- Gunakan dengan bijak.

---

## ❤️ Credits

- **Jhon338** — Developer & Maintainer
- Open Source Community
- All Contributors

---

## 🌐 Version

**v3.4.0** — Selective Group Monitor + RGB Logging Release

---

<div align="center">

**DEVELOPER BY JHON338  •  v3.4.0**

🔗 https://jhon338-jc.github.io/Linktree/  •  💻 https://github.com/jhon338-jc/JhonBotXfinal

</div>