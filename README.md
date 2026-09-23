# JhonBotXfinal

> **WhatsApp Multi-Device Bot** berbasis [Baileys](https://github.com/whiskeysockets/baileys) • v3.3.8
> Dibuat oleh [Jhon338](https://jhon338-jc.github.io/Linktree/)

![Menu Utama](https://raw.githubusercontent.com/jhon338-jc/JhonBotXfinal/main/src/img/menu.png)

**JhonBotXfinal** adalah bot WhatsApp multifungsi yang berjalan penuh di **grup** dengan tampilan **menu tombol interaktif native** (native flow). Bot aktif 24/7, memakai **warna log RGB gradient**, mendukung **pairing code**, akses berbasis peran (**Creator > Owner > Admin > Premium 1/2/3 > User**), **kuota asupan harian per role**, wajib **.daftar** member, serta **notifikasi welcome & member keluar** real-time (tanpa replay saat bot mati).

---

## ✨ Fitur Sekilas

| | | |
|---|---|---|
| 🧩 **Menu native flow** | 🔌 **Pairing code** koneksi cepat | 🔢 **Prefix fleksibel** `. # ! / \` |
| 👋 **Welcome / Leave** otomatis | 🎲 **Game Airich** (Snake) | 🖥️ **Dashboard Server** `.server` |
| 📷 **46 kategori foto +18** | 🎞️ **Video asupan** random | 📺 **Downloader** TikTok/IG/FB/YT |
| 🔒 **Akses peran** Owner/Member/Premium | 🪙 **Kuota asupan** 5×/hari/command | 🎨 **UI preview** lengkap |

---

## 📜 Daftar Perintah

### 👑 Owner (penuh)
| Perintah | Fungsi |
|---|---|
| `.menu` / `.help` / `.profil` | Menu utama & profil user |
| `.on` / `.off` (alias `.aktif` / `.mati`) | Nyalakan / matikan bot di grup ini |
| `.add 628xxx` | Tambah member ke grup (bot admin) |
| `.kick @user` | Keluarkan member dari grup (bot admin) |
| `.htg` / `.hidetag` | Hidetag semua member grup |
| `.setpp` / `.setppgrup` | Ganti foto profil grup |
| `.setnm` / `.setname` | Ganti nama grup |
| `.setds` / `.setdesc` | Ganti deskripsi grup |
| `.hapuschat` / `.delmsg` / `.hapuspesan` | Hapus pesan bot (< 24 jam) |
| `.ownadd` / `.addowner` | Tambah Owner baru (permanen) |
| `.owndel` / `.delowner` | Hapus Owner |
| `.ownlist` / `.daftarowner` | Lihat daftar Owner |
| `.addprem 628xxx premium2` / `.setprem` / `.addpremium` | Aktivasi member premium |
| `.delprem` / `.removepremium` | Hapus member premium |
| `.premlist` / `.listprem` / `.listpremium` | Lihat daftar premium |
| `.ui` / `.preview` | Preview semua UI & tombol bot |
| `.ping` | Cek respons bot + uptime |
| `.info` | Info bot & status koneksi |

### 👤 Member (wajib daftar)
| Perintah | Fungsi |
|---|---|
| `.daftar nama,umur,status` / `.register` / `.reg` | Daftar jadi member |

> Sebelum memakai fitur bot, wajib daftar member dulu: `.daftar nama,umur,status`

### 🗳️ Grup
| Perintah | Fungsi |
|---|---|
| `.poll soal\|a\|b\|c` / `.jajakpendapat` | Buat polling grup |

### 🎨 Maker
| Perintah | Fungsi |
|---|---|
| `.brat` | Buat teks ala brat (font besar) |
| `.img` / `.stikergambar` | Ubah gambar/video (reply media) jadi sticker |
| `.iqc` / `.iq` | Teks ala kategori kucing |

### 🛠️ Tools
| Perintah | Fungsi |
|---|---|
| `.lirik` / `.lyrics` | Cari lirik lagu |
| `.rvo` / `.readvo` / `.viewonce` | Baca pesan view once |
| `.toimg` | Ubah sticker jadi gambar/video |

### 📥 Download
| Perintah | Fungsi |
|---|---|
| `.donlodall` / `.dlall` + link | Download media TikTok, Instagram, Facebook, YouTube |

### 👑 Airich (Premium Only)
| Perintah | Fungsi |
|---|---|
| `.server` | Dashboard info server (RAM, CPU, cuaca, log, musik) |
| `.snake` | Main game Snake (rich card interaktif) |

### 💎 Premium

Sistem langganan mendukung bot & membuka fitur khusus.

| Paket | Harga | Durasi |
|---|---|---|
| PREMIUM 1 | Rp 5.000 | 2 hari |
| PREMIUM 2 | Rp 10.000 | 7 hari |
| PREMIUM 3 | Rp 15.000 | 30 hari |

**Cara:** ketik `.premium` / `.langganan` → geser kartu (carousel) → pilih paket → **Chat Owner** (format pesan otomatis terisi) → admin aktivasi dengan `.addprem <nomor> <tier>`.

### 📸 Asupan & Foto Premium

| Sumber | Perintah |
|---|---|
| API KYZZ (video) | `.asp` / `.asupan` |
| API KYZZ (foto) | `.ccn` / `.cecan` |
| Folder lokal `image_pap` | `.pap`, `.paptt`, `.papmmk`, `.papbgl` |
| **46 kategori foto lokal** (`src/photos`) | `.bule1` `.china1` `.teen1` `.pink1` ... |

**Foto lokal = 1 kategori per command** — tiap subfolder `src/photos` otomatis jadi perintah (nama tanpa dash):

- **Bule** — `.bule1` – `.bule7`
- **China** — `.china1` – `.china3`
- **Korea** — `.korea1` – `.korea4`
- **Japan** — `.japan1`
- **Pink** — `.pink1` – `.pink11`
- **Teen** — `.teen1` – `.teen3`
- **Asian** — `.asian1` · **Lesbi** — `.lesbi1` · **Pregnant** — `.pregnant1`
- **Group** — `.group1`
- **Persona** — `.perpect1` – `.perpect5`, `.evaelfie`, `.melodymarks`, `.sofifoxy`
- **Idol** — `.kitsune`, `.freyajkt`, `.cishani`, `.livyrenata`, `.onicvonzy`

Setiap command foto kirim **berurutan per chat** (mentok bawah → balik atas) lengkap dengan tombol *Acak Lagi*.

> **Kuota asupan:** user biasa dibatasi **5× per hari per command** (reset otomatis WIB). Owner & admin grup bebas tanpa batas.

### 🧭 Aturan

- Bot **hanya merespon di grup**. Di **DM tidak merespon sama sekali**.
- Semua command dipakai dengan prefix (`.`), misal `.menu`.
- Penggunaan bot = tanggung jawab pengguna. Gunakan dengan bijak.

---

## 🚀 Cara Pakai

1. Jalankan bot → **Pairing Code** otomatis muncul di terminal (`/code JHON3382`).
2. Satu kali tautkan perangkat WhatsApp (multi-device).
3. Nomor pairing otomatis terdaftar sebagai **Owner**.
4. Bot aktif di semua grup tempat bot berada. Kelola per grup dengan `.on` / `.off` (di dalam grup tersebut) → tersimpan di `database/monitor.json`.

---

## 📦 Instalasi

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

---

## ⚙️ Konfigurasi

Edit `config.json`:

```json
{
  "botName": "JhonBotXfinal",
  "ownerName": "Jhon338",
  "creator": ["<no_owner_628xxx>"],
  "pairingCode": "JHON3382",
  "prefix": [".", "#", "!", "/", "\\"],
  "botMode": "public",
  "version": "3.3.8",
  "channelLink": "https://jhon338-jc.github.io/Linktree/",
  "channelUrl": "https://whatsapp.com/channel/0029VbC0TW8545uvqe36Kv0b"
}
```

**File database** (`database/`):

| File | Isi |
|---|---|
| `owner.json` | Daftar nomor Owner |
| `premium.json` | Data premium (number, tier, start, end) |
| `member.json` / `users.json` | Data member pengguna |
| `monitor.json` | Grup yang dimatikan (`.on`/`.off`) |
| `newsletter.json` | Chat log newsletter/channel |
| `asupan-limit.json` | Pemakaian kuota asupan harian |

**Env / API**:

- Buat file `.env` di root:
  ```
  KYZZ_API_KEY=your_api_key
  ```
  Diperlukan untuk `.asp` dan `.ccn` (sumber asupan via API).

---

## 🗂️ Struktur Folder

```
JhonBotXfinal/
├─ index.js              → Entry point, koneksi WhatsApp, pairing
├─ handler.js            → Loader plugin, parser, akses, premium, kuota
├─ config.json           → Konfigurasi bot
├─ lib/                  → Helper (rgb, msg, flow, autosave, sticker, pap,
│                           asupan-limit, antispam, airich, shop, serverboard,
│                           serverlog, kyzz/)
├─ plugins/
│  ├─ owner/             → Fitur khusus Owner (18 plugin)
│  ├─ user/              → Daftar member
│  ├─ group/             → Fitur grup (poll)
│  ├─ maker/             → brat, img (stiker), iqc
│  ├─ tools/             → lirik, rvo, toimg
│  ├─ download/          → donlodall
│  ├─ asupan/            → asp, ccn, pap*, foto (46 kategori)
│  ├─ airich/            → server, snake (Premium Only)
│  └─ premium/           → premium (paket & status)
├─ src/
│  ├─ img/               → menu.png, premium.png, welcome.png, goodbye.png, dana.png
│  ├─ photos/            → 46 subfolder = 46 command foto asupan
│  ├─ image_pap/         → Sumber foto `.pap` `.paptt` `.papmmk` `.papbgl`
│  ├─ videos/            → Video pendukung
│  └─ audio/             → Musik (dashboard .server)
└─ database/             → JSON database (owner, premium, member, monitor, dll.)
```

> Media hasil generate/download otomatis tersimpan di `temp/` (tidak dicommit).

---

## 🔌 Koneksi & Keamanan

- `auth/` — session WhatsApp (**jangan dibagikan / dicommit**).
- `temp/` — media hasil download (otomatis dibuat).
- `.env` — **KYZZ_API_KEY** (jangan dicommit).
- Semua log terminal memakai **warna RGB gradient** dari `lib/rgb.js` dengan format `jam [TAG] pesan`.

---

## 📄 Lisensi

MIT — dibuat oleh [Jhon338](https://jhon338-jc.github.io/Linktree/). Gunakan dengan bijak, tanggung jawab sepenuhnya di tangan pemakai.