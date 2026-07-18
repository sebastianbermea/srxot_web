import img4 from './assets/images/banners/BottomBanner2.jpg';

import icon1 from './assets/icons/party_icon.svg';
import icon2 from './assets/icons/reunion_icon.svg';
import icon3 from './assets/icons/solo_icon.svg';
import icon4 from './assets/icons/rules_icon.svg';



export const costoEnvioGratis = 1099;
export const MAX_TOTAL_CART = 32;

export const img_data = [

    {
        cover: img4,
        title: "¡Comparte tu experiencia!",
        description: "Sube tu experiencia a instagram y etiquetanos para participar en nuestras dinamicas y sorteos, siguenos para no perderte nada. Comenta que otro reto te gustaria que incluyeramos en el #premioocastigo",
    },
]

export const premio_categories = [
    {
        title: "FIESTA",
        icon: icon1,
    },
    {
        title: "REUNION",
        icon: icon2,
    },
    {
        title: "SOLO",
        icon: icon3,
    },
    {
        title: "REGLAS",
        icon: icon4,
    },
]

import arandano from './assets/images/flavors/Arandano.png';
import chile from './assets/images/flavors/Chile.png';
import coco from './assets/images/flavors/Coco.png';
import dragonfruit from './assets/images/flavors/dragonfruit.png';
import fresa from './assets/images/flavors/Fresa.png';
import granada from './assets/images/flavors/Granada.png';
import guayaba from './assets/images/flavors/Guayaba.png';
import lima from './assets/images/flavors/Lima.png';
import limon from './assets/images/flavors/Limon.png';
import mango from './assets/images/flavors/Mango.png';
import menta from './assets/images/flavors/Menta.png';
import naranja from './assets/images/flavors/Naranja.png';
import pina from './assets/images/flavors/Pina.png';
import sandia from './assets/images/flavors/Sandia.png';
import toronja from './assets/images/flavors/Toronja.png';

