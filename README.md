# JhonBot

> WhatsApp Bot multifungsi berbasis [Baileys](https://github.com/whiskeysockets/baileys) • v3.3.8

JhonBot adalah bot WhatsApp yang hanya aktif di **grup yang dipilih Owner** lewat DM. Mendukung pairing code, menu tombol interaktif (native flow), akses berbasis peran (Owner & User & Premium), sistem premium berlangganan, dan UI preview lengkap.

## Fitur

### 👑 Khusus Owner

| Perintah | Fungsi | Syarat |
|---|---|---|
| `.add` | Tambah member grup (`.add 628xxx`) | Bot admin |
| `.kick` | Keluarkan member dari grup (`.kick @user`) | Bot admin |
| `.htg` / `.hidetag` | Hidetag semua member grup | — |
| `.grup` / `.daftargrup` | Daftar & pilih grup yang dipantau | — |
| `.setds` / `.setdesc` | Ganti deskripsi grup | Bot admin |
| `.setnm` / `.setname` | Ganti nama grup | Bot admin |
| `.setpp` / `.setppgrup` | Ganti foto profil grup | Bot admin |
| `.hapuschat` / `.delmsg` / `.hapuspesan` | Hapus semua pesan bot < 24 jam | — |
| `.ownadd` / `.addowner` | Tambah Owner baru (asli, permanen) | — |
| `.owndel` / `.delowner` | Hapus Owner | — |
| `.ownlist` / `.daftarowner` | Lihat daftar Owner | — |
| `.addprem` / `.setprem` / `.addpremium` | Aktivasi premium (`.addprem 628xxx premium2`) | — |
| `.delprem` / `.removepremium` | Hapus member premium | — |
| `.premlist` / `.listprem` / `.listpremium` | Lihat daftar premium | — |
| `.ui` / `.preview` | Preview semua UI & tombol bot | — |
| `.ping` | Cek respons bot + uptime | — |
| `.info` | Info bot & status koneksi | — |
| `.menu` / `.help` / `.profil` | Menu utama & profil | — |

### 👤 Semua User (Member)

| Perintah | Fungsi |
|---|---|
| `.daftar` / `.register` / `.reg` | Daftar jadi member (`.daftar nama,umur,status`) |
| `.menu` / `.help` / `.profil` | Menu utama & profil |
| `.brat` | Buat teks ala brat (font besar) |
| `.iqc` / `.iq` | Gambar kucing |
| `.img` / `.stikergambar` | Ubah media gambar/video jadi stiker |
| `.toimg` | Ubah stiker jadi gambar/video |
| `.lirik` / `.lyrics` | Cari lirik lagu |
| `.rvo` / `.readvo` / `.viewonce` | Baca pesan view once |
| `.donlodall` / `.dlall` | Download video/foto (TikTok, IG, dll) |
| `.poll` / `.jajakpendapat` | Buat polling grup (`.poll soal|a|b|c`) |
| `.premium` / `.langganan` | Lihat paket, status & langganan premium |

> **Aturan DM:** Bot tidak merespon perintah di DM kecuali `.rvo`, `.brat`, `.img`, `.toimg`, `.iqc`, `.lirik`, `.donlodall`, `.daftar`. Owner bebas memakai semua fitur di DM.

### ⭐ Premium

Fitur khusus member premium (`.premium` juga untuk cek status).

| Perintah | Fungsi |
|---|---|
| `.pap` | Foto +18 random |
| `.paptt` | Foto +18 random |
| `.papmmk` | Foto +18 random |
| `.papbgl` | Foto +18 random |
| `.asp` / `.asupan` | Video asupan random |
| `.ccn` / `.cecan` | Foto cecan random |

**Paket langganan:**

| Paket | Harga | Durasi |
|---|---|---|
| PREMIUM 1 | Rp 5.000 | 2 hari |
| PREMIUM 2 | Rp 10.000 | 7 hari |
| PREMIUM 3 | Rp 15.000 | 30 hari |

**Cara langganan:** ketik `.premium` → geser kartu (carousel) → pilih paket → tekan **Chat Owner** (format pesan otomatis terisi) → admin aktivasi dengan `.addprem <nomor> <tier>`.

### 🎨 UI & Tombol Interaktif

Bot memakai tampilan native WhatsApp (native flow). Coba preview semua UI dengan `.ui` (owner):

- **Menu utama** (`.menu`) — dropdown single-select, tombol profil, tombol Linktree, tombol call owner, tombol salin versi.
- **Slide card / carousel** — kartu geser ke samping.
- **Tombol:** single-select ☰ · quick reply ⚡ · URL 🌐 · Call 📞 · Copy Code 🔑.
- **Media UI:** VCard kontak owner · Polling · Lokasi demo.
- **Premium carousel** — 3 kartu paket dengan tombol PILIH PAKET & Status Saya.

## Cara Pakai

1. **Pairing code** pertamakali otomatis muncul di terminal: `/code JHON3382`.
2. Setelah masuk, bot otomatis mengirim **daftar grup** ke DM Owner. Balas dengan nomor urut grup (contoh: `2,5`). Bot otomatis mengenali nomor yang dipakai sebagai Owner.
3. Bot hanya merespon di grup yang dipilih. Ubah lewat `.grup` atau `database/monitor.json`.

## Instalasi

### Termux

```bash
pkg update && pkg upgrade
pkg install nodejs git ffmpeg
git clone https://github.com/jhon338-jc/JhonBotXfinal.git
cd JhonBotXfinal
npm install
npm start
```

### Linux / VPS

```bash
sudo apt update && sudo apt install -y nodejs npm git ffmpeg
git clone https://github.com/jhon338-jc/JhonBotXfinal.git
cd JhonBotXfinal
npm install
npm start
```

### Windows (PowerShell)

```powershell
git clone https://github.com/jhon338-jc/JhonBotXfinal.git
cd JhonBotXfinal
npm install
npm start
```

## Konfigurasi

Edit `config.json`:

```json
{
  "botName": "JhonBot",
  "ownerName": "Jhon338",
  "creator": ["<no_owner_628xxx>"],
  "pairingCode": "JHON3382",
  "prefix": [".", "#", "!", "/", "\\"],
  "botMode": "public",
  "version": "3.3.8",
  "channelLink": "https://jhon338-jc.github.io/Linktree/"
}
```

- `database/owner.json` — daftar nomor Owner (nomor bot otomatis terdaftar).
- `database/premium.json` — daftar premium (number, tier, startDate, endDate).
- `database/users.json` — data pengguna.
- `database/monitor.json` — grup yang dipantau (`groups` & `waiting`).
- Media otomatis tersimpan ke `temp/`.

## Struktur Folder

```
JhonBot/
├─ index.js            → Entry point, pairing, keep-alive
├─ handler.js          → Loader plugin, parser, akses, premium, monitor
├─ config.json         → Konfigurasi bot
├─ lib/                → Helper (rgb/log, msg, pap, antispam, autosave, sticker, kyzz)
├─ plugins/
│  ├─ owner/           → 18 fitur khusus Owner
│  └─ user/            → 16 fitur semua user (+ premium)
├─ src/
│  ├─ img/menu.jpg     → Thumbnail menu
│  └─ image_pap/       → Sumber foto .pap .paptt .papmmk .papbgl
└─ database/           → JSON database (owner, premium, monitor, member)
```

Semua log terminal memakai **warna RGB gradient** dari `lib/rgb.js` (rata kiri + timestamp WIB) — format rapi: `jam [TAG] pesan`.

## Koneksi

- `auth/` — session WhatsApp (jangan dibagikan/dicommit).
- `temp/` — media hasil download (otomatis dibuat).
- `.env` — **KYZZ_API_KEY** untuk `.asp` & `.ccn`.

## Lisensi

MIT — dibuat oleh [Jhon338](https://jhon338-jc.github.io/Linktree/). Gunakan dengan bijak, tanggung jawab pemakai.