let handler = async (m, { conn }) => {
	//tolong jngan diganti atau dihapus u cuma make
    let txt = `
Bot ini menggunakan script github Arietube & Family-MD

Recode by Alfarabotz567 & DeffriGans
`
     conn.reply(m.chat, txt, m)
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


