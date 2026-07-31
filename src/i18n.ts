import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const supportedLanguages = ['en', 'es', 'fr'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

const STORAGE_KEY = 'wrestlemeter-language'

export function detectBrowserLanguage(locale = globalThis.navigator?.language): SupportedLanguage {
  const language = locale?.toLowerCase().split('-')[0]
  return language === 'es' || language === 'fr' ? language : 'en'
}

function getInitialLanguage(): SupportedLanguage {
  const saved = globalThis.localStorage?.getItem(STORAGE_KEY)
  return supportedLanguages.includes(saved as SupportedLanguage) ? saved as SupportedLanguage : detectBrowserLanguage()
}

const resources = {
  en: {
    translation: {
      app: { title: 'WrestleMeter — The fan scorecard' },
      language: { label: 'Language', en: 'English', es: 'Spanish', fr: 'French' },
      header: { home: 'Home', roster: 'Roster', search: 'Search wrestlers', signIn: 'Sign in', account: 'Fan account', toggleMenu: 'Toggle menu' },
      search: { placeholder: 'Search wrestler or company', close: 'Close search', empty: 'No wrestlers found.' },
      rating: { waiting: 'Waiting for {{count}} votes', more_one: '{{count}} more to reveal', more_other: '{{count}} more to reveal', fanVotes: '{{count}} fan votes' },
      filters: { all: 'All rosters', label: 'Filter by company' },
      home: {
        meterLive: '{{season}} meter is live', titleLineOne: 'WHO OWNS', titleLineTwo: 'THE RING?', intro: 'Rate today’s wrestlers. Track every era. Let the fans write the scorecard.', explore: 'Explore the roster', fanLeader: 'Fan leader', topCard: 'Top of the card', acrossPromotions: 'Across every promotion', favorites: 'Fan favorites', viewRoster: 'View full roster', annualBell: 'The annual bell', seasonTitle: 'One score. One season. Sealed at WrestleMania.', seasonCopy: 'Each open meter closes when WrestleMania begins. The final average joins the wrestler’s permanent history, and a new season starts fresh.', nextClose: 'Next close', wrestleMania: 'WrestleMania 43', datePending: 'Official date pending',
      },
      roster: { promotions: 'WWE · AEW · AAA', title: 'THE ROSTER', intro: 'Browse the names shaping wrestling right now.', count_one: '{{count}} wrestler in this prototype', count_other: '{{count}} wrestlers in this prototype', sort: { label: 'Sort by', 'meter-desc': 'Meter: high to low', 'meter-asc': 'Meter: low to high', 'name-asc': 'Name: A to Z', 'name-desc': 'Name: Z to A' } },
      profile: { back: 'Back to roster', fanMeter: '{{season}} fan meter', from: 'From', height: 'Height', finisher: 'Finisher', profileSource: 'Profile source', latestBell: 'Latest bell', lastResult: 'Last known result', resultSource: 'Open result source', versus: 'vs.', frozen: 'Frozen in time', history: 'Meter history', openSeason: 'Open season', closedSeason: 'Closed at WrestleMania', votes: '{{count}} votes', yourCall: 'Your call', voteLocked: 'Vote locked in', rate: 'Rate this wrestler', masks_one: '{{count}} out of 5 mask', masks_other: '{{count}} out of 5 masks', maskTitle_one: '{{count}} mask', maskTitle_other: '{{count}} masks', voteSaved: 'Your {{count}}-mask demo vote is saved for this session.', choose: 'Choose carefully. One vote per fan, per season.', signInToVote: 'Sign in to cast one secure vote per season.', prototype: 'Prototype data', prototypeCopy: 'Ratings and match records are illustrative. Profile facts link to their source.', outcomes: { win: 'win', loss: 'loss', draw: 'draw' }, methods: { pinfall: 'Pinfall', tagTeamPinfall: 'Tag-team pinfall', noContest: 'No contest', submission: 'Submission' } },
      login: { close: 'Close sign in', eyebrow: 'Join the crowd', title: 'Make your vote count', intro: 'Sign in to cast one rating per wrestler in each WrestleMania season.', email: 'Email', continue: 'Continue with email', security: 'Production auth will use Supabase sessions and row-level security. This prototype accepts any valid email locally.' },
      notFound: { title: 'OUTSIDE THE RING', copy: 'That page took a bump and did not get back up.', action: 'Return home' },
      footer: { copy: 'Built for fans who always have a take.', prototype: 'Prototype · {{season}}' },
    },
  },
  es: {
    translation: {
      app: { title: 'WrestleMeter — El marcador de los fans' },
      language: { label: 'Idioma', en: 'Inglés', es: 'Español', fr: 'Francés' },
      header: { home: 'Inicio', roster: 'Plantel', search: 'Buscar luchadores', signIn: 'Iniciar sesión', account: 'Cuenta de fan', toggleMenu: 'Abrir menú' },
      search: { placeholder: 'Buscar luchador o empresa', close: 'Cerrar búsqueda', empty: 'No se encontraron luchadores.' },
      rating: { waiting: 'Esperando {{count}} votos', more_one: 'Falta {{count}} para mostrar', more_other: 'Faltan {{count}} para mostrar', fanVotes: '{{count}} votos de fans' },
      filters: { all: 'Todos los planteles', label: 'Filtrar por empresa' },
      home: {
        meterLive: 'El medidor {{season}} está activo', titleLineOne: '¿QUIÉN DOMINA', titleLineTwo: 'EL RING?', intro: 'Califica a los luchadores de hoy. Sigue cada era. Deja que los fans escriban el marcador.', explore: 'Explorar el plantel', fanLeader: 'Líder de fans', topCard: 'En lo más alto', acrossPromotions: 'En todas las empresas', favorites: 'Favoritos de los fans', viewRoster: 'Ver plantel completo', annualBell: 'La campana anual', seasonTitle: 'Una puntuación. Una temporada. Sellada en WrestleMania.', seasonCopy: 'Cada medidor cierra cuando comienza WrestleMania. El promedio final pasa al historial permanente del luchador y empieza una nueva temporada.', nextClose: 'Próximo cierre', wrestleMania: 'WrestleMania 43', datePending: 'Fecha oficial pendiente',
      },
      roster: { promotions: 'WWE · AEW · AAA', title: 'EL PLANTEL', intro: 'Descubre los nombres que están dando forma a la lucha libre actual.', count_one: '{{count}} luchador en este prototipo', count_other: '{{count}} luchadores en este prototipo', sort: { label: 'Ordenar por', 'meter-desc': 'Medidor: mayor a menor', 'meter-asc': 'Medidor: menor a mayor', 'name-asc': 'Nombre: A a Z', 'name-desc': 'Nombre: Z a A' } },
      profile: { back: 'Volver al plantel', fanMeter: 'Medidor de fans {{season}}', from: 'Origen', height: 'Estatura', finisher: 'Movimiento final', profileSource: 'Fuente del perfil', latestBell: 'Última campana', lastResult: 'Último resultado conocido', resultSource: 'Abrir fuente del resultado', versus: 'vs.', frozen: 'Congelado en el tiempo', history: 'Historial del medidor', openSeason: 'Temporada abierta', closedSeason: 'Cerrada en WrestleMania', votes: '{{count}} votos', yourCall: 'Tú decides', voteLocked: 'Voto registrado', rate: 'Califica a este luchador', masks_one: '{{count}} de 5 máscaras', masks_other: '{{count}} de 5 máscaras', maskTitle_one: '{{count}} máscara', maskTitle_other: '{{count}} máscaras', voteSaved: 'Tu voto de {{count}} máscaras se guardó para esta sesión.', choose: 'Elige con cuidado. Un voto por fan y temporada.', signInToVote: 'Inicia sesión para emitir un voto seguro por temporada.', prototype: 'Datos de prototipo', prototypeCopy: 'Las calificaciones y los combates son ilustrativos. Los datos del perfil enlazan a su fuente.', outcomes: { win: 'victoria', loss: 'derrota', draw: 'empate' }, methods: { pinfall: 'Cuenta de tres', tagTeamPinfall: 'Cuenta de tres por equipos', noContest: 'Sin resultado', submission: 'Rendición' } },
      wrestlers: {
        'rhea-ripley': { bio: 'Una potencia ultraagresiva cuyo ascenso por NXT UK y NXT la convirtió en una de las grandes estrellas modernas de WWE.' },
        'cody-rhodes': { bio: 'El hijo de Dusty Rhodes se reinventó por todo el mundo antes de regresar a WWE y terminar su historia en el escenario más grande.' },
        penta: { bio: 'Un luchador reconocido mundialmente por su ataque intrépido, sus campeonatos en distintas empresas y su inconfundible saludo Cero Miedo.' },
        'kenny-omega': { bio: 'Un condecorado campeón mundial cuya explosiva capacidad atlética y combates épicos ayudaron a definir AEW desde sus inicios.' },
        'mercedes-mone': { bio: 'Una campeona internacional con confianza de élite, precisión técnica y una colección de títulos que no deja de crecer.' },
        'will-ospreay': { bio: 'Un espectacular luchador aéreo que evolucionó hasta convertirse en un peso pesado completo y uno de los mejores de su generación.' },
        'psycho-clown': { bio: 'Una de las máscaras más populares de AAA, querido por su carisma salvaje y su legendaria victoria sobre Dr. Wagner Jr. en Triplemanía.' },
        'la-hiedra': { bio: 'Una luchadora de segunda generación que combina un estilo técnico agresivo con la actitud despiadada de Las Tóxicas.' },
        'mr-iguana': { bio: 'Un impredecible favorito de los fans cuyo humor, creatividad y compañera inseparable La Yezka lo convirtieron en una sensación internacional.' },
      },
      login: { close: 'Cerrar inicio de sesión', eyebrow: 'Únete a la afición', title: 'Haz que tu voto cuente', intro: 'Inicia sesión para dar una calificación por luchador en cada temporada de WrestleMania.', email: 'Correo electrónico', continue: 'Continuar con correo', security: 'La autenticación de producción usará sesiones de Supabase y seguridad a nivel de fila. Este prototipo acepta localmente cualquier correo válido.' },
      notFound: { title: 'FUERA DEL RING', copy: 'Esa página recibió un golpe y no volvió a levantarse.', action: 'Volver al inicio' },
      footer: { copy: 'Hecho para fans que siempre tienen una opinión.', prototype: 'Prototipo · {{season}}' },
    },
  },
  fr: {
    translation: {
      app: { title: 'WrestleMeter — Le classement des fans' },
      language: { label: 'Langue', en: 'Anglais', es: 'Espagnol', fr: 'Français' },
      header: { home: 'Accueil', roster: 'Roster', search: 'Rechercher des catcheurs', signIn: 'Se connecter', account: 'Compte fan', toggleMenu: 'Ouvrir le menu' },
      search: { placeholder: 'Rechercher un catcheur ou une fédération', close: 'Fermer la recherche', empty: 'Aucun catcheur trouvé.' },
      rating: { waiting: 'En attente de {{count}} votes', more_one: 'Encore {{count}} avant affichage', more_other: 'Encore {{count}} avant affichage', fanVotes: '{{count}} votes de fans' },
      filters: { all: 'Tous les rosters', label: 'Filtrer par fédération' },
      home: {
        meterLive: 'Le classement {{season}} est ouvert', titleLineOne: 'QUI DOMINE', titleLineTwo: 'LE RING ?', intro: 'Notez les catcheurs d’aujourd’hui. Suivez chaque époque. Laissez les fans écrire le classement.', explore: 'Explorer le roster', fanLeader: 'Numéro un des fans', topCard: 'En haut de l’affiche', acrossPromotions: 'Toutes fédérations', favorites: 'Favoris des fans', viewRoster: 'Voir tout le roster', annualBell: 'La cloche annuelle', seasonTitle: 'Une note. Une saison. Scellée à WrestleMania.', seasonCopy: 'Chaque classement ferme au début de WrestleMania. La moyenne finale rejoint l’historique permanent du catcheur, puis une nouvelle saison commence.', nextClose: 'Prochaine clôture', wrestleMania: 'WrestleMania 43', datePending: 'Date officielle à venir',
      },
      roster: { promotions: 'WWE · AEW · AAA', title: 'LE ROSTER', intro: 'Découvrez les noms qui façonnent le catch aujourd’hui.', count_one: '{{count}} catcheur dans ce prototype', count_other: '{{count}} catcheurs dans ce prototype', sort: { label: 'Trier par', 'meter-desc': 'Classement : décroissant', 'meter-asc': 'Classement : croissant', 'name-asc': 'Nom : A à Z', 'name-desc': 'Nom : Z à A' } },
      profile: { back: 'Retour au roster', fanMeter: 'Classement fans {{season}}', from: 'Origine', height: 'Taille', finisher: 'Prise de finition', profileSource: 'Source du profil', latestBell: 'Dernière cloche', lastResult: 'Dernier résultat connu', resultSource: 'Ouvrir la source du résultat', versus: 'contre', frozen: 'Figé dans le temps', history: 'Historique du classement', openSeason: 'Saison ouverte', closedSeason: 'Clôturée à WrestleMania', votes: '{{count}} votes', yourCall: 'À vous de jouer', voteLocked: 'Vote enregistré', rate: 'Notez ce catcheur', masks_one: '{{count}} masque sur 5', masks_other: '{{count}} masques sur 5', maskTitle_one: '{{count}} masque', maskTitle_other: '{{count}} masques', voteSaved: 'Votre vote de {{count}} masques est enregistré pour cette session.', choose: 'Choisissez bien. Un vote par fan et par saison.', signInToVote: 'Connectez-vous pour voter une fois par saison.', prototype: 'Données de prototype', prototypeCopy: 'Les notes et résultats sont illustratifs. Les informations de profil renvoient à leur source.', outcomes: { win: 'victoire', loss: 'défaite', draw: 'nul' }, methods: { pinfall: 'Tombé', tagTeamPinfall: 'Tombé par équipe', noContest: 'Sans décision', submission: 'Soumission' } },
      wrestlers: {
        'rhea-ripley': { bio: 'Une puissance ultra-agressive dont l’ascension à NXT UK et NXT a fait l’une des grandes stars modernes de la WWE.' },
        'cody-rhodes': { bio: 'Le fils de Dusty Rhodes s’est réinventé à travers le monde avant de revenir à la WWE pour achever son histoire sur la plus grande scène.' },
        penta: { bio: 'Un luchador mondialement reconnu pour son attaque intrépide, ses titres dans plusieurs fédérations et son célèbre salut Cero Miedo.' },
        'kenny-omega': { bio: 'Un champion du monde décoré dont l’athlétisme explosif et les combats épiques ont contribué à définir l’AEW dès ses débuts.' },
        'mercedes-mone': { bio: 'Une championne internationale à la confiance absolue, à la précision technique et à la collection de titres toujours grandissante.' },
        'will-ospreay': { bio: 'Un voltigeur spectaculaire devenu un poids lourd complet et l’un des catcheurs les plus acclamés de sa génération.' },
        'psycho-clown': { bio: 'L’une des stars masquées les plus populaires de l’AAA, adorée pour son charisme sauvage et sa victoire légendaire sur Dr. Wagner Jr. à Triplemanía.' },
        'la-hiedra': { bio: 'Une luchadora de deuxième génération qui associe un style technique agressif à l’attitude impitoyable de Las Tóxicas.' },
        'mr-iguana': { bio: 'Un favori imprévisible dont l’humour, la créativité et l’inséparable La Yezka ont fait une sensation internationale.' },
      },
      login: { close: 'Fermer la connexion', eyebrow: 'Rejoignez les fans', title: 'Faites compter votre vote', intro: 'Connectez-vous pour attribuer une note par catcheur à chaque saison de WrestleMania.', email: 'E-mail', continue: 'Continuer par e-mail', security: 'L’authentification de production utilisera les sessions Supabase et la sécurité au niveau des lignes. Ce prototype accepte localement toute adresse e-mail valide.' },
      notFound: { title: 'HORS DU RING', copy: 'Cette page a pris un mauvais coup et ne s’est pas relevée.', action: 'Retour à l’accueil' },
      footer: { copy: 'Conçu pour les fans qui ont toujours un avis.', prototype: 'Prototype · {{season}}' },
    },
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (language) => {
  if (supportedLanguages.includes(language as SupportedLanguage)) {
    globalThis.localStorage?.setItem(STORAGE_KEY, language)
    globalThis.document?.documentElement.setAttribute('lang', language)
  }
})

globalThis.document?.documentElement.setAttribute('lang', i18n.language)

export default i18n