import fs from 'fs'
import path from 'path'
import { buildServerHTML, loadSongs } from '../lib/serverboard.js'

const tmp = path.join('temp')
if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true })

const songFile = path.join(tmp, 'lagu-tes.mp3')
fs.writeFileSync(songFile, Buffer.from([0x00, 0x01, 0x02, 0xff]))

const songs = loadSongs(tmp)
const musicURILike = (songs || []).some(s => /^data:audio\/mpeg;base64,/.test(s.url || ''))

const ds = {
    bot: 'JhonBot', ver: 'JhonBot v3.8', mode: 'public', prefix: '.', owner: 'Jhon338',
    created: 'Senin, 15 September 2026', plugins: 36, groups: 3, members: 6, premium: 4, premiumTotal: 6, owners: 2,
    ram: { usedFmt: '1.2 GB', totalFmt: '8.0 GB', pct: 15, used: 1234567890, total: 8589934592 },
    cpu: 23, load: 0.45, uptime: 3661, uptimeFmt: '01:01:01', sysUp: '1d 02:00:00',
    node: 'v22.0.0', plat: 'WIN32 X64', host: 'DESKTOP', pid: 1234,
    weather: { city: 'Jakarta', temp: 31, feel: 33, hum: 70, wind: 12, icon: '⛅', cond: 'Sedikit Berawan', isDay: true, time: '2026-09-15 12:30' },
    sdk: { tz: 25200, uptime: 3661, songs, link: 'https://x', ver: 'JhonBot v3.8' },
    log: [{ time: '12:30:01', isButton: false, isGroup: true, name: 'Budi', sender: '62812', chat: '12036@g.us', body: '.menu' }]
}

const html = buildServerHTML(ds)

const checks = [
    ['COMMAND CENTER', html.includes('COMMAND CENTER')],
    ['15% RAM', html.includes('15%')],
    ['36 plugins', html.includes('>36</div>')],
    ['3 groups', html.includes('>3</div>')],
    ['cpu donut 23%', html.includes('23%')],
    ['uptime fmt', html.includes('01:01:01')],
    ['weather 31', html.includes('31°C')],
    ['log body', html.includes('.menu')],
    ['no video', !/<video/i.test(html)],
    ['cat OWNER', html.includes('OWNER')],
    ['cmd .server row', html.includes('data-c=".server"')],
    ['cmd .brat row', html.includes('data-c=".brat"')],
    ['secInfo panel', html.includes('id="secInfo"')],
    ['secBot panel', html.includes('id="secBot"')],
    ['secWea panel', html.includes('id="secWea"')],
    ['secLog panel', html.includes('id="secLog"')],
    ['secMus panel', html.includes('id="secMus"')],
    ['secGal panel', html.includes('id="secGal"')],
    ['tog button ib', html.includes("tog('secInfo','ib')")],
    ['allTog button', html.includes('allTog()')],
    ['theme button', html.includes('theme()')],
    ['clipboard copy btn', html.includes('cp(D.link)')],
    ['music data URI', musicURILike || songs.length === 0],
    ['no leak + esc(', !html.includes('+ esc(')],
    ['no undefined', !html.includes('undefined')],
    ['weather offline branch builds', typeof buildServerHTML({ ...ds, weather: null }).length === 'number']
]

let fail = false
for (const [n, ok] of checks) {
    if (!ok) fail = true
    console.log((ok ? 'PASS' : 'FAIL') + ' - ' + n)
}

const m = html.match(/<script>([\s\S]*?)<\/script>/)
if (m) {
    try { new Function(m[1]); console.log('PASS - client JS parses') } catch (e) { fail = true; console.log('FAIL - client JS:', e.message) }
}

fs.writeFileSync(path.join(tmp, '_server_preview.html'), html)
console.log('PREVIEW SAVED (' + html.length + ' bytes)')
if (fail) process.exit(1)
console.log('ALL GOOD')