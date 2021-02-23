require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')

const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const fetch = require('node-fetch')


const appRoot = require('app-root-path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot+'/lib/data/group.json')
const db = low(db_group)
db.defaults({ group: []}).write()

const { 
    removeBackgroundFromImageBase64
} = require('remove.bg')

const {
    exec
} = require('child_process')

const { 
    cursosId,
    menuId, 
    cekResi, 
    urlShortener, 
    meme, 
    getLocationData,
    images,
    resep,
    rugapoi,
    rugaapi,
    cariKasar,
    
} = require('./lib')

const { 
    msgFilter, 
    color, 
    processTime, 
    isUrl,
	download
} = require('./utils')

const { uploadImages } = require('./utils/fetcher')

const fs = require('fs-extra')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
//const welkom = JSON.parse(fs.readFileSync('./settings/welcome.json'))

let antisticker = JSON.parse(fs.readFileSync('./lib/helper/antisticker.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/helper/stickerspam.json'))
let antilink = JSON.parse(fs.readFileSync('./lib/helper/antilink.json'))


let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
    prefix
} = setting

const {
    apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit){
    let	reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}



module.exports = HandleMsg = async (wilder, message) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        var { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const blockNumber = await wilder.getBlockedIds()
        const botNumber = await wilder.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await wilder.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
		const pengirim = sender.id
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const stickermsg = message.type === 'sticker'
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isBlocked = blockNumber.includes(sender.id)

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
		const argx = chats.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
	    const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
		
		// [IDENTIFY]
		const isOwnerBot = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
		const isKasar = await cariKasar(chats)
        

        // [BETA] Avoid Spam Message
        //
        if(!isCmd && isKasar && isGroupMsg) { console.log(color('[BADW]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'de', color(pushname), 'en', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname), 'en', color(name || formattedTitle)) }
        
//anti spam
        function isStickerMsg(id){
            if (isGroupMsg && AntiStickerSpam && !isGroupAdmins) {return false;}
            let found = false;
            for (let i of stickerspam){
                if(i.id === id){
                    if (i.msg >= 7) {
                        found === true 
                        wilder.reply(from, '*[ANTI STICKER SPAM]* \n has hecho spam por la cantidad de stiker que mandastes, el bot te hechara automáticamente nunca vuelvas :)', message.id).then(() => {
                            wilder.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if(stickerspam[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const result = '✅ Se ha restablecido el spam de pegatinas de DB'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./lib/helper/stickerspam.json',JSON.stringify(stickerspam));
                                wilder.sendText(from, result)
                            } else {
                                    wilder.reply(from, `${monospace(`No hay número en la base de datos ;)`)}`, id)
                            }
                        })
                        return true;
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                stickerspam.push(obj);
                fs.writeFileSync('./lib/helper/stickerspam.json',JSON.stringify(stickerspam));
                return false;
            }  
        }
        function addStickerCount(id){
            if (isGroupMsg && AntiStickerSpam && !isGroupAdmins) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/helper/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        //fitur anti link
        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await wilder.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    wilder.reply(from, '*[DETECTOR DE VÍNCULOS DE GRUPO]* \nacabastes de enviar tu basura de link automaticamente el bot te hechara y nunca vuelvas puto ;)', id).then(() => {
                        wilder.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }


        if (isGroupMsg && AntiStickerSpam && !isGroupAdmins){
            if(stickermsg === true){
                if(isStickerMsg(wilder)) return
                addStickerCount(wilder)
            }
        }

        // [BETA] Avoid Spam Message
        msgFilter.addFilter(from)
	
	//[AUTO READ] Auto read message 
	wilder.sendSeen(chatId)
	    
	// Filter Banned People
        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isBlocked) return
		
        switch (command) {
        // Menu and TnC
        case 'dms':
            await wilder.sendText(from, menuId.textDMS(pushname))
            break   
        case 'speed':
        case 'ping':
            await wilder.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
            break
            case 'tnc':
            await wilder.sendText(from, menuId.textTnC())
            break
//-------------------------------------------------------------------------MENU------------------------------------------------------------------------//
        case 'notes':
        case 'menu':
        case 'help':
            await wilder.sendText(from, menuId.textMenu(pushname))
            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? wilder.sendText(from, `Para Ver El Menu De Administradores Escribe: *${prefix}menuadmin*`) : null)
            break

        case 'creacion':
            await wilder.sendText(from, menuId.textMenu1(pushname))
        break

        case 'descargas':
            await wilder.sendText(from, menuId.textMenu2(pushname))
        break

        case 'significadodenombre':
            await wilder.sendText(from, menuId.textMenu3(pushname))
        break

        case 'buscar':
            await wilder.sendText(from, menuId.textMenu4(pushname))
        break

        case 'texto':
            await wilder.sendText(from, menuId.textMenu5(pushname))
        break

        case 'imagenes':
            await wilder.sendText(from, menuId.textMenu6(pushname))
        break

        case 'otros':
            await wilder.sendText(from, menuId.textMenu7(pushname))
        break

        case 'jsbot':
            await wilder.sendText(from, menuId.textMenu8(pushname))
        break

        case 'creador':
            await wilder.sendText(from, menuId.textMenu9(pushname))
        break

        case 'menuadmin':
            if (!isGroupMsg) return wilder.reply(from, 'lo siento, este comando solo se puede usar dentro de un grupo!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Este comando solo puede ser utilizado por administradores de grupo.', id)
            await wilder.sendText(from, menuId.textAdmin())
            break
//-------------------------------------------------------------------------MENU-----------------------------------------------------------------------------------//
        case 'ownerbot':
            await wilder.sendContact(from, ownerNumber)
            .then(() => wilder.sendText(from, 'Si desea solicitar una función, ¡chatee con propietario!'))
            break
        case 'join':
            if (args.length == 0) return wilder.reply(from, `Si desea invitar al bot al grupo por favor invite con\n ${prefix}join [link group]`, id)
            let linkgrup = body.slice(6)
            let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
            let chekgrup = await wilder.inviteInfo(linkgrup)
            if (!islink) return wilder.reply(from, '¡Lo siento, el enlace del grupo es incorrecto! envíame un enlace valido', id)
            if (chekgrup) {
                await wilder.joinGroupViaLink(linkgrup)
                      .then(async () => {
                          await wilder.sendText(from, '¡Se unió al grupo con éxito a través del enlace!')
                          await wilder.sendFile(chekgrup.id, `./media/Bart.png` , '', `Hola grupo mi nombre es *JSBOT* y estoy para ayudarles en lo que pueda para ver mis funciones escribe: ${prefix}menu`
                          )
                         
                      })
            } else {
                let cgrup = await wilder.getAllGroups()
                if (cgrup.length > groupLimit) return wilder.reply(from, `Lo siento, el grupo de este bot está lleno \nEl grupo máximo es: ${groupLimit}`, id)
                if (cgrup.size < memberLimit) return wilder.reply(from, `Lo siento, JSBOT no se unirá si los miembros del grupo no superan los ${memberLimit} miembros`, id)
                await wilder.joinGroupViaLink(linkgrup)
                      .then(async () =>{
                          await wilder.reply(from, '¡Se unió al grupo con éxito a través del enlace!', id)
                      })
                      .catch(() => {
                        wilder.reply(from, '¡Ha fallado!', id)
                      })
            }
            break
        case 'botstat': {
            const loadedMsg = await wilder.getAmountOfLoadedMessages()
            const chatIds = await wilder.getAllChatIds()
            const groups = await wilder.getAllGroups()
            wilder.sendText(from, `Estado :\n- *${loadedMsg}* Mensajes Cargados\n- *${groups.length}* Grupos\n- *${chatIds.length - groups.length}* Chats\n- *${chatIds.length}* Total de Chats`)
            break
        }

	//Sticker Converter
	case 'stimg':
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                wilder.reply(from, `¡Aún en proceso! Por favor, espere un momento...`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await wilder.sendFile(from, imageBase64, 'imgsticker.jpg', 'Berhasil convert Sticker to Image!', id)
                .then(() => {
                    console.log(`Stiker a imagen procesado en ${processTime(t, moment())} Segundos`)
                })
        } else if (!quotedMsg) return wilder.reply(from, `Formato incorrecto, etiqueta la pegatina que quieres usar como imagen.`, id)
        break	
			
        // Sticker Creator

        case 'logopornhub':
            if (args.length === 1) return wilder.reply(from, `Kirim perintah *${prefix}logopornhub [ |Teks1|Teks2 ]*,\n\n contoh : *${prefix}logopornhub |Dimas| HUB*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
                wilder.reply(from, `sabar brok eug proses dolo....`, id)
                const lpornhub = argz[1]
                const lpornhub2 = argz[2]   
                if (lpornhub > 10) return wilder.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                if (lpornhub2 > 10) return wilder.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 10 huruf!_', id)
                wilder.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/phblogo?text1=${lpornhub}&text2=${lpornhub2}`)
            } else {
                await wilder.reply(from, `Wrong Format!\n[❗] Kirim perintah *${prefix}logopornhub [ |Teks1| Teks2 ]*,\n\n contoh : *${prefix}logopornhub |Dimas| HUB*`, id)
            }
            break
   
            case 'coolteks':
                case 'cooltext':
                        if (args.length == 0) return wilder.reply(from, `Untuk membuat teks keren CoolText pada gambar, gunakan ${prefix}cooltext teks\n\nContoh: ${prefix}cooltext arugaz`, id)
                    rugaapi.cooltext(args[0])
                    .then(async(res) => {
                    await wilder.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
                    })
                    break

                    case 'brainly':
            if (!isGroupMsg) return wilder.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return wilder.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                wilder.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            wilder.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
			    wilder.sendText(from, 'Selesai ✅, donasi kesini ya paypal.me/TheSploit | Pulsa : 085754337101')
                        } else {
                            wilder.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                wilder.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break

            case 'qrread':
                if (args.length !== 1) return wilder.reply(from, `para usar la función qrread, escriba :\n${prefix}qrread url\n\nEjemplo: ${prefix}qrcode https://i.ibb.co/phSpp2h/00bed2bb-8b90-4d49-ace1-fe0ac9f73dff.jpg\n\n*Nota : Primero cargue su qrcode a https://id.imgbb.com/, luego copie la url de su imagen qrcode
                *`, id)
                wilder.reply(from, `Espere...`, id);
                rugaapi.qrread(args[0])
                .then(async (res) => {
                  await wilder.reply(from, `${res}`, id)
                })
              break
            case 'qrcode':
                if (args.length !== 2) return wilder.reply(from, `Para utilizar la función qrcode, escriba :\n${prefix}qrcode [kata / url] [tamaño] \ n \ nEjemplo: ${prefix}qrcode https://google.com 300\n\n *Tamaño mínimo 100 y maksimal 500*`, id)
                wilder.reply(from, `Espere...`, id);
                rugaapi.qrcode(args[0], args[1])
                .then(async (res) => {
                  await wilder.sendFileFromUrl(from, `${res}`, id)
                })
              break	




        case 'sticker':
        case 'stiker':
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                wilder.sendImageAsSticker(from, imageBase64)
                .then(() => {
                    wilder.sendText(from, 'Aqui\ tienes tu Sticker')
                    console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`)
                })
            } else if (args[0] === 'nobg') {
                if (isMedia || isQuotedImage) {
                    try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/noBg.png'
		            // kamu dapat mengambil api key dari website remove.bg dan ubahnya difolder settings/api.json
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: apiNoBg, size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await wilder.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                    } catch(err) {
                    console.log(err)
	   	            await wilder.sendText(from, 'lo siento, el límite de uso de hoy ha alcanzado el máximo', id)
                    }
                }
            } else if (args.length === 1) {
                if (!isUrl(url)) { await wilder.reply(from, 'lo siento, el enlace que envió no es válido.', id) }
                wilder.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                    ? wilder.sendText(from, 'Lo sentimos, el enlace que enviaste no contiene una imagen.')
                    : wilder.sendText(from, 'Aqui\esta tu Sticker')).then(() => console.log(`Sticker Procesado en ${processTime(t, moment())} Segundos`))
            } else {
                await wilder.sendText(from, `¡Sin imagen! Usar ${prefix}sticker\n\n\nEnviar fotos con pie de foto\n${prefix}sticker <normal>\n${prefix}sticker nobg <sin fondo>\n\no enviar mensaje con\n${prefix}sticker <link_de_web_con_imagen>`, id)
            }
            break
        case 'stickergif':
        case 'stikergif':
            if (isMedia || isQuotedVideo) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    var mediaData = await decryptMedia(message, uaOverride)
                    wilder.sendText(from, '[...] En proceso⏳ espere ± 1 min.', id)
                    var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await wilder.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        .catch(() => {
                            wilder.sendText(from, 'Lo siento, el archivo es demasiado grande.', id)
                        })
                    })
                  } else {
                    wilder.sendText(from, `[❗] Envia un gif con *${prefix}stickergif* de maximo 10 sec!`, id)
                   }
                } else {
		    wilder.sendText(from, `[❗] Envia un gif con *${prefix}stickergif*`, id)
	        }
            break
        case 'meme':
            if ((isMedia || isQuotedImage) && args.length >= 2) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await meme.custom(getUrl, top, bottom)
                wilder.sendFile(from, ImageBase64, 'image.png', '', null, true)
                    .then(() => {
                        wilder.reply(from, 'Aqui ta!',id)
                    })
                    .catch(() => {
                        wilder.reply(from, 'Algo salio mal!')
                    })
            } else {
                await wilder.reply(from, `¡Sin imagen! Por favor envíe una imagen con. ${prefix}meme <texto_superior> | <texto_bajo>\nEjemplo: ${prefix}meme *Texto Superior*| *Texto Bajo*`, id)
            }
            break
        case 'quotemaker':
            const qmaker = body.trim().split('|')
            if (qmaker.length >= 3) {
                const quotes = qmaker[1]
                const author = qmaker[2]
                const theme = qmaker[3]
                wilder.reply(from, 'En proceso...', id)
                try {
                    const hasilqmaker = await images.quote(quotes, author, theme)
                    wilder.sendFileFromUrl(from, `${hasilqmaker}`, '', '', id)
                } catch {
                    wilder.reply('Bueno, el proceso falló, ¿es correcto todavía?', id)
                }
            } else {
                wilder.reply(from, `Uso ${prefix}quotemaker |Cita|Autor|Tema\n\nEjemplo: ${prefix}quotemaker |holi|soy yo xd|random\n\nuse random para el tema, ...`)
            }
            break
        case 'nulis':
            if (args.length == 0) return wilder.reply(from, `Haz que el bot escriba el texto que se envía como una imagen\nUso: ${prefix}nulis [texto]\n\nEjemplo: ${prefix}nulis I Love You So Much`, id)
            const nulisq = body.slice(7)
            const nulisp = await rugaapi.tulis(nulisq)
            await wilder.sendImage(from, `${nulisp}`, '', 'Toma :)', id)
            .catch(() => {
                wilder.reply(from, 'Algo falla!!', id)
            })
            break
        case 'daerah':
            const daerahq = await rugaapi.daerah()
            await wilder.reply(from, daerahq, id)
            .catch(() => {
                wilder.reply(from, 'Algo falla!', id)
            })
            break
        
        //Media
       /* case 'ytmp3':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return wilder.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return wilder.reply(from, 'Kirim perintah #ytmp3 [teks], contoh #ytmp3 blabla', id)
            const ngetis = body.slice(6)
            await axios.get(`https://api.zeks.xyz/api/ytmp3?url=${args[1]}&apikey=vinzapi:`).then(res => console.log(res.data))
            await limitAdd(serial)
            break

        case 'ytmp3':
           if (args.length == 0) return wilder.reply(from, `Para descargar canciones de youtube\nUsa: ${prefix}ytmp3 [link_yt]`, id)
            const linkmp3 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
			rugaapi.ytmp3(`https://youtu.be/${linkmp3}`)
           .then(async(res) => {
			if (res.error) return wilder.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`)
			await wilder.sendFileFromUrl(from, `${res.result.thumb}`, '', `Canción encontrada\n\nTitulo: ${res.result.title}\nDesc: ${res.result.desc}`, id)
			await wilder.sendFileFromUrl(from, `${res.result.url}`, '', '', id)
			.catch(() => {
				wilder.reply(from, `Esta URL ${args[0]} YA SE AH DESCARGADO ANTERIORMENTE ... LA URL SE REINICIARÁ DESPUÉS DE 60 MINUTOS`, id)
				})
			})
           break

        case 'ytmp4':
            if (args.length == 0) return wilder.reply(from, `Para descargar videos de youtube\nUSA: ${prefix}ytmp3 [link_yt]`, id)
            const linkmp4 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
			rugaapi.ytmp4(`https://youtu.be/${linkmp4}`)
            .then(async(res) => {
				if (res.error) return wilder.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`)
				await wilder.sendFileFromUrl(from, `${res.result.thumb}`, '', `Canción encontrada\n\nTitulo: ${res.result.title}\nDesc: ${res.result.desc}`, id)
				await wilder.sendFileFromUrl(from, `${res.result.url}`, '', '', id)
				.catch(() => {
					wilder.reply(from, `Esta URL ${args[0]} YA SE AH DESCARGADO ANTERIORMENTE ... LA URL SE REINICIARÁ DESPUÉS DE 60 MINUTOS`, id)
				})
			})
            break*/
            case 'ytmp3':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.wrogf())
					anu = await fetchJson(`https://ohto-ai.herokuapp.com/ytmus?URL=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.getVideo)
					wilder.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
					await limitAdd(sender)
					break

case 'ytmp4':
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `Title : ${anu.title}`
					thumb = await getBuffer(anu.thumb)
					wilder.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					wilder.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					await limitAdd(sender)
					break
		case 'fb':
		case 'facebook':
			if (args.length == 0) return wilder.reply(from, `Para descargar videos desde el enlace de Facebook\nUsa: ${prefix}fb [link_fb]`, id)
			rugaapi.fb(args[0])
			.then(async (res) => {
				const { link, linkhd, linksd } = res
				if (res.status == 'error') return wilder.sendFileFromUrl(from, link, '', 'Lo siento, no se pudo encontrar tu URL', id)
				await wilder.sendFileFromUrl(from, linkhd, '', 'Aqui esta el video', id)
				.catch(async () => {
					await wilder.sendFileFromUrl(from, linksd, '', 'Aqui esta el video', id)
					.catch(() => {
						wilder.reply(from, 'Lo siento, no se pudo encontrar tu URL', id)
					})
				})
			})
			break
			
		//Primbon Menu
		case 'artinama':
			if (args.length == 0) return wilder.reply(from, `Para saber el significado del nombre de alguien\nescribe  ${prefix}artinama [nombre]`, id)
            rugaapi.artinama(body.slice(10))
			.then(async(res) => {
				await wilder.reply(from, `Arti : ${res}`, id)
			})
			break
			
        // Random Kata
	case 'motivacion':
        fetch('https://raw.githubusercontent.com/Santy-Gz/Extenciones-Bot_S/main/motivacion.txt')
        .then(res => res.text())
        .then(body => {
            let splitmotivasi = body.split('\n')
            let randommotivasi = splitmotivasi[Math.floor(Math.random() * splitmotivasi.length)]
            wilder.reply(from, randommotivasi, id)
        })
        .catch(() => {
            wilder.reply(from, 'Algo fallo!!', id)
        })
        break
case 'howgay':
    if (args.length == 0) return wilder.reply(from, `Para averiguar qué tan gay es alguien usa *${prefix}howgay [Nombre]*\n\nEjemplo: ${prefix}howgay andres`, id)
        fetch('https://raw.githubusercontent.com/Santy-Gz/Extenciones-Bot_S/main/howgay.txt')
        .then(res => res.text())
        .then(body => {
            let splithowgay = body.split('\n')
            let randomhowgay = splithowgay[Math.floor(Math.random() * splithowgay.length)]
            wilder.reply(from, randomhowgay, id)
        })
        .catch(() => {
            wilder.reply(from, 'Algo falo!!', id)
        })
        break
    case 'hecho':
        fetch('https://raw.githubusercontent.com/Santy-Gz/Extenciones-Bot_S/main/hecho.txt')
        .then(res => res.text())
        .then(body => {
            let splitnix = body.split('\n')
            let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
            wilder.reply(from, randomnix, id)
        })
        .catch(() => {
            wilder.reply(from, 'Algo fallo!!', id)
        })
        break
    case 'palabrassabias':
        fetch('https://raw.githubusercontent.com/Santy-Gz/Extenciones-Bot_S/main/palabrassabias.txt')
        .then(res => res.text())
        .then(body => {
            let splitbijak = body.split('\n')
            let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
            wilder.reply(from, randombijak, id)
        })
        .catch(() => {
            wilder.reply(from, 'Algo fallo!!', id)
        })
        break
    case 'poemas':
        fetch('https://raw.githubusercontent.com/Santy-Gz/Extenciones-Bot_S/main/poemas.txt')
        .then(res => res.text())
        .then(body => {
            let splitpantun = body.split('\n')
            let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
            wilder.reply(from, randompantun.replace(/wilder-line/g,"\n"), id)
        })
        .catch(() => {
            wilder.reply(from, 'Algo fallo!!', id)
        })
        break
    case 'quote':
        const quotex = await rugaapi.quote()
        await wilder.reply(from, quotex, id)
        .catch(() => {
            wilder.reply(from, 'Algo fallo!', id)
        })
        break

        //Random Images
        case 'anime':
            if (args.length == 0) return wilder.reply(from, `Usar ${prefix}anime\nPorfavor escribe: ${prefix}anime [Consulta]\nEjemplo: ${prefix}anime random\n\nconsulta disponible:\nrandom, waifu, husbu, neko`, id)
            if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomnime = body.split('\n')
                    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                    wilder.sendFileFromUrl(from, randomnimex, '', 'No..', id)
                })
                .catch(() => {
                    wilder.reply(from, 'Algo fallo!!', id)
                })
            } else {
                wilder.reply(from, `Lo sentimos, la consulta no está disponible. Por favor escribe *${prefix}anime* para ver la lista de consultas`)
            }
            break
        case 'kpop':
            if (args.length == 0) return wilder.reply(from, `Usar ${prefix}kpop\nPor favor escribe: ${prefix}kpop [Consulta]\nEjemplo: ${prefix}kpop bts\n\nconsulta disponible:\nblackpink, exo, bts`, id)
            if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomkpop = body.split('\n')
                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                    wilder.sendFileFromUrl(from, randomkpopx, '', 'No..', id)
                })
                .catch(() => {
                    wilder.reply(from, 'Algo fallo!!', id)
                })
            } else {
                wilder.reply(from, `Lo sentimos, la consulta no está disponible.. Por favor escribe *${prefix}kpop* para ver la lista de consultas`)
            }
            break
        case 'memes':
            const randmeme = await meme.random()
            wilder.sendFileFromUrl(from, randmeme, '', '', id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        
       // Search Any
	case 'dewabatch':
		if (args.length == 0) return wilder.reply(from, `Para buscar lotes de anime, escriba *${prefix}dewabatch [Titulo]*\n\nEjemplo: ${prefix}dewabatch naruto`, id)
		rugaapi.dewabatch(args[0])
		.then(async(res) => {
		await wilder.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
		})
		break
        case 'images':
            if (args.length == 0) return wilder.reply(from, `Para buscar imágenes en pinterest\nUsar: ${prefix}images [Consulta]\nEjemplo: ${prefix}images Anonymous`, id)
            const cariwall = body.slice(8)
            const hasilwall = await images.fdci(cariwall)
            await wilder.sendFileFromUrl(from, hasilwall, '', '', id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        case 'sreddit':
            if (args.length == 0) return wilder.reply(from, `Para buscar imágenes en sub reddit\nUsar: ${prefix}sreddit [Consulta]\nEjemplo: ${prefix}sreddit Anonymous`, id)
            const carireddit = body.slice(9)
            const hasilreddit = await images.sreddit(carireddit)
            await wilder.sendFileFromUrl(from, hasilreddit, '', '', id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
	    break
        case 'stalkig':
            if (args.length == 0) return wilder.reply(from, `Estalkear la cuenta de Instagram de alguien\nUsar ${prefix}stalkig [username]\nEjemplo: ${prefix}stalkig shanty_g70`, id)
            const igstalk = await rugaapi.stalkig(args[0])
            const igstalkpict = await rugaapi.stalkigpict(args[0])
            await wilder.sendFileFromUrl(from, igstalkpict, '', igstalk, id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        case 'wiki':
            if (args.length == 0) return wilder.reply(from, `Para encontrar una palabra de wikipedia\nUsar: ${prefix}wiki [Pregunta]`, id)
            const wikip = body.slice(6)
            const wikis = await rugaapi.wiki(wikip)
            await wilder.reply(from, wikis, id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        case 'lyrics':
        case 'lirik':
            if (args.length == 0) return wilder.reply(from, `Para buscar la letra de una canción\bUsar: ${prefix}lirik [Titulo de la cancion]`, id)
            rugaapi.lirik(body.slice(7))
            .then(async (res) => {
                await wilder.reply(from, `Letra: ${body.slice(7)}\n\n${res}`, id)
            })
            break
        case 'play'://silahkan kalian custom sendiri jika ada yang ingin diubah
            if (args.length == 0) return wilder.reply(from, `Para buscar canciones de youtube\n\nUtilizar: ${prefix}play [Titulo de la cancion]`, id)
            axios.get(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
            .then(async (res) => {
                await wilder.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Cancion encontrada\n\nTitulo: ${res.data[0].title}\nDuracion: ${res.data[0].duration}segundos\nSubida: ${res.data[0].uploadDate}\nVistas: ${res.data[0].viewCount}\n\nEsta siendo enviada`, id)
				rugaapi.ytmp3(`https://youtu.be/${res.data[0].id}`)
				.then(async(res) => {
					if (res.status == 'error') return wilder.sendFileFromUrl(from, `${res.link}`, '', `${res.error}`)
					await wilder.sendFileFromUrl(from, `${res.thumb}`, '', `Canción encontrada\n\nTitulo ${res.title}`, id)
					await wilder.sendFileFromUrl(from, `${res.link}`, '', '', id)
					.catch(() => {
						wilder.reply(from, `ESTA URL ${args[0]} YA SE AH DESCARGADO ANTERIORMENTE ... LA URL SE REINICIARÁ DESPUÉS DE 60 MINUTOS`, id)
					})
				})
            })
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        case 'whatanime':
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                wilder.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		wilder.reply(from, 'Lo siento, no sé qué anime es este, asegúrese de que la imagen que se buscará no esté borrosa/cortada', id)
                	}
                    const { is_adult, title, title_chinese, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Titulo Japones* : ${title}\n➸ *Titulo chino* : ${title_chinese}\n➸ *Titulo Ingles* : ${title_english}\n`
                    teks += `➸ *+18?* : ${is_adult}\n`
                    teks += `➸ *Episodios* : ${episode.toString()}\n`
                    teks += `➸ *Semejanza* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    wilder.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
                        wilder.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    wilder.reply(from, 'Algo fallo!!', id)
                })
            } else {
				wilder.reply(from, `Lo siento, el formato es incorrecto\n\nEnvía una foto con un título ${prefix}whatanime\n\nO responde a las fotos con subtítulos ${prefix}whatanime`, id)
			}
            break
            
            case 'ss': //jika error silahkan buka file di folder settings/api.json dan ubah apiSS 'API-KEY' yang kalian dapat dari website https://apiflash.com/
            if (args.length == 0) return wilder.reply(from, ` Haz las capturas de pantalla de bot de la web\n\nUso: ${prefix}ss [url]\n\nejemplo: ${prefix}ss http://google.com`, id)
            const scrinshit = await meme.ss(args[0])
            await wilder.sendFile(from, scrinshit, 'ss.jpg', 'Aqui esta tu captura!!', id)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
        // Other Command
        case 'tts':
            if (args.length == 0) return wilder.reply(from, `Convierte texto en sonido\nUsar: ${prefix}tts <Codigo de idioma> <Texto>\nEjemplo: ${prefix}tts [id] [halo]\npara el código de idioma, verifique aquí:https://anotepad.com/note/read/5xqahdy8`)
            const ttsGB = require('node-gtts')(args[0])
            const dataText = body.slice(8)
                if (dataText === '') return wilder.reply(from, 'Cuál es el texto...? ', id)
                try {
                    ttsGB.save('./media/tts.mp3', dataText, function () {
                    wilder.sendPtt(from, './media/tts.mp3', id)
                    })
                } catch (err) {
                    wilder.reply(from, err, id)
                }
            break
        case 'shortlink':
            if (args.length == 0) return wilder.reply(from, `Usar ${prefix}shortlink <url>`, id)
            if (!isUrl(args[0])) return wilder.reply(from, 'Lo sentimos, la URL que envió no es válida..', id)
            const shortlink = await urlShortener(args[0])
            await wilder.sendText(from, shortlink)
            .catch(() => {
                wilder.reply(from, 'Algo fallo!!', id)
            })
            break
		case 'bapakfont':
			if (args.length == 0) return wilder.reply(from, `Convierte oraciones a alayyy\n\nUsar ${prefix}bapakfont [Frase]`, id)
			rugaapi.bapakfont(body.slice(11))
			.then(async(res) => {
				await wilder.reply(from, `${res}`, id)
			})
            break

            case 'adminlist':
            if (!isGroupMsg) return wilder.reply(from, '¡Este comando solo se puede usar en grupos!', id)
            let mimin = '*---LISTA ADMIN!!--*\n'
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` }
            await wilder.sendTextWithMentions(from, mimin)
            break

        // Group Commands (group admin only)
	    case 'add':
            if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
	        if (args.length !== 1) return wilder.reply(from, `Usar ${prefix}add\nUtilizar: ${prefix}add <numero>\nejemplo: ${prefix}add 57310xxx`, id)
                try {
                    await wilder.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    wilder.sendText(from, 'No se puede agregar', id)
                }
            break
        case 'kick':
            if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
            if (mentionedJidList.length === 0) return wilder.reply(from, 'Lo sentimos, el formato del mensaje es incorrecto.\nEtiqueta a una o más personas para excluirlas', id)
            if (mentionedJidList[0] === botNumber) return await wilder.reply(from, 'Lo sentimos, el formato del mensaje es incorrecto.\nNo puedes emitir una cuenta de bot por ti mismo', id)
            await wilder.sendTextWithMentions(from, `Solicitud recibida:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await wilder.sendText(from, 'Error, no puede eliminar un administrador del grupo.')
                await wilder.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'promote':
            if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
            if (mentionedJidList.length !== 1) return wilder.reply(from, 'Lo sentimos, solo puedo promover a 1 usuario', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await wilder.reply(from, 'Lo sentimos, el usuario ya es administrador.', id)
            if (mentionedJidList[0] === botNumber) return await wilder.reply(from, 'Lo sentimos, el formato del mensaje es incorrecto.\nNo se puede promover la propia cuenta de bot', id)
            await wilder.promoteParticipant(groupId, mentionedJidList[0])
            await wilder.sendTextWithMentions(from, `Solicitud aceptada, @${mentionedJidList[0].replace('@c.us', '')} Ahora es admin.`)
            break
        case 'demote':
            if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
            if (mentionedJidList.length !== 1) return wilder.reply(from, 'Lo sentimos, solo se puede rebajar 1 usuario', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await wilder.reply(from, 'Lo sentimos, el usuario aún no es administrador.', id)
            if (mentionedJidList[0] === botNumber) return await wilder.reply(from, 'Lo sentimos, el formato del mensaje es incorrecto.\nNo se puede hacer una rebajar la cuenta del bot', id)
            await wilder.demoteParticipant(groupId, mentionedJidList[0])
            await wilder.sendTextWithMentions(from, `Solicitud aceptada, eliminar posición @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'bye':
            if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            wilder.sendText(from, 'Hasta Pronto... ( ⇀‸↼‶ )').then(() => wilder.leaveGroup(groupId))
            break
        case 'del':
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
            if (!quotedMsg) return wilder.reply(from, `Lo sentimos, el formato del mensaje es incorrecto.\nResponder a los mensajes de bot con un título ${prefix}del`, id)
            if (!quotedMsgObj.fromMe) return wilder.reply(from, `Lo sentimos, el formato del mensaje es incorrecto, por favor.\nResponder a los mensajes de bot con un título ${prefix}del`, id)
            wilder.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
            case 'tagall':
                case 'everyone':
                    if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
                    if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
                    const groupMem = await wilder.getGroupMembers(groupId)
                    let hehex = '╔══✪〘 Miembros 〙✪══\n'
                    for (let i = 0; i < groupMem.length; i++) {
                        hehex += '╠➥'
                        hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehex += '╚═〘 *JSBOT* 〙'
                    await wilder.sendTextWithMentions(from, hehex)
                    break
			case 'reset':
			if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
			const reset = db.get('group').find({ id: groupId }).assign({ members: []}).write()
            if(reset){
				await wilder.sendText(from, "La clasificación se ha reiniciado.")
            }
			break
            case 'mutegrup':
                if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
                if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
                if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
                if (args.length !== 1) return wilder.reply(from, `Para cambiar la configuración del chat grupal para que solo el administrador pueda chatear\n\nUsar:\n${prefix}mutegrup on --activar\n${prefix}mutegrup off --apagar`, id)
                if (args[0] == 'on') {
                    wilder.setGroupToAdminsOnly(groupId, true).then(() => wilder.sendText(from, 'Se modificó correctamente para que solo el administrador pueda chatear.'))
                } else if (args[0] == 'off') {
                    wilder.setGroupToAdminsOnly(groupId, false).then(() => wilder.sendText(from, '¡Cambiado exitosamente para que todos los miembros puedan chatear!'))
                } else {
                    wilder.reply(from, `Para cambiar la configuración del chat grupal para que solo el administrador pueda chatear\n\nUsar:\n${prefix}mutegrup on --activar\n${prefix}mutegrup off --apagar`, id)
                }
                break
            case 'setprofile':
                if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
                if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
                if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
                if (isMedia && type == 'image' || isQuotedImage) {
                    const dataMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = dataMedia.mimetype
                    const mediaData = await decryptMedia(dataMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await wilder.setGroupIcon(groupId, imageBase64)
                } else if (args.length === 1) {
                    if (!isUrl(url)) { await wilder.reply(from, 'Lo sentimos, el enlace que envió no es válido.', id) }
                    wilder.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
                    ? wilder.reply(from, 'Lo sentimos, el enlace que enviaste no contiene una imagen.', id)
                    : wilder.reply(from, 'Se cambió correctamente el perfil del grupo.', id))
                } else {
                    wilder.reply(from, `Este comando se usa para cambiar el icono/perfil del chat grupal\n\n\nUsar:\n1. Envíe o responda una imagen con un titulo. ${prefix}setprofile\n\n2. Por favor escriba ${prefix}setprofile [link_Image]`)
                }
                break

          /*      case '!welcome':
            if (!isGroupMsg) return wilder.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return wilder.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./settings/welcome.json', JSON.stringify(welkom))
                wilder.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./settings/welcome.json', JSON.stringify(welkom))
                wilder.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                wilder.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
*/

              case 'welcome':
                if (!isGroupMsg) return await wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
                if (!isGroupAdmins) return await wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
         if (!isBotGroupAdmins) return await wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
             if (args.length !== 1) return await wilder.reply(from, `¡Haz que BOT salude a los miembros que se acaban de unir al grupo de chat!\n\nUsar:\n${prefix}welcome on --activar\n${prefix}welcome off --apagar`, id)
                if (args[0] == 'on') {
                   welcome.push(chatId)
                 fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
                      await wilder.reply(from, '¡El mensaje de bienvenida ya está activado!', id)
                   } else if (args[0] == 'off') {
                     let xporn = welcome.indexOf(chatId)
                      welcome.splice(xporn, 1)
                    fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
           await wilder.reply(from, 'El mensaje de bienvenida ahora está apagado', id)
                } else {
                        await wilder.reply(from, `¡Haz que BOT salude a los miembros que se acaban de unir al grupo de chat!\n\nUsar:\n${prefix}welcome on --activar\n${prefix}welcome off --apagar`, id)
                    }
                     break
                     /*

                 case 'welcome':
                    if (!isGroupMsg) return await wilder.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return await wilder.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return await wilder.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (args.length !== 1) return await wilder.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`, id)
                    if (args[0] == 'on') {
                        welcome.push(chatId)
                        fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
                        await wilder.reply(from, 'Welcome Message sekarang diaktifkan!', id)
                    } else if (args[0] == 'off') {
                        let xporn = welcome.indexOf(chatId)
                        welcome.splice(xporn, 1)
                        fs.writeFileSync('./settings/welcome.json', JSON.stringify(welcome))
                        await wilder.reply(from, 'Welcome Message sekarang dinonaktifkan', id)
                    } else {
                       await wilder.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`, id)
                    }
                    break*/


                case 'linkdelgrupo':
            if (!isBotGroupAdmins) return wilder.reply(from, 'Este comando solo se puede usar cuando el bot se convierte en administrador', id)
            if (isGroupMsg) {
                const inviteLink = await wilder.getGroupInviteLink(groupId);
                wilder.sendLinkWithAutoPreview(from, inviteLink, `\nLink Del Grupo *${name}*`)
            } else {
            	wilder.reply(from, '¡Este comando solo se puede usar en grupos!', id)
            }
            break
            case "revocarlink":
	if (!isBotGroupAdmins) return wilder.reply(from, 'Este comando solo se puede usar cuando el bot se convierte en administrador', id)
                    if (isBotGroupAdmins) {
                        wilder
                            .revokeGroupInviteLink(from)
                            .then((res) => {
                                wilder.reply(from, `Se revoco con exito el link del grupo usa *${prefix}linkdelgrupo* para obtener el último enlace de invitación grupal`, id);
                            })
                            .catch((err) => {
                                console.log(`[ERR] ${err}`);
                            });
                    }
                    break;
			
        //Owner Group
        case 'kickall': //mengeluarkan semua member
        if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
        let isOwner = chat.groupMetadata.owner == pengirim
        if (!isOwner) return wilder.reply(from, 'Lo sentimos, este comando solo puede ser utilizado por el propietario del grupo.', id)
        if (!isBotGroupAdmins) return wilder.reply(from, 'Error, agregue el bot como administrador de grupo para completar.', id)
            const allMem = await wilder.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {

                } else {
                    await wilder.removeParticipant(groupId, allMem[i].id)
                }
            }
            wilder.reply(from, 'Éxito al patear a todos los miembros', id)
        break

       //Owner Bot
       case 'ban':
        if (!isOwnerBot) return wilder.reply(from, '¡Este pedido es solo para el propietario del bot!', id)
        if (args.length == 0) return wilder.reply(from, `Prohibir que alguien use comandos\n\nCómo escribir: \n${prefix}ban add 628xx --activar\n${prefix}ban del 628xx --untuk apagar\n\ncómo agrupar rápidamente muchos tipos de ban:\n${prefix}ban @tag @tag @tag`, id)
        if (args[0] == 'add') {
            banned.push(args[1]+'@c.us')
            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
            wilder.reply(from, 'Objetivo prohibido con éxito!')
        } else
        if (args[0] == 'del') {
            let xnxx = banned.indexOf(args[1]+'@c.us')
            banned.splice(xnxx,1)
            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
            wilder.reply(from, '¡Objetivo no prohibido con éxito!')
        } else {
         for (let i = 0; i < mentionedJidList.length; i++) {
            banned.push(mentionedJidList[i])
            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
            wilder.reply(from, 'Objetivo prohibido con éxito!', id)
            }
        }
        break
    case 'bc': //untuk broadcast atau promosi
        if (!isOwnerBot) return wilder.reply(from, '¡Este pedido es solo para el propietario del bot!', id)
        if (args.length == 0) return wilder.reply(from, `Para transmitir a todos los chats, escribe:\n${prefix}bc [contenido del chat]`)
        let msg = body.slice(4)
        const chatz = await wilder.getAllChatIds()
        for (let idk of chatz) {
            var cvk = await wilder.getChatById(idk)
            if (!cvk.isReadOnly) wilder.sendText(idk, `〘 *JSBOT* 〙\n\n${msg}`)
            if (cvk.isReadOnly) wilder.sendText(idk, `〘 *JSBOT* 〙\n\n${msg}`)
        }
        wilder.reply(from, '¡Éxito de la transmisión!', id)
        break
    case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
        if (!isOwnerBot) return wilder.reply(from, 'Este pedido es solo para el propietario del bot.', id)
        const allChatz = await wilder.getAllChatIds()
        const allGroupz = await wilder.getAllGroups()
        for (let gclist of allGroupz) {
            await wilder.sendText(gclist.contact.id, `Lo siento, el bot está limpiando, el chat total está activo: ${allChatz.length}`)
            await wilder.leaveGroup(gclist.contact.id)
            await wilder.deleteChat(gclist.contact.id)
            return await wilder.reply(from, '¡El éxito al dejar todos los grupos!', id) 
        }
       
        break
    case 'clearall': //menghapus seluruh pesan diakun bot
        if (!isOwnerBot) return wilder.reply(from, 'Este pedido es solo para el propietario del bot.', id)
        const allChatx = await wilder.getAllChats()
        for (let dchat of allChatx) {
            await wilder.deleteChat(dchat.id)
             return await wilder.reply(from, '¡Borrar todo el chat!', id)
        } 

        break

    case 'bloqueados':
        let hih = `╒━━━ [ *ʙʟᴏǫᴜᴇᴀᴅᴏs* ] ━━━╕\n\nTotal : ${blockNumber.length}\n`
         for (let i of blockNumber) {
        hih += `➸ @${i.replace(/@c.us/g,'')}\n`
        }
        wilder.sendTextWithMentions(from, hih, id)
        break

        case 'chats':
            const sesPic = await wilder.getSnapshot()
            wilder.sendFile(from, sesPic, 'session.png', 'Ten...', id)
            break

        case 'simisimi':
			if (!isGroupMsg) return wilder.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
			wilder.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			break
		case 'simi':
			if (!isGroupMsg) return wilder.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return wilder.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
			if (args.length !== 1) return wilder.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			if (args[0] == 'on') {
				simi.push(chatId)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
                wilder.reply(from, 'mengaktifkan bot simi-simi!', id)
			} else if (args[0] == 'off') {
				let inxx = simi.indexOf(chatId)
				simi.splice(inxx, 1)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
				wilder.reply(from, 'menonaktifkan bot simi-simi!', id)
			} else {
				wilder.reply(from, `Untuk mengaktifkan simi-simi pada Group Chat\n\nPenggunaan\n${prefix}simi on --mengaktifkan\n${prefix}simi off --nonaktifkan\n`, id)
			}
			break
            case 'antilink':
                    if (!isGroupMsg) return wilder.reply(from, 'Lo sentimos, ¡este comando solo se puede usar dentro de grupos!', id)
                    if (!isGroupAdmins) return wilder.reply(from, 'Falló, este comando solo puede ser utilizado por administradores de grupo.', id)
                    if (!isBotGroupAdmins) return wilder.reply(from, 'El bot no esta de admin en este grupo para realizar esta funcion  porfavor colocarme de adeministrador', id)
                    if (args[0] == 'on') {
                        var cek = antilink.includes(chatId);
                        if(cek){
                            return wilder.reply(from, '*[DETECTOR DE VÍNCULOS DE GRUPO]* /nya esta activo en este grupo', id) //if number already exists on database
                        } else {
                            antilink.push(chatId)
                            fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                            wilder.reply(from, '*[DETECTOR DE VÍNCULOS DE GRUPO]* ha sido activado \n¡Cada miembro del grupo que envíe un mensaje que contenga un enlace de grupo será expulsado por el bot!', id)
                        }
                    } else if (args[0] == 'off') {
                        var cek = antilink.includes(chatId);
                        if(!cek){
                            return wilder.reply(from, '*[DETECTOR DE VÍNCULOS DE GRUPO]* ya inactivo en este grupo', id) //if number already exists on database
                        } else {
                            let nixx = antilink.indexOf(chatId)
                            antilink.splice(nixx, 1)
                            fs.writeFileSync('./lib/helper/antilink.json', JSON.stringify(antilink))
                            wilder.reply(from, '*[DETECTOR DE VÍNCULOS DE GRUPO]* ha sido deshabilitado\n', id)
                        }
                    } else {
                        wilder.reply(from, `seleccionar on / off\n\n*[DETECTOR DE VÍNCULOS DE GRUPO]*\n¡Cada miembro del grupo que envíe un mensaje que contenga un enlace de grupo será expulsado por el bot!`, id)
                    }
                    break
        
                    case 'antisticker':
                    case 'antistiker':
             if (!isGroupMsg) return wilder.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
             if (!isGroupAdmins) return wilder.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
             if (!isBotGroupAdmins) return wilder.reply(from, 'Wahai admin, jadikan saya sebagai admin grup dahulu :)', id)
             if (args[0] == 'on') {
             var cek = antisticker.includes(chatId);
             if(cek){
             return wilder.reply(from, '*Anti Spam Sticker Detector* sudah aktif di grup ini', id) //if number already exists on database
             } else {
             antisticker.push(chatId)
             fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(antisticker))
             wilder.reply(from, '*[Anti Sticker SPAM]* telah di aktifkan\nSetiap member grup yang spam sticker lebih dari 7 akan di kick oleh bot!', id)
                                    }
             } else if (args[0] == 'off') {
             var cek = antilink.includes(chatId);
             if(cek){
             return wilder.reply(from, '*Anti Spam Sticker Detector* sudah non-aktif di grup ini', id) //if number already exists on database
             } else {
             let nixx = antisticker.indexOf(chatId)
             antisticker.splice(nixx, 1)
              fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(antisticker))
             wilder.reply(from, '*[Anti Sticker SPAM]* telah di nonaktifkan\n', id)
             }
             } else {
             wilder.reply(from, `pilih on / off\n\n*[Anti Sticker SPAM]*\nSetiap member grup yang spam sticker akan di kick oleh bot!`, id)
            }
             break



//------------------------------------------------------------------------menu------------------------------------------------------------------------------//
            case 'menucursos':
                wilder.sendText(from,menuId.menucursos(),id)
            break
//------------------------------------------------------------------------menu-----------------------------------------------------------------------------//


//------------------------------------------------------------------------Curso 1--------------------------------------------------------------------------//
            case '1':
                wilder.sendFile(from, menuId.curso1(),'',menuId.texto1(), id)
                break
            case 'link1':
                wilder.sendText(from, menuId.link1(),id)
                break
//-------------------------------------------------------------------------Curso 1--------------------------------------------------------------------------//
    

//-------------------------------------------------------------------------Curso 2--------------------------------------------------------------------------//
            case '2':
                wilder.sendFile(from, menuId.curso2(),'',menuId.texto2(),id)
                break
            case 'link2':
                wilder.sendText(from, menuId.link2(),id)
                break
//-------------------------------------------------------------------------Curso 2--------------------------------------------------------------------------// 
    

//-------------------------------------------------------------------------Curso 3--------------------------------------------------------------------------//
case '3':
    wilder.sendFile(from, menuId.curso3(),'',menuId.texto3(),id)
    break
case 'link3':
    wilder.sendText(from, menuId.link3(),id)
    break
//-------------------------------------------------------------------------Curso 3--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 4--------------------------------------------------------------------------//
case '4':
    wilder.sendFile(from, menuId.curso4(),'',menuId.texto4(),id)
    break
case 'link4':
    wilder.sendText(from, menuId.link4(),id)
    break
//-------------------------------------------------------------------------Curso 4--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 5--------------------------------------------------------------------------//
case '5':
    wilder.sendFile(from, menuId.curso5(),'',menuId.texto5(),id)
    break
case 'link5':
    wilder.sendText(from, menuId.link5(),id)
    break
//-------------------------------------------------------------------------Curso 5--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 6--------------------------------------------------------------------------//
case '6':
    wilder.sendFile(from, menuId.curso6(),'',menuId.texto6(),id)
    break
case 'link6':
    wilder.sendText(from, menuId.link6(),id)
    break
//-------------------------------------------------------------------------Curso 6--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 7--------------------------------------------------------------------------//
case '7':
    wilder.sendFile(from, menuId.curso7(),'',menuId.texto7(),id)
    break
case 'link7':
    wilder.sendText(from, menuId.link7(),id)
    break
//-------------------------------------------------------------------------Curso 7--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 8--------------------------------------------------------------------------//
case '8':
    wilder.sendFile(from, menuId.curso8(),'',menuId.texto8(),id)
    break
case 'link8':
    wilder.sendText(from, menuId.link8(),id)
    break
//-------------------------------------------------------------------------Curso 8--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 9--------------------------------------------------------------------------//
case '9':
    wilder.sendFile(from, menuId.curso9(),'',menuId.texto9(),id)
    break
case 'link9':
    wilder.sendText(from, menuId.link9(),id)
    break
//-------------------------------------------------------------------------Curso 9--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 10--------------------------------------------------------------------------//
case '10':
    wilder.sendFile(from, menuId.curso10(),'',menuId.texto10(),id)
    break
case 'link10':
    wilder.sendText(from, menuId.link10(),id)
    break
//-------------------------------------------------------------------------Curso 10--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 11--------------------------------------------------------------------------//
case '11':
    wilder.sendFile(from, menuId.curso11(),'',menuId.texto11(),id)
    break
case 'link11':
    wilder.sendText(from, menuId.link11(),id)
    break
//-------------------------------------------------------------------------Curso 11--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 12--------------------------------------------------------------------------//
case '12':
    wilder.sendFile(from, menuId.curso12(),'',menuId.texto12(),id)
    break
case 'link2':
    wilder.sendText(from, menuId.link12(),id)
    break
//-------------------------------------------------------------------------Curso 12--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 13--------------------------------------------------------------------------//
case '13':
    wilder.sendFile(from, menuId.curso13(),'',menuId.texto13(),id)
    break
case 'link13':
    wilder.sendText(from, menuId.link13(),id)
    break
//-------------------------------------------------------------------------Curso 13--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 14--------------------------------------------------------------------------//
case '14':
    wilder.sendFile(from, menuId.curso14(),'',menuId.texto14(),id)
    break
case 'link14':
    wilder.sendText(from, menuId.link14,id)
    break
//-------------------------------------------------------------------------Curso 14--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 15--------------------------------------------------------------------------//
case '15':
    wilder.sendFile(from, menuId.curso15(),'',menuId.texto15(),id)
    break
case 'link15':
    wilder.sendText(from, menuId.link15(),id)
    break
//-------------------------------------------------------------------------Curso 15--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 16--------------------------------------------------------------------------//
case '16':
    wilder.sendFile(from, menuId.curso16(),'',menuId.texto16(),id)
    break
case 'link16':
    wilder.sendText(from, menuId.link16(),id)
    break
//-------------------------------------------------------------------------Curso 16--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 17--------------------------------------------------------------------------//
case '17':
    wilder.sendFile(from, menuId.curso17(),'',menuId.texto17(),id)
    break
case 'link17':
    wilder.sendText(from, menuId.link17(),id)
    break
//-------------------------------------------------------------------------Curso 17--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 18--------------------------------------------------------------------------//
case '18':
    wilder.sendFile(from, menuId.curso18(),'',menuId.texto18(),id)
    break
case 'link18':
    wilder.sendText(from, menuId.link18(),id)
    break
//-------------------------------------------------------------------------Curso 18--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 19--------------------------------------------------------------------------//
case '19':
    wilder.sendFile(from, menuId.curso19(),'',menuId.texto19(),id)
    break
case 'link19':
    wilder.sendText(from, menuId.link19(),id)
    break
//-------------------------------------------------------------------------Curso 19--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 20--------------------------------------------------------------------------//
case '20':
    wilder.sendFile(from, menuId.curso20(),'',menuId.texto20(),id)
    break
case 'link20':
    wilder.sendText(from, menuId.link20(),id)
    break
//-------------------------------------------------------------------------Curso 20--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 21--------------------------------------------------------------------------//
case '21':
    wilder.sendFile(from, menuId.curso21(),'',menuId.texto21(),id)
    break
case 'link21':
    wilder.sendText(from, menuId.link21(),id)
    break
//-------------------------------------------------------------------------Curso 21--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 22--------------------------------------------------------------------------//
case '22':
    wilder.sendFile(from, menuId.curso22(),'',menuId.texto22(),id)
    break
case 'link22':
    wilder.sendText(from, menuId.link22(),id)
    break
//-------------------------------------------------------------------------Curso 22--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 23--------------------------------------------------------------------------//
case '23':
    wilder.sendFile(from, menuId.curso23(),'',menuId.texto23(),id)
    break
case 'link23':
    wilder.sendText(from, menuId.link23(),id)
    break
//-------------------------------------------------------------------------Curso 23--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 24--------------------------------------------------------------------------//
case '24':
    wilder.sendFile(from, menuId.curso24(),'',menuId.texto24(),id)
    break
case 'link24':
    wilder.sendText(from, menuId.link24(),id)
    break
//-------------------------------------------------------------------------Curso 24--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 25--------------------------------------------------------------------------//
case '23':
    wilder.sendFile(from, menuId.curso25(),'',menuId.texto25(),id)
    break
case 'link23':
    wilder.sendText(from, menuId.link25(),id)
    break
//-------------------------------------------------------------------------Curso 25--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 26--------------------------------------------------------------------------//
case '26':
    wilder.sendFile(from, menuId.curso26(),'',menuId.texto26(),id)
    break
case 'link26':
    wilder.sendText(from, menuId.link26(),id)
    break
//-------------------------------------------------------------------------Curso 26--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 27--------------------------------------------------------------------------//
case '27':
    wilder.sendFile(from, menuId.curso27(),'',menuId.texto27(),id)
    break
case 'link27':
    wilder.sendText(from, menuId.link27(),id)
    break
//-------------------------------------------------------------------------Curso 27--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 28--------------------------------------------------------------------------//
case '28':
    wilder.sendFile(from, menuId.curso28(),'',menuId.texto28(),id)
    break
case 'link28':
    wilder.sendText(from, menuId.link28(),id)
    break
//-------------------------------------------------------------------------Curso 28--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 29--------------------------------------------------------------------------//
case '29':
    wilder.sendFile(from, menuId.curso29(),'',menuId.texto29(),id)
    break
case 'link29':
    wilder.sendText(from, menuId.link29(),id)
    break
//-------------------------------------------------------------------------Curso 29--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 30--------------------------------------------------------------------------//
case '30':
    wilder.sendFile(from, menuId.curso30(),'',menuId.texto30(),id)
    break
case 'link30':
    wilder.sendText(from, menuId.link30(),id)
    break
//-------------------------------------------------------------------------Curso 30--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 31--------------------------------------------------------------------------//
case '31':
    wilder.sendFile(from, menuId.curso31(),'',menuId.texto31(),id)
    break
case 'link31':
    wilder.sendText(from, menuId.link31(),id)
    break
//-------------------------------------------------------------------------Curso 31--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 32--------------------------------------------------------------------------//
case '32':
    wilder.sendFile(from, menuId.curso32(),'',menuId.texto32(),id)
    break
case 'link32':
    wilder.sendText(from, menuId.link32(),id)
    break
//-------------------------------------------------------------------------Curso 32--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 33--------------------------------------------------------------------------//
case '33':
    wilder.sendFile(from, menuId.curso33(),'',menuId.texto33(),id)
    break
case 'link33':
    wilder.sendText(from, menuId.link33(),id)
    break
//-------------------------------------------------------------------------Curso 33--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 34--------------------------------------------------------------------------//
case '34':
    wilder.sendFile(from, menuId.curso34(),'',menuId.texto34(),id)
    break
case 'link34':
    wilder.sendText(from, menuId.link34(),id)
    break
//-------------------------------------------------------------------------Curso 34--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 35--------------------------------------------------------------------------//
case '35':
    wilder.sendFile(from, menuId.curso35(),'',menuId.texto35(),id)
    break
case 'link35':
    wilder.sendText(from, menuId.link35(),id)
    break
//-------------------------------------------------------------------------Curso 35--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 36--------------------------------------------------------------------------//
case '36':
    wilder.sendFile(from, menuId.curso36(),'',menuId.texto36(),id)
    break
case 'link36':
    wilder.sendText(from, menuId.link36(),id)
    break
//-------------------------------------------------------------------------Curso 36--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 37--------------------------------------------------------------------------//
case '37':
    wilder.sendFile(from, menuId.curso37(),'',menuId.texto37(),id)
    break
case 'link37':
    wilder.sendText(from, menuId.link37(),id)
    break
//-------------------------------------------------------------------------Curso 37--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 38--------------------------------------------------------------------------//
case '38':
    wilder.sendFile(from, menuId.curso38(),'',menuId.texto38(),id)
    break
case 'link38':
    wilder.sendText(from, menuId.link38(),id)
    break
//-------------------------------------------------------------------------Curso 38--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 39--------------------------------------------------------------------------//
case '39':
    wilder.sendFile(from, menuId.curso39(),'',menuId.texto39(),id)
    break
case 'link39':
    wilder.sendText(from, menuId.link39(),id)
    break
//-------------------------------------------------------------------------Curso 39--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 40--------------------------------------------------------------------------//
case '40':
    wilder.sendFile(from, menuId.curso40(),'',menuId.texto40(),id)
    break
case 'link40':
    wilder.sendText(from, menuId.link40(),id)
    break
//-------------------------------------------------------------------------Curso 40--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 41--------------------------------------------------------------------------//
case '41':
    wilder.sendFile(from, menuId.curso41(),'',menuId.texto41(),id)
    break
case 'link41':
    wilder.sendText(from, menuId.link41(),id)
    break
//-------------------------------------------------------------------------Curso 41--------------------------------------------------------------------------// 


//-------------------------------------------------------------------------Curso 42--------------------------------------------------------------------------//
case '42':
    wilder.sendFile(from, menuId.curso42(),'',menuId.texto42(),id)
    break
case 'link42':
    wilder.sendText(from, menuId.link42(),id)
    break
//-------------------------------------------------------------------------Curso 42--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 43--------------------------------------------------------------------------//
case '43':
    wilder.sendFile(from, menuId.curso43(),'',menuId.texto43(),id)
    break
case 'link43':
    wilder.sendText(from, menuId.link43(),id)
    break
//-------------------------------------------------------------------------Curso 43--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 44--------------------------------------------------------------------------//
case '44':
    wilder.sendFile(from, menuId.curso44(),'',menuId.texto44(),id)
    break
case 'link44':
    wilder.sendText(from, menuId.link44(),id)
    break
//-------------------------------------------------------------------------Curso 44--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 45--------------------------------------------------------------------------//
case '45':
    wilder.sendFile(from, menuId.curso45(),'',menuId.texto45(),id)
    break
case 'link45':
    wilder.sendText(from, menuId.link45(),id)
    break

//-------------------------------------------------------------------------Curso 45--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 46--------------------------------------------------------------------------//
case '46':
    wilder.sendFile(from, menuId.curso46(),'',menuId.texto46(),id)
    break
case 'link46':
    wilder.sendText(from, menuId.link46(),id)
    break
//-------------------------------------------------------------------------Curso 46--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 47--------------------------------------------------------------------------//
case '47':
    wilder.sendFile(from, menuId.curso47(),'',menuId.texto47(),id)
    break
case 'link47':
    wilder.sendText(from, menuId.link47(),id)
    break
//-------------------------------------------------------------------------Curso 47--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 48--------------------------------------------------------------------------//
case '48':
    wilder.sendFile(from, menuId.curso48(),'',menuId.texto48(),id)
    break
case 'link48':
    wilder.sendText(from, menuId.link48(),id)
    break
//-------------------------------------------------------------------------Curso 48--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 49--------------------------------------------------------------------------//
case '49':
    wilder.sendFile(from, menuId.curso49(),'',menuId.texto49(),id)
    break
case 'link49':
    wilder.sendText(from, menuId.link49(),id)
    break
//-------------------------------------------------------------------------Curso 49--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 50--------------------------------------------------------------------------//
case '50':
    wilder.sendFile(from, menuId.curso50(),'',menuId.texto50(),id)
    break
case 'link50':
    wilder.sendText(from, menuId.link50(),id)
    break
//-------------------------------------------------------------------------Curso 50--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 51--------------------------------------------------------------------------//
case '51':
    wilder.sendFile(from, menuId.curso51(),'',menuId.texto51(),id)
    break
case 'link51':
    wilder.sendText(from, menuId.link51(),id)
    break
//-------------------------------------------------------------------------Curso 51--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 52--------------------------------------------------------------------------//
case '52':
    wilder.sendFile(from, menuId.curso52(),'',menuId.texto52(),id)
    break
case 'link52':
    wilder.sendText(from, menuId.link52(),id)
    break
//-------------------------------------------------------------------------Curso 52--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 53--------------------------------------------------------------------------//
case '53':
    wilder.sendFile(from, menuId.curso53(),'',menuId.texto53(),id)
    break
case 'link53':
    wilder.sendText(from, menuId.link53(),id)
    break
//-------------------------------------------------------------------------Curso 53--------------------------------------------------------------------------//


//-------------------------------------------------------------------------Curso 54--------------------------------------------------------------------------//
case '54':
    wilder.sendFile(from, menuId.curso54(),'',menuId.texto54(),id)
    break
case 'link54':
    wilder.sendText(from, menuId.link54(),id)
    break
//-------------------------------------------------------------------------Curso 54--------------------------------------------------------------------------//

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            default:
        break
        
    }
    
        		
		// Kata kasar function
		if(!isCmd && isGroupMsg && isNgegas) {
            const find = db.get('group').find({ id: groupId }).value()
            if(find && find.id === groupId){
                const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if(cekuser && isIn !== false){
                    if(isKasar){
                        const denda = db.get('group').filter({id: groupId}).map('members['+isIn+']').find({ id: pengirim }).update('denda', n => n + 5000).write()
                        if(denda){
                            await wilder.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp"+formatin(denda.denda), id)
                        }
                    }
                } else {
                    const cekMember = db.get('group').filter({id: groupId}).map('members').value()[0]
                    if(cekMember.length === 0){
                        if(isKasar){
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 5000}]).write()
                        } else {
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 0}]).write()
                        }
                    } else {
                        const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                        if(isKasar){
                            cekuser.push({id: pengirim, denda: 5000})
                            await wilder.reply(from, "Jangan badword bodoh\nDenda +5.000", id)
                        } else {
                            cekuser.push({id: pengirim, denda: 0})
                        }
                        db.get('group').find({ id: groupId }).set('members', cekuser).write()
                    }
                }
            } else {
                if(isKasar){
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 5000}] }).write()
                    await wilder.reply(from, "Jangan badword bodoh\nDenda +5.000\nTotal : Rp5.000", id)
                } else {
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 0}] }).write()
                }
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
