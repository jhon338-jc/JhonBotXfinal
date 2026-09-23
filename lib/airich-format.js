// ============================================================
//  AIRICH FORMAT — parser + builder untuk `.custom`
//  User kirim HTML/CSS/JS bebas → dibungkus jadi halaman Airich.
//  • Mode SNIPPET (default): body saja, auto dibungkus shell()
//  • Mode FULL: HTML lengkap apa adanya (baris `#full` / <!DOCTYPE>)
//  • Header opsional: `#title:`, `#tag:`, `#icon:`, atau `# Judul`
// ============================================================

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { shell } from './airich.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CUSTOM_DIR = path.join(__dirname, '..', 'src', 'custom')

export const MAX_CODE = 40000

// ---------- STORAGE ----------
export function safeName(name = '') {
    return String(name).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 30)
}

export function ensureCustomDir() {
    try { fs.mkdirSync(CUSTOM_DIR, { recursive: true }) } catch {}
    return CUSTOM_DIR
}

export function listCustom() {
    try {
        return fs.readdirSync(CUSTOM_DIR).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5)).sort()
    } catch {
        return []
    }
}

export function readCustom(name = '') {
    const n = safeName(name)
    if (!n) return null
    try {
        return fs.readFileSync(path.join(CUSTOM_DIR, n + '.html'), 'utf-8')
    } catch {
        return null
    }
}

export function saveCustom(name = '', raw = '') {
    const n = safeName(name)
    if (!n) return false
    ensureCustomDir()
    try {
        fs.writeFileSync(path.join(CUSTOM_DIR, n + '.html'), String(raw ?? ''), 'utf-8')
        return true
    } catch {
        return false
    }
}

export function deleteCustom(name = '') {
    const n = safeName(name)
    if (!n) return false
    try {
        fs.unlinkSync(path.join(CUSTOM_DIR, n + '.html'))
        return true
    } catch {
        return false
    }
}

// ---------- PARSER ----------
export function parseCustom(raw = '') {
    const errors = []
    const text = String(raw ?? '').replace(/\r\n?/g, '\n')

    let mode = 'snippet'
    let title = ''
    let tag = 'AI RICH CUSTOM'
    let icon = '📦'

    const lines = text.split('\n')
    let i = 0
    while (i < lines.length) {
        const ln = lines[i].trim()
        if (!ln) { i++; continue }
        if (/^#\s*full$/i.test(ln)) { mode = 'full'; i++; continue }
        const meta = ln.match(/^#\s*(title|tag|icon)\s*:\s*(.+)$/i)
        if (meta) {
            const k = meta[1].toLowerCase()
            const v = meta[2].trim()
            if (k === 'title') title = v
            else if (k === 'tag') tag = v
            else icon = v
            i++; continue
        }
        const short = ln.match(/^#\s+(.+)$/)
        if (short) { title = short[1].trim(); i++; continue }
        break
    }

    const code = lines.slice(i).join('\n').trim()

    if (!code) errors.push('Tidak ada kode HTML.')

    if (code) {
        if (/<!DOCTYPE\s+html|<html[\s>]/i.test(code)) mode = 'full'
        if (code.length > MAX_CODE) errors.push('Kode terlalu besar (' + code.length + ' / ' + MAX_CODE + ' karakter).')

        const openStyle = (code.match(/<style\b/gi) || []).length
        const closeStyle = (code.match(/<\/style>/gi) || []).length
        const openScript = (code.match(/<script\b/gi) || []).length
        const closeScript = (code.match(/<\/script>/gi) || []).length
        if (openStyle !== closeStyle) errors.push('Tag <style> tidak seimbang (' + openStyle + ' buka / ' + closeStyle + ' tutup).')
        if (openScript !== closeScript) errors.push('Tag <script> tidak seimbang (' + openScript + ' buka / ' + closeScript + ' tutup).')
    }

    return { mode, title, tag, icon, code, errors }
}

// ---------- BUILDER ----------
export function buildCustom(parsed, { bot = 'JhonBotXfinal' } = {}) {
    if (!parsed || !parsed.code) return ''
    if (parsed.mode === 'full') return parsed.code
    return shell({
        title: parsed.title || 'Airich Custom',
        tag: parsed.tag || ('AI RICH · ' + bot),
        icon: parsed.icon || '📦',
        html: parsed.code,
        script: ''
    })
}

// ---------- PANDUAN (contoh hidup) ----------
export const GUIDE = [
    '#title: Airich Custom',
    '#tag: PANDUAN FORMAT',
    '#icon: 📦',
    '<div class="big">Bikin web / game sendiri</div>',
    '<div class="muted" style="line-height:1.7">Kirim kode HTML apa saja lewat <b>.custom</b>, bot otomatis bungkus jadi halaman Airich.</div>',
    '<div class="stat">',
    '  <div class="chip">Semua member</div>',
    '  <div class="chip">HTML + CSS + JS</div>',
    '  <div class="chip">Maks 40 KB</div>',
    '</div>',
    '<div class="big" style="font-size:13px;margin-top:14px">CARA PAKAI</div>',
    '<div class="muted" style="line-height:1.8">',
    '1. Ketik <b>.custom</b> lalu kode (multi-baris boleh)<br>',
    '2. Atau reply pesan berisi kode lalu ketik <b>.custom</b><br>',
    '3. Simpan: <b>.custom save nama</b> · jalankan: <b>.custom nama</b><br>',
    '4. Daftar: <b>.custom list</b> · hapus: <b>.custom del nama</b>',
    '</div>',
    '<div class="big" style="font-size:13px;margin-top:14px">CONTOH</div>',
    '<pre style="white-space:pre-wrap;font-size:11px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px;overflow-x:auto">' +
    '.custom # Kalkulator\n' +
    '&lt;button class="btn" onclick="add()"&gt;+&lt;/button&gt;\n' +
    '&lt;div class="big" id="h"&gt;0&lt;/div&gt;\n' +
    '&lt;script&gt;var n=0;function add(){document.getElementById(\'h\').textContent=++n}&lt;/script&gt;' +
    '</pre>',
    '<div class="muted" style="margin-top:10px">Kelas siap pakai: <b>.btn .row .chip .big .muted .stat</b></div>',
    '<button class="btn" onclick="demo()" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">KLIK DEMO</button>',
    '<script>function demo(){document.querySelector(".big").textContent="✅ CUSTOM BERJALAN!"}</script>'
].join('\n')
