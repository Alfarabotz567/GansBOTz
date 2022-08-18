const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let handler = async (m) => {
let duit = `*────── 「 DONATE 」 ──────*

Hai 👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:

┌〔 Donasi • Emoney 〕
├🔃 Scan Barcod Qrisnya diatas🤗
└────

Berapapun donasi kalian akan sangat berarti 👍
𝐀𝐫𝐢𝐠𝐚𝐭𝐨𝐮!!!

Contact person Owner:
wa.me/6289531704997 (Owner)`
let message = await prepareWAMessageMedia({ image: {url: 'https://telegra.ph/file/44b32765125eb30719e6e.jpg' }}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: duit,
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: 'Pulsa Im3',
               url: '085624823115'
             }

           },
               {
             callButton: {
               displayText: 'Dana',
               phoneNumber: '089531704997'
             }
           },           
               {
             quickReplyButton: {
               displayText: '🧒 Owner',
               id: '.owner',
             }

           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
}

handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)|bagiduit$/i

module.exports = handler
