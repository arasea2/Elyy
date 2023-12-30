import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya Mana?`
m.reply(wait)
try {
  let res = await fetch(`https://api.xyroinee.xyz/api/downloader/tiktok?url=${text}&apikey=${global.xyro}`)
  let json = await res.json()
  let cap = `*ID:* ${json.data.v_id}\n*Description:* ${json.data.desc}`
  let anu = `*Nickname:* ${json.data.author.author}\n*Name:* ${json.data.author.author_name}`
  conn.sendMsg(m.chat, { image: { url: json.data.author.author_profile }, caption: anu }, { quoted: m })
  await conn.sendMsg(m.chat, { video: { url: json.data.other_video_link[1] }, caption: cap }, { quoted: m })
  } catch (e) {
  m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan`)
  }
  }
handler.menudownload = ['tiktok']
handler.tagsdownload = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i
handler.limit = true

export default handler