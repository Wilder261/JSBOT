const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

exports.textMenu = (pushname) => {
    return `
Hola, ${pushname}! 👋️
Estas son algunas de las funciones de este bot!✨

╒━━━━━━[ *${prefix}creacion* ]━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}descargas*]━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}buscar*   ]━━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}texto*  ]━━━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}imagenes* ]━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}otros*  ]━━━━━━━|
 |━━━━━━━━━━━━━━━━━|
 |━━━━━━[ *${prefix}jsbot*  ]━━━━━━━|
 |━━━━━━━━━━━━━━━━━|
╘━━━━━[ *${prefix}creador*   ]━━━━━━|
 `
}

exports.textMenu1 = (pushname) => {
    return `
Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion *CREACION*!✨

╒━━━━━[ *Creacion* ]━━━━━━|
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - - 😎 - - - [ *${prefix}sticker* ]  - - 😎 - - - - - - |
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -| 
 |- - - - - 😜 - - - [ *${prefix}stickergif* ]- - 😜 - - - - -|
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - - 👌 - - - [ *${prefix}stimg* ] - - - - - 👌 - - - - -|
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 💕 - - - - [ *${prefix}meme* ] - - - 💕 - - - - - - |
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 👀 - - - - [ *${prefix}quotemaker* ] - - 👀 ---|
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 🐱‍ - - - - [ *${prefix}nulis* ] - - 🐱‍ - - - - - - - - |
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
╘━━━━━[ *Creacion* ]━━━━━━| `
}
exports.textMenu2 = (pushname) => {
    return `
Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion *DESCARGAS*!✨

*FUERA DE SERVICIO*
`
}
/*━ [ *Descargas* ] ━|
|-[ *${prefix}ytmp3*
|-[ *${prefix}ytmp4*
|-[ *${prefix}facebook*
╘━ [ *Descargas* ] ━|*/
exports.textMenu3 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion *SIGNIFICADO DE NOMBRES*!✨

*FUERA DE SERVICIO*

`}
/*╒━[Significado d nombre]━|
|━[ *${prefix}artinama*
╘━[Significado d nombre] ━|*/

exports.textMenu4 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
    Estas son algunas de las funciones de la seccion *BUSCAR*!✨
    
╒━━━━━━[ *Buscar* ]━━━━━━|
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - ❤ - - - - [ *${prefix}dewabatch* ] - - - ❤ - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 🎁 - - - - [ *${prefix}images* ] - - - - 🎁 - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - ✔ -  - - - [ *${prefix}sreddit* ] - - - - ✔ - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 🙌 - - - - [ *${prefix}stalkig* ] - - - - 🙌 - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 😁 - - - - [ *${prefix}wiki* ] - - - - - 😁 -  - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 💖 - - - - [ *${prefix}lirik* ] - - - - 💖 - - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - ☺ - - - - [ *${prefix}play* ] - - - - ☺ - - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 😫 - - - - [ *${prefix}whatanime* ] - - - - 😫 - - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 🤐 - - - - [ *${prefix}ss* ] - - - - 🤐 - - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
 |- - - - 😂 - - - - [ *${prefix}memes* ] - - - - 😂 - - - - - ]
 |- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -|
╘━━━━━━[ *Buscar* ]━━━━━━|`
}
exports.textMenu5 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
    Estas son algunas de las funciones de la seccion *TEXTOALEATORIO*!✨

