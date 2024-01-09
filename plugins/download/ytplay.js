import { youtubeSearch, youtubedl } from '@bochilteam/scraper-sosmed'
import { somematch, isUrl, niceBytes } from '../../lib/func.js'

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example: ${usedPrefix + command} Sia Unstopable`
	let url = ''
	if (isUrl(text)) {
		url = text
		try {
			let anu = await youtubeSearch(url)
			anu = anu.video[0]
			let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Author :* ${anu.authorName}\n`
				+ `⏲️ *Published :* ${anu.publishedTime}\n`
				+ `⌚ *Duration :* ${anu.durationH}\n`
				+ `👁️ *Views :* ${anu.viewH}\n`
				+ `🌀 *Url :* ${anu.url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			return m.reply('invalid url')
		}
	} else {
		try {
			let anu = await youtubeSearch(text)
			anu = anu.video[0]
			url = anu.url
			let txt = `📌 *${anu.title}*\n\n`
				+ `🪶 *Author :* ${anu.authorName}\n`
				+ `⏲️ *Published :* ${anu.publishedTime}\n`
				+ `⌚ *Duration :* ${anu.durationH}\n`
				+ `👁️ *Views :* ${anu.viewH}\n`
				+ `🌀 *Url :* ${url}`
			await conn.sendMsg(m.chat, { image: { url: anu.thumbnail.split("?")[0] }, caption: txt }, { quoted: m })
		} catch (e) {
			console.log(e)
			return m.reply(`Tidak ditemukan hasil.`)
		}
	}
	if (!url) return
	try {
		let res = await youtubedl(url)
		let data = res.audio[Object.keys(res.audio)[0]]
		let site = await data.download()
		if (data.fileSize > 400000) return m.reply(`Filesize: ${data.fileSizeH}\nTidak dapat mengirim, maksimal file 400 MB`)
		await conn.sendMsg(m.chat, { audio: { url: site }, mimetype: 'audio/mpeg' }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(e)
	}
}

handler.menudownload = ['ytplay <teks> / <url>']
handler.tagsdownload = ['search']
handler.command = /^(play|(play)?yt(play|dl)?)$/i

export default handler