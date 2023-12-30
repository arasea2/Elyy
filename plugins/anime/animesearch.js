import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix, command, text}) => {
    if (!text) throw `Contoh: *${usedPrefix}${command} Anohana`

    try {
        let anu = await (await fetch(`https://api.lolhuman.xyz/api/anime?apikey=${api.lol}&query=${text}`)).json()
        if (anu.result == 0) throw Error('Anime yang anda cari tidak ditemukan')
        let txt = `*List Anime*`
        let i = anu.result
            txt += `\n\nTitle: *${i.title.romaji} (${i.title.english})*\n`
            txt += `Episode: *${i.episodes}*\n`
            txt += `Durasi: *${i.duration}M*\n`
            txt += `Status: *${i.status}*\n`
            for (let a of i.genres) {
                txt += `Genre: *${a}*\n`
            }
            txt += `Tanggal Mulai: *${i.startDate.year}, ${i.startDate.month}, ${i.startDate.day}*\n`
            txt += `Tanggal Selesai: *${i.endDate.year}, ${i.endDate.month}, ${i.endDate.day}*\n`
            txt += `Sinopsis: *${i.description}*\n`
        console.log(anu)
        await conn.senMsg(m.chat, {image: { url: anu.coverImage.large }, caption: txt }, { quotes: m })
    } catch (e) {
        m.reply('Judul tidak ditemukan / Server  Down')
        console.log(e)
    }
}

handler.menuanime = ['carianime']
handler.tagsanime = ['search']
handler.command = /^(carianime)$/i

export default handler