╒━ [ Texto Aleatorio ] ━|
|-[ *${prefix}motivacion*
|-[ *${prefix}howgay*
|-[ *${prefix}hecho*
|-[ *${prefix}poemas*
|-[ *${prefix}palabrassabias*
|-[ *${prefix}quote*
╘━ [ Texto Aleatorio ] ━|`}

exports.textMenu6 = (pushname) => {
    return `
Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion  *IMAGENESALEATORIO*!✨

╒━ [Imagenes AleatorIO ] ━|
|-[ *${prefix}anime*
|-[ *${prefix}memes*
╘━ [ Imagenes AleatoriO ] ━|`}

exports.textMenu7 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion *OTROS*!✨
╒━ [ Otros] ━|
|-[ *${prefix}tts*
|-[ *${prefix}shortlink*
|-[ *${prefix}bapakfont*
|-[ *${prefix}join*
|-[ *${prefix}adminlist*
╘━ [ Otros ] ━|`}

exports.textMenu8 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion Acerca de _*JSBOT*_ !✨

╒━ [ Acerca de _*JSBOT*_ ] ━|
|-[ *${prefix}botstat*
|-[ *${prefix}ownerbot*
╘━ [ Acerca de _*JSBOT*_ ] ━|`}


exports.textMenu9 = (pushname) => {
    return `
    Hola, ${pushname}! 👋️
Estas son algunas de las funciones de la seccion Acerca de *CREADOR DEL BOT* !✨

<========================>
╒━ [ Creador del Bot ] ━|
|-[ *${prefix}ban*
|-[ *${prefix}bc*
|-[ *${prefix}leaveall*
|-[ *${prefix}clearall*
|-[ *${prefix}bloqueados*
╘━ [ Creador del Bot ] ━|
<========================>

Espero que tengas un gran día!✨
`}



exports.textAdmin = () => {
    return `
⚠ [ *Solo Para El Admin* ] ⚠ 
A continuación se muestran las funciones de administración de grupo disponibles en este bot!
╭━━━━━━━━━━━━╮
|-[ *${prefix}add*
|-[ *${prefix}kick* @usuario
|-[ *${prefix}promote* @usuario
|-[ *${prefix}demote* @usuario
|-[ *${prefix}mutegrup*
|-[ *${prefix}tagall*
|-[ *${prefix}setprofile*
|-[ *${prefix}del*
|-[ *${prefix}welcome*
|-[ *${prefix}linkgroup*
|-[ *${prefix}chats*
|-[ *${prefix}antilink*
╰━━━━━━━━━━━━╯

<========================>

⚠ [ *Creador del Grupo* ] ⚠
La siguiente es la función de propietario de grupo disponible en este bot!
╭━━━━━━━━━━╮ 
    *${prefix}kickall*
╰━━━━━━━━━━╯
`
}



//----------------------------------------------------------------------------menu-----------------------------------------------------------------------------------//
exports.menucursos = () => {
    return `Cursos activos si te interesa uno coloca *${prefix}(numero del curso)*
    
*1*. Aprende a programar con Go (Golang)

*2*. Aprende Javascript ES9, HTML, CSS3 y NodeJS desde cero

*3*. Aprende Oracle PLSQL desde Cero

*4*. Aprende Python de cero a experto

*5*. C# Avanzado

*6*. Caja registradora con Java

*7*. Clon de Whatsapp con Flutter

*8*. Crea sistemas Ecommerce con PHP 7 con pagos de PAYPAL y PAYU 🏛Udemy

*9*. Crea y sube tu primera app a Google Play

*10*. Creador de Licencias para Software en C#

*11*. Criptografía con Python

*12*. Curso de C# para Videojuegos

*13*. Curso Profesional de Git y GitHub

*14*. DESARROLLO ANDROID EMPIEZA A CREAR TU PROPIA APP

*15*. Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQ  - Udemy

*16*. Despliegue de Proyecto de Node.js en AWS - 2020

*17*. Diseño Web Desde Cero a Avanzado 45h Curso COMPLETO

*18*. Excel para negocios y empresas  ACTUALIZADO 2020+1

*19*. Git de principiante a experto, GitHub, GitLab, Azure, Commit

*20*. GIT+GitHub Todo un sistema de control de versiones de cero

*21*. Hacking con Powershell  backtrackacademy

*22*. Interfaces gráficas en Java

*23*. Introducción a Inteligencia Artificial

*24*. Introducción al Hacking y Ciberseguridad. Actualizado

*25*. JavaScript desde cero (2020)

*26*. JavaScript ECMAScript 6 y todos sus detalles

*27*. Linux desde cero

*28*. Linux internals

*29*. Máster en Base de Datos SQL desde 0 hasta Avanzado +Hacking!

*30*. Máster en Hacking con Python - Vuélvase un Hacker Ético

*31*. MASTER EN MACHINE LEARNING 2020 Y REDES NEURONALES! (PYTHON)

*32*. MEGA PACK DE PROGRAMACIÓN

*33*. PHP + MySQL desde cero

*34*. PHP 7 desde básico hasta desarrollar un software de venta

*35*. Programación de Android desde Cero +35 horas Curso COMPLETO

*36*. Programación en Python Vol. l

*37*. Programación en Python Vol. II

*38*. Programación en Python Vol. III

*39*. Programación orientada a objetos con JavaScript

*40*. Python 3 Para Machine Learning Desde Cero (Es Facil)+1

*41*. Python 3. Curso completo de Python 3. Aprende desde cero

*42*. Python And Flask Framework Complete Course For Beginners

*43*. Single Page Aplication con JavaScript

*44*. Tu primera app con C#

*45*. Udemy - Crea una APP Red Social con Chat estilo WHATSAPP con Android

*46*. Udemy - Curso completo de Linux
 
*47*. Udemy - Curso Laravel 6 de cero e integración con Boopstrap (CP)

*48*. Udemy - Fundamentos y lógica de programación 2020

*49*. USERS - Aprende a Programar en el lenguaje de la Web

*50*. 𝙵𝚞𝚕𝚕 𝚂𝚝𝚊𝚌𝚔 𝙹𝚊𝚟𝚊𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝚎𝚗 𝙴𝚜𝚙𝚊ñ𝚘𝚕

*51*. 𝚂𝚎𝚐𝚞𝚛𝚒𝚍𝚊𝚍 𝙸𝚗𝚏𝚘𝚛𝚖á𝚝𝚒𝚌𝚊. 𝙿𝚛á𝚌𝚝𝚒𝚌𝚊𝚜 𝚎𝚗 𝙺𝚊𝚕𝚒 𝙻𝚒𝚗𝚞𝚡.

*52*. 𝐈𝐧𝐭𝐫𝐨𝐝𝐮𝐜𝐜𝐢ó𝐧 𝐚𝐥 𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐨 𝐖𝐞𝐛 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐯𝐞 𝐜𝐨𝐧 𝐇𝐓𝐌𝐋 𝐲 𝐂𝐒𝐒

*53*. Android con WebServices`
}
//----------------------------------------------------------------------------menu-----------------------------------------------------------------------------------//




//----------------------------------------------------------------------------Curso1-----------------------------------------------------------------------------------//
exports.curso1 = () => {
    return `./cursos/1.jpg` }

exports.texto1 = () => {
    return `👉Aprende a programar con Go (Golang)👍
📝Aprende a programar con el mejor lenguaje para construir software que es simple, confiable y eficiente.
🔰Lo que aprenderás
✔️Un curso completo para aprender a programar.
✔️Para desarrolladores principiantes y experimentados.
✔️Desde conceptos básicos hasta temas avanzados.
✔️Concurrencia, canales, beckmarking
✔️Testing, errror handling, documentation
✔️Ejercicios prácticos con soluciones
✔️Acceso a código base valioso
✔️Curso verificado y provado por cientos de estudiantes.
✔️Hemos enseñado a mas de 1.65 millones de estudiantes
✔️Acceso al curso de por vida
✔️100% satisfacción garantizada

🔰¿Para quién es este curso?
✔️Este es un curso de programación con el nivel de primer semestre de universidad.
✔️Este curso es ideal para principiantes que quieran aprender aprogramar.
✔️Este curso es perfecto para programadores con experiencia que quieran un introducción detallada al lenguage de programación Go
   
si te interesa el curso escribe *${prefix}link1* `
}
exports.link1 = () => {
    return`*Aprende a programar con Go (Golang)*

https://mega.nz/folder/8eQxgQwQ#H1b5JcrBnJvQlC3j9WIAuQ/folder/0SBnlK5I`
}
//---------------------------------------------------------------------------Curso1------------------------------------------------------------------------------------------------//




//---------------------------------------------------------------------------Curso2-------------------------------------------------------------------------------------------------------//
exports.curso2 = () => {
    return `./cursos/2.jpg` }
exports.texto2 = () => {
return `*👉Aprende Javascript ES9, HTML, CSS3 y NodeJS desde cero👍*

📚Aprende a programar con javascript sin conocimiento previo en el explorador web y en el servidor con nodeJS
🔰Lo que aprenderás
✔️HTML, el lenguaje de marcado para la web
✔️CSS, el lenguaje de estilos que le dará color a tus aplicaciones
✔️CSS grid, la grilla de CSS
✔️CSS flexbox, la nueva forma de distribuir tu contenido
✔️Aprenderás a programar en javascript, el lenguaje más utilizado en el mundo
✔️Javascript ES9, las últimas funcionalidades de este lenguaje
✔️NodeJS, escribirás aplicaciones en el lado del servidor
✔️Subirás tus aplicaciones a un ambiente serverless, donde no será necesario que gestiones servidores
✔️APIs Rest, conecta tus aplicaciones con el servidor
✔️MongoDB, utiliza una de las bases de datos más populares del mundo para almacenar los datos de tu aplicación

si te interesa el curso escribe *${prefix}link2*
    `
}
exports.link2 = () => {
    return `*Aprende Javascript ES9, HTML, CSS3 y NodeJS desde cero*

https://mega.nz/folder/QwcR3KqC#4ReDY995J4e_Wv21EniqKQ/folder/ZgkmCYiD`

}
//---------------------------------------------------------------------------Curso2------------------------------------------------------------------------------------------------------//



//---------------------------------------------------------------------------Curso3------------------------------------------------------------------------------------------------------//
exports.curso3 = () => {
    return  `./cursos/3.jpg`
}
exports.texto3 = () => {
return `*👉Aprende Oracle PL/SQL desde Cero👍*

📚Aprende de forma práctica a utilizar el lenguaje de desarrollo PL/SQL para Bases de Datos Oracle 19c, 18c, 12c y 11g
🔰Lo que aprenderás
✔️Aprender las características del lenguaje PL/SQL en Oracle 18c, 12c y 11g
✔️Conocer todos los componentes de PL/SQL
✔️Aprender a desarrollar aplicaciones PL/SQL dentro de Oracle
✔️Saber usar PL/SQL dentro de SQL
✔️Manejar cursores y excepciones
✔️Aprender a desarrollar procedimientos y funciones
✔️Crear Paquetes
✔️Crear y manejar triggers
🔰¿Para quién es este curso?
✔️Personas que necesitan conocer PL/SQL para desarrollar aplicaciones en Oracle
✔️Programadores y administradores de Oracle 11g, 12c, 18c que necesiten trabajar con PL/SQL

si te interesa el curso escribe *${prefix}link3*
    `
}
exports.link3 = () => {
    return`*Aprende Oracle PL/SQL desde Cero*
https://mega.nz/folder/1Low3IRR#krdfvzVxTKqFZxQ8SQoOGg/folder/RHISBLKB
    `
}
//---------------------------------------------------------------------------Curso3------------------------------------------------------------------------------------------------------//




//---------------------------------------------------------------------------Curso4------------------------------------------------------------------------------------------------------//
exports.curso4 = () => {
    return`./cursos/4.jpg`
}
exports.texto4 =() => {
    return`muy buen PDF se lo recomiendo 
Att: wilder :)

si te interesa el curso escribe *${prefix}link4*
`
}
    exports.link4 = () => {
        return`*Aprende Python de cero a experto*
https://drive.google.com/file/d/1NFM0KfQ_HQHv4oNZwabFohs1L_oT-vlR/view`
}
//---------------------------------------------------------------------------Curso4------------------------------------------------------------------------------------------------------//




//---------------------------------------------------------------------------Curso5------------------------------------------------------------------------------------------------------//
exports.curso5 = () => {
    return`./cursos/5.jpg`
}
exports.texto5 = () => {
    return `*C# Avanzado*
    
si te interesa el curso escribe *${prefix}link5*`
}
exports.link5 =() => {
    return `*C# Avanzado*
https://drive.google.com/file/d/1r6mxj22BlRZ1D_YULCbxBIRIuTOcXHeS/view`
}
//---------------------------------------------------------------------------Curso5------------------------------------------------------------------------------------------------------//




//---------------------------------------------------------------------------Curso6------------------------------------------------------------------------------------------------------//
exports.curso6 = () => {
    return `./cursos/6.jpg`
}
exports.texto6 = () => {
    return `*Caja registradora con Java*
Conoce como realizar la estrura de datos para tus proyectos e integrar buenas prácticas con Java.

si te interesa el curso escribe *${prefix}link6*`
}
exports.link6 = () => {
    return `*Caja registradora con Java*

https://mega.nz/folder/YcxUgayA#ATuQ5-Fk-MJg7_SWfaP-1Q/folder/QBhmma4Q

*Contraseña:* cursosenmega`
}
//---------------------------------------------------------------------------Curso6------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso7------------------------------------------------------------------------------------------------------//
exports.curso7 = () => {
    return `./cursos/7.jpg`
}
exports.texto7 = () => {
    return `*Clon de Whatsapp con Flutter*

En este workshop llevaremos a la práctica los conceptos aprendidos en los cursos Dart Desde Cero y Flutter Desde Cero, creando un clon de WhatsApp.

si te interesa el curso escribe *${prefix}link7*`
}
exports.link7 = () => {
    return `*Clon de Whatsapp con Flutter*

 https://mega.nz/folder/cD4CXKqL#uf1qnXURFXWfEjMmrau7Mw/folder/Rap3hIJI

*Contraseña:* cursosenmega`
}
//---------------------------------------------------------------------------Curso7------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso8------------------------------------------------------------------------------------------------------//
exports.curso8 = () => {
    return `./cursos/8.jpg`
}
exports.texto8 = () => {
    return `*Crea sistemas Ecommerce con PHP 7 con pagos de PAYPAL y PAYU 🏛Udemy*

🛡¿Te gustaría aprender a crear sistemas Ecommerce desde cero con ventas automatizadas?
    
🛡Lo que aprenderás:
    
=> Aprenderás a crear plataformas de comercio electrónico con PHP7, Javascript, jQuery, Ajax, datos jSon y bases de datos MySQL.
    
=> Aprenderás a crear tus propios recursos para automatizar procesos.
    
=> Aprenderás a construir tu propio carrito de compras y a generar estrategias de Marketing.
    
=> Aprenderás a utilizar la plantilla AdminLTE bajo el patrón MVC para gestionar los productos de la tienda.
    
=>Aprenderás a construir una página de captura de prospectos.

si te interesa el curso escribe *${prefix}link8*
    `
}
exports.link8 = () => {
    return `*Crea sistemas Ecommerce con PHP 7 con pagos de PAYPAL y PAYU 🏛Udemy*

https://mega.nz/folder/RghUSBLT#RxTGnjPvYe1HjzrlhtNQqA/folder/k4hGVIjA`
}
//---------------------------------------------------------------------------Curso8------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso9------------------------------------------------------------------------------------------------------//
exports.curso9 = () => {
    return `./cursos/9.jpg`
}
exports.texto9 = () => {
    return `*Crea y sube tu primera app a Google Play*

Rick y Morty serán los protagonistas de tu propia app en Android Nativo que, además, podrás subir a Google Play.

si te interesa el curso escribe *${prefix}link9*
    `
}
exports.link9 = () => {
    return `*Crea y sube tu primera app a Google Play*

https://mega.nz/folder/rqxSRR5B#BrB_c3Do8Mh-Wk9KQdEHpw

*Contraseña:*  cursosenmega`
}
//---------------------------------------------------------------------------Curso9------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso10------------------------------------------------------------------------------------------------------//
exports.curso10 = () => {
    return `./cursos/10.jpg`
}
exports.texto10 = () => {
    return `*Creador de Licencias para Software en C#*

*Lo que aprenderás*
➖Crear Licecencias para Software

*Requisitos*
una PC

*Descripción*
➖En este curso Aprenderás a crear Licencias de Prueba de 30 dias o de 1 año para que tus clientes conozcan tu Sistema. Eso te dará una Oportunidad de demostrar lo bueno que es tu sistema. Podrás vender tus Sistemas en forma de Licencias, así podrás venderle a todo el Mundo.

➖Aprenderás También a crear una Tienda Virtual 100% Funcional para que vendas tus Sistemas y que tus clientes puedan descargar un Instalador y Prueben tu sistema. En caso les guste podrán Comprar Licencia desde tu misma Tienda Virtual y tu podrás Gestionar todo el Proceso desde un Aplicativo de Escritorio que crearemos en este Curso con el Lenguaje C# y SQLserver como base de datos.

*¿Para quién es este curso?*
➖Desarrolladores de C#
    
si te interesa el curso escribe *${prefix}link10*`
}
exports.link10 = () => {
    return `*Creador de Licencias para Software en C#*

https://mega.nz/file/tY01BC5I#ovS7LhVKpcUNmpRlyh26nWGGMAs5tgIa-Of-vLkyKZY`
}
//---------------------------------------------------------------------------Curso10------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso11------------------------------------------------------------------------------------------------------//
exports.curso11 = () => {
    return `./cursos/11.jpg`
}
exports.texto11 = () => {
    return `*Criptografía con Python*

*PESO:* 1GB+
*PARTES:* 5 ARCHIVOS RAR 
*DESCRIPCION:* La criptografía es quizás una de las ciencias más importantes a día de hoy. Cualquier transacción bancaria, mensaje de texto o paquete que viaja por la red está cifrado para que terceras personas no intercepten esta información que para nosotros es importante.
A lo largo del curso, aprenderemos los métodos criptográficos más famosos, cómo podemos utilizarlos y programarlos para realizar distintos tipos de cifrados. Además también desarrollaremos nuestros propios algoritmos para romper la seguridad de distintos criptogramas.

si te interesa el curso escribe *${prefix}link11*`
}
exports.link11 = () => {
    return `*Criptografía con Python*

https://app.degoo.com/share/bspTIh5WmJLhuV?_branch_match_id=871929284072308240`
}
//---------------------------------------------------------------------------Curso11------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso12------------------------------------------------------------------------------------------------------//
exports.curso12 = () => {
    return `./cursos/12.jpg`
}
exports.texto12 = () => {
    return `*Curso de C# para Videojuegos*

    Domina el lenguaje c# y programa videojuegos increíbles. Logra animaciones con variables y transiciones usando Animator de Unity 2D. Genera engagement y jugabilidad en tus productos creando escenarios procedurales e innovadores. Aportando contenido de alta calidad de forma gratuita`
}
exports.link12 = () => {
    return `*Curso de C# para Videojuegos*

    https://drive.google.com/drive/folders/19ngRg97lMCSuegp2r7SBAFDqVOO9GzUV?usp=sharing`
}
//---------------------------------------------------------------------------Curso12------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso13------------------------------------------------------------------------------------------------------//
exports.curso13 = () => {
    return `./cursos/13.jpg`
}
exports.texto13 = () => {
    return `*Curso Profesional de Git y GitHub*

Deja de versionar tus proyectos usando tu propio sistema de control de versiones. Mejor usa Git, el sistema de control de versiones por excelencia que utiliza la industria tecnológica. Aprende a trabajar con git, conceptos básicos, clonar un repositorio y gestionar tus proyectos alojándolos en tu repositorio local y en GitHub.`
}
exports.link13 = () => {
    return `*Curso Profesional de Git y GitHub*

https://drive.google.com/drive/folders/1_d0eeURkvv_lYIrh2TKgzBebc50xw08k`
}
//---------------------------------------------------------------------------Curso13------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso14------------------------------------------------------------------------------------------------------//
exports.curso14 = () => {
    return `./cursos/14.jpg`
}
exports.texto14 = () => {
    return `*DESARROLLO ANDROID EMPIEZA A CREAR TU PROPIA APP*

Aprende a crear aplicaciones móviles para Android, desde los conceptos iniciales y la práctica necesaria para empezar a crear tus aplicaciones móviles con Android Studio.
    `
}
exports.link14 = () => {
    return `*DESARROLLO ANDROID EMPIEZA A CREAR TU PROPIA APP*

https://mega.nz/folder/lrp0nSoY#OymT-0HnJ0L0IG0ciVzqpA/folder/wiQg1DxZ`
}
//---------------------------------------------------------------------------Curso14------------------------------------------------------------------------------------------------------//





//---------------------------------------------------------------------------Curso15------------------------------------------------------------------------------------------------------//
exports.curso15 = () => {
    return `./cursos/15.jpg`
}
exports.texto15 = () => {
    return `*🔰Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQ  - Udemy*

Lo que aprenderás:
➖Convertir y crear sus propios diseños en páginas web
➖Crear páginas web con HTML y CSS
➖Escribir código JavaScript y jQuery
➖Crear sitios web dínamicos con PHP y MYSQL
➖Entender como funciona JavaScript y PHP
➖Aplicar a un empleo de Desarrollador Web Junior
➖Aprende AJAX, para crear páginas web dínamicas que cargaran información sin recargar la página
➖Agregar pagos de PayPal a tus sitios web
➖Crear aplicaciones CRUD con PHP y MySQL
➖Crear aplicaciones seguras con PHP, Ajax y MySQL
➖Crear un área de administración con AdminLTE, PHP y MySQL
    `
}
exports.link15 = () => {
    return `*🔰Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQ  - Udemy*

https://mega.nz/folder/KZdVxKpC#ybcNrnx_CaMBpY_SS2_tZA/folder/fMFlWAjI`
}
//---------------------------------------------------------------------------Curso15------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso16------------------------------------------------------------------------------------------------------//
exports.curso16 = () => {
    return `./cursos/16.jpg`
}
exports.texto16 = () => {
    return `*👉Despliegue de Proyecto de Node.js en AWS - 2020👍*

🏛Aprende el proceso para implementar una Aplicación o API de NodeJS en Amazon Lightsail, en un VPS de Linux y con SSL/TLS
🔰Lo que aprenderás
✔️Configuración de proyecto en NodeJS para su despliegue a producción.
✔️Entorno y servicios de Amazon Lightsail.
✔️Creación y configuración de un servidor virtual privado (VPS) con una distribución de Linux.
✔️Configuración de DNS para direccionamiento hacia Lightsail.
✔️Configuración de cliente SSH.
✔️Instalación y configuración de NodeJS en el servidor, y configuración de puertos.
✔️Administración de procesos en Linux mediante PM2.
✔️Obtención y renovación automática de certificado SSL/TLS para poder entregar la ✔️app o API mediante https.
✔️Puesta en marcha de proyecto de NodeJS en el servidor.
🔰¿Para quién es este curso?
✔️Desarrolladores o personas interesadas en aprender a desplegar proyectos de NodeJS en producción mediante AWS.
    `
}
exports.link16 = () => {
    return `*Despliegue de Proyecto de Node.js en AWS - 2020*

https://mega.nz/folder/RTQXkIjB#tlFmyRJJSiWrAG1cTBfKXA/folder/oT5TkApS`
}
//---------------------------------------------------------------------------Curso16------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso17------------------------------------------------------------------------------------------------------//
exports.curso17 = () => {
    return `./cursos/17.jpg`
}
exports.texto17 = () => {
    return `*👉Diseño Web Desde Cero a Avanzado 45h Curso COMPLETO👍*

📚Aprende a Diseñar Páginas Web Responsive Design, atractivas, de forma profesional y sin dificultad con HTML5 y CSS3
🔰Lo que aprenderás
✔️Crear páginas web con los estándares actuales de HTML5
✔️Maquetar sus sitios webs con los estándares actuales de CSS3
✔️Saber programar en JavaScript
✔️Control de Versiones con Git y GitHub para proyectos en equipos de trabajo
✔️Utilizar herramientas de edición de código de un modo más ágil
✔️Definir el Diseño y Usabilidad de una página web
✔️Hacer diseño Responsive Design y Mobile First
✔️Crear Estrategias de posicionamiento SEO para los motores de búsqueda de Google, Yahoo!, Bing, etc.
✔️Diseñar Animaciones con CSS3, sin flash. Tanto básicas, intermedias como avanzadas, incluso 3D
✔️Saber qué pasos seguir desde cero en el proceso de creación web a través de una ✔️Metodología de Trabajo Profesional`
}
exports.link17 = () => {
    return `*Diseño Web Desde Cero a Avanzado 45h Curso COMPLETO*

https://mega.nz/folder/VS52UCKK#sHib_nPyKb4ogbax0Adujg/folder/VDoGEIAI`
}
//---------------------------------------------------------------------------Curso17------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso18------------------------------------------------------------------------------------------------------//
exports.curso18 = () => {
    return `./cursos/18.jpg`
}
exports.texto18 = () => {
    return `*👉Excel para negocios y empresas | ACTUALIZADO 2020👍*

📚Curso completo de excel para productividad en los negocios.
🔰Lo que aprenderás
✔️Introducción a Excel en su última versión
✔️Principales funciones de Excel
✔️Conociendo las partes ( Interfaz gráfica ) de Excel en su última versión
✔️Organizar celdas, filas y columnas de una hoja de cálculo
✔️Usos del teclado ( accesos directos)
✔️Configurar la barra de acceso rápido
✔️Tipos de datos
✔️Formato de celdas
✔️Estructura de una formula
✔️Formato condicional
✔️Gráficos en excel
✔️Insertar archivos externos
✔️Tus archivos en la nube : Excel + Onedrive
✔️Proteger tus archivos en Excel
✔️Funciones básicas de excel
✔️Tabla dinámica y gráficos dinámicos
✔️Herramientas de análisis e Hipotesis
✔️Funciones para negocios
✔️Consolidar
✔️Instalando Complementos a Excel
✔️Creando hipervinculos
✔️Procesos automatizados para negocios (MACRO)
✔️Mejores practicas al imprimir en Excel
✔️Repositorios web para Excel avanzado`
}
exports.link18 = () => {
    return `*Excel para negocios y empresas | ACTUALIZADO 2020*

https://mega.nz/folder/lKxj0KDR#QtdL8L2-2tjmsuUyf0EUSg/folder/cPQh2ARK`
}
//---------------------------------------------------------------------------Curso18------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso19------------------------------------------------------------------------------------------------------//
exports.curso19 = () => {
    return `./cursos/19.jpg`
}
exports.texto19 = () => {
    return `👉Git de principiante a experto, GitHub, GitLab, Azure, Commit👍

🏛Aprende fácil Git, GitHub, GitLab con SSL en on-premise y en la nube, azure devops, aws code commit, cicd, pipelines.
🔰Lo que aprenderás
✔️CICD
✔️GitLab
✔️GitHub
✔️Azure Devops
✔️Montar un servidor en GitLab con SSL
✔️Dominio absoluto de la línea de comandos con Git
✔️Crear una instancia en aws con ec2
✔️Implementar BitBucket
✔️Crear una base de datos en postgres
✔️Pull Request - Merge Request
✔️Gitlab con Docker
✔️Introducción a GNU/LINUX
✔️Pipelines
🔰¿Para quién es este curso?
✔️Área de sistemas y a fines`
}
exports.link19 = () => {
    return `*Git de principiante a experto, GitHub, GitLab, Azure, Commit*

https://mega.nz/folder/IeBV3KhB#tmJj_eaQikHKzkfNdDZcDA/folder/ke5UVZzK`
}
//---------------------------------------------------------------------------Curso19------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso20------------------------------------------------------------------------------------------------------//
exports.curso20 = () => {
    return `./cursos/20.jpg`
}
exports.texto20 = () => {
    return `*GIT+GitHub Todo un sistema de control de versiones de cero*

Este curso te llevará de la mano partiendo desde cero hasta tener más de lo que necesitas para trabajar con Git, adicionalmente aprenderás a utilizar GitHub como un repositorio remoto, incluyendo formas de trabajar en equipo, flujos de trabajo, tokens, SSH, Pull Request y otros temas avanzados que serán de mucha utilidad en tu vida profesional.`
}
exports.link20 = () => {
    return `*GIT+GitHub Todo un sistema de control de versiones de cero*

https://mega.nz/folder/GNFEzAZI#SOPB46wlj-j-A3ZLARjmXw/folder/2NFinapA`
}
//---------------------------------------------------------------------------Curso20------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso21------------------------------------------------------------------------------------------------------//
exports.curso21 = () => {
    return `./cursos/21.jpg`
}
exports.texto21 = () => {
    return `*Hacking con Powershell backtrackacademy*

El curso de powershell enfocado a seguridad informática está diseñado para entender como esta conformado y como programar en este lenguaje, además del uso de comandos de esta consola de scripting ya que powershell es un lenguaje de programación y a su vez es una consola de scripting que nos ofrece un gran abanico de posibilidades en hacking.`
}
exports.link21 = () => {
    return `*Hacking con Powershell backtrackacademy*

https://mega.nz/folder/Nc5RFSQR#8vAwd3jm7biI27CXUeA-4Q/folder/UN4lwKDI`
}
//---------------------------------------------------------------------------Curso21------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso22------------------------------------------------------------------------------------------------------//
exports.curso22 = () => {
    return `./cursos/22.jpg`
}
exports.texto22 = () => {
    return `*Interfaces gráficas en Java*

 En este curso nos concentramos en el tema de las interfaces gráficas al momento de desarrollar software con Java, explicaremos como se debe de hacer. Este curso pertenece a la especialidad de Programador Java.
    `
}
exports.link22 = () => {
    return `*Interfaces gráficas en Java*

https://mega.nz/folder/sDojGKBT#_shlp9db2J8JUtfS3Azj2g/folder/sX4QwDCb

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso22------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso23------------------------------------------------------------------------------------------------------//
exports.curso23 = () => {
    return `.cursos/23.jpg`
}
exports.texto23 = () => {
    return `*Introducción a Inteligencia Artificial*

    Aprende sobre los primeros pasos en la inteligencia artificial y las redes neuronales artificiales.`
}
exports.lin23k = () => {
    return `*Introducción a Inteligencia Artificial*

https://mega.nz/folder/pcoDTaIA#_seLcLPKmudXf46mldTnIw/folder/xUA1RSLB

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso23------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso24------------------------------------------------------------------------------------------------------//
exports.curso24 = () => {
    return `./cursos/24.jpg`
}
exports.texto24 = () => {
    return `*👉Introducción al Hacking y Ciberseguridad. Actualizado. 👍*

📚Aprende a protegerte de las técnicas que usan los cibercriminales para acceder a la información almacenada en una red.
🔰Lo que aprenderás
✔️Conocer los fundamentos de la Ciberseguridad
✔️Analizar las diferentes técnicas de ataque que usan los cibercriminales
✔️Proponer contramedidas para los ataques estudiados en el curso
✔️Planificar sistemas de seguridad en capas
✔️Conocer los diferentes estándares relacionados con la Seguridad de la Información
✔️Proponer medidas de seguridad para contrarrestar los ataques dirigidos a los usuarios
🔰¿Para quién es este curso?
✔️Administradores de Redes
✔️Administradores de Sistemas
✔️Cualquier persona interesada en introducirse en el mundo de la Seguridad de la Información y el Hacking
    `
}
exports.link24 = () => {
    return `*👉Introducción al Hacking y Ciberseguridad. Actualizado. 👍*

https://mega.nz/folder/ohcR2IgC#LsDzFXmxR3SG7R-PaU88fQ/folder/RltS2R6B`
}
//---------------------------------------------------------------------------Curso24------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso25------------------------------------------------------------------------------------------------------//
exports.curso25 = () => {
    return `./cursos/25.jpg`
}
exports.texto25 = () => {
    return `*JavaScript desde cero (2020)*

Domina las bases del único lenguaje que te da la oportunidad de trabajar del lado del cliente y del lado del servidor.`
}
exports.link25 = () => {
    return `*JavaScript desde cero (2020)*

https://app.degoo.com/share/EMxsYtV1tsl2Io?_branch_match_id=871929284072308240`
}
//---------------------------------------------------------------------------Curso25------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso26------------------------------------------------------------------------------------------------------//
exports.curso26 = () => {
    return `.cursos/26.jpg`
}
exports.texto26 = () => {
    return `*👉JavaScript: ECMAScript 6 y todos sus detalles👍*

📚Continua tu evolución en JavaScript al estándar ES6 y aprende todo lo que esta nueva entrega tiene para ti.
🔰Lo que aprenderás
✔️Comprender y aplicar las nuevas funciones que tiene ECMAScript 6
✔️Tener una base sólida para entrar en nuevos Frameworks basados en JavaScript
✔️Entender el significado del por qué pasan las cosas en JavaScript
✔️Tener un conocimiento avanzado de JavaScript
🔰¿Para quién es este curso?
✔️Personas que desean trabajar con TypeScript, Angular2, ionic 2 o cualquier otro framework que utilice JavaScript.
✔️Personas que desean profundizar en su conocimiento en JavaScript.
✔️Todos aquellos que desean tener una base sólida en el ES6.
    `
}
exports.link26 = () => {
    return `*JavaScript: ECMAScript 6 y todos sus detalles*

https://mega.nz/folder/RgNjCIJC#Gb-joMMuSX4dyfXvhqTMcQ/folder/8ssxiK5b`
}
//---------------------------------------------------------------------------Curso26------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso27------------------------------------------------------------------------------------------------------//
exports.curso27 = () => {
    return `./cursos/27.jpg`
}
exports.texto27 = () => {
    return `*Linux desde cero*

    Aprende a utilizar Linux y sus herramientas entendiendo los conceptos que hay detrás del sistema operativo.`
}
exports.link27 = () => {
    return `*Linux desde cero*

https://mega.nz/folder/IL5VhA7J#A6bZrxjrrwK-UfXI3I4yuQ/folder/0WwmiRbS

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso27------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso28------------------------------------------------------------------------------------------------------//
exports.curso28 = () => {
    return `./cursos/28.jpg`
}
exports.texto28 = () => {
    return `*Linux internals*`
}
exports.link28 = () => {
    return `*Linux internals*

https://drive.google.com/file/d/1NB9y0dHwevIZ5OBVnj1gHdxZ4KbqFGL9/view`
}
//---------------------------------------------------------------------------Curso28------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso29------------------------------------------------------------------------------------------------------//
exports.curso29 = () => {
    return `./cursos/29.jpg`
}
exports.texto29 = () => {
    return `*Máster en Base de Datos SQL desde 0 hasta Avanzado +Hacking!*

Aprende Gestión de Base de Datos SQL, Consultas, Funciones, Administración de Privilegios, Diseño EER, y SQL Injection`
}
exports.link29 = () => {
    return `*Máster en Base de Datos SQL desde 0 hasta Avanzado +Hacking!*

https://drive.google.com/drive/folders/1Y1Exz2vV-c2spfMekniU3brGfDT9vHTK

Contraseña: cursosparatodospormega`
}
//---------------------------------------------------------------------------Curso29------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso30------------------------------------------------------------------------------------------------------//
exports.curso30 = () => {
    return `./cursos/30.jpg`
}
exports.texto30 = () => {
    return `*Máster en Hacking con Python - Vuélvase un Hacker Ético*

¡Conviértete en un Hacker Ético con Python con este curso totalmente desde 0 siendo el más completo de la habla hispana!`
}
exports.link30 = () => {
    return `*Máster en Hacking con Python - Vuélvase un Hacker Ético*

https://mega.nz/folder/BYk0GRyA#P9eSRjiHEvweYskfjbyzcw/folder/JNlmWQKQ`
}
//---------------------------------------------------------------------------Curso30------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso31------------------------------------------------------------------------------------------------------//
exports.curso31 = () => {
    return `./cursos/31.jpg`
}
exports.texto31 = () => {
    return `*👉MASTER EN MACHINE LEARNING 2020 Y REDES NEURONALES! (PYTHON)👍*

📚¿Te Cuesta Machine Learning? Aprende con nuestro curso YA! Juntos aprenderemos varios Proyectos con PYTHON DESDE CERO!
🔰Lo que aprenderás
✔️Entenderas el funcionamiento de sistemas de machine learning
✔️Aprenderas el funcionamiento de distintos algoritmos de ML Regresiones, Clasificaciones etc
✔️Redes Neuronales, vale la pena indicarlas en un punto aparte. No solo veremos la teoría de funcionamiento, las aplicaremos en python, de una manera y con unos casos prácticos que estamos seguros te dejaran fascinado!
✔️Bases de Python
✔️Numpy (Arrays multidimensionales en Python)
✔️Pandas (Tablas indexadas en Python)
✔️Visualización de datos (data science)
✔️Limpieza de datos (data science)
✔️Mucha, mucha, pero mucha práctica y código.
    `
}
exports.link31 = () => {
    return `*MASTER EN MACHINE LEARNING 2020 Y REDES NEURONALES! (PYTHON)*

https://mega.nz/folder/htdwnLbD#PxflBFO6yTPJZwl_qhZPbQ/folder/phVgyZ4Q`
}
//---------------------------------------------------------------------------Curso31------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso32------------------------------------------------------------------------------------------------------//
exports.curso32 = () => {
    return `./cursos/32.jpg`
}
exports.texto32 = () => {
    return `*MEGA PACK DE PROGRAMACIÓN*

pack libros de programacion , descarga mas libros de programacion , pack de libros de programacion pdf, incluye libros java pdf mega,libros php pdf, libros android mega, libros c# mega, libros python, libros c++ mega, libros informatica descarga libros , descarga libros gratis.
    `
}
exports.link32 = () => {
    return `*MEGA PACK DE PROGRAMACIÓN*

http://www.mediafire.com/file/z5l7vmiv4u418i7/Cursos_de_Prog_Dabas.rar/file`
}
//---------------------------------------------------------------------------Curso32------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso33------------------------------------------------------------------------------------------------------//
exports.curso33 = () => {
    return `./cursos/33.jpg`
}
exports.texto33 = () => {
    return `*PHP + MySQL desde cero*`
}
exports.link33 = () => {
    return `*PHP + MySQL desde cero*

https://drive.google.com/file/d/1TwO2-XI724rVVevV3t64ck1yzqqMkO03/view`
}
//---------------------------------------------------------------------------Curso33------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso34------------------------------------------------------------------------------------------------------//
exports.curso34 = () => {
    return `./cursos/34.jpg`
}
exports.texto34 = () => {
    return `*👉PHP 7: desde básico hasta desarrollar un software de venta👍*

📚Apréndelo desarrollando un software de ventas.
🔰Lo que aprenderás
✔️Desarrollar aplicaciones webs implementando buenas prácticas
✔️Aspirar a un mejor sueldo y ser más competitivo en el mercado actual
🔰Requisitos
✔️Conocimientos básicos en SQL con MySQL
✔️Experiencia previa con jQuery
✔️Conceptos básicos de algoritmos y programación
✔️HTML/CSS de preferencia manejo de Bootstrap 3
🔰¿Para quién es este curso?
✔️Estudiantes de Software
✔️Desarrolladores independientes
    `
}
exports.link34 = () => {
    return `PHP 7: desde básico hasta desarrollar un software de venta*

https://mega.nz/folder/1hkwnboR#2HM8Y2BDukO7RnI4e3WvGQ/folder/N59DhI5Y`
}
//---------------------------------------------------------------------------Curso34------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso35------------------------------------------------------------------------------------------------------//
exports.curso35 = () => {
    return `./cursos/35.jpg`
}
exports.texto35 = () => {
    return `*Programación de Android desde Cero +35 horas Curso COMPLETO*

+35 Horas de conocimientos técnicos`
}
exports.link35 = () => {
    return `*Programación de Android desde Cero +35 horas Curso COMPLETO*

https://mega.nz/folder/JU1mVIAb#fdqOmIuRwpzJsX7WQtJS1A/folder/VB8HGQ6T`
}
//---------------------------------------------------------------------------Curso35------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso36------------------------------------------------------------------------------------------------------//
exports.curso37 = () => {
    return `./cursos/36.jpg`
}
exports.texto37 = () => {
    return `*Programación en Python Vol. II*`
}
exports.link37 = () => {
    return `*Programación en Python Vol. II*

    https://drive.google.com/file/d/1WwweewgJwNLL1q_97Kgsz-y2QW2thLOZ/view`
}
//---------------------------------------------------------------------------Curso36------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso37------------------------------------------------------------------------------------------------------//
exports.curso38 = () => {
    return `./cursos/37.jpg`
}
exports.texto38 = () => {
    return `*Programación en Python Vol. III*`
}
exports.link38 = () => {
    return `*Programación en Python Vol. III*

https://drive.google.com/file/d/1i0SAqaZjXEa3pRjkkn2wlkIZ5kc5wrDp/view`
}
//---------------------------------------------------------------------------Curso37------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso38------------------------------------------------------------------------------------------------------//
exports.curso36 = () => {
    return `./cursos/38.jpg`
}
exports.texto36 = () => {
    return `*Programacion en python I*

Python es un lenguaje de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código. Se trata de un lenguaje de programación multiparadigma, ya que soporta orientación a objetos, programación imperativa y, en menor medida, programación funcional.
    `
}
exports.link36 = () => {
    return `*Programacion en python I*

https://drive.google.com/file/d/1qsXUAkauJmXA51k5MBa69qbrpoDH3E_f/view`
}
//---------------------------------------------------------------------------Curso38------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso39------------------------------------------------------------------------------------------------------//
exports.curso39 = () => {
    return `./cursos/39.jpg`
}
exports.texto39 = () => {
    return `*Programación orientada a objetos con JavaScript*

La programación orientada a objetos es un paradigma que desde la versión ES6 puede usarse en JavaScript a través de clases. Los temas a tratar son: Clases, Objetos, tipos de objetos, constructores, métodos, propiedades, herencia y mucho más.
    `
}
exports.link39 = () => {
    return `*Programación orientada a objetos con JavaScript*

https://mega.nz/folder/Q4JRnQ7L#9_2MPwnWbCRxqKpsRaUdHg

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso39------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso40------------------------------------------------------------------------------------------------------//
exports.curso40 = () => {
    return `./cursos/40.jpg`
}
exports.texto40 = () => {
    return `*👉Python 3 Para Machine Learning: Desde Cero (Es Facil)👍*

📚Puedes aprender Python Para Machine Learning en poco tiempo
🔰Lo que aprenderás
✔️Luego de tomar este curso seras capaz de programar en python
🔰Descripción
Este es el curso en español más Facil que encontrarás sobre Python 3 para Machine Learning en Udemy. Perfectamente estructurado y balanceado, introduce todos los temas de forma sencilla, gradual y 100% práctica (incluye configuración del entorno en Windows, Ubuntu Linux y Mac OS X).
Dividido en varias fases y Facil de Completar.
En muchas lecciones se enseña con ejemplos y ejercicios reales de mi propia experiencia como programador.
Es un curso innovador que utiliza herramientas avanzadas para apoyar el aprendizaje, como Jupyter Notebook, gracias al que serás capaz de crear tus propios apuntes a la vez que aprendes cada línea de código.
 No esperes más y descubre por qué Python es el lenguaje de moda, mejora tus conocimientos y da un salto adelante en tu carrera profesional.
    `
}
exports.link40 = () => {
    return `*Python 3 Para Machine Learning: Desde Cero (Es Facil)*

https://mega.nz/folder/U0FSQJQQ#G65WcyCJLgtEIKiMIJEJ4Q/folder/U882gbZZ`
}
//---------------------------------------------------------------------------Curso40------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso41------------------------------------------------------------------------------------------------------//
exports.curso41 = () => {
    return `./cursos/41.jpg`
}
exports.texto41 = () => {
    return `*👉Python 3. Curso completo de Python 3. Aprende desde cero👍*

💻Aprende Python 3 desde cero. Curso de Python muy práctico y con más de 100 ejemplos para facilitar el aprendizaje !
🔰Lo que aprenderás
Formas de ejecutar un programa en Python
🔰¿Para quién es este curso?
✔️Personas que estén interesadas en conocer el lenguaje de programación Python.`
}
exports.link41 = () => {
    return `*Python 3. Curso completo de Python 3. Aprende desde cero*

https://mega.nz/folder/0XJlSYhQ#o6yqJSCkI90n2XWeGSCYtg/folder/ZKJhACbb`
}
//---------------------------------------------------------------------------Curso41------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso42------------------------------------------------------------------------------------------------------//
exports.curso42 = () => {
    return `./cursos/42.jpg`
}
exports.texto42 = () => {
    return `*Python And Flask Framework Complete Course For Beginners*

Beginner to Expert Python And Flask.Start from the basics and go all the way to creating your own applications and games`
}
exports.link42 = () => {
    return `*Python And Flask Framework Complete Course For Beginners*

https://app.degoo.com/share/y4LQuj4w7KMNSr?_branch_match_id=857312931582036399

Contraseña: cursosparatodospormega`
}
//---------------------------------------------------------------------------Curso42------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso43------------------------------------------------------------------------------------------------------//
exports.curso43 = () => {
    return `./cursos/43.jpg`
}
exports.texto43 = () => {
    return `*Single Page Aplication con JavaScript*

Aprende a crear tu primera SPA, la forma moderna de desarrollar aplicaciones web`
}
exports.link43 = () => {
    return `*Single Page Aplication con JavaScript*

https://mega.nz/folder/ZtI1FYwQ#jO89wt_Bho6ZhRdPzALlWQ

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso43------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso44------------------------------------------------------------------------------------------------------//
exports.curso44 = () => {
    return `./cursos/44.jpg`
}
exports.texto44 = () => {
    return `*Tu primera app con C#*

En este taller aplicarás la teoría de los cursos de C# desde cero y POO en una aplicación de consola.`
}
exports.link44 = () => {
    return `*Tu primera app con C#*

https://mega.nz/folder/gfRkTb6S#xeMVYNpcTt14dmheOfL4UQ/folder/BDJFiQTD

Contraseña: cursosenmega`
}
//---------------------------------------------------------------------------Curso44------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso45------------------------------------------------------------------------------------------------------//
exports.curso45 = () => {
    return `./cursos/45.jpg`
}
exports.texto45 = () => {
    return `*Crea una APP Red Social con Chat estilo WHATSAPP con Android*

Curso de Android y Firebase avanzado - Crea una Red Social completa - Notificaciones push, Chat Realtime, Whatsapp

*Explicacion en video*
https://youtu.be/U0pMIEf9lsw`
}
exports.link45 = () => {
    return `*Crea una APP Red Social con Chat estilo WHATSAPP con Android*

https://mega.nz/folder/F5QxnAwT#UkloEeO_U6OkevbaG7gH7g/folder/hoxGXCIS`
}
//---------------------------------------------------------------------------Curso45------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso46------------------------------------------------------------------------------------------------------//
exports.curso46 = () => {
    return `./cursos/46.jpg`
}
exports.texto46 = () => {
    return `*Udemy - Curso completo de Linux*

Linux es el Sistema operativo de más rápido crecimiento en el mundo y cada vez son más las personas que como tú desean aprender de el y más si es en muy corto tiempo`
}
exports.link46 = () => {
    return `*Udemy - Curso completo de Linux*

https://mega.nz/folder/6ZoCHIxD#Nn9kvg_Dk5UenbyHHmp5Cw/folder/rYgXTS5b`
}
//---------------------------------------------------------------------------Curso46------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso47------------------------------------------------------------------------------------------------------//
exports.curso47 = () => {
    return `./cursos/47.jpg`
}
exports.texto47 = () => {
    return `*👉Laravel 6 a 8 desde cero + integración con Bootstrap 4 y Vue👍*

📚Desarrolla apps con un framework potente y extensible + Node, Vue, Rest Api, Passport, JetStream, Stripe y mucho más
🔰Lo que aprenderás
✔️Emplear Laravel de manera fluida y conocer sus componentes fundamentales
✔️Desarrollar aplicaciones de gestión de datos
✔️Organización en la programación de múltiples módulos
✔️Una aplicación web básica con funciones de CRUD desde cero
✔️Una web SPA de cara al usuario final (Blog)
✔️Enviar Emails
✔️Login con protección en el password, recuperación de credenciales, distintos niveles de acceso entre usuarios
✔️Aprender a crear, validar y procesar formularios
✔️Cargar, validar y redimensionar imágenes en el servidor
✔️Sistema sencillo de comentarios
✔️Redirecciones y rooteo
✔️Aprender a trabajar con tecnologías punteras en conjunto: HTML, CSS, JavaScript, jQuery, Bootstrap, PHP, MYSQL y Vue
✔️Crear componentes con Vue Cli`
}
exports.link47 = () => {
    return `*Laravel 6 a 8 desde cero + integración con Bootstrap 4 y Vue*

https://mega.nz/folder/stlASRwa#eefhd2gLG_01R5mhdvw0KA/folder/M40lwYSL`
}
//---------------------------------------------------------------------------Curso47------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso48------------------------------------------------------------------------------------------------------//
exports.curso48 = () => {
    return `./cursos/48.jpg`
}
exports.texto48 = () => {
    return `*Udemy - Fundamentos y lógica de programación 2020*

Éste es el Primer Nivel de 3 del curso "Lógica de Programación", durante los 3 niveles del curso estarás adquiriendo todos los conocimientos básicos para iniciarte con éxito en el mundo de la programación y poder escalar hacia el aprendizaje y perfecta comprensión de cualquier Lenguaje de Programación.`
}
exports.link48 = () => {
    return `*Udemy - Fundamentos y lógica de programación 2020*

https://mega.nz/folder/soVnwITY#bbMCc1NykEAB58hC2aXBtA/folder/x90FWSDZ`
}
//---------------------------------------------------------------------------Curso48------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso49------------------------------------------------------------------------------------------------------//
exports.curso49 = () => {
    return `./cursos/49.jpg`
}
exports.texto49 = () => {
    return `*USERS - Aprende a Programar en el lenguaje de la Web*`
}
exports.link49 = () => {
    return `*USERS - Aprende a Programar en el lenguaje de la Web*

https://drive.google.com/file/d/1Q5SXjLIroBYsNv8eZR855MCZ_py3Nklq/view`
}
//---------------------------------------------------------------------------Curso49------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso50------------------------------------------------------------------------------------------------------//
exports.curso50 = () => {
    return `./cursos/50.jpg`
}
exports.texto50 = () => {
    return `*𝙵𝚞𝚕𝚕 𝚂𝚝𝚊𝚌𝚔 𝙹𝚊𝚟𝚊𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝚎𝚗 𝙴𝚜𝚙𝚊ñ𝚘𝚕*

En este curso aprenderas javascript desde cero, para hacer aplicaciones web`
}
exports.link50 = () => {
    return `*𝙵𝚞𝚕𝚕 𝚂𝚝𝚊𝚌𝚔 𝙹𝚊𝚟𝚊𝚂𝚌𝚛𝚒𝚙𝚝 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝚎𝚗 𝙴𝚜𝚙𝚊ñ𝚘𝚕*

https://mega.nz/folder/M8ozHK7D#egE3TlipvP7vHPxykT8Fhw/folder/YohXEKTC`
}
//---------------------------------------------------------------------------Curso50------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso51------------------------------------------------------------------------------------------------------//
exports.curso51 = () => {
    return `./cursos/51.jpg`
}
exports.texto51 = () => {
    return `*𝚂𝚎𝚐𝚞𝚛𝚒𝚍𝚊𝚍 𝙸𝚗𝚏𝚘𝚛𝚖á𝚝𝚒𝚌𝚊. 𝙿𝚛á𝚌𝚝𝚒𝚌𝚊𝚜 𝚎𝚗 𝙺𝚊𝚕𝚒 𝙻𝚒𝚗𝚞𝚡.*

Kali Linux es la herramienta por Excelencia en Seguridad informática, la cual es Open Source y cuenta con una Suite de aplicaciones para aplicar Hacking Ético.

 En este curso te llevare paso por paso, por diferentes niveles (de principiante a experto) superando diferentes desafíos (CTF) mostrándote paso a paso cómo logró obtener el control de la máquina objetivo.
    `
}
exports.link51 = () => {
    return `*𝚂𝚎𝚐𝚞𝚛𝚒𝚍𝚊𝚍 𝙸𝚗𝚏𝚘𝚛𝚖á𝚝𝚒𝚌𝚊. 𝙿𝚛á𝚌𝚝𝚒𝚌𝚊𝚜 𝚎𝚗 𝙺𝚊𝚕𝚒 𝙻𝚒𝚗𝚞𝚡.*

https://mega.nz/folder/M8ozHK7D#egE3TlipvP7vHPxykT8Fhw/folder/YohXEKTC`
}
//---------------------------------------------------------------------------Curso51------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso52------------------------------------------------------------------------------------------------------//
exports.curso52 = () => {
    return `./cursos/52.jpg`
}
exports.texto52 = () => {
    return `*𝐈𝐧𝐭𝐫𝐨𝐝𝐮𝐜𝐜𝐢ó𝐧 𝐚𝐥 𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐨 𝐖𝐞𝐛 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐯𝐞 𝐜𝐨𝐧 𝐇𝐓𝐌𝐋 𝐲 𝐂𝐒𝐒*

𝙰𝚙𝚛𝚎𝚗𝚍𝚎 𝚕𝚘𝚜 𝚏𝚞𝚗𝚍𝚊𝚖𝚎𝚗𝚝𝚘𝚜 𝚍𝚎𝚕 𝙳𝚎𝚜𝚊𝚛𝚛𝚘𝚕𝚕𝚘 𝚆𝚎𝚋 𝙵𝚛𝚘𝚗𝚝𝚎𝚗𝚍
¡𝙻𝚕𝚎𝚟𝚊 𝚝𝚞 𝚍𝚒𝚜𝚎ñ𝚘 𝚊𝚕 𝚗𝚊𝚟𝚎𝚐𝚊𝚍𝚘𝚛! 𝙴𝚗 𝚎𝚜𝚝𝚎 𝚌𝚞𝚛𝚜𝚘, 𝙹𝚊𝚟𝚒𝚎𝚛 𝚄𝚜𝚘𝚋𝚒𝚊𝚐𝚊 𝚝𝚎 𝚎𝚗𝚜𝚎ñ𝚊𝚛á 𝚊 𝚌𝚛𝚎𝚊𝚛 𝚙á𝚐𝚒𝚗𝚊𝚜 𝚠𝚎𝚋 𝚌𝚘𝚗 𝚕𝚊𝚜 𝚑𝚎𝚛𝚛𝚊𝚖𝚒𝚎𝚗𝚝𝚊𝚜 𝚖á𝚜 𝚏𝚞𝚗𝚍𝚊𝚖𝚎𝚗𝚝𝚊𝚕𝚎𝚜: 𝙷𝚃𝙼𝙻 𝚢 𝙲𝚂𝚂. 𝙰𝚙𝚛𝚎𝚗𝚍𝚎𝚛á𝚜 𝚊 𝚎𝚜𝚌𝚛𝚒𝚋𝚒𝚛 𝚝𝚞 𝚙𝚛𝚘𝚙𝚒𝚘 𝚌ó𝚍𝚒𝚐𝚘 𝚢 𝚌𝚊𝚖𝚋𝚒𝚊𝚛á𝚜 𝚝𝚞 𝚏𝚘𝚛𝚖𝚊 𝚍𝚎 𝚟𝚎𝚛 (𝚢 𝚍𝚎 𝚍𝚒𝚜𝚎ñ𝚊𝚛) 𝚕𝚊 𝚠𝚎𝚋, 𝚎𝚗𝚝𝚎𝚗𝚍𝚒𝚎𝚗𝚍𝚘 𝚌ó𝚖𝚘 𝚏𝚞𝚗𝚌𝚒𝚘𝚗𝚊 𝚙𝚘𝚛 𝚍𝚎𝚗𝚝𝚛𝚘 𝚢 𝚌ó𝚖𝚘 𝚍𝚒𝚜𝚎ñ𝚊𝚛 𝚞𝚗𝚊 𝚠𝚎𝚋 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚒𝚟𝚎 𝚙𝚊𝚛𝚊 𝚚𝚞𝚎 𝚜𝚎𝚊 𝚖á𝚜 𝚎𝚏𝚎𝚌𝚝𝚒𝚟𝚊. 𝚈 𝚜𝚒 𝚎𝚕 𝚍𝚒𝚜𝚎ñ𝚘 𝚗𝚘 𝚎𝚜 𝚕𝚘 𝚝𝚞𝚢𝚘, 𝚎𝚜𝚝𝚎 𝚌𝚞𝚛𝚜𝚘 𝚙𝚞𝚎𝚍𝚎 𝚜𝚞𝚙𝚘𝚗𝚎𝚛 𝚞𝚗𝚊 𝚋𝚞𝚎𝚗𝚊 𝚋𝚊𝚜𝚎 𝚙𝚊𝚛𝚊 𝚌𝚘𝚖𝚎𝚗𝚣𝚊𝚛 𝚎𝚗 𝚎𝚕 𝚖𝚞𝚗𝚍𝚘 𝚍𝚎𝚕 𝙳𝚎𝚜𝚊𝚛𝚛𝚘𝚕𝚕𝚘 𝚆𝚎𝚋 𝙵𝚛𝚘𝚗?`
}
exports.link52 = () => {
    return `*𝐈𝐧𝐭𝐫𝐨𝐝𝐮𝐜𝐜𝐢ó𝐧 𝐚𝐥 𝐃𝐞𝐬𝐚𝐫𝐫𝐨𝐥𝐥𝐨 𝐖𝐞𝐛 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐯𝐞 𝐜𝐨𝐧 𝐇𝐓𝐌𝐋 𝐲 𝐂𝐒𝐒*

https://drive.google.com/drive/folders/1zNxDQPuDJXO-PKUvljYazxZmWIpLvICI`
}
//---------------------------------------------------------------------------Curso52------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------Curso53------------------------------------------------------------------------------------------------------//
exports.curso53 = () => {
    return `./cursos/53.jpg`
}
exports.texto53 = () => {
    return `*Android con WebServices*

En este curso enseñaremos cómo es que android puede funcionar con los webservices para lograr que una aplicación tenga comunicación con el mundo exterior por ejemplo con un servidor.`
}
exports.link53 = () => {
    return `*Android con WebServices*

https://mega.nz/folder/L8szzagZ#MtHFEts_EoYOzZf7ROlQQQ/folder/uksR2aTJ
    `
}
//---------------------------------------------------------------------------Curso53------------------------------------------------------------------------------------------------------//




