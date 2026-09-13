# JhonBot

> WhatsApp Bot multifungsi berbasis [Baileys](https://github.com/whiskeysockets/baileys) • v3.3.8

JhonBot adalah bot WhatsApp yang hanya aktif di **grup yang dipilih Owner** lewat DM. Mendukung pairing code, menu tombol interaktif, akses berbasis peran (Owner & User), dan auto-save media.

## Fitur

### 👑 Khusus Owner

| Perintah | Fungsi |
|---|---|
| `.add` | Tambah member grup (manual/lewat kontak +62...) |
| `.kick` | Keluarkan member dari grup |
| `.setpp` | Ganti foto profil bot |
| `.setnm` | Ganti nama bot di grup |
| `.setds` | Ganti deskripsi grup |
| `.htg` | Hidetag semua member grup |
| `.grup` | Buka/tutup grup |
| `.ownadd` | Tambah Owner baru |
| `.owndel` | Hapus Owner |
| `.ping` | Cek respons bot + uptime |
| `.info` | Info bot & status koneksi |
| `.menu` | Tampilkan menu utama |

### 👤 Semua User (Owner + non-Owner)

| Perintah | Fungsi |
|---|---|
| `.brat` | Buat teks ala brat (font besar) |
| `.iqc` | Default PP Kucing (image) |
| `.img` | Ubah media gambar/video jadi stiker |
| `.toimg` | Ubah stiker jadi gambar/video |
| `.lirik` | Cari lirik lagu |
| `.rvo` | Baca pesan view once |
| `.pap` | Kirim gambar +18 random |
| `.paptt` | Kirim gambar +18 random |
| `.papmmk` | Kirim gambar +18 random |
| `.papbgl` | Kirim gambar +18 random |
| `.asp` | Video asupan random |
| `.ccn` | Foto cecan random |

> **Aturan DM:** Bot tidak merespon perintah di DM kecuali `.rvo`, `.brat`, `.img`, `.toimg`, `.iqc`, `.lirik`. Owner bebas memakai semua fitur di DM.

## Cara Pakai

1. **Pairing code** pertamakali otomatis muncul di terminal: `/code JHON3382`.
2. Setelah masuk, bot otomatis mengirim **daftar grup** ke DM Owner. Balas dengan nomor urut grup (contoh: `2,5`).
3. Bot hanya merespon di grup yang dipilih. Ubah lewat `database/monitor.json`.

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
  "version": "3.3.8",
  "channelLink": "https://jhon338-jc.github.io/Linktree/"
}
```

- `database/owner.json` — daftar nomor Owner.
- `database/premium.json` — daftar premium.
- `database/users.json` — data pengguna.
- `database/monitor.json` — grup yang dipantau (`groups` & `waiting`).
- Media otomatis tersimpan ke `temp/`.

## Struktur Folder

```
JhonBot/
├─ index.js            → Entry point, pairing, keep-alive
├─ handler.js          → Loader plugin, parser, akses, monitor
├─ config.json         → Konfigurasi bot
├─ lib/                → Helper (rgb, msg, pap, autosave, sticker, kyzz)
├─ plugins/
│  ├─ owner/           → 12 fitur khusus Owner
│  └─ user/            → 12 fitur semua user
├─ database/           → JSON database
└─ src/
   ├─ img/menu.jpg     → Thumbnail menu
   └─ image_pap/       → Sumber foto .pap .paptt .papmmk .papbgl
```

## Koneksi

- `auth/` — session WhatsApp (jangan dibagikan/dicommit).
- `temp/` — media hasil download (otomatis dibuat).
- `.env` — **KYZZ_API_KEY** untuk `.asp` & `.ccn`.

## Lisensi

MIT — dibuat oleh [Jhon338](https://jhon338-jc.github.io/Linktree/). Gunakan dengan bijak, tanggung jawab pemakai.