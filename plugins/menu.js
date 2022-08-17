let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
┏─────────────────⬣
┆   *Hai*, %name 
┗┬──────────────┈ ⳹
┏┆⬡ *Tersisa* : %limit Limit
┆┆⬡ *Role* : %role
┆┆⬡ *Level* : %level [%exp / %maxexp]
┆┆⬡ *Exp* : %totalexp XP
┗┬──────────────┈ ⳹
┏┤   *Kalender*
┆┗──────────────┈ ⳹
┆⬡ *Hari* : %week %weton
┆⬡ *Tanggal* : %week %weton, %date
┆⬡ *Tanggal Islam* : %dateIslamic
┆⬡ *Waktu* : %time
┗┬──────────────┈ ⳹
┏┤   *Bot info*
┆┗──────────────┈ ⳹
┆⬡ *Uptime* : %uptime
┆⬡ *Run Bot* : Panel/RDP
┆⬡ *Bailyes Version* : 4.2.0
┆⬡ *Database* : %rtotalreg dari %totalreg
┆⬡ *Memory Used* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┆⬡ *Yt* :
┆⬡ https://youtu.be/XYIdel2-bR8
┗─────────────────⬣
%readmore`.trim(),
  header: '┏━┈┈『 %category 』┈┈⬣',
  body: '┆⬡ %cmd %islimit %isPremium',
  footer: '┗━───────⬣\n',
  after: `
*GansBOTz@^%version*
${'```%npmdesc```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {

  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'asupan', 'admin', 'grup', 'premium', 'bebanortu', 'internet', 'war', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'RPG',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'asupan': 'Asupan',
    'group': 'Grup',
    'premium': 'Premium',
    'bebanortu': 'Bebanortu',
    'internet': 'Internet',
    'war': 'WAR MENU',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot(proses)',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game',
    'rpg': 'RPG'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'asupan') tags = {
    'asupan': 'Asupan'
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
    if (teks == 'bebanortu') tags = {
    'bebanortu': 'Bebanortu'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'war') tags = {
  'war': '𝙒𝘼𝙍 𝙈𝙀𝙉𝙐',
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot(proses)') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    global.jam = time
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let judul = `${global.ucapan}, ${name}`
      let gw = `㋛created By ${global.owner}𓂺`
      const sections = [
      {
        title: '𝐋𝐢𝐬𝐭 𝐌𝐞𝐧𝐮 𝐁𝐲 𝐆𝐚𝐧𝐬𝐁𝐎𝐓𝐳',
        rows: [
          { title: 'A҈L҈L҈ M҈E҈N҈U҈ 📋', rowId: `${_p}? all` },
          { title: 'G҈A҈M҈E҈ 🎮', rowId: `${_p}? game` },
          { title: 'X҈P 📈҈ ', rowId: `${_p}? xp` },
          { title: 'S҈T҈I҈K҈E҈R 🐲҈', rowId: `${_p}? stiker` },
          { title: 'K҈E҈R҈A҈N҈G҈ A҈J҈A҈I҈B 🐚҈', rowId: `${_p}? kerangajaib` },
          { title: 'Q҈U҈O҈T҈E҈S҈ 🗣️', rowId: `${_p}? quotes` },
          { title: 'A҈S҈U҈P҈A҈N҈҈ 🔞️', rowId: `${_p}? asupan` },
          { title: 'G҈R҈U҈P҈ M҈E҈N҈U 👥҈', rowId: `${_p}? grup` },
          { title: 'P҈R҈E҈M҈I҈U҈M҈ M҈E҈N҈U҈ 🥨', rowId: `${_p}? premium` },
          { title: 'B҈E҈B҈A҈N҈ O҈R҈T҈U҈ M҈E҈N҈U҈ 🏋️', rowId: `${_p}? bebanortu` },
          { title: 'I҈N҈T҈E҈R҈N҈E҈T 🛣️҈', rowId: `${_p}? internet` },
          { title: 'W҈A҈R҈ M҈E҈N҈U҈ 👨‍💻️҈', rowId: `${_p}? war` },
          { title: 'A҈N҈O҈N҈Y҈M҈O҈U҈S 🎭҈', rowId: `${_p}? anonymous` },
          { title: 'L҈O҈G҈O҈ & N҈U҈L҈I҈S҈ M҈E҈N҈U ☯️҈', rowId: `${_p}? nulis` },
          { title: 'D҈O҈W҈N҈L҈O҈A҈D҈E҈R 🌍҈', rowId: `${_p}? downloader` },
          { title: 'T҈O҈O҈L҈S 🛠️҈', rowId: `${_p}? tools` },
          { title: 'F҈U҈N҈ M҈E҈N҈U҈ 🎰', rowId: `${_p}? fun`},
          { title: 'D҈A҈T҈A҈B҈A҈S҈E 📂҈', rowId: `${_p}? database` },
          { title: 'V҈O҈T҈E҈ & A҈B҈S҈D҈N 🗣️҈', rowId: `${_p}? vote` },
          { title: 'A҈L҈-Q҈U҈R҈\'A҈N ҈ 📖', rowId: `${_p}? quran` },
          { title: 'P҈E҈N҈G҈U҈B҈A҈H҈ S҈U҈A҈R҈A҈ 🔊', rowId: `${_p}? audio` },
          { title: 'J҈A҈D҈I҈B҈O҈T҈(perbaikan)', rowId: `${_p}? jadibot` },
          { title: 'I҈N҈F҈O҈ 🏢', rowId: `${_p}? info` },
          { title: 'L҈A҈I҈N҈ L҈A҈I҈N 🛴҈', rowId: `${_p}? tanpakategori` },
          { title: 'O҈W҈N҈E҈R ⛄҈', rowId: `${_p}? owner` },
        ]
      }
    ]
    const listMessage = {
      text: judul,
      footer: gw,
      mentions: await conn.parseMention(judul),
      title: '',
      buttonText: "Klik Disini",
      sections
    }
    return conn.sendMessage(m.chat, listMessage, { quoted: m, mentions: await conn.parseMention(judul), contextInfo: { forwardingScore: 99999, isForwarded: true }})
    
    }

    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: global.ucapan,
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3TemplateButtonImg(m.chat, fla + teks, text.trim(), gw, `𝐏𝐞𝐧𝐠𝐞𝐦𝐛𝐚𝐧𝐠 𝐁𝐨𝐭`, `${_p}owner`, `𝐓𝐡𝐚𝐧𝐤𝐬 𝐓𝐨`, `${_p}tqto`, `𝐃𝐨𝐧𝐚𝐬𝐢`, `${_p}donasi`)
  } catch (e) {
    conn.reply(m.chat, '𝑴𝒂𝒂𝒇, 𝒎𝒆𝒏𝒖 𝒔𝒆𝒅𝒂𝒏𝒈 𝒆𝒓𝒓𝒐𝒓', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(listmenu|command|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}
