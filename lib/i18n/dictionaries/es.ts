// Spanish landing-page copy.
//
// Tone notes:
//   • Neutral B2B Spanish (works for ES + LATAM enterprise audiences).
//   • Informal "tu / tu equipo" — modern, premium tech tone, not "usted".
//   • Brand and product names are NOT translated (Aksum, CRM, Slack, etc.).
//   • Length is kept close to EN so the layout stays balanced.

import type { Dictionary } from "./en"

export const es: Dictionary = {
  // ─── Locale switcher ───────────────────────────────────────────────────────
  locale: {
    label: "Idioma",
    en: "EN",
    es: "ES",
    enLong: "English",
    esLong: "Español",
  },

  // ─── Header ────────────────────────────────────────────────────────────────
  header: {
    nav: {
      product: "Producto",
      whoItsBuiltFor: "Para quién está pensado",
      about: "Nosotros",
    },
    cta: "Solicitar Demo",
    mobile: {
      open: "Abrir menú",
      close: "Cerrar menú",
    },
    productMenu: {
      eyebrow: "Capacidades de la plataforma",
      pillars: {
        capture: {
          label: "Captura y Organiza",
          description:
            "Convierte reuniones, informes y conversaciones en conocimiento institucional conectado — con una capa de revisión que mantiene todo preciso.",
        },
        prepare: {
          label: "Prepara y Vende",
          description:
            "Llega a cada operación con más contexto. Historial de cuenta, visibilidad de relaciones e inteligencia comercial — listo antes de la reunión.",
        },
        activate: {
          label: "Activa y Publica",
          description:
            "Convierte la inteligencia interna en contenido externo — informes, newsletters, briefings para stakeholders y comunicación dirigida.",
        },
        connect: {
          label: "Conecta tu Workflow",
          description:
            "Lleva CRM, correo, contexto operativo y objetivos comerciales a un mismo entorno. Aksum se adapta a las herramientas que tu equipo ya usa.",
        },
      },
    },
    aboutMenu: {
      ourStory: "Nuestra historia",
      contact: "Contacto",
    },
  },

  // ─── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    badge: "Inteligencia para las organizaciones que mueven mercados",
    headline: "Lo que tu organización sabe, por fin puesto a trabajar.",
    subheadline:
      "Aksum transforma el conocimiento interno en ventaja comercial, claridad estratégica y comunicación dirigida — a la velocidad que las decisiones realmente requieren.",
    primaryCta: "Solicitar Demo",
  },

  // ─── Integrations band ─────────────────────────────────────────────────────
  integrations: {
    eyebrow: "Compatibilidad de plataforma",
    headline: "Conecta con las herramientas que tu equipo ya usa",
    description:
      "Diseñado para integrarse con el stack comercial y operativo sobre el que tu equipo ya trabaja — CRM, correo, calendario, documentos y colaboración — reunidos en una sola capa de inteligencia.",
  },

  // ─── Features (three editorial blocks) ─────────────────────────────────────
  features: {
    salesIntelligence: {
      eyebrow: "01 — Inteligencia Comercial",
      title: "Saber lo que ya se sabe.",
      description:
        "Aksum reúne cada interacción, señal y mención previa en tu organización — para que ninguna oportunidad empiece desde cero.",
    },
    strategicIntelligence: {
      eyebrow: "02 — Inteligencia Estratégica",
      title: "Saca a la luz las señales que tu equipo no tiene tiempo de leer.",
      description:
        "Aksum identifica patrones, temas emergentes y oportunidades poco atendidas en tu información interna — convirtiendo la sobrecarga en claridad estratégica.",
    },
    marketingActivation: {
      eyebrow: "03 — Activación de Marketing",
      title: "Publica con propósito.",
      description:
        "Aksum convierte la inteligencia procesada en contenido dirigido — para las personas adecuadas, en el momento adecuado — en outreach comercial, newsletters y comunicación con stakeholders.",
    },
  },

  // ─── Closing CTA + footer ──────────────────────────────────────────────────
  ctaFooter: {
    headline: "¿Listo para poner tu inteligencia a trabajar?",
    cta: "Solicitar Demo",
    copyright: "© 2026 Aksum Data",
    nav: {
      contact: "Contacto",
      privacy: "Política de Privacidad",
      terms: "Términos del Servicio",
    },
  },

  // ─── Cabecera de subpáginas compartida ─────────────────────────────────────
  shared: {
    breadcrumb: {
      platform: "Plataforma",
    },
    ctaStrip: {
      requestDemo: "Solicitar demo",
      explorePlatform: "Explorar la plataforma",
    },
    footerNav: {
      back: "← Volver a Aksum",
      requestDemo: "Solicitar demo →",
    },
    panelExplain: {
      whatYouAreLookingAt: "Qué estás viendo",
    },
    closing: {
      whatChanges: "Qué cambia",
      whyItMatters: "Por qué importa",
    },
  },

  // ─── Para quién está pensado ───────────────────────────────────────────────
  useCases: {
    metaTitle: "Para quién está pensado — Aksum",
    metaDescription:
      "Aksum está pensado para equipos donde el contexto importa y la información se fragmenta fácilmente — ventas, redacción, marketing y dirección.",
    eyebrow: "Casos de Uso",
    headline: "Para quién está pensado.",
    intro:
      "Aksum está pensado para equipos donde el contexto importa y la información se fragmenta con facilidad — donde lo que se sabe dentro de la organización rara vez llega a quienes más lo necesitan.",
    sales: {
      label: "01 — Equipos de Ventas",
      headline: "Llega a cada reunión sabiendo más que la sala.",
      body:
        "Historial de cuenta, conversaciones previas, contexto de relaciones y compromisos abiertos — disponibles antes de que empiece la llamada. Aksum ofrece a los equipos comerciales la capa de preparación que convierte las reuniones en avances reales.",
      imageAlt: "Paisaje de sabana al atardecer — Equipos de Ventas",
    },
    editorial: {
      label: "02 — Equipos Editoriales",
      headline: "Preserva el matiz. Saca a la luz el patrón.",
      body:
        "Las entrevistas, las conversaciones de campo y los intercambios con expertos contienen mucho más de lo que termina en la pieza final. Aksum ayuda a los equipos editoriales a retener lo dicho, identificar temas recurrentes entre fuentes y preparar la próxima conversación con todo el peso de lo anterior.",
      points: [
        "Continuidad temática entre entrevistas y proyectos",
        "Mejor preparación — basada en intercambios previos",
        "Que nada importante se pierda entre la conversación y su resultado",
      ] as readonly string[],
      imageAlt: "Ciudad africana al anochecer — Equipos Editoriales",
    },
    marketing: {
      label: "03 — Equipos de Marketing",
      headline: "Publica con autoridad, no por aproximación.",
      body:
        "La comunicación externa más creíble se apoya en lo que la organización realmente sabe — no en lo que se ensambla a último momento desde fuentes públicas. Aksum convierte la inteligencia interna en newsletters, briefings y contenido para stakeholders que carga peso real porque proviene de contexto real.",
      points: [
        "Una sola base de conocimiento interno — múltiples salidas por audiencia",
        "Contenido que refleja inteligencia organizativa genuina",
        "De señales dispersas a piezas de comunicación terminadas",
      ] as readonly string[],
      imageAlt: "Hub de inteligencia tropical al atardecer — Equipos de Marketing",
    },
    leadership: {
      label: "04 — Dirección y Estrategia",
      headline: "Decisiones apoyadas en todo lo que ya sabes.",
      body:
        "A los equipos directivos rara vez les falta información — les falta la infraestructura para usarla en el momento que cuenta. Aksum ofrece a directores de estrategia y ejecutivos visibilidad conectada sobre proyectos, relaciones y señales — para que sus decisiones se apoyen en toda la profundidad de lo que la organización ha reunido.",
      cards: [
        {
          label: "Claridad estratégica",
          body: "Detecta patrones entre proyectos y mercados antes de que se vuelvan obvios.",
        },
        {
          label: "Contexto conectado",
          body: "Cada relación, cuenta y señal en una sola vista accesible.",
        },
        {
          label: "Decisiones más rápidas",
          body: "De conocimiento fragmentado a una posición informada — sin equipo de briefing.",
        },
      ],
      imageAlt: "Puesto de datos en la estepa asiática — Dirección y Estrategia",
    },
    summary: [
      { audience: "Equipos de Ventas",      short: "Contexto antes de la reunión." },
      { audience: "Equipos Editoriales",    short: "Patrones a través de cada conversación." },
      { audience: "Equipos de Marketing",   short: "Autoridad desde la inteligencia interna." },
      { audience: "Dirección y Estrategia", short: "Visibilidad que sostiene decisiones." },
    ],
    cta: {
      headline: "Velo en tu propio contexto.",
      body: "Solicita una demo y te mostraremos cómo se ve Aksum para tu equipo.",
    },
  },

  // ─── Nuestra Historia ──────────────────────────────────────────────────────
  about: {
    metaTitle: "Nuestra Historia — Aksum",
    metaDescription:
      "Aksum nació de una observación simple: la información más valiosa dentro de una organización suele ser la menos utilizable.",
    eyebrow: "Nuestra Historia",
    headlineLine1: "Construido desde la curiosidad.",
    headlineLine2: "Probado por la realidad.",
    intro:
      "Aksum nació de una observación simple: la información más valiosa dentro de una organización suele ser la menos utilizable.",
    sections: {
      instinct: {
        label: "Instinto",
        body:
          "Siempre nos atrajo lo que viene después. Nuevas herramientas, nuevos sistemas, nuevas formas de trabajar — no por novedad, sino porque siempre nos resultó fácil ver los huecos que aparecen cuando el mundo cambia más rápido que el software que lo rodea.",
      },
      field: {
        label: "Campo",
        body:
          "Nuestra historia empezó en un viaje por Mozambique y Sudáfrica. Lo que comenzó como un viaje se volvió algo más valioso: ver de cerca cómo operan los equipos ambiciosos en entornos rápidos y de alta fricción, donde se crea conocimiento crítico constantemente pero rara vez se captura de forma reutilizable.",
      },
      shift: {
        label: "Giro",
        body:
          "Ese fue el momento en que Aksum tomó forma. Pensamos que las organizaciones no necesitaban más ruido, más dashboards ni más complejidad. Necesitaban un sistema capaz de convertir lo que ya saben en algo conectado, utilizable y comercialmente significativo.",
      },
      pattern: {
        label: "Patrón",
        body:
          "Veíamos el mismo problema en formas distintas. Las señales importantes vivían en reuniones, entrevistas, correos, conversaciones comerciales y documentos internos. Todos intuían su valor, pero casi nada se acumulaba. El conocimiento quedaba fragmentado. El contexto, local. Los equipos se movían más lento de lo que deberían.",
      },
      purpose: {
        label: "Propósito",
        body:
          "Eso es lo que estamos construyendo. Aksum transforma la información interna fragmentada en una capa utilizable de inteligencia — ayudando a los equipos a vender con más contexto, comunicar con más autoridad y decidir con mucha mayor claridad.",
      },
    },
    imageQuote: "La señal siempre estuvo ahí.",
    imageAlt: "Un puerto complejo al anochecer — el tipo de entorno donde nació Aksum",
    founders: {
      bodyMuted:
        "Somos tres builders con un instinto compartido por encontrar palancas en la complejidad. ",
      bodyEmphasis:
        "Aksum es nuestra forma de convertir ese instinto en algo útil para los equipos que operan donde la información más importa.",
      caption: "Co-Fundadores — Pablo, Carlos, Ventura",
      imageAlt: "El equipo fundador de Aksum — Pablo, Carlos, Ventura",
    },
  },

  // ─── Contacto ──────────────────────────────────────────────────────────────
  contact: {
    metaTitle: "Contacto — Aksum",
    metaDescription: "Ponte en contacto con el equipo de Aksum.",
    eyebrow: "Contacto",
    headline: "Hablemos.",
    body:
      "Para demos, alianzas, prensa o consultas generales, escríbenos directamente. Solemos responder en un día laborable.",
    requestDemo: "Solicitar demo",
    back: "← Volver a Aksum",
  },

  // ─── Solicitar demo ────────────────────────────────────────────────────────
  requestDemo: {
    metaTitle: "Solicitar Demo — Aksum",
    metaDescription:
      "Descubre cómo Aksum convierte el conocimiento de tu organización en inteligencia que impulsa decisiones. Reserva una demo personalizada.",
    eyebrow: "Solicitar demo",
    headline: "Aksum en acción.",
    body:
      "Cuéntanos sobre tu equipo y lo que estás resolviendo. Adaptaremos la sesión a tu contexto exacto.",
    questions: "¿Preguntas?",
    sideCallout: {
      headline: "¿Listo para dar forma al futuro?",
      body:
        "Las organizaciones que operan al borde de la complejidad necesitan inteligencia que avance tan rápido como ellas.",
      imageAlt: "Aksum — pensado para la frontera",
    },
    form: {
      firstName: "Nombre *",
      lastName: "Apellido *",
      email: "Email corporativo *",
      emailPlaceholder: "tu@empresa.com",
      phone: "Teléfono",
      phonePlaceholder: "Número de teléfono",
      countrySearch: "Buscar país o código…",
      noResults: "Sin resultados",
      company: "Empresa *",
      role: "Rol *",
      problem: "¿Qué buscas resolver? *",
      problemPlaceholder:
        "Cuéntanos los retos actuales y en qué te gustaría que Aksum te ayude.",
      message: "¿Algo más que quieras añadir?",
      messagePlaceholder:
        "Disponibilidad, tamaño de equipo o cualquier pregunta concreta — opcional.",
      sending: "Enviando…",
      submit: "Solicitar demo",
      footnote: "Te responderemos en un día laborable.",
    },
    success: {
      title: "Solicitud recibida.",
      body:
        "Te contactaremos en un día laborable para confirmar la demo y adaptar la sesión a tu contexto.",
    },
  },

  // ─── Subpáginas de Producto ────────────────────────────────────────────────
  product: {
    capture: {
      metaTitle: "Captura y Organiza — Aksum",
      metaDescription:
        "Lleva cada conversación, informe y grabación a una memoria de trabajo conectada. Aksum convierte el material en bruto en conocimiento organizativo reutilizable.",
      crumb: "Captura y Organiza",
      eyebrow: "Captura y Organiza",
      headlineLine1: "Todo lo que tu equipo sabe,",
      headlineLine2: "en un solo lugar que funciona.",
      lead:
        "Aksum reúne grabaciones, informes y conversaciones en un sistema único y conectado — para que nada importante se quede atrás, y todo sea más fácil de encontrar, usar y construir encima.",
      step1: {
        eyebrow: "01 — Tráelo",
        title: "Cualquier formato con el que tu equipo trabaja.",
        body:
          "Grabaciones, PDFs, transcripciones, notas de reunión — Aksum acepta los formatos que tu equipo ya produce. No hace falta reformatear nada antes de que el valor empiece.",
      },
      step2: {
        eyebrow: "02 — Revisa y refina",
        title: "Precisión donde más cuenta.",
        body:
          "Aksum está diseñado para preservar el matiz. Cuando los detalles importan, la plataforma ofrece a tu equipo una manera clara y rápida de verificar lo capturado — para que puedas confiar en lo que tienes entre manos.",
      },
      step3: {
        eyebrow: "03 — Conecta y enlaza",
        title: "Información nueva, conectada con todo lo demás.",
        body:
          "Cada fuente que añades pasa a formar parte de una memoria organizativa creciente. Personas, organizaciones y temas se reconocen y enlazan con lo que tu equipo ya sabe — para que el contexto se acumule con el tiempo.",
      },
      benefits: [
        {
          title: "Lleva cada conversación a una sola memoria de trabajo",
          body:
            "Reuniones, grabaciones de campo, informes escritos y entrevistas con expertos — todo estructurado, buscable y conectado con todo lo que tu equipo ya sabe.",
        },
        {
          title: "Conserva lo importante antes de que se pierda",
          body:
            "El contexto crítico rara vez sobrevive en cadenas de email o notas personales. Aksum lo captura en origen y lo mantiene disponible para quien lo necesite después.",
        },
        {
          title: "Revisa con confianza cuando los detalles cuentan",
          body:
            "Cuando la precisión importa, Aksum hace fácil verificar y afinar lo capturado — para que tu equipo pueda confiar en aquello con lo que trabaja.",
        },
        {
          title: "Convierte el material en bruto en contexto conectado",
          body:
            "Cada fuente que incorporas pasa a formar parte de una memoria organizativa en crecimiento — enlazada con las personas, organizaciones y temas que ya existen en tu sistema.",
        },
      ],
      cta: {
        headline: "¿Listo para poner tu conocimiento a trabajar?",
        body: "Descubre cómo Aksum captura y conecta lo que tu equipo ya sabe.",
      },
    },
    prepare: {
      metaTitle: "Prepara y Vende — Aksum",
      metaDescription:
        "Llega a cada reunión con más contexto. Aksum saca a la luz lo que tu equipo ya sabe — sobre cuentas, relaciones y conversaciones previas — para que prepares con inteligencia real.",
      crumb: "Prepara y Vende",
      eyebrow: "Prepara y Vende",
      headlineLine1: "Mejor preparación",
      headlineLine2: "lleva a mejores",
      headlineLine3: "conversaciones.",
      lead:
        "El trabajo más importante ocurre antes de la reunión. Aksum ofrece a los equipos comerciales el contexto, la memoria de cuenta y la visibilidad de relaciones que necesitan para entrar a cada conversación desde una posición más fuerte.",
      copilot: {
        eyebrow: "01 — Aksum Copilot",
        title: "Memoria de cuenta, a demanda.",
        body:
          "El Copilot razona sobre todo lo que tu equipo ha capturado — reuniones, briefings, hilos de seguimiento, conversaciones grabadas — y saca a la luz lo relevante para la cuenta, la relación o el momento.",
        benefits: [
          {
            title: "Memoria de cuenta que se acumula",
            body:
              "Cada conversación, briefing e hilo de seguimiento pasa a formar parte de un registro creciente. Aksum saca a la luz lo relevante antes de que lo pidas.",
          },
          {
            title: "Lo que no hay que repetir",
            body:
              "Sabe lo que la cuenta ya escuchó, qué funcionó y qué no — para que cada acercamiento aporte algo nuevo.",
          },
          {
            title: "Cabos sueltos, a la vista automáticamente",
            body:
              "Solicitudes sin responder, hilos sin cerrar y compromisos que nunca se retomaron — Aksum los encuentra antes de que la reunión lo haga.",
          },
          {
            title: "Inteligencia anclada en contexto previo",
            body:
              "Cada respuesta se apoya en lo que tu equipo ha registrado realmente — no en consejos genéricos, sino en señales concretas de conversaciones reales.",
          },
        ],
      },
      graph: {
        eyebrow: "02 — Network Explorer",
        titleLine1: "La estructura detrás",
        titleLine2: "de cada relación.",
        body:
          "El Network Explorer mapea cada entidad con la que tu equipo se ha cruzado — personas, empresas, gobiernos, regiones y documentos internos — y muestra cómo se conectan. El grafo es la columna estructural detrás de las respuestas del Copilot.",
        explainBody:
          "Cada nodo de este grafo corresponde a una entidad real que aparece en fuentes internas — entrevistas, briefings, notas de reunión e hilos de seguimiento. Las conexiones no se infieren de datos públicos. Se trazan desde lo que tu equipo ha registrado. Haz clic en cualquier nodo para ver con qué se conecta.",
        benefits: [
          {
            title: "Ver lo que conecta antes de que sea evidente",
            body:
              "Las relaciones entre personas, empresas e instituciones rara vez son visibles en un único documento. El grafo hace legible la estructura.",
          },
          {
            title: "El puente que cambia la conversación",
            body:
              "Un contacto compartido, una relación previa, una institución conectada — el grafo saca a la luz el camino que hace más fuerte el acercamiento.",
          },
          {
            title: "Contexto sobre toda la cuenta",
            body:
              "Cada entidad de tu workspace está conectada con todo lo que toca. El grafo es el mapa de lo que tu organización realmente sabe.",
          },
          {
            title: "Memoria estructural detrás de cada respuesta",
            body:
              "Cuando el Copilot saca a la luz un insight, el grafo te muestra por qué importa — y quién más está conectado a él.",
          },
        ],
      },
      closing: [
        {
          stat: "Cada reunión",
          label: "con todo el contexto de cuenta",
          body:
            "No un resumen de la última llamada. La foto completa — a través de cada conversación, documento y relación que tu equipo haya registrado.",
        },
        {
          stat: "Menos suposiciones",
          label: "antes de las conversaciones clave",
          body:
            "Saber qué le importa a la cuenta, qué ya escuchó y dónde está la verdadera oportunidad — antes de que empiece la conversación.",
        },
        {
          stat: "Memoria dispersa",
          label: "convertida en preparación comercial",
          body:
            "Información que vive en bandejas, notas personales y briefings olvidados se vuelve un activo compartido, buscable y útil para vender.",
        },
      ],
      cta: {
        headline: "¿Listo para llegar a cada reunión preparado?",
        body: "Descubre cómo Aksum saca a la luz lo que tu equipo ya sabe.",
      },
    },
    activate: {
      metaTitle: "Activa y Publica — Aksum",
      metaDescription:
        "Convierte la inteligencia interna en piezas pulidas, listas para circular. Aksum transforma lo que tu organización sabe en newsletters, briefings de comité, memos para inversores e informes estratégicos — estructurados para la audiencia y anclados en el contexto interno.",
      crumb: "Activa y Publica",
      eyebrow: "Activa y Publica",
      headlineLine1: "Inteligencia",
      headlineLine2: "lista para circular.",
      lead:
        "Aksum convierte lo que tu organización sabe en piezas pulidas y estructuradas — newsletters, briefings de comité, memos para inversores e informes estratégicos — cada una pensada para su audiencia y apoyada en el contexto interno.",
      output: {
        eyebrow: "01 — Formatos de salida",
        titleLine1: "La misma inteligencia,",
        titleLine2: "pensada para cada audiencia.",
        body:
          "De un briefing conciso a un dossier de comité — Aksum estructura el conocimiento interno en el formato que cada audiencia realmente necesita, sin perder el rigor del material de origen.",
        benefits: [
          {
            title: "Una base de conocimiento, muchas audiencias",
            body:
              "La misma inteligencia interna puede tomar la forma de un briefing de comité, un memo para inversores, una newsletter para stakeholders o una revisión interna — cada una estructurada para un lector distinto, sin empezar de cero.",
          },
          {
            title: "Publica con autoridad, no por improvisación",
            body:
              "Cada pieza se apoya en lo que tu organización ha registrado realmente. La estructura, el lenguaje y las afirmaciones rastrean a fuentes internas reales.",
          },
          {
            title: "Acorta la distancia entre señal y comunicación",
            body:
              "La inteligencia que vive en documentos internos y notas de reunión rara vez llega a quienes la necesitan. Aksum cierra esa distancia — del contexto capturado a la pieza terminada.",
          },
          {
            title: "Documentos que tu equipo realmente puede enviar",
            body:
              "No borradores que necesitan reescritura. No resúmenes que pierden el matiz. Piezas listas para circular — interna o externamente — sin un segundo pase.",
          },
        ],
      },
      report: {
        eyebrow: "02 — Informes estratégicos",
        titleLine1: "Documentos que cargan",
        titleLine2: "el peso de lo que sabes.",
        body:
          "Aksum produce informes de inteligencia sólidos y estructurados — revisiones anuales, panoramas sectoriales, memorandos de inversión — apoyados en fuentes internas y listos para compartir con consejos, inversores o stakeholders senior.",
        explainBody:
          "Cada sección de este informe — el resumen ejecutivo, las señales clave, las implicaciones, las acciones recomendadas y el anexo — se apoya en fuentes internas reales. El documento no es una plantilla rellena con texto de relleno. Es una síntesis estructurada de lo que una organización ha reunido realmente, formateada para circular.",
        benefits: [
          {
            title: "Profundidad estratégica, no cobertura superficial",
            body:
              "Un informe de Aksum no es un resumen de información pública. Es una síntesis de lo que tu equipo ha reunido — conversaciones, documentos, briefings y análisis interno — estructurada en un documento que comunica autoridad.",
          },
          {
            title: "Adaptado al lector, no a la fuente",
            body:
              "La misma inteligencia puede presentarse como resumen ejecutivo para el consejo, revisión detallada para el comité de inversiones, o panorama sectorial para stakeholders externos — cada versión calibrada a su audiencia.",
          },
          {
            title: "Con fuentes referenciadas y rastreables",
            body:
              "Cada afirmación de un informe de Aksum apunta a una fuente interna concreta. El anexo no es decoración — es la base de la credibilidad.",
          },
          {
            title: "Listos para circular sin revisión",
            body:
              "La superficie de informes produce documentos estructuralmente completos, editorialmente coherentes y listos para compartir — no material en bruto que necesita un equipo de comunicación para terminarse.",
          },
        ],
      },
      closing: [
        {
          stat: "De la señal",
          label: "a la pieza terminada",
          body:
            "La inteligencia que vive en documentos internos y notas rara vez llega a quienes la necesitan. Aksum acorta la distancia entre lo que tu equipo sabe y lo que puede comunicar.",
        },
        {
          stat: "Una sola fuente",
          label: "muchas audiencias",
          body:
            "La misma base de conocimiento interno produce un briefing de comité, un memo para inversores y una newsletter para stakeholders — cada una estructurada para un lector distinto, sin reconstruir desde cero.",
        },
        {
          stat: "Anclado",
          label: "en contexto interno",
          body:
            "Cada pieza rastrea a una fuente interna real. La autoridad no viene del formato, sino de la profundidad de lo que tu organización ha reunido realmente.",
        },
      ],
      cta: {
        headline: "¿Listo para poner tu inteligencia a trabajar?",
        body: "Descubre cómo Aksum convierte el conocimiento interno en piezas que tu equipo realmente puede usar.",
      },
    },
    connect: {
      metaTitle: "Conecta tu Workflow — Aksum",
      metaDescription:
        "Lleva el contexto comercial, los hilos de comunicación y la inteligencia de proyecto a un mismo entorno operativo. Aksum conecta las señales con las que los equipos ya trabajan — para que la inteligencia no esté aislada de la ejecución.",
      crumb: "Conecta tu Workflow",
      eyebrow: "Conecta tu Workflow",
      headlineLine1: "Inteligencia conectada",
      headlineLine2: "con cómo trabajas.",
      lead:
        "Aksum reúne las conversaciones, los objetivos y el contexto sobre los que los equipos comerciales ya se apoyan — para que la inteligencia no esté aislada de las decisiones y la ejecución que debería sostener.",
      comms: {
        eyebrow: "01 — Comunicaciones",
        titleLine1: "Cada conversación,",
        titleLine2: "conectada con su contexto.",
        body:
          "Hilos de cuenta, compromisos de seguimiento y decisiones tomadas por correo forman parte del mismo contexto de trabajo que tu inteligencia — visibles para todo el equipo, enlazados con la cuenta y listos antes de la próxima conversación.",
        benefits: [
          {
            title: "Continuidad en cada conversación",
            body:
              "Cadenas de email, compromisos de seguimiento y decisiones de cuenta forman parte del mismo contexto de trabajo que tu inteligencia — no una bandeja aparte que nadie revisa antes de una reunión.",
          },
          {
            title: "Contexto compartido, no memoria personal",
            body:
              "Cuando alguien retoma un hilo, ve lo que ya se discutió, lo que se prometió y lo que la cuenta ha dicho — sin pedirle a nadie que le haga un briefing.",
          },
          {
            title: "Seguimientos que no se caen",
            body:
              "Compromisos abiertos, preguntas sin responder y solicitudes pendientes son visibles en el contexto de cuenta — no enterrados en la carpeta de enviados de alguien.",
          },
          {
            title: "Comunicación conectada con lo que importa",
            body:
              "Cada hilo está enlazado con la cuenta, el proyecto y la inteligencia que tu equipo ha reunido. El contexto no tiene que reconstruirse antes de cada llamada.",
          },
        ],
      },
      dashboard: {
        eyebrow: "02 — Contexto de proyecto",
        titleLine1: "Objetivos, señales y",
        titleLine2: "fuentes en una sola vista.",
        body:
          "La vista de proyecto de Aksum muestra no solo lo acordado, sino también lo reunido — objetivos de ingresos, avance de operaciones, contexto de equipo y todo el rango de fuentes que alimentan el proyecto. Una vista compartida de la realidad operativa.",
        explainBody:
          "Esta es una vista de proyecto en uso — no un dashboard de reporting. Las cifras de ingresos, las etapas de operación, los miembros del equipo y los contadores de fuentes son contexto vivo del proyecto Angola 2025. La pestaña Sources muestra cada entrevista, correo, nota de reunión e informe que alimenta la inteligencia del proyecto. Nada es estático ni decorativo.",
        benefits: [
          {
            title: "Objetivos y señales en un mismo lugar",
            body:
              "Metas de ingresos, avance de operaciones y la inteligencia que alimenta el proyecto conviven en una sola vista — no repartidas entre un CRM, una hoja de cálculo y una carpeta de documentos que nadie mantiene en sincronía.",
          },
          {
            title: "Visibilidad de proyecto más allá de campos estáticos",
            body:
              "La vista de proyecto de Aksum muestra no solo lo acordado, sino lo reunido — reuniones, correos, entrevistas y notas — para que el equipo trabaje desde una foto completa.",
          },
          {
            title: "Una sola vista compartida de la realidad del proyecto",
            body:
              "Cada miembro del equipo ve el mismo contexto: las operaciones, la actividad, las fuentes y las personas. El conocimiento operativo no vive en la cabeza de una sola persona.",
          },
          {
            title: "Inteligencia conectada con la ejecución",
            body:
              "La información que tu equipo captura alimenta directamente la vista de proyecto — para que la distancia entre lo que sabes y aquello sobre lo que actúas sea lo más corta posible.",
          },
        ],
      },
      closing: [
        {
          stat: "Un solo contexto",
          label: "no cinco herramientas distintas",
          body:
            "Conversaciones, objetivos, inteligencia y contexto de equipo conviven en el mismo entorno. La foto operativa está completa sin saltar entre sistemas.",
        },
        {
          stat: "Menos fragmentación",
          label: "entre equipos y fuentes",
          body:
            "Cuando todos trabajan desde la misma vista de proyecto, las decisiones se apoyan en un contexto compartido — no en quien estuvo en la última llamada.",
        },
        {
          stat: "Más cerca de la ejecución",
          label: "de la señal a la acción",
          body:
            "La distancia entre lo que tu equipo sabe y aquello sobre lo que actúa se acorta cuando la inteligencia, la comunicación y los objetivos comerciales están conectados.",
        },
      ],
      cta: {
        headline: "¿Listo para conectar tu contexto operativo?",
        body: "Descubre cómo Aksum reúne inteligencia y ejecución en un mismo entorno.",
      },
    },
  },
}