export const flavors_data = {
    "arandano": {
        "title": "Arándano R.",
        "image": arandano,
        "back_color": '#b8324833', // 20% de opacidad
        "out_color": '#851a2c'
    },
    "chile": {
        "title": "Chile",
        "image": chile,
        "back_color": '#c94c4c33',
        "out_color": '#962d2d'
    },
    "coco": {
        "title": "Coco",
        "image": coco,
        "back_color": '#d2c2b433',
        "out_color": '#8a7360'
    },
    "dragonfruit": {
        "title": "Dragonfruit",
        "image": dragonfruit,
        "back_color": '#d64c8d33',
        "out_color": '#a82c65'
    },
    "fresa": {
        "title": "Fresa",
        "image": fresa,
        "back_color": '#e0536833',
        "out_color": '#b02e41'
    },
    "granada": {
        "title": "Granada",
        "image": granada,
        "back_color": '#ad3c4a33',
        "out_color": '#7a222d'
    },
    "guayaba": {
        "title": "Guayaba",
        "image": guayaba,
        "back_color": '#e6939a33',
        "out_color": '#bd6068'
    },
    "lima": {
        "title": "Lima",
        "image": lima,
        "back_color": '#a2c75433',
        "out_color": '#72942c'
    },
    "limon": {
        "title": "Limón",
        "image": limon,
        "back_color": '#7cb05d33',
        "out_color": '#4d8031'
    },
    "mango": {
        "title": "Mango",
        "image": mango,
        "back_color": '#f2a93b33',
        "out_color": '#c27c15'
    },
    "menta": {
        "title": "Menta",
        "image": menta,
        "back_color": '#7ec4ad33',
        "out_color": '#4c917b'
    },
    "naranja": {
        "title": "Naranja",
        "image": naranja,
        "back_color": '#e8833a33',
        "out_color": '#bd5c19'
    },
    "pina": {
        "title": "Piña",
        "image": pina,
        "back_color": '#f7d35433',
        "out_color": '#c7a324'
    },
    "sandia": {
        "title": "Sandía",
        "image": sandia,
        "back_color": '#e35d6a33',
        "out_color": '#b3323e'
    },
    "toronja": {
        "title": "Toronja",
        "image": toronja,
        "back_color": '#f08a7333',
        "out_color": '#c45e47'
    }
};
export const game = [
    //Fiesta
    [
        // 1
        [
            "Invitale un shot a alguien desconcido.",
            "Puedes usar solo una mano durante 15 minutos.",
            "Intercambia tus bebidas con alguien.",
            "Habla con alguien desconocido con la lengua de fuera.",
            "Deja que alguien tome una foto y subela como historia."
        ],
        // 2
        [
            "Baila como loco durante 30 segundos.",
            "Grita de dolor y despues actua como si nada, no des contexto.",
            "Cuenta un chiste, si nadie se rie, duplica tus segundos de shot.",
            "Reparte tus segundos a alguien mas.",
            "Intenta hablar en otro idioma por 15 minutos."
        ],
        // 3
        [
            "Logra que alguien desconocido te de un trago de su bebida.",
            "Consigue un numero de telefono.",
            "Invitale un shot a alguien desconcido.",
            "Di la peor frase de ligue que se te ocurra a un desconocido.",
            "Te salvaste."
        ],
        // 4
        [
            "Deja que alguien tome una foto y subela como historia.",
            "Florero! Todos te sirven de sus bebidas en un vaso y acabatelo.",
            "Consigue un instagram.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Los demas decidiran tu reto."
        ],
        // 5
        [
            "Canta una cancion a todo pulmon.",
            "Te salvate.",
            "Actua como alguien que los demas decidan.",
            "Cogea durante media hora.",
            "Llama a alguien, si no contesta, tus segundos son dobles."
        ],
        // 6
        [
            "Consigue un instagram.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles",
            "Tomate una foto con alguien desconocido.",
            "Haz que alguien tome tus segundos, o seran dobles para ti."
        ],
        // 7
        [
            "Deja que alguien grabe y subelo como historia.",
            "Di la peor frase de ligue que se te ocurra a un desconocido.",
            "Llama alguien que los demas decidan.",
            "Si nos sigues en instagram @sr.xot, reparte tus segundos.",
            "Toma un fondo."
        ],
        // 8
        [
            "Mojate con agua.",
            "Convence a alguien que te de 100 pesos",
            "Baila como Michael Jackson",
            "Deja que alguien tome una foto y subela como historia.",
            "Consigue tres abrazos en menos de un minuto o tus segundos son dobles."
        ],
        // 9
        [
            "Te salvaste.",
            "Invitale un shot a alguien desconcido.",
            "Los demas decidiran tu reto.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Mandale a alguien un shot por instagram."
        ],
        // 10
        [
            "Deja que alguien tome una foto y subela como historia.",
            "Saluda a alguien como si lo conocieras.",
            "Si nos sigues en instagram @sr.xot, reparte tus segundos.",
            "Logra que alguien desconocido te de un trago de su bebida.",
            "Habla con un desonocido sin poder decir no."
        ],
        // 11
        [
            "Los demas decidiran tu reto.",
            "Deja que alguien grabe y subelo como historia.",
            "Cuentale a alguien un chiste que los demas te digan.",
            "Saluda a alguien y vete sin mas.",
            "Actua como loco frente algun desconocido."
        ],
        // 12
        [
            "Tomate una foto con alguien desconocido.",
            "Invitale un shot a alguien desconcido.",
            "Consigue un nuevo seguidor en instagram, o tus segundos seran dobles.",
            "Los demas decidiran tu reto.",
            "Saluda a alguien como si lo conocieras."
        ]

    ],
    //Reunion
    [
        // 1
        [
            "Los demas decidiran tu reto",
            "No puedes ver a nadie a los ojos durante 15 minutos.",
            "Llama a alguien que los demas decidan.",
            "Deja que alguien tome una foto y subela como historia.",
            "Habla con la lengua de fuera durante 15 minutos"
        ],
        // 2
        [
            "Baila como loco durante 30 segundos.",
            "Intercambia tus bebidas con alguien.",
            "Reparte tus segundos a alguien mas.",
            "No puedes hablar durante 15 minutos",
            "Mala suerte... Tus segundos ahora son dobles."
        ],
        // 3
        [
            "Llama a alguien, si no contesta, tus segundos son dobles.",
            "No puedes hablar por los siguientes 15 minutos",
            "Elige al mas guap@ de la reunion.",
            "Cuenta un chiste, si nadie se rie, duplica tus segundos de shot.",
            "Te salvaste."
        ],
        // 4
        [
            "Deja que alguien grabe y subelo como historia.",
            "Deja que alguien te cachetee.",
            "Intenta hablar en otro idioma por 15 minutos.",
            "Los demas decidiran tu reto.",
            "Florero! Todos te sirven de sus bebidas en un vaso y acabatelo."
        ],
        // 5
        [
            "No puedes usar los dedos pulgares por 30 minutos.",
            "Haz un fondo de tu bebida.",
            "Di los nombres completos de todos o tus segundos son dobles.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Si nos sigues en instagram @sr.xot, reparte tus segundos."
        ],
        // 6
        [
            "Manten los ojos cerrados por 5 minutos.",
            "Cuenta una verdad y dos mentiras, si adivinan cual es cual, tus tragos son dobles.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles.",
            "Llama a tu ex.",
            "Actua como alguien que los demas decidan."
        ],
        // 7
        [
            "Di el cunpleaños de almenos 2 personas o tus segundos son dobles.",
            "Llama alguien que los demas decidan.",
            "Si nos sigues en instagram @sr.xot, reparte tus segundos.",
            "Habla lento por 30 minutos.",
            "Responde una pregunta que hagan los demas o tus segundos son dobles."
        ],
        // 8
        [
            "Deja a alguien mandar un mensaje desde tu celular",
            "Si ves a alguien a los ojos en los proximos 15 minutos debes dar un trago.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Da un shot por cada persona no sigues en insta.",
            "Di la edad de todos o tus segundos son dobles."
        ],
        // 9
        [
            "Los demas decidiran tu reto.",
            "Cuenta una verdad y dos mentiras, si adivinan cual es cual, tus tragos son dobles.",
            "Deja que alguien tome una foto y subela como historia.",
            "Si dices 'no' en los proximos 15 minutos debes dar un trago.",
            "Mandale a alguien un shot por instagram."
        ],
        // 10
        [
            "Adivina la temperatura o tus tragos son dobles.",
            "Deja que alguien grabe y subelo como historia.",
            "Tira una moneda, si adivinas reparte tus segundos, si no, son dobles.",
            "Verdad o reto contra todos.",
            "Los demas eligiran un numero entre 1 y 3, si lo adivinas, te salvas."
        ],
        // 11
        [
            "Si dices 'si' en los proximos 15 minutos debes dar un trago.",
            "Mandale los segundos a alguien mas.",
            "Los demas decidiran tu reto.",
            "Responde una pregunta que hagan los demas o tus segundos son dobles.",
            "Florero! Todos te sirven de sus bebidas en un vaso y acabatelo."
        ],
        // 12
        [
            "Verdad o reto contra todos.",
            "Deja a alguien mandar un mensaje desde tu celular.",
            "Deja que alguien tome una foto y subela como historia.",
            "Los demas decidiran tu reto.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles."
        ]

    ],
    //Solo
    [
        // 1
        [
            "Llama a tu ex.",
            "Sube una historia haciendo el tonto.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles.",
            "Tira una moneda, si adivinas te salvas, si no, tomas doble",
            "Si tu edad es par, tomas doble."
        ],
        // 2
        [
            "Si ya bebiste esta semana, segundos dobles.",
            "Haz un fondo de tu bebida.",
            "Si durante el mes tomaste sr xot, te salvas",
            "Si estas esperando a alguien, segundos dobles.",
            "Si nos sigues en instagram @sr.xot, te salvas."
        ],
        // 3
        [
            "Adivina la temperatura o tus segundos son dobles.",
            "Mala suerte... Tus segundos ahora son dobles.",
            "Llama a alguien y no digas nada.",
            "Responde a la tercera historia en instagram con un emoji.",
            "Si es fin de semana, segundos dobles."
        ],
        // 4
        [
            "Comenta la primera publicacion de instagram que veas.",
            "No puedes usar los dedos pulgares por 30 minutos.",
            "Pon una cancion a todo volumen.",
            "Llama a un amig@ si no contesta, los segundos son dobles.",
            "Si no hiciste ejercicio este mes, segundos dobles."
        ],
        // 5
        [
            "Si tienes una aplicacion de citas, segundos dobles.",
            "Haz un fondo de tu bebida.",
            "Llama a alguien y habla en otro idioma.",
            "Graba una historia actuando como loco.",
            "Si es tu primera vez con sr xot, segundos dobles"
        ],
        // 6
        [
            "Entra en instagram y reacciona a las primeras 5 historias.",
            "Si son antes de las 10 pm, segundos dobles.",
            "Sube una historia haciendo el tonto.",
            "Si durante el mes tomaste sr xot, te salvas.",
            "Si estas esperando a alguien, segundos dobles."
        ],
        // 7
        [
            "Llama a alguien y no digas nada.",
            "Llama a alguien y finge estar en peligro.",
            "Adivina la temperatura o tus segundos son dobles.",
            "Si estas en una relacion, segundos dobles.",
            "Llama a la penultima persona con la que chateaste."
        ],
        // 8
        [
            "Te salvaste.",
            "Entra en instagram y reacciona a las primeras 5 historias.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles.",
            "Responde a la tercera historia en instagram con un emoji.",
            "Si tuviste una relacion este año, segundos dobles."
        ],
        // 9
        [
            "Si son antes de las 10 pm, segundos dobles.",
            "Sube una historia haciendo el tonto.",
            "Si tu nombre empieza con una vocal, segundos dobles.",
            "Sube una historia tomando un shot.",
            "Llama a alguien y habla en otro idioma."
        ],
        // 10
        [
            "Si es fin de semana, segundos dobles.",
            "Si durante el mes tomaste sr xot, te salvas.",
            "Llama a alguien random, si conoce sr xot, te salvas.",
            "Responde a la tercera historia en instagram con un emoji.",
            "Mala suerte... Tus segundos ahora son dobles."
        ],
        // 11
        [
            "Si ya bebiste esta semana, segundos dobles.",
            "Llama a un amig@ si no contesta, los segundos son dobles.",
            "Te salvaste.",
            "Llama a alguien y no digas nada.",
            "Si tienes una aplicacion de citas, segundos dobles."
        ],
        // 12
        [
            "Sube una historia tomando un shot.",
            "Si no nos sigues en instagram @sr.xot, tus segundos son dobles.",
            "Si estas esperando a alguien, segundos dobles.",
            "Si tu nombre termina en una vocal, segundos dobles.",
            "Entra en instagram y reacciona a las primeras 5 historias."
        ]

    ],
    //Reglas
    [
        // 1
        [
            "Yo nunca nunca, 5 dedos.",
            "Historia.",
            "Gira la botella, verdad o reto.",
            "Categoria: Autos.",
            "Todos escogeran un reto para ti."
        ],
        // 2
        [
            "Categoria: Peliculas.",
            "Fui... al Zoologico.",
            "Florero.",
            "Hombres toman",
            "17."
        ],
        // 3
        [
            "Preguntas.",
            "Categoria: Series.",
            "Gira la botella, verdad o reto.",
            "Yo nunca nunca, 5 dedos.",
            "Palabra prohibida."
        ],
        // 4
        [
            "Todos escogeran un reto para ti.",
            "Categoria: Actores.",
            "No te rias!",
            "Yo nunca nunca, 3 dedos.",
            "Fui... a una fiesta."
        ],
        // 5
        [
            "Shot xot.",
            "Categoria: Marcas de cevezas.",
            "Palabra prohibida.",
            "Historia.",
            "Regla de oro."
        ],
        // 6
        [
            "Yo nunca nunca, 5 dedos.",
            "Shot xot.",
            "Cascada.",
            "Categoria: Libros.",
            "Gira la botella, verdad o reto."
        ],
        // 7
        [
            "Florero.",
            "Categoria: Paises.",
            "Preguntas.",
            "El/La mas atractiv@.",
            "Fui... al Mercado."
        ],
        // 8
        [
            "Mujeres toman.",
            "El/La mas joven toma.",
            "Gira la botella, verdad o reto.",
            "Categoria: Animales.",
            "Shot xot."
        ],
        // 9
        [
            "Yo nunca nunca, 3 dedos.",
            "Shot xot.",
            "Categoria: Equipos de Futbol.",
            "Palabra prohibida.",
            "El/La mas viej@ toma."
        ],
        // 10
        [
            "Categoria: Equipos de Baseball.",
            "Todos escogeran un reto para ti.",
            "Historia.",
            "Regla de oro.",
            "Gira la botella, verdad o reto."
        ],
        // 11
        [
            "Gira la botella, verdad o reto.",
            "Categoria: Podcasts.",
            "No te rias!",
            "Todos toman.",
            "Yo nunca nunca, 5 dedos."
        ],
        // 12
        [
            "17.",
            "Categoria: Universidades.",
            "Yo nunca nunca, 3 dedos.",
            "Fui... de viaje.",
            "Shot xot."
        ]

    ]

];

