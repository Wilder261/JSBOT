const { create, Client } = require('@open-wa/wa-automate')
const figlet = require('figlet')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')


const start = (wilder = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('JSBOT', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('WILDER', 'yellow'))
    console.log(color('[~>>]'), color('BOT INICIADO!', 'green'))

    // Mempertahankan sesi agar tetap nyala
    wilder.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') wilder.forceRefocus()
    })

    // ketika bot diinvite ke dalam group
    wilder.onAddedToGroup(async (chat) => {
	const groups = await wilder.getAllGroups()
	// kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json
	if (groups.length > groupLimit) {
	await wilder.sendText(chat.id, `Lo siento, La cantidad de grupos es maxima.\n Total de Grupos: ${groupLimit}`).then(() => {
          wilder.leaveGroup(chat.id)
          wilder.deleteChat(chat.id)
	  }) 
	} else {
	// kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
	    if (chat.groupMetadata.participants.length < memberLimit) {
	    await wilder.sendText(chat.id, `Lo siento, *JSBOT* saldra del grupo que no supere los ${memberLimit} miembros`).then(() => {
         wilder.leaveGroup(chat.id)
         wilder.deleteChat(chat.id)
	    })
	    } else {
        await wilder.simulateTyping(chat.id, true).then(async () => {
          await wilder.sendText(chat.id, `Hola Soy *JSBOT* y estoy para ayudarte en lo que pueda. Para ver mis opciones escribe ${prefix}menu`)
        })
	    }
	}
    })

    // ketika seseorang masuk/keluar dari group
   // wilder.onGlobalParicipantsChanged(async (event) => {
     //   const host = await wilder.getHostNumber() + '@c.us'
//		const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
//		const isWelcome = welcome.includes(event.chat)
//		let profile = await wilder.getProfilePicFromServer(event.who)
//		if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
//        // kondisi ketika seseorang diinvite/join group lewat link
//        if (event.action === 'add' && event.who !== host && isWelcome) {
//			await wilder.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
  //          await wilder.sendTextWithMentions(event.chat, `Hola, Bienvenid@ a el grupo  @${event.who.replace('@c.us', '')} \n\n Disfruta tu estadia✨`)
//        }
//        // kondisi ketika seseorang dikick/keluar dari group
//        if (event.action === 'remove' && event.who !== host) {
//			await wilder.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
 //           await wilder.sendTextWithMentions(event.chat, `Adios :) @${event.who.replace('@c.us', '')}, Los boy a extrañar✨`)
//        }
//    }) 

    // ketika seseorang masuk/keluar dari group
     wilder.onGlobalParicipantsChanged(async (event) => {
        const host = await wilder.getHostNumber() + '@c.us'
	/*	const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
		const isWelcome = welcome.includes(event.chat) */
		
        // kondisi ketika seseorang diinvite/join group lewat link
        if (event.action === 'add' && event.who !== host) {
        let profile = await wilder.getProfilePicFromServer(event.who)
        let texto = await wilder.sendTextWithMentions(event.chat, `Hola, Bienvenid@ a el grupo  @${event.who.replace('@c.us', '')} \n\n Disfruta tu estadia✨`)
		if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
        const capt = `Hola, Bienvenid@ al grupo @${event.who.replace('@c.us', '')} \n\nQue te la pases bien con nosotros✨`
        // await wilder.sendFileFromUrl(event.chat, profile, 'profile.jpg', capt)
        await wilder.sendFile(event.chat.id, profile, 'profile.jpg','',texto) 
      //  await wilder.sendFileFromUrl(event.chat, profile, 'profile.jpg',)
    
        }
       //kondisi ketika seseorang dikick/keluar dari group
        if (event.action === 'remove' && event.who !== host) {
            let profile = await wilder.getProfilePicFromServer(event.who)
		    if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
			await wilder.sendFileFromUrl(event.chat, profile, 'profile.jpg'),'',
            await wilder.sendTextWithMentions(event.chat, `Adios @${event.who.replace('@c.us', '')},Te echaremos de menos (naaaaa no te estrañaremos)✨`) 
        } 
    })

    wilder.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await wilder.sendText(callData.peerJid, 'Lo siento, no puedo recibir llamadas.')
        .then(async () => {
            // bot akan memblock nomor itu
            await wilder.contactBlock(callData.peerJid)
        })
    })

    // ketika seseorang mengirim pesan
    wilder.onMessage(async (message) => {
        wilder.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[WILDER]', color(`Alcance de mensaje cargado ${msg}, cortando la caché de mensajes ...`, 'yellow'))
                    wilder.cutMsgCache()
                }
            })
        HandleMsg(wilder, message)    
    
    })
	
    // Message log for analytic
    wilder.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}

//create session
create(options(true, start))
    .then((wilder) => start(wilder))
    .catch((err) => new Error(err))
