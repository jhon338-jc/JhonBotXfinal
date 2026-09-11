# AGENTS.md — Jhon338 WhatsApp Bot

## Aturan penting

- **Setiap kali user mengupdate projek ini, WAJIB otomatis push ke GitHub:**
  `git add -A && git commit -m "update" && git push origin main`
- Remote yang benar: **https://github.com/jhon338-jc/JhonBotXfinal.git**
  (jangan push ke repo lain)
- Jangan commit file `auth/`, `node_modules/`, `tmp/` (sudah ada di `.gitignore`).
- Selalu jalankan bot dengan `npm start` (atau `node index.js`) sebelum push untuk memastikan tidak error.

## Arsitektur

- `index.js` — entry point, koneksi WhatsApp, pairing code, keep-alive.
- `handler.js` — otak bot: load plugin, parse command, access control, monitor grup, anti-spam.
- `lib/rgb.js` — sistem warna RGB terminal (`rgb`, `rgbTag`, `COLORS`).
- `lib/msg.js` — parser pesan (`smsg`), helper `conn.reply`, `conn.sendFile`, dll.
- `plugins/` — file plugin dipisah per fitur:
  - `plugins/owner/*.js` — fitur khusus owner (setiap fitur file sendiri).
  - `plugins/group/*.js` — fitur manajemen grup.
  - `plugins/tools/*.js` — tool/fungsi umum.
  - `plugins/menu/menu.js` — menu utama.
  - `plugins/group/notif.js` — hook `before` untuk notifikasi join/leave member.
- `database/monitor.json` — daftar grup yang dipantau bot.
- `database/role.json` — daftar owner/premium.
- `config.json` — botName, ownerName, creator, prefix, botMode, channelLink (Linktree), githubRepo.

## Perilaku bot

- Bot **hanya merespon di grup yang dipilih owner** lewat DM (format angka seperti `1,2,3`).
- Bot **tidak merespon sama sekali di DM** — semua perintah DM diblokir.
- Semua log terminal harus memakai warna RGB dari `lib/rgb.js` (jangan pakai `console.log`/`console.error` polos).
- Plugin baru: satu fitur = satu file di `plugins/` (kategori yang sesuai).