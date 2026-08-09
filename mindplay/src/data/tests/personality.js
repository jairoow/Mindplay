/**
 * Test de personalidad — "¿Qué tipo de personalidad tienes?"
 * 15 preguntas basadas en escenarios cotidianos (fiestas, dinero, trabajo,
 * conflictos, presión...). Cada opción hace dos cosas a la vez:
 *  - `weight`: suma puntos a uno de los 8 arquetipos (decide quién gana)
 *  - `dimensions`: suma puntos a rasgos medibles reales (disciplina, empatía...)
 * Las estadísticas que ve el usuario en el resultado salen de `dimensions`,
 * normalizadas 0-100 según el máximo posible en este test: no son números
 * fijos, se derivan de sus respuestas (ver engines/scoring.js).
 */

// Etiquetas legibles de cada dimensión medida, usadas para las barras de stats.
const dimensionLabels = {
  sociabilidad: "Sociabilidad",
  ambicion: "Ambición",
  disciplina: "Disciplina",
  impulsividad: "Impulsividad",
  empatia: "Empatía",
  creatividad: "Creatividad",
  logica: "Lógica",
  independencia: "Independencia",
  riesgo: "Tolerancia al riesgo",
  curiosidad: "Curiosidad",
  confianza: "Confianza",
};

export const personalityTest = {
  slug: "test-de-personalidad",
  title: "¿Qué tipo de personalidad tienes?",
  category: "Personalidad",
  icon: "🧠",
  intro:
    "15 escenarios de la vida real —fiestas, dinero, trabajo, conflictos, presión— y ninguna respuesta correcta. Al final descubrirás cuál de los 8 perfiles te define mejor, con estadísticas calculadas a partir de tus propias respuestas.",
  resultLogic: "weighted",
  dimensionLabels,
  disclaimer: "Resultado orientativo creado con fines de entretenimiento. No constituye asesoramiento profesional ni una predicción científica.",
  questions: [
    {
      id: "q1",
      text: "Llegas a una fiesta donde apenas conoces a nadie. Después de 20 minutos…",
      options: [
        { id: "a", text: "Ya estás en el centro de una conversación de grupo", weight: { lider: 2 }, dimensions: { sociabilidad: 2, confianza: 1 } },
        { id: "b", text: "Has encontrado a alguien interesante y habláis en profundidad", weight: { analista: 2 }, dimensions: { logica: 1, independencia: 1 } },
        { id: "c", text: "Observas desde un rincón, decidiendo si merece la pena quedarte", weight: { estratega: 2 }, dimensions: { disciplina: 1, impulsividad: -1 } },
        { id: "d", text: "Te has escapado a curiosear por otra sala", weight: { explorador: 2 }, dimensions: { curiosidad: 2, riesgo: 1 } },
      ],
    },
    {
      id: "q2",
      text: "En el trabajo o los estudios te asignan un proyecto sin instrucciones claras. ¿Qué haces primero?",
      options: [
        { id: "a", text: "Trazas un plan detallado con plazos", weight: { estratega: 2 }, dimensions: { disciplina: 2, logica: 1 } },
        { id: "b", text: "Reúnes al equipo y repartes roles con decisión", weight: { lider: 2 }, dimensions: { sociabilidad: 1, confianza: 2 } },
        { id: "c", text: "Empiezas a probar cosas para ver qué funciona", weight: { explorador: 2 }, dimensions: { riesgo: 2, curiosidad: 1 } },
        { id: "d", text: "Investigas a fondo antes de mover un dedo", weight: { analista: 2 }, dimensions: { logica: 2, curiosidad: 1 } },
      ],
    },
    {
      id: "q3",
      text: "Un amigo te cuenta un problema personal serio. Tu primer impulso es…",
      options: [
        { id: "a", text: "Escucharle y ponerte en su lugar antes de decir nada", weight: { protector: 2 }, dimensions: { empatia: 2 } },
        { id: "b", text: "Ofrecerle un par de soluciones prácticas ya mismo", weight: { estratega: 1, lider: 1 }, dimensions: { logica: 1, confianza: 1 } },
        { id: "c", text: "Contarle cómo te sentirías tú en su lugar", weight: { sonador: 2 }, dimensions: { empatia: 1, creatividad: 1 } },
        { id: "d", text: "Ayudarle a montar un plan de acción concreto", weight: { estratega: 2 }, dimensions: { disciplina: 1, empatia: 1 } },
      ],
    },
    {
      id: "q4",
      text: "Te ofrecen un puesto bien pagado pero muy rutinario. Tu reacción es…",
      options: [
        { id: "a", text: "Aceptarlo: la estabilidad pesa más que la emoción", weight: { protector: 1, estratega: 1 }, dimensions: { disciplina: 1, riesgo: -1 } },
        { id: "b", text: "Rechazarlo, necesitas algo que te rete constantemente", weight: { explorador: 2 }, dimensions: { riesgo: 2, curiosidad: 1 } },
        { id: "c", text: "Negociar mejores condiciones antes de decidir nada", weight: { lider: 2 }, dimensions: { confianza: 2, ambicion: 1 } },
        { id: "d", text: "Aceptarlo un tiempo mientras maduras tu propio proyecto", weight: { rebelde: 1, creativo: 1 }, dimensions: { independencia: 1, creatividad: 1 } },
      ],
    },
    {
      id: "q5",
      text: "En un debate, alguien rebate tu opinión con datos sólidos. ¿Qué haces?",
      options: [
        { id: "a", text: "Revisas tu postura, los datos mandan", weight: { analista: 2 }, dimensions: { logica: 2 } },
        { id: "b", text: "Defiendes tu punto con más fuerza: no te gusta perder", weight: { lider: 1, rebelde: 1 }, dimensions: { confianza: 1, impulsividad: 1 } },
        { id: "c", text: "Buscas un término medio que deje a todos tranquilos", weight: { protector: 2 }, dimensions: { empatia: 1, sociabilidad: 1 } },
        { id: "d", text: "Te desconectas un poco, el conflicto no va contigo", weight: { sonador: 2 }, dimensions: { empatia: 1, impulsividad: -1 } },
      ],
    },
    {
      id: "q6",
      text: "Tienes un fin de semana completamente libre. ¿Qué termina pasando?",
      options: [
        { id: "a", text: "Organizas una actividad para aprovecharlo al máximo", weight: { estratega: 2 }, dimensions: { disciplina: 2 } },
        { id: "b", text: "Sales sin rumbo fijo a ver qué encuentras", weight: { explorador: 2 }, dimensions: { curiosidad: 2, riesgo: 1 } },
        { id: "c", text: "Te metes de lleno en un proyecto creativo propio", weight: { creativo: 2 }, dimensions: { creatividad: 2, independencia: 1 } },
        { id: "d", text: "Aprovechas para cuidar de alguien cercano", weight: { protector: 2 }, dimensions: { empatia: 2 } },
      ],
    },
    {
      id: "q7",
      text: "En un juego de mesa con amigos, sueles ser quien…",
      options: [
        { id: "a", text: "Explica las reglas y vigila que se cumplan", weight: { estratega: 1, lider: 1 }, dimensions: { disciplina: 1, sociabilidad: 1 } },
        { id: "b", text: "Se las salta si nadie mira, «solo es un juego»", weight: { rebelde: 2 }, dimensions: { impulsividad: 2, independencia: 1 } },
        { id: "c", text: "Inventa estrategias poco convencionales para ganar", weight: { creativo: 2 }, dimensions: { creatividad: 2 } },
        { id: "d", text: "Disfruta más del ambiente que de ganar", weight: { sonador: 2 }, dimensions: { empatia: 1, ambicion: -1 } },
      ],
    },
    {
      id: "q8",
      text: "Un proyecto en el que confiabas fracasa por completo. ¿Cómo reaccionas?",
      options: [
        { id: "a", text: "Analizas qué falló, punto por punto", weight: { analista: 2 }, dimensions: { logica: 2, disciplina: 1 } },
        { id: "b", text: "Te lo tomas como algo personal durante un tiempo", weight: { sonador: 1, protector: 1 }, dimensions: { empatia: 1, confianza: -1 } },
        { id: "c", text: "Ya estás pensando en la siguiente idea", weight: { explorador: 2 }, dimensions: { curiosidad: 1, riesgo: 1 } },
        { id: "d", text: "Reorganizas todo y lo intentas con un plan mejor", weight: { estratega: 2 }, dimensions: { disciplina: 2 } },
      ],
    },
    {
      id: "q9",
      text: "Alguien dice algo que te parece injusto delante de otras personas. Tú…",
      options: [
        { id: "a", text: "Lo señalas ahí mismo, sin rodeos", weight: { rebelde: 2 }, dimensions: { impulsividad: 2, confianza: 1 } },
        { id: "b", text: "Esperas al momento adecuado para hablarlo en privado", weight: { protector: 1, estratega: 1 }, dimensions: { disciplina: 1, empatia: 1 } },
        { id: "c", text: "Te callas, pero te queda dando vueltas todo el día", weight: { sonador: 2 }, dimensions: { empatia: 1, confianza: -1 } },
        { id: "d", text: "Respondes con autoridad y dejas claro tu punto", weight: { lider: 2 }, dimensions: { confianza: 2, sociabilidad: 1 } },
      ],
    },
    {
      id: "q10",
      text: "Te apuntas a una actividad totalmente nueva para ti. Antes de empezar…",
      options: [
        { id: "a", text: "Investigas todo lo posible sobre ella", weight: { analista: 2 }, dimensions: { logica: 1, curiosidad: 1 } },
        { id: "b", text: "Simplemente te lanzas, ya aprenderás sobre la marcha", weight: { explorador: 2 }, dimensions: { riesgo: 2, impulsividad: 1 } },
        { id: "c", text: "Imaginas cómo te gustaría que fuera la experiencia", weight: { sonador: 2 }, dimensions: { creatividad: 1, empatia: 1 } },
        { id: "d", text: "Preparas un plan para dominarla cuanto antes", weight: { estratega: 2 }, dimensions: { disciplina: 2, ambicion: 1 } },
      ],
    },
    {
      id: "q11",
      text: "En el trabajo o los estudios, lo que más te motiva es…",
      options: [
        { id: "a", text: "Liderar y ver crecer a un equipo", weight: { lider: 2 }, dimensions: { ambicion: 2, sociabilidad: 1 } },
        { id: "b", text: "Resolver problemas complejos con lógica", weight: { analista: 2 }, dimensions: { logica: 2, independencia: 1 } },
        { id: "c", text: "Crear algo que antes no existía", weight: { creativo: 2 }, dimensions: { creatividad: 2 } },
        { id: "d", text: "Sentir que ayudas a alguien de verdad", weight: { protector: 2 }, dimensions: { empatia: 2 } },
      ],
    },
    {
      id: "q12",
      text: "Cuando algo no sale como esperabas, tu primer impulso es…",
      options: [
        { id: "a", text: "Cuestionar las reglas que lo impidieron", weight: { rebelde: 2 }, dimensions: { independencia: 2, impulsividad: 1 } },
        { id: "b", text: "Buscar otra ruta: hay mil formas de llegar", weight: { explorador: 2 }, dimensions: { curiosidad: 1, riesgo: 1 } },
        { id: "c", text: "Sentir que quizás esperabas demasiado", weight: { sonador: 2 }, dimensions: { empatia: 1, confianza: -1 } },
        { id: "d", text: "Ajustar el plan y seguir adelante con método", weight: { estratega: 2 }, dimensions: { disciplina: 1, logica: 1 } },
      ],
    },
    {
      id: "q13",
      text: "Un desconocido te pide ayuda por la calle. Tú…",
      options: [
        { id: "a", text: "Te detienes a ayudar aunque llegues tarde a algo", weight: { protector: 2 }, dimensions: { empatia: 2 } },
        { id: "b", text: "Evalúas rápido la situación antes de actuar", weight: { analista: 1, estratega: 1 }, dimensions: { logica: 1, disciplina: 1 } },
        { id: "c", text: "Le ayudas improvisando una solución original", weight: { creativo: 2 }, dimensions: { creatividad: 1, riesgo: 1 } },
        { id: "d", text: "Te implicas más de la cuenta, hasta acompañarle si hace falta", weight: { sonador: 2 }, dimensions: { empatia: 2 } },
      ],
    },
    {
      id: "q14",
      text: "Puedes elegir entre un ascenso con más responsabilidad o mantener tu libertad actual. Eliges…",
      options: [
        { id: "a", text: "El ascenso: quieres tener el control de las decisiones", weight: { lider: 2 }, dimensions: { ambicion: 2, confianza: 1 } },
        { id: "b", text: "La libertad: ningún cargo vale tu independencia", weight: { rebelde: 2 }, dimensions: { independencia: 2 } },
        { id: "c", text: "Depende, primero calculas los pros y los contras con calma", weight: { estratega: 2 }, dimensions: { logica: 1, disciplina: 1 } },
        { id: "d", text: "La libertad: necesitas espacio para crear a tu manera", weight: { creativo: 2 }, dimensions: { creatividad: 1, independencia: 1 } },
      ],
    },
    {
      id: "q15",
      text: "Miras atrás a este último año. ¿Qué es lo que más valoras haber hecho?",
      options: [
        { id: "a", text: "Haber alcanzado metas concretas que te propusiste", weight: { estratega: 2 }, dimensions: { disciplina: 1, ambicion: 1 } },
        { id: "b", text: "Haber vivido experiencias que no esperabas", weight: { explorador: 2 }, dimensions: { curiosidad: 2, riesgo: 1 } },
        { id: "c", text: "Haber estado ahí para las personas que importan", weight: { protector: 2 }, dimensions: { empatia: 2, sociabilidad: 1 } },
        { id: "d", text: "Haber sido fiel a lo que sientes, aunque no fuera fácil", weight: { sonador: 2 }, dimensions: { creatividad: 1, confianza: 1 } },
      ],
    },
  ],
  results: [
    {
      key: "estratega",
      title: "El Estratega",
      description:
        "Antes de dar un paso, probablemente ya has pensado en los siguientes tres. Ves el mundo como un tablero de decisiones y te sientes más cómodo con un plan en la mano que improvisando sobre la marcha. No es frialdad: es tu forma de proteger lo que te importa.",
      strengths: ["Visión de largo plazo", "Toma de decisiones estructurada", "Constancia bajo presión", "Capacidad de anticipar problemas"],
      weaknesses: ["Te cuesta improvisar cuando el plan se rompe", "Puedes parecer distante al priorizar la lógica", "Sobrepensar antes de actuar"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Recopilas información, pesas opciones y eliges la que minimiza riesgos, aunque tardes más que otros perfiles en decidirte. Necesitas sentir que controlas la situación antes de comprometerte con ella." },
        { heading: "Cómo te comportas socialmente", text: "Observas antes de participar y prefieres conversaciones con propósito a la charla puramente social." },
      ],
      statKeys: ["disciplina", "logica", "impulsividad", "ambicion", "confianza", "curiosidad"],
      fallbackStats: { disciplina: 92, logica: 88, impulsividad: 20, ambicion: 74, confianza: 70, curiosidad: 55 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Tu forma de pensar ya está clara. Pero, ¿piensas igual de rápido cuando no hay tiempo para planear?",
    },
    {
      key: "lider",
      title: "El Líder",
      description:
        "La gente tiende a mirarte cuando hay que tomar una decisión, y tú rara vez rehúyes esa mirada. Tienes una confianza natural para dirigir, y sabes que liderar no siempre significa tener razón, sino asumir la responsabilidad cuando otros dudan.",
      strengths: ["Capacidad de decisión bajo presión", "Habilidad para movilizar a un grupo", "Confianza que transmite seguridad", "Buen manejo de conflictos"],
      weaknesses: ["Puedes imponer tu ritmo sin darte cuenta", "Te cuesta delegar el control", "Baja tolerancia a la indecisión ajena"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Decides rápido y con seguridad, confiando en tu criterio incluso con información incompleta. Prefieres equivocarte actuando que quedarte parado esperando el momento perfecto." },
        { heading: "Cómo te comportas socialmente", text: "Te mueves con naturalidad en grupo, tomas la palabra sin esfuerzo y sueles acabar organizando lo que otros dejan a medias." },
      ],
      statKeys: ["ambicion", "confianza", "sociabilidad", "disciplina", "empatia", "impulsividad"],
      fallbackStats: { ambicion: 90, confianza: 88, sociabilidad: 82, disciplina: 66, empatia: 54, impulsividad: 48 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Sabes liderar cuando hay tiempo de pensar. ¿Y cuando solo hay una fracción de segundo para reaccionar?",
    },
    {
      key: "explorador",
      title: "El Explorador",
      description:
        "La rutina te pesa más que el riesgo. Prefieres equivocarte probando algo nuevo que quedarte quieto por miedo, y esa curiosidad constante te lleva a lugares —físicos y mentales— a los que otros nunca llegan.",
      strengths: ["Adaptabilidad a lo inesperado", "Apertura genuina a experiencias nuevas", "Capacidad de reinventarse", "Optimismo ante el cambio"],
      weaknesses: ["Constancia irregular en proyectos largos", "Tiende a dejar cosas a medias", "Puede subestimar el riesgo real"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Decides por instinto y corriges sobre la marcha; para ti, actuar y aprender vale más que planear en exceso." },
        { heading: "Cómo te comportas socialmente", text: "Conectas rápido con desconocidos y disfrutas de ambientes nuevos más que de círculos cerrados." },
      ],
      statKeys: ["curiosidad", "riesgo", "impulsividad", "independencia", "disciplina", "empatia"],
      fallbackStats: { curiosidad: 94, riesgo: 85, impulsividad: 64, independencia: 70, disciplina: 38, empatia: 56 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Te lanzas a lo nuevo sin dudarlo. ¿Tus reflejos van a la misma velocidad que tu curiosidad?",
    },
    {
      key: "analista",
      title: "El Analista",
      description:
        "Necesitas entender el «por qué» antes de aceptar el «qué». Cuestionas, comparas y buscas la explicación más coherente, y eso te convierte en la persona a la que otros acuden cuando algo no cuadra.",
      strengths: ["Pensamiento crítico afilado", "Objetividad incluso en temas sensibles", "Alta capacidad de concentración", "Rigor en el detalle"],
      weaknesses: ["Puede parecer frío al priorizar los hechos", "Tiende a la parálisis por análisis", "Le cuesta actuar con información incompleta"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "No te mueves sin datos suficientes; prefieres retrasar una decisión antes que tomarla a ciegas." },
        { heading: "Cómo te comportas socialmente", text: "Eliges pocas conversaciones, pero profundas; el ruido social te agota más de lo que te aporta." },
      ],
      statKeys: ["logica", "independencia", "sociabilidad", "disciplina", "curiosidad", "impulsividad"],
      fallbackStats: { logica: 93, independencia: 80, sociabilidad: 34, disciplina: 76, curiosidad: 68, impulsividad: 18 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Analizas cada detalle antes de actuar. ¿Qué pasa cuando no te da tiempo a analizar nada?",
    },
    {
      key: "creativo",
      title: "El Creativo",
      description:
        "Ves conexiones donde otros ven caos. Tu mente rara vez sigue el camino más obvio, y esa forma distinta de mirar las cosas es tanto tu mayor activo como, a veces, tu mayor fuente de incomprensión ajena.",
      strengths: ["Originalidad para resolver problemas", "Capacidad de imaginar lo que no existe", "Flexibilidad mental", "Sensibilidad estética"],
      weaknesses: ["Dificultad para seguir procesos rígidos", "Tiende a dispersarse entre ideas", "Le cuesta la crítica directa a su trabajo"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Decides siguiendo una mezcla de intuición y visión propia, más que reglas o consensos externos." },
        { heading: "Cómo te comportas socialmente", text: "Aportas ideas inesperadas al grupo, aunque a veces necesitas tiempo a solas para recargar." },
      ],
      statKeys: ["creatividad", "independencia", "curiosidad", "disciplina", "confianza", "empatia"],
      fallbackStats: { creatividad: 95, independencia: 78, curiosidad: 82, disciplina: 42, confianza: 60, empatia: 62 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Tu mente conecta ideas que otros no ven. ¿Y cómo de rápido conecta tu mano con lo que ven tus ojos?",
    },
    {
      key: "protector",
      title: "El Protector",
      description:
        "Cuidas antes de que te lo pidan. Tienes un radar afinado para detectar cuándo alguien no está bien, y sueles anteponer el bienestar del grupo al tuyo propio, incluso cuando nadie te lo agradece.",
      strengths: ["Empatía genuina y constante", "Lealtad a largo plazo", "Buen gestor de conflictos ajenos", "Fiabilidad"],
      weaknesses: ["Le cuesta poner límites", "Tiende a anteponerse siempre en último lugar", "Evita el conflicto incluso cuando es necesario"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Ponderas cómo afecta cada opción a las personas implicadas antes que el resultado puramente práctico." },
        { heading: "Cómo te comportas socialmente", text: "Eres quien mantiene unido al grupo, media en los roces y recuerda los detalles que a otros se les escapan." },
      ],
      statKeys: ["empatia", "sociabilidad", "riesgo", "disciplina", "confianza", "impulsividad"],
      fallbackStats: { empatia: 93, sociabilidad: 74, riesgo: 28, disciplina: 66, confianza: 56, impulsividad: 24 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Cuidas de todos a tu alrededor. ¿Alguna vez te has puesto a prueba solo por diversión?",
    },
    {
      key: "rebelde",
      title: "El Rebelde",
      description:
        "Las normas te parecen un punto de partida, no un límite. Cuestionas lo establecido casi por reflejo, y aunque eso te trae fricción de vez en cuando, también es lo que te impide conformarte con «siempre se ha hecho así».",
      strengths: ["Pensamiento independiente", "Valentía para desafiar lo establecido", "Autenticidad sin filtros", "Resistencia a la presión de grupo"],
      weaknesses: ["Puede generar fricción innecesaria", "Le cuesta seguir estructuras impuestas", "Actúa antes de medir consecuencias"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Actúas siguiendo tu propio criterio, incluso cuando eso significa ir contracorriente del grupo." },
        { heading: "Cómo te comportas socialmente", text: "No buscas encajar; dices lo que piensas aunque incomode, y eso genera tanto admiración como roces." },
      ],
      statKeys: ["independencia", "impulsividad", "riesgo", "confianza", "disciplina", "empatia"],
      fallbackStats: { independencia: 91, impulsividad: 76, riesgo: 80, confianza: 72, disciplina: 36, empatia: 50 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "No sigues las reglas de nadie. ¿Tus reflejos son tan rápidos como tu carácter?",
    },
    {
      key: "sonador",
      title: "El Soñador",
      description:
        "Sientes las cosas con una intensidad que no siempre sabes explicar. Te mueves por ideales más que por cálculos, y aunque el mundo práctico a veces te resulta agotador, tu forma de ver posibilidades donde otros ven límites es un don poco común.",
      strengths: ["Idealismo que inspira a otros", "Sensibilidad emocional profunda", "Capacidad de imaginar futuros mejores", "Autenticidad emocional"],
      weaknesses: ["Le cuesta bajar las ideas a la práctica", "Tiende a idealizar personas o planes", "Sensible en exceso a la crítica"],
      weaknessesLabel: "Tu lado menos fuerte",
      sections: [
        { heading: "Cómo funcionas", text: "Te guías por cómo te sientes respecto a cada opción más que por un cálculo frío de pros y contras." },
        { heading: "Cómo te comportas socialmente", text: "Buscas vínculos profundos y significativos; la relación superficial te resulta poco satisfactoria." },
      ],
      statKeys: ["empatia", "creatividad", "confianza", "ambicion", "curiosidad", "disciplina"],
      fallbackStats: { empatia: 85, creatividad: 80, confianza: 46, ambicion: 48, curiosidad: 66, disciplina: 40 },
      recommendedSlug: { type: "game", slug: "tiempo-de-reaccion" },
      nextStepText: "Vives con intensidad cada idea y cada emoción. ¿Qué tal se te da actuar en el momento exacto?",
    },
  ],
};
