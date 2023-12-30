import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya Mana?\nExample: *.twitterdl https://twitter.com/faqeeyaaz/status/1242789155173617664?s=20&t=DRgdl9U8MwTwpY0o1o-96g*`
m.reply(wait)
try {
  let res = await fetch(`https://api.xyroinee.xyz/api/downloader/twitter?url=${text}&apikey=${global.xyro}`)
  let json = await res.json()
  conn.sendMsg(m.chat, { video: { url: json.data.video }, caption: `_Nih Kak Videonya_` }, { quoted: m })
  } catch (e) {
  m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan`)
  }
  }
handler.menudownload = ['twitter']
handler.tagsdownload = ['downloader']
handler.command = /^twitter|twitterdl$/i
handler.limit = true

export default handler