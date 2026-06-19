import type { CategorySlug } from "./categories";
import type { CardType } from "../lib/domain";

export const cardTypes = [
  "QUICK_FACT",
  "MINI_EXPLANATION",
  "ANALOGY",
  "ACTIVE_RECALL",
  "MINI_QUIZ",
  "MNEMONIC",
  "DID_YOU_KNOW",
  "EXPLAIN_BACK",
  "MISCONCEPTION",
  "ONE_EXAMPLE"
] as const;

export type LearningSeedItem = {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  cardType: CardType;
  content: string;
  explanation: string;
  prompt?: string;
  answer?: string;
  answerOptions?: string[];
  mnemonic?: string;
  analogy?: string;
  sources: Array<{
    title: string;
    url: string;
    publisher?: string;
  }>;
};

type SourceSeed = LearningSeedItem["sources"][number];

const sources = {
  bipmSi: {
    title: "The International System of Units",
    url: "https://www.bipm.org/en/measurement-units",
    publisher: "BIPM"
  },
  unCharter: {
    title: "United Nations Charter",
    url: "https://www.un.org/en/about-us/un-charter",
    publisher: "United Nations"
  },
  unescoWorldHeritage: {
    title: "The Criteria for Selection",
    url: "https://whc.unesco.org/en/criteria/",
    publisher: "UNESCO World Heritage Centre"
  },
  isbn: {
    title: "What is an ISBN?",
    url: "https://www.isbn-international.org/content/what-isbn",
    publisher: "International ISBN Agency"
  },
  nistUtc: {
    title: "UTC(NIST)",
    url: "https://www.nist.gov/pml/time-and-frequency-division/time-realization/utcnist",
    publisher: "NIST"
  },
  mdnEventLoop: {
    title: "Concurrency model and Event Loop",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
    publisher: "MDN Web Docs"
  },
  reactState: {
    title: "State: A Component's Memory",
    url: "https://react.dev/learn/state-a-components-memory",
    publisher: "React"
  },
  pythonDataStructures: {
    title: "Data Structures",
    url: "https://docs.python.org/3/tutorial/datastructures.html",
    publisher: "Python documentation"
  },
  gitBranching: {
    title: "Git Branching - Branches in a Nutshell",
    url: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell",
    publisher: "Git"
  },
  mdnButton: {
    title: "The Button element",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button",
    publisher: "MDN Web Docs"
  },
  nistBinarySearch: {
    title: "Binary search",
    url: "https://xlinux.nist.gov/dads/HTML/binarySearch.html",
    publisher: "NIST Dictionary of Algorithms and Data Structures"
  },
  nistBigO: {
    title: "Big-O notation",
    url: "https://xlinux.nist.gov/dads/HTML/bigOnotation.html",
    publisher: "NIST Dictionary of Algorithms and Data Structures"
  },
  icannDns: {
    title: "Beginner's Guide to Domain Names",
    url: "https://www.icann.org/resources/pages/what-2012-02-25-en",
    publisher: "ICANN"
  },
  mdnHttpMethods: {
    title: "HTTP request methods",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
    publisher: "MDN Web Docs"
  },
  unicode: {
    title: "What is Unicode?",
    url: "https://www.unicode.org/standard/WhatIsUnicode.html",
    publisher: "Unicode Consortium"
  },
  googleMlGlossary: {
    title: "Machine Learning Glossary",
    url: "https://developers.google.com/machine-learning/glossary",
    publisher: "Google for Developers"
  },
  modelCards: {
    title: "Model Cards",
    url: "https://modelcards.withgoogle.com/about",
    publisher: "Google"
  },
  attentionPaper: {
    title: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
    publisher: "arXiv"
  },
  owaspAccessControl: {
    title: "OWASP Top 10: Broken Access Control",
    url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
    publisher: "OWASP"
  },
  cisaMfa: {
    title: "Use Multifactor Authentication",
    url: "https://www.cisa.gov/secure-our-world/use-multifactor-authentication",
    publisher: "CISA"
  },
  nistLeastPrivilege: {
    title: "least privilege",
    url: "https://csrc.nist.gov/glossary/term/least_privilege",
    publisher: "NIST Computer Security Resource Center"
  },
  ftcPhishing: {
    title: "How To Recognize and Avoid Phishing Scams",
    url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams",
    publisher: "Federal Trade Commission"
  },
  firstCvss: {
    title: "Common Vulnerability Scoring System SIG",
    url: "https://www.first.org/cvss/",
    publisher: "FIRST"
  },
  nasaPhotosynthesis: {
    title: "What is photosynthesis?",
    url: "https://climatekids.nasa.gov/photosynthesis/",
    publisher: "NASA Climate Kids"
  },
  usgsPlateTectonics: {
    title: "Plate Tectonics",
    url: "https://www.usgs.gov/programs/earthquake-hazards/plate-tectonics",
    publisher: "USGS"
  },
  iupacPeriodicTable: {
    title: "Periodic Table of Elements",
    url: "https://iupac.org/what-we-do/periodic-table-of-elements/",
    publisher: "IUPAC"
  },
  usgsWaterDensity: {
    title: "Water Density",
    url: "https://www.usgs.gov/special-topics/water-science-school/science/water-density",
    publisher: "USGS Water Science School"
  },
  berkeleyScience: {
    title: "How science works",
    url: "https://undsci.berkeley.edu/understanding-science-101/how-science-works/",
    publisher: "University of California Museum of Paleontology"
  },
  britishMuseumRosetta: {
    title: "Rosetta Stone",
    url: "https://www.britishmuseum.org/collection/object/Y_EA24",
    publisher: "British Museum"
  },
  ukParliamentMagnaCarta: {
    title: "Magna Carta",
    url: "https://www.parliament.uk/magnacarta",
    publisher: "UK Parliament"
  },
  nasaApollo11: {
    title: "Apollo 11 Mission Overview",
    url: "https://www.nasa.gov/mission/apollo-11/",
    publisher: "NASA"
  },
  locGutenberg: {
    title: "Gutenberg Bible",
    url: "https://www.loc.gov/collections/gutenberg-bible/about-this-collection/",
    publisher: "Library of Congress"
  },
  unescoSilkRoad: {
    title: "About the Silk Roads",
    url: "https://en.unesco.org/silkroad/about-silk-roads",
    publisher: "UNESCO"
  },
  econlibOpportunityCost: {
    title: "Opportunity Cost",
    url: "https://www.econlib.org/library/Enc/OpportunityCost.html",
    publisher: "Econlib"
  },
  blsCpi: {
    title: "Consumer Price Index",
    url: "https://www.bls.gov/cpi/",
    publisher: "U.S. Bureau of Labor Statistics"
  },
  beaGdp: {
    title: "Gross Domestic Product",
    url: "https://www.bea.gov/data/gdp/gross-domestic-product",
    publisher: "U.S. Bureau of Economic Analysis"
  },
  imfInflation: {
    title: "Inflation: Prices on the Rise",
    url: "https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Inflation",
    publisher: "International Monetary Fund"
  },
  econlibComparativeAdvantage: {
    title: "Comparative Advantage",
    url: "https://www.econlib.org/library/Topics/Details/comparativeadvantage.html",
    publisher: "Econlib"
  },
  whoPhysicalActivity: {
    title: "Physical activity",
    url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
    publisher: "World Health Organization"
  },
  cdcHandwashing: {
    title: "When and How to Wash Your Hands",
    url: "https://www.cdc.gov/handwashing/when-how-handwashing.html",
    publisher: "CDC"
  },
  nindsSleep: {
    title: "Brain Basics: Understanding Sleep",
    url: "https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep",
    publisher: "National Institute of Neurological Disorders and Stroke"
  },
  cdcSunSafety: {
    title: "Sun Safety",
    url: "https://www.cdc.gov/skin-cancer/sun-safety/index.html",
    publisher: "CDC"
  },
  nccihRelaxation: {
    title: "Relaxation Techniques: What You Need To Know",
    url: "https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know",
    publisher: "National Center for Complementary and Integrative Health"
  },
  apaMultitasking: {
    title: "Multitasking: Switching costs",
    url: "https://www.apa.org/topics/research/multitasking",
    publisher: "American Psychological Association"
  },
  iesStudyGuide: {
    title: "Organizing Instruction and Study to Improve Student Learning",
    url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
    publisher: "Institute of Education Sciences"
  },
  apaImplementationIntention: {
    title: "implementation intention",
    url: "https://dictionary.apa.org/implementation-intention",
    publisher: "APA Dictionary of Psychology"
  },
  cornellNotes: {
    title: "The Cornell Note Taking System",
    url: "https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/",
    publisher: "Cornell University Learning Strategies Center"
  },
  pomodoro: {
    title: "The Pomodoro Technique",
    url: "https://www.pomodorotechnique.com/",
    publisher: "The Pomodoro Technique"
  },
  ipaChart: {
    title: "Full IPA Chart",
    url: "https://www.internationalphoneticassociation.org/content/full-ipa-chart",
    publisher: "International Phonetic Association"
  },
  cefrLevels: {
    title: "Common reference levels",
    url: "https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions",
    publisher: "Council of Europe"
  },
  britannicaCognate: {
    title: "cognate",
    url: "https://www.britannica.com/topic/cognate",
    publisher: "Encyclopaedia Britannica"
  },
  midi: {
    title: "MIDI 1.0",
    url: "https://midi.org/midi-1-0",
    publisher: "MIDI Association"
  },
  britannicaTempo: {
    title: "tempo",
    url: "https://www.britannica.com/art/tempo-music",
    publisher: "Encyclopaedia Britannica"
  },
  openMusicTheoryFifths: {
    title: "Circle of fifths",
    url: "https://viva.pressbooks.pub/openmusictheory/chapter/circle-of-fifths/",
    publisher: "Open Music Theory"
  },
  britannicaLeitmotif: {
    title: "leitmotif",
    url: "https://www.britannica.com/art/leitmotif",
    publisher: "Encyclopaedia Britannica"
  },
  britannicaSyncopation: {
    title: "syncopation",
    url: "https://www.britannica.com/art/syncopation",
    publisher: "Encyclopaedia Britannica"
  },
  britannicaFoley: {
    title: "Foley artist",
    url: "https://www.britannica.com/art/Foley-artist",
    publisher: "Encyclopaedia Britannica"
  },
  locFilmRegistry: {
    title: "National Film Registry",
    url: "https://www.loc.gov/programs/national-film-preservation-board/film-registry/",
    publisher: "Library of Congress"
  },
  britannicaMontage: {
    title: "montage",
    url: "https://www.britannica.com/art/montage-filmmaking",
    publisher: "Encyclopaedia Britannica"
  },
  academyAspectRatio: {
    title: "Aspect Ratio",
    url: "https://www.oscars.org/science-technology/sci-tech-projects/aspect-ratio",
    publisher: "Academy of Motion Picture Arts and Sciences"
  },
  locCopyrightFilm: {
    title: "Motion Pictures",
    url: "https://www.copyright.gov/registration/motion-pictures/",
    publisher: "U.S. Copyright Office"
  },
  iocRings: {
    title: "Olympic rings",
    url: "https://olympics.com/ioc/olympic-rings",
    publisher: "International Olympic Committee"
  },
  ifabOffside: {
    title: "Law 11 - Offside",
    url: "https://www.theifab.com/laws/latest/offside/",
    publisher: "The IFAB"
  },
  olympicsTennisScoring: {
    title: "Tennis scoring, explained",
    url: "https://olympics.com/en/news/tennis-scoring-system-explained",
    publisher: "Olympics"
  },
  worldAthleticsMarathon: {
    title: "Marathon",
    url: "https://worldathletics.org/disciplines/road-running/marathon",
    publisher: "World Athletics"
  },
  nbaShotClock: {
    title: "NBA Rulebook: Shot Clock",
    url: "https://official.nba.com/rule-no-7-24-second-clock/",
    publisher: "NBA"
  },
  apaRetrievalPractice: {
    title: "Retrieval Practice Produces Memory Benefits",
    url: "https://www.apa.org/science/about/psa/2016/06/learning-memory",
    publisher: "American Psychological Association"
  },
  apaCognitiveDissonance: {
    title: "cognitive dissonance",
    url: "https://dictionary.apa.org/cognitive-dissonance",
    publisher: "APA Dictionary of Psychology"
  },
  apaConfirmationBias: {
    title: "confirmation bias",
    url: "https://dictionary.apa.org/confirmation-bias",
    publisher: "APA Dictionary of Psychology"
  },
  apaWorkingMemory: {
    title: "working memory",
    url: "https://dictionary.apa.org/working-memory",
    publisher: "APA Dictionary of Psychology"
  },
  apaClassicalConditioning: {
    title: "classical conditioning",
    url: "https://dictionary.apa.org/classical-conditioning",
    publisher: "APA Dictionary of Psychology"
  },
  noaaLatitude: {
    title: "What is latitude?",
    url: "https://oceanservice.noaa.gov/facts/latitude.html",
    publisher: "NOAA Ocean Service"
  },
  noaaLongitude: {
    title: "What is longitude?",
    url: "https://oceanservice.noaa.gov/facts/longitude.html",
    publisher: "NOAA Ocean Service"
  },
  usgsWatershed: {
    title: "Watersheds and Drainage Basins",
    url: "https://www.usgs.gov/special-topics/water-science-school/science/watersheds-and-drainage-basins",
    publisher: "USGS Water Science School"
  },
  nationalGeographicRainShadow: {
    title: "Rain Shadow",
    url: "https://education.nationalgeographic.org/resource/rain-shadow/",
    publisher: "National Geographic Education"
  },
  usgsMapProjections: {
    title: "Map Projections",
    url: "https://www.usgs.gov/programs/national-geospatial-program/map-projections",
    publisher: "USGS"
  },
  metImpressionism: {
    title: "Impressionism: Art and Modernity",
    url: "https://www.metmuseum.org/toah/hd/imml/hd_imml.htm",
    publisher: "The Metropolitan Museum of Art"
  },
  louvreMonaLisa: {
    title: "The Mona Lisa",
    url: "https://www.louvre.fr/en/explore/the-palace/the-mona-lisa",
    publisher: "Musee du Louvre"
  },
  tateColour: {
    title: "Colour",
    url: "https://www.tate.org.uk/art/art-terms/c/colour",
    publisher: "Tate"
  },
  nationalGalleryPerspective: {
    title: "Linear perspective",
    url: "https://www.nationalgallery.org.uk/paintings/glossary/linear-perspective",
    publisher: "The National Gallery"
  },
  metUkiyoe: {
    title: "Ukiyo-e Prints",
    url: "https://www.metmuseum.org/toah/hd/ukiy/hd_ukiy.htm",
    publisher: "The Metropolitan Museum of Art"
  },
  britannicaHaiku: {
    title: "haiku",
    url: "https://www.britannica.com/art/haiku",
    publisher: "Encyclopaedia Britannica"
  },
  poetrySonnet: {
    title: "Sonnet",
    url: "https://www.poetryfoundation.org/learn/glossary-terms/sonnet",
    publisher: "Poetry Foundation"
  },
  purdueNarration: {
    title: "Point of View",
    url: "https://owl.purdue.edu/owl/subject_specific_writing/writing_in_literature/literary_terms/point_of_view.html",
    publisher: "Purdue OWL"
  },
  britannicaMetaphor: {
    title: "metaphor",
    url: "https://www.britannica.com/art/metaphor",
    publisher: "Encyclopaedia Britannica"
  },
  sepClassicalLogic: {
    title: "Classical Logic",
    url: "https://plato.stanford.edu/entries/logic-classical/",
    publisher: "Stanford Encyclopedia of Philosophy"
  },
  sepKant: {
    title: "Kant's Moral Philosophy",
    url: "https://plato.stanford.edu/entries/kant-moral/",
    publisher: "Stanford Encyclopedia of Philosophy"
  },
  sepOriginalPosition: {
    title: "Original Position",
    url: "https://plato.stanford.edu/entries/original-position/",
    publisher: "Stanford Encyclopedia of Philosophy"
  },
  britannicaOccam: {
    title: "Occam's razor",
    url: "https://www.britannica.com/topic/Occams-razor",
    publisher: "Encyclopaedia Britannica"
  },
  sepStoicism: {
    title: "Stoicism",
    url: "https://plato.stanford.edu/entries/stoicism/",
    publisher: "Stanford Encyclopedia of Philosophy"
  },
  mathworldPrime: {
    title: "Prime Number",
    url: "https://mathworld.wolfram.com/PrimeNumber.html",
    publisher: "Wolfram MathWorld"
  },
  britannicaPythagorean: {
    title: "Pythagorean theorem",
    url: "https://www.britannica.com/science/Pythagorean-theorem",
    publisher: "Encyclopaedia Britannica"
  },
  britannicaLogarithm: {
    title: "logarithm",
    url: "https://www.britannica.com/science/logarithm",
    publisher: "Encyclopaedia Britannica"
  },
  khanExpectedValue: {
    title: "Expected value",
    url: "https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/random-variables-discrete/a/expected-value-basic",
    publisher: "Khan Academy"
  },
  britannicaZero: {
    title: "zero",
    url: "https://www.britannica.com/science/zero-mathematics",
    publisher: "Encyclopaedia Britannica"
  },
  secStatements: {
    title: "Beginner's Guide to Financial Statements",
    url: "https://www.sec.gov/resources-for-investors/investor-alerts-bulletins/beginners-guide-financial-statements",
    publisher: "U.S. Securities and Exchange Commission"
  },
  sbaMarketResearch: {
    title: "Market research and competitive analysis",
    url: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
    publisher: "U.S. Small Business Administration"
  },
  secRiskFactors: {
    title: "Form 10-K",
    url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/form-10-k",
    publisher: "Investor.gov"
  },
  investopediaNpv: {
    title: "Net Present Value",
    url: "https://www.investopedia.com/terms/n/npv.asp",
    publisher: "Investopedia"
  },
  sbaBusinessPlan: {
    title: "Write your business plan",
    url: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan",
    publisher: "U.S. Small Business Administration"
  },
  usdaPollinators: {
    title: "Pollinators",
    url: "https://www.fs.usda.gov/managing-land/wildflowers/pollinators",
    publisher: "USDA Forest Service"
  },
  nationalGeographicKeystone: {
    title: "Keystone Species",
    url: "https://education.nationalgeographic.org/resource/keystone-species/",
    publisher: "National Geographic Education"
  },
  usdaInvasive: {
    title: "What is an invasive species?",
    url: "https://www.invasivespeciesinfo.gov/what-are-invasive-species",
    publisher: "USDA National Invasive Species Information Center"
  },
  cbdBiodiversity: {
    title: "What is biodiversity?",
    url: "https://www.cbd.int/undb/media/factsheets/undb-factsheet-biodiversity-en.pdf",
    publisher: "Convention on Biological Diversity"
  },
  usdaMycorrhizae: {
    title: "Mycorrhizae",
    url: "https://www.fs.usda.gov/wildflowers/beauty/mycorrhizal/what.shtml",
    publisher: "USDA Forest Service"
  },
  nasaPlanets: {
    title: "Planets",
    url: "https://science.nasa.gov/solar-system/planets/",
    publisher: "NASA Science"
  },
  nasaWebb: {
    title: "James Webb Space Telescope",
    url: "https://science.nasa.gov/mission/webb/",
    publisher: "NASA Science"
  },
  nasaExoplanets: {
    title: "What is an Exoplanet?",
    url: "https://science.nasa.gov/exoplanets/what-is-an-exoplanet/",
    publisher: "NASA Science"
  },
  nasaExpansion: {
    title: "The Expanding Universe",
    url: "https://science.nasa.gov/universe/the-expanding-universe/",
    publisher: "NASA Science"
  },
  nasaBlackHoles: {
    title: "Black Holes",
    url: "https://science.nasa.gov/universe/black-holes/",
    publisher: "NASA Science"
  }
} satisfies Record<string, SourceSeed>;

export const retiredLearningItemSlugs = [
  "javascript-event-loop",
  "css-flexbox-main-cross-axis",
  "http-safe-methods",
  "owasp-broken-access-control",
  "postgres-transactions",
  "react-state-memory",
  "nasa-planets-order",
  "webb-infrared",
  "photosynthesis-stores-energy",
  "who-movement-guidelines",
  "testing-effect",
  "spaced-repetition-gap",
  "classical-logic-validity",
  "einstein-photoelectric-effect",
  "opportunity-cost",
  "python-list-comprehension",
  "ai-training-inference",
  "semantic-html-buttons",
  "box-breathing",
  "source-credibility"
] as const;

export const learningItems: LearningSeedItem[] = [
  {
    slug: "si-prefixes-scale-cleanly",
    title: "SI prefixes scale by tens",
    categorySlug: "general-knowledge",
    cardType: "QUICK_FACT",
    content: "Metric prefixes such as kilo, milli, and micro are shorthand for powers of ten.",
    explanation: "That is why 1 kilometer means 1,000 meters and 1 millimeter means one thousandth of a meter. The prefix carries the scale.",
    sources: [sources.bipmSi]
  },
  {
    slug: "un-charter-started-1945",
    title: "The UN Charter began in 1945",
    categorySlug: "general-knowledge",
    cardType: "ACTIVE_RECALL",
    content: "The United Nations Charter entered into force in 1945 and sets out the organization's basic purposes.",
    explanation: "It is the founding treaty behind the UN's international cooperation, peace, security, and human rights work.",
    prompt: "Before revealing: what document is the founding treaty of the United Nations?",
    answer: "The United Nations Charter.",
    sources: [sources.unCharter]
  },
  {
    slug: "world-heritage-needs-universal-value",
    title: "World Heritage is not just old",
    categorySlug: "general-knowledge",
    cardType: "MISCONCEPTION",
    content: "A place is not listed as World Heritage simply because it is old or famous.",
    explanation: "UNESCO uses criteria around outstanding universal value, authenticity, integrity, and protection. The label is about global significance.",
    sources: [sources.unescoWorldHeritage]
  },
  {
    slug: "isbn-identifies-book-editions",
    title: "An ISBN points to an edition",
    categorySlug: "general-knowledge",
    cardType: "ONE_EXAMPLE",
    content: "An ISBN is an identifier for a specific book or book-like product.",
    explanation: "For example, a paperback and an ebook version can have different ISBNs because they are different product forms.",
    sources: [sources.isbn]
  },
  {
    slug: "utc-shares-time-globally",
    title: "UTC is a shared clock language",
    categorySlug: "general-knowledge",
    cardType: "ANALOGY",
    content: "Coordinated Universal Time gives the world a common reference for timekeeping.",
    explanation: "Local time zones can shift around it, but UTC is the anchor that computers, labs, and schedules can translate from.",
    analogy: "Think of UTC as the zero mark on a ruler; every time zone measures its offset from it.",
    sources: [sources.nistUtc]
  },
  {
    slug: "js-microtasks-run-before-next-task",
    title: "Microtasks cut the line",
    categorySlug: "software-engineering",
    cardType: "MINI_EXPLANATION",
    content: "In JavaScript, promise callbacks go through the microtask queue and run before the next task is taken.",
    explanation: "This is why a resolved promise can log before a timeout callback even when both were scheduled during the same turn.",
    sources: [sources.mdnEventLoop]
  },
  {
    slug: "react-state-survives-render",
    title: "React state survives rerenders",
    categorySlug: "software-engineering",
    cardType: "ACTIVE_RECALL",
    content: "React state stores values that should be remembered between renders.",
    explanation: "Use it for UI facts that change over time and affect what the component shows, such as selected tabs or form input.",
    prompt: "What kind of value belongs in React state?",
    answer: "A value that changes over time and affects rendering.",
    sources: [sources.reactState]
  },
  {
    slug: "python-comprehension-builds-list",
    title: "A comprehension is a list recipe",
    categorySlug: "software-engineering",
    cardType: "ONE_EXAMPLE",
    content: "A Python list comprehension builds a new list from an expression and an iterable.",
    explanation: "`[name.upper() for name in names]` means: visit each name, transform it, and collect the results into a list.",
    sources: [sources.pythonDataStructures]
  },
  {
    slug: "git-branch-is-a-moving-label",
    title: "A Git branch is a moving label",
    categorySlug: "software-engineering",
    cardType: "ANALOGY",
    content: "In Git, a branch name points to a commit and moves forward as new commits are added.",
    explanation: "That pointer model explains why branches are cheap and why switching branches mostly changes which commit your work starts from.",
    analogy: "A branch is like a sticky note on a page; when you write a new page, you move the note forward.",
    sources: [sources.gitBranching]
  },
  {
    slug: "real-buttons-come-with-behavior",
    title: "A clickable div is not a button",
    categorySlug: "software-engineering",
    cardType: "MISCONCEPTION",
    content: "Making a div respond to clicks does not give it the built-in behavior of a real button.",
    explanation: "A button element already carries keyboard support and semantic meaning that assistive technology can understand.",
    sources: [sources.mdnButton]
  },
  {
    slug: "binary-search-halves-space",
    title: "Binary search keeps halving",
    categorySlug: "computer-science",
    cardType: "MINI_QUIZ",
    content: "Binary search works on sorted data by checking the middle and discarding the half that cannot contain the target.",
    explanation: "The sorted order is the trick. Without it, throwing away half the candidates would be guesswork.",
    prompt: "What must be true before binary search is useful?",
    answer: "The data must be sorted.",
    answerOptions: ["The data must be sorted.", "The data must be encrypted.", "The data must be random.", "The data must be text."],
    sources: [sources.nistBinarySearch]
  },
  {
    slug: "big-o-ignores-small-details",
    title: "Big-O watches growth",
    categorySlug: "computer-science",
    cardType: "ANALOGY",
    content: "Big-O notation describes how work grows as input size grows.",
    explanation: "It usually ignores tiny constants and machine details so you can compare the broad shape of algorithms.",
    analogy: "It is like comparing road types, not every pebble: a footpath and a highway scale differently as traffic increases.",
    sources: [sources.nistBigO]
  },
  {
    slug: "dns-translates-names",
    title: "DNS turns names into directions",
    categorySlug: "computer-science",
    cardType: "QUICK_FACT",
    content: "The Domain Name System helps translate human-readable domain names into network locations.",
    explanation: "That lets people type a memorable name while computers still find the servers that answer for it.",
    sources: [sources.icannDns]
  },
  {
    slug: "get-should-not-delete-data",
    title: "GET should not be destructive",
    categorySlug: "computer-science",
    cardType: "MISCONCEPTION",
    content: "A GET request should not be used for actions such as deleting an account or charging a card.",
    explanation: "HTTP treats GET as a safe method. Keeping it read-oriented protects caching, previews, crawlers, and users.",
    sources: [sources.mdnHttpMethods]
  },
  {
    slug: "unicode-code-points",
    title: "Unicode names characters by number",
    categorySlug: "computer-science",
    cardType: "MINI_EXPLANATION",
    content: "Unicode assigns code points to characters so text can be represented consistently across systems.",
    explanation: "Fonts decide how a character looks, but Unicode gives software a shared identity for the character itself.",
    sources: [sources.unicode]
  },
  {
    slug: "training-changes-weights",
    title: "Training changes the model",
    categorySlug: "artificial-intelligence",
    cardType: "MINI_EXPLANATION",
    content: "Training adjusts a model from data; inference uses the trained model to produce outputs.",
    explanation: "A simple split: training is learning the pattern, inference is applying the learned pattern to a new input.",
    sources: [sources.googleMlGlossary]
  },
  {
    slug: "overfitting-learns-noise",
    title: "Overfitting is too much memorizing",
    categorySlug: "artificial-intelligence",
    cardType: "MISCONCEPTION",
    content: "A model that performs perfectly on training data is not automatically a better model.",
    explanation: "Overfitting means the model has learned details that do not generalize well to fresh examples.",
    sources: [sources.googleMlGlossary]
  },
  {
    slug: "embeddings-place-meaning-nearby",
    title: "Embeddings are maps of meaning",
    categorySlug: "artificial-intelligence",
    cardType: "ANALOGY",
    content: "An embedding represents data as numbers so similar items can land near each other in a vector space.",
    explanation: "That makes search and comparison possible by distance, not only by exact matching words.",
    analogy: "Imagine a map where related ideas are neighborhoods instead of street addresses.",
    sources: [sources.googleMlGlossary]
  },
  {
    slug: "model-cards-explain-model-use",
    title: "Model cards add context",
    categorySlug: "artificial-intelligence",
    cardType: "ACTIVE_RECALL",
    content: "A model card summarizes important context about a machine-learning model.",
    explanation: "It can document intended uses, limitations, evaluation results, and ethical considerations so users do not treat the model as a black box.",
    prompt: "What is the practical purpose of a model card?",
    answer: "To document a model's intended use, limits, evaluation, and context.",
    sources: [sources.modelCards]
  },
  {
    slug: "attention-weights-context",
    title: "Attention scores context",
    categorySlug: "artificial-intelligence",
    cardType: "QUICK_FACT",
    content: "Transformer attention lets a model weigh which parts of an input are most relevant to another part.",
    explanation: "That weighting is one reason transformers can connect words or tokens across long stretches of text.",
    sources: [sources.attentionPaper]
  },
  {
    slug: "access-control-lives-on-server",
    title: "Access control is not UI control",
    categorySlug: "cybersecurity",
    cardType: "MISCONCEPTION",
    content: "Hiding a button does not protect the action behind it.",
    explanation: "Authorization has to be checked on the server or API, because attackers can call endpoints without using your interface.",
    sources: [sources.owaspAccessControl]
  },
  {
    slug: "mfa-adds-second-proof",
    title: "MFA adds another proof",
    categorySlug: "cybersecurity",
    cardType: "MINI_QUIZ",
    content: "Multifactor authentication asks for more than one kind of proof before granting access.",
    explanation: "A password plus an authenticator app is stronger than a password alone because one stolen secret is less likely to be enough.",
    prompt: "Which option is an example of MFA?",
    answer: "Password plus authenticator app",
    answerOptions: ["Password plus authenticator app", "Two passwords", "A longer username", "A public profile photo"],
    sources: [sources.cisaMfa]
  },
  {
    slug: "least-privilege-small-keyring",
    title: "Least privilege keeps keys small",
    categorySlug: "cybersecurity",
    cardType: "ANALOGY",
    content: "Least privilege means giving a user or system only the access needed for the task.",
    explanation: "It reduces blast radius: if that account is misused, there are fewer doors it can open.",
    analogy: "Give a delivery driver the building code for today, not the master key to every room.",
    sources: [sources.nistLeastPrivilege]
  },
  {
    slug: "phishing-pressures-fast-trust",
    title: "Phishing often rushes trust",
    categorySlug: "cybersecurity",
    cardType: "QUICK_FACT",
    content: "Phishing messages often imitate trusted organizations and push you to act quickly.",
    explanation: "Urgency, suspicious links, unexpected attachments, and requests for sensitive information are common warning signs.",
    sources: [sources.ftcPhishing]
  },
  {
    slug: "cvss-common-vulnerability-language",
    title: "CVSS is a shared severity language",
    categorySlug: "cybersecurity",
    cardType: "MINI_EXPLANATION",
    content: "CVSS provides a common way to describe the severity of software vulnerabilities.",
    explanation: "It does not replace judgment, but it gives teams a consistent starting point for triage and communication.",
    sources: [sources.firstCvss]
  },
  {
    slug: "photosynthesis-stores-light-energy",
    title: "Photosynthesis stores light",
    categorySlug: "science",
    cardType: "MINI_EXPLANATION",
    content: "Photosynthesis lets plants use light energy to make sugars from carbon dioxide and water.",
    explanation: "Those sugars store chemical energy, which helps plants grow and supports many food webs.",
    sources: [sources.nasaPhotosynthesis]
  },
  {
    slug: "plate-boundaries-shape-earth",
    title: "Plates meet at active edges",
    categorySlug: "science",
    cardType: "MINI_QUIZ",
    content: "Many earthquakes and volcanoes happen near tectonic plate boundaries.",
    explanation: "The edges of plates are where crust is pulled apart, pushed together, or scraped sideways.",
    prompt: "Where do many earthquakes occur?",
    answer: "Near tectonic plate boundaries",
    answerOptions: ["Near tectonic plate boundaries", "Only at the equator", "Only under deserts", "Only in the deep ocean"],
    sources: [sources.usgsPlateTectonics]
  },
  {
    slug: "periodic-table-groups-repeat",
    title: "Periodic groups rhyme",
    categorySlug: "science",
    cardType: "QUICK_FACT",
    content: "Elements in the same periodic-table group often have related chemical behavior.",
    explanation: "The table is arranged so repeating patterns become visible, especially across columns.",
    sources: [sources.iupacPeriodicTable]
  },
  {
    slug: "ice-can-float",
    title: "Ice floating is unusual",
    categorySlug: "science",
    cardType: "MISCONCEPTION",
    content: "Most solids sink in their own liquid, but ice can float on liquid water.",
    explanation: "Water expands as it freezes, making ice less dense than liquid water. That floating layer matters for lakes and ecosystems.",
    sources: [sources.usgsWaterDensity]
  },
  {
    slug: "hypotheses-need-testability",
    title: "A hypothesis needs a test",
    categorySlug: "science",
    cardType: "ACTIVE_RECALL",
    content: "A scientific hypothesis should be testable against evidence.",
    explanation: "If no observation could count for or against an idea, science has little grip on it.",
    prompt: "What makes a hypothesis useful in science?",
    answer: "It can be tested against evidence.",
    sources: [sources.berkeleyScience]
  },
  {
    slug: "rosetta-stone-unlocked-scripts",
    title: "The Rosetta Stone repeats a message",
    categorySlug: "history",
    cardType: "QUICK_FACT",
    content: "The Rosetta Stone carries related text in three scripts, including Egyptian hieroglyphs and Greek.",
    explanation: "Because scholars could read Greek, the stone helped them compare scripts and unlock Egyptian writing.",
    sources: [sources.britishMuseumRosetta]
  },
  {
    slug: "magna-carta-sealed-1215",
    title: "Magna Carta was sealed in 1215",
    categorySlug: "history",
    cardType: "MINI_QUIZ",
    content: "Magna Carta is associated with limits on royal power in medieval England.",
    explanation: "Its later influence became larger than the immediate political crisis that produced it.",
    prompt: "In what year was Magna Carta sealed?",
    answer: "1215",
    answerOptions: ["1066", "1215", "1492", "1776"],
    sources: [sources.ukParliamentMagnaCarta]
  },
  {
    slug: "apollo-11-first-moon-landing",
    title: "Apollo 11 reached the Moon",
    categorySlug: "history",
    cardType: "ACTIVE_RECALL",
    content: "Apollo 11 was the first mission to land humans on the Moon.",
    explanation: "Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins remained in orbit.",
    prompt: "Which NASA mission first landed humans on the Moon?",
    answer: "Apollo 11.",
    sources: [sources.nasaApollo11]
  },
  {
    slug: "gutenberg-bible-printing-shift",
    title: "Printing changed book scale",
    categorySlug: "history",
    cardType: "MINI_EXPLANATION",
    content: "The Gutenberg Bible is tied to the spread of movable-type printing in Europe.",
    explanation: "Printing made it easier to produce multiple copies with consistent text, changing how books could circulate.",
    sources: [sources.locGutenberg]
  },
  {
    slug: "silk-roads-were-networks",
    title: "The Silk Roads were networks",
    categorySlug: "history",
    cardType: "ANALOGY",
    content: "The Silk Roads were not one single road, but connected routes for trade and exchange.",
    explanation: "Goods, technologies, religions, and ideas moved through many linked regions over time.",
    analogy: "Think of them as an old-world internet of routes, hubs, and exchanges.",
    sources: [sources.unescoSilkRoad]
  },
  {
    slug: "opportunity-cost-best-alternative",
    title: "Opportunity cost is the next best thing",
    categorySlug: "economics",
    cardType: "ACTIVE_RECALL",
    content: "Opportunity cost is the value of the best alternative you give up when choosing something.",
    explanation: "It can be money, but it can also be time, attention, flexibility, or another project you cannot now do.",
    prompt: "What is opportunity cost?",
    answer: "The value of the best alternative given up.",
    sources: [sources.econlibOpportunityCost]
  },
  {
    slug: "cpi-tracks-consumer-basket",
    title: "CPI watches a basket",
    categorySlug: "economics",
    cardType: "QUICK_FACT",
    content: "The Consumer Price Index tracks price changes for a basket of consumer goods and services.",
    explanation: "It is one common way to summarize inflation experienced by households, though no single basket matches everyone perfectly.",
    sources: [sources.blsCpi]
  },
  {
    slug: "gdp-measures-domestic-output",
    title: "GDP measures production",
    categorySlug: "economics",
    cardType: "MINI_QUIZ",
    content: "Gross domestic product measures the value of goods and services produced within an economy.",
    explanation: "It is about production in a place over a period, not a direct measure of happiness or fairness.",
    prompt: "What does GDP mainly measure?",
    answer: "The value of goods and services produced.",
    answerOptions: ["The value of goods and services produced.", "The happiness of citizens.", "The number of bank accounts.", "The age of a country."],
    sources: [sources.beaGdp]
  },
  {
    slug: "inflation-is-rate-not-level",
    title: "Inflation is not the price level",
    categorySlug: "economics",
    cardType: "MISCONCEPTION",
    content: "Falling inflation does not necessarily mean prices are falling.",
    explanation: "It usually means prices are rising more slowly. A lower inflation rate can still leave the price level higher than before.",
    sources: [sources.imfInflation]
  },
  {
    slug: "comparative-advantage-relative-strength",
    title: "Comparative advantage is relative",
    categorySlug: "economics",
    cardType: "ANALOGY",
    content: "Comparative advantage is about lower opportunity cost, not being best at everything.",
    explanation: "Trade can make sense when people or countries specialize where they give up the least.",
    analogy: "A faster chef may still let an assistant chop vegetables if the chef's time is better spent cooking the main dish.",
    sources: [sources.econlibComparativeAdvantage]
  },
  {
    slug: "any-activity-beats-none",
    title: "Some movement beats none",
    categorySlug: "health",
    cardType: "QUICK_FACT",
    content: "The World Health Organization notes that any physical activity is better than none.",
    explanation: "This is general health information: small movement can count, and activity does not have to be intense to matter.",
    sources: [sources.whoPhysicalActivity]
  },
  {
    slug: "handwashing-uses-time",
    title: "Handwashing needs enough time",
    categorySlug: "health",
    cardType: "MINI_QUIZ",
    content: "The CDC describes handwashing as a sequence that includes wetting, lathering, scrubbing, rinsing, and drying.",
    explanation: "The scrubbing step matters because soap and friction help remove germs from the hands.",
    prompt: "Which step is part of effective handwashing?",
    answer: "Scrub with soap",
    answerOptions: ["Scrub with soap", "Only wave hands in air", "Skip drying every time", "Use cold air only"],
    sources: [sources.cdcHandwashing]
  },
  {
    slug: "sleep-supports-memory",
    title: "Sleep helps memory settle",
    categorySlug: "health",
    cardType: "MINI_EXPLANATION",
    content: "Sleep is linked with learning, memory, and brain maintenance.",
    explanation: "This is general information, not medical advice. Sleep gives the brain time to process and consolidate information.",
    sources: [sources.nindsSleep]
  },
  {
    slug: "uv-protection-reduces-exposure",
    title: "Sun safety is about UV exposure",
    categorySlug: "health",
    cardType: "ACTIVE_RECALL",
    content: "UV rays can damage skin even when the day does not feel extremely hot.",
    explanation: "Public-health guidance often groups shade, clothing, hats, sunglasses, and sunscreen as ways to reduce UV exposure.",
    prompt: "What is sun safety trying to reduce?",
    answer: "Exposure to ultraviolet rays.",
    sources: [sources.cdcSunSafety]
  },
  {
    slug: "relaxation-techniques-share-rhythm",
    title: "Relaxation often uses rhythm",
    categorySlug: "health",
    cardType: "MNEMONIC",
    content: "Many relaxation techniques use repeated attention to breathing, muscles, or imagery.",
    explanation: "This is general wellbeing information. The shared idea is giving attention a simple, repeatable anchor.",
    mnemonic: "Anchor, repeat, soften: pick a calm anchor and return to it.",
    sources: [sources.nccihRelaxation]
  },
  {
    slug: "task-switching-has-costs",
    title: "Switching tasks has a toll",
    categorySlug: "productivity",
    cardType: "QUICK_FACT",
    content: "Switching between tasks can create mental costs, especially when tasks are complex or unfamiliar.",
    explanation: "Multitasking often feels like doing two things at once, but the mind may be rapidly reconfiguring between them.",
    sources: [sources.apaMultitasking]
  },
  {
    slug: "spaced-study-beats-cramming",
    title: "Spacing helps learning",
    categorySlug: "productivity",
    cardType: "MINI_EXPLANATION",
    content: "Spreading study over time can improve learning compared with packing everything into one session.",
    explanation: "Spacing makes recall a little harder in a useful way, which can strengthen memory over repeated sessions.",
    sources: [sources.iesStudyGuide]
  },
  {
    slug: "if-then-plans-reduce-friction",
    title: "If-then plans pre-decide",
    categorySlug: "productivity",
    cardType: "ACTIVE_RECALL",
    content: "An implementation intention links a situation to a planned action.",
    explanation: "The format is simple: if a cue happens, then I will do a specific behavior. It reduces decision friction at the moment of action.",
    prompt: "What is the basic shape of an implementation intention?",
    answer: "If a situation happens, then I will do a specific action.",
    sources: [sources.apaImplementationIntention]
  },
  {
    slug: "cornell-notes-leave-cues",
    title: "Cornell notes leave recall cues",
    categorySlug: "productivity",
    cardType: "ONE_EXAMPLE",
    content: "The Cornell note-taking system separates notes, cues, and summary space.",
    explanation: "For example, after a lecture you can write questions in the cue column and use them later to test recall.",
    sources: [sources.cornellNotes]
  },
  {
    slug: "pomodoro-timeboxes-focus",
    title: "Pomodoro timeboxes attention",
    categorySlug: "productivity",
    cardType: "ANALOGY",
    content: "The Pomodoro Technique structures work into focused intervals separated by short breaks.",
    explanation: "The value is not magic timing; it is a visible container that makes starting and stopping easier.",
    analogy: "A timer is a small fence around attention: you only have to stay inside for this round.",
    sources: [sources.pomodoro]
  },
  {
    slug: "ipa-symbols-map-sounds",
    title: "IPA maps sounds, not spelling",
    categorySlug: "languages",
    cardType: "QUICK_FACT",
    content: "The International Phonetic Alphabet gives symbols for speech sounds.",
    explanation: "That helps compare pronunciation across languages even when ordinary spelling is inconsistent.",
    sources: [sources.ipaChart]
  },
  {
    slug: "cefr-levels-a-to-c",
    title: "CEFR levels run A to C",
    categorySlug: "languages",
    cardType: "MINI_QUIZ",
    content: "The CEFR describes language proficiency across broad bands from basic to proficient use.",
    explanation: "The familiar levels are A1, A2, B1, B2, C1, and C2.",
    prompt: "Which CEFR level is usually more advanced?",
    answer: "C1",
    answerOptions: ["A1", "A2", "B1", "C1"],
    sources: [sources.cefrLevels]
  },
  {
    slug: "cognates-share-origin",
    title: "Cognates are word relatives",
    categorySlug: "languages",
    cardType: "MINI_EXPLANATION",
    content: "Cognates are words in different languages that share an origin.",
    explanation: "They can make vocabulary easier to learn, but they are not always identical in meaning or use.",
    sources: [sources.britannicaCognate]
  },
  {
    slug: "unicode-supports-many-scripts",
    title: "Unicode is a writing-system bridge",
    categorySlug: "languages",
    cardType: "ANALOGY",
    content: "Unicode gives many writing systems a shared digital coding standard.",
    explanation: "Without such a standard, moving text between devices and apps would be far more fragile.",
    analogy: "It is like giving every character a passport that software around the world can recognize.",
    sources: [sources.unicode]
  },
  {
    slug: "vocabulary-needs-retrieval",
    title: "Vocabulary sticks through recall",
    categorySlug: "languages",
    cardType: "ACTIVE_RECALL",
    content: "Trying to retrieve a word can strengthen learning more than only rereading it.",
    explanation: "Short, spaced recall turns vocabulary from something familiar into something you can actually produce.",
    prompt: "What should you practice besides rereading vocabulary?",
    answer: "Retrieving the word from memory.",
    sources: [sources.iesStudyGuide]
  },
  {
    slug: "midi-sends-performance-instructions",
    title: "MIDI is not audio",
    categorySlug: "music",
    cardType: "MINI_EXPLANATION",
    content: "MIDI sends musical performance information such as notes and controls, not recorded sound waves.",
    explanation: "That is why the same MIDI notes can sound like piano, strings, or synth depending on the instrument receiving them.",
    sources: [sources.midi]
  },
  {
    slug: "tempo-is-speed",
    title: "Tempo is musical speed",
    categorySlug: "music",
    cardType: "QUICK_FACT",
    content: "Tempo describes the speed or pace of music.",
    explanation: "Beats per minute is one practical way to express it, but written tempo words can also guide the feel.",
    sources: [sources.britannicaTempo]
  },
  {
    slug: "circle-of-fifths-order",
    title: "The circle of fifths has a pattern",
    categorySlug: "music",
    cardType: "MNEMONIC",
    content: "The circle of fifths arranges keys by fifths and helps show key signatures and relationships.",
    explanation: "Moving around the circle changes accidentals in a predictable order.",
    mnemonic: "Father Charles Goes Down And Ends Battle, then Battle Ends And Down Goes Charles' Father.",
    sources: [sources.openMusicTheoryFifths]
  },
  {
    slug: "leitmotif-tags-an-idea",
    title: "A leitmotif can tag a character",
    categorySlug: "music",
    cardType: "ONE_EXAMPLE",
    content: "A leitmotif is a recurring musical idea associated with a person, place, feeling, or concept.",
    explanation: "For example, a film score might bring back the same short theme whenever a character appears.",
    sources: [sources.britannicaLeitmotif]
  },
  {
    slug: "syncopation-shifts-emphasis",
    title: "Syncopation leans off the beat",
    categorySlug: "music",
    cardType: "MINI_QUIZ",
    content: "Syncopation places emphasis where the listener may not expect it in the regular beat pattern.",
    explanation: "That off-beat stress can make music feel more lively or surprising.",
    prompt: "What does syncopation usually shift?",
    answer: "The expected rhythmic emphasis",
    answerOptions: ["The expected rhythmic emphasis", "The instrument color", "The language of lyrics", "The concert venue"],
    sources: [sources.britannicaSyncopation]
  },
  {
    slug: "foley-adds-everyday-sounds",
    title: "Foley rebuilds everyday sound",
    categorySlug: "cinema",
    cardType: "QUICK_FACT",
    content: "Foley artists create or recreate everyday sounds for film and video.",
    explanation: "Footsteps, cloth movement, and object handling may be recorded after filming so the scene feels present and detailed.",
    sources: [sources.britannicaFoley]
  },
  {
    slug: "film-registry-preserves-significant-films",
    title: "The Film Registry preserves significance",
    categorySlug: "cinema",
    cardType: "MINI_EXPLANATION",
    content: "The National Film Registry selects films considered culturally, historically, or aesthetically significant.",
    explanation: "It is a preservation signal, not a simple ranking of the most popular movies.",
    sources: [sources.locFilmRegistry]
  },
  {
    slug: "montage-meaning-through-order",
    title: "Montage makes meaning by order",
    categorySlug: "cinema",
    cardType: "ANALOGY",
    content: "Montage uses the arrangement of shots to create meaning, pace, or emotional effect.",
    explanation: "Two ordinary images can suggest a new idea when placed next to each other.",
    analogy: "A montage is editing as sentence-building: the shots are words, and order changes meaning.",
    sources: [sources.britannicaMontage]
  },
  {
    slug: "aspect-ratio-frame-shape",
    title: "Aspect ratio shapes the frame",
    categorySlug: "cinema",
    cardType: "MINI_QUIZ",
    content: "Aspect ratio describes the proportional relationship between a screen image's width and height.",
    explanation: "A wider ratio can feel panoramic, while a squarer ratio can feel more boxed-in or portrait-like.",
    prompt: "What does aspect ratio compare?",
    answer: "Width and height",
    answerOptions: ["Width and height", "Sound and silence", "Color and contrast", "Script and edit"],
    sources: [sources.academyAspectRatio]
  },
  {
    slug: "public-domain-film-not-automatic",
    title: "Old film is not automatically public domain",
    categorySlug: "cinema",
    cardType: "MISCONCEPTION",
    content: "A film being old does not automatically mean anyone can freely reuse it.",
    explanation: "Copyright status depends on factors such as date, registration, renewal, authorship, and jurisdiction.",
    sources: [sources.locCopyrightFilm]
  },
  {
    slug: "olympic-rings-five-continents",
    title: "The Olympic rings signal union",
    categorySlug: "sports",
    cardType: "QUICK_FACT",
    content: "The Olympic rings symbolize the union of the five inhabited continents and athletes meeting worldwide.",
    explanation: "Their power is visual shorthand: many colors, linked rings, one international competition.",
    sources: [sources.iocRings]
  },
  {
    slug: "offside-needs-active-play",
    title: "Offside is not just standing ahead",
    categorySlug: "sports",
    cardType: "MISCONCEPTION",
    content: "In football, being in an offside position is not automatically an offence.",
    explanation: "The player also has to become involved in active play under the law.",
    sources: [sources.ifabOffside]
  },
  {
    slug: "tennis-love-means-zero",
    title: "Love means zero in tennis",
    categorySlug: "sports",
    cardType: "MINI_QUIZ",
    content: "Tennis scoring uses the word love for a score of zero.",
    explanation: "That is why a game can begin at love-all before either player has won a point.",
    prompt: "In tennis scoring, what does love mean?",
    answer: "Zero",
    answerOptions: ["Zero", "One point", "A tied set", "A match point"],
    sources: [sources.olympicsTennisScoring]
  },
  {
    slug: "marathon-distance-standard",
    title: "A marathon has a standard distance",
    categorySlug: "sports",
    cardType: "ACTIVE_RECALL",
    content: "The marathon distance is 42.195 kilometers, or 26 miles 385 yards.",
    explanation: "Standardizing the distance lets performances across races be compared more fairly.",
    prompt: "What is the marathon distance in kilometers?",
    answer: "42.195 kilometers.",
    sources: [sources.worldAthleticsMarathon]
  },
  {
    slug: "shot-clock-forces-pace",
    title: "The shot clock creates urgency",
    categorySlug: "sports",
    cardType: "ANALOGY",
    content: "Basketball's shot clock limits how long a team can hold the ball before attempting a shot.",
    explanation: "It keeps the game from freezing into endless possession and encourages offensive action.",
    analogy: "It is a deadline attached to possession: use the chance, or lose it.",
    sources: [sources.nbaShotClock]
  },
  {
    slug: "retrieval-practice-strengthens-memory",
    title: "Recall is training, not just testing",
    categorySlug: "psychology",
    cardType: "MINI_EXPLANATION",
    content: "Trying to retrieve information can strengthen later memory.",
    explanation: "That is why a quick self-test can be useful even before you feel fully ready.",
    sources: [sources.apaRetrievalPractice]
  },
  {
    slug: "cognitive-dissonance-tension",
    title: "Dissonance is mental friction",
    categorySlug: "psychology",
    cardType: "QUICK_FACT",
    content: "Cognitive dissonance is discomfort from holding conflicting beliefs, attitudes, or behaviors.",
    explanation: "People often try to reduce that discomfort by changing beliefs, behavior, or how they explain the conflict.",
    sources: [sources.apaCognitiveDissonance]
  },
  {
    slug: "confirmation-bias-filters-evidence",
    title: "Confirmation bias filters evidence",
    categorySlug: "psychology",
    cardType: "ACTIVE_RECALL",
    content: "Confirmation bias is the tendency to favor information that supports what you already believe.",
    explanation: "A useful counter-move is to ask what evidence would make the opposite view stronger.",
    prompt: "What kind of information does confirmation bias favor?",
    answer: "Information that supports existing beliefs.",
    sources: [sources.apaConfirmationBias]
  },
  {
    slug: "working-memory-small-workbench",
    title: "Working memory is a small workbench",
    categorySlug: "psychology",
    cardType: "ANALOGY",
    content: "Working memory holds and manipulates information for short periods.",
    explanation: "Because it is limited, offloading notes or reducing distractions can make thinking easier.",
    analogy: "It is like a small desk: the more clutter on it, the harder it is to work.",
    sources: [sources.apaWorkingMemory]
  },
  {
    slug: "classical-conditioning-pairs-stimuli",
    title: "Classical conditioning pairs cues",
    categorySlug: "psychology",
    cardType: "MINI_QUIZ",
    content: "Classical conditioning is learning through association between stimuli.",
    explanation: "A previously neutral cue can start to trigger a response after repeated pairing with another stimulus.",
    prompt: "Classical conditioning is mainly learning by what?",
    answer: "Association",
    answerOptions: ["Association", "Long division", "Random guessing", "Physical growth"],
    sources: [sources.apaClassicalConditioning]
  },
  {
    slug: "latitude-runs-east-west",
    title: "Latitude lines run east-west",
    categorySlug: "geography",
    cardType: "MINI_QUIZ",
    content: "Latitude measures distance north or south of the equator.",
    explanation: "Latitude lines run east-west around the globe, but their numbers tell you north-south position.",
    prompt: "Latitude measures distance from what line?",
    answer: "The equator",
    answerOptions: ["The equator", "The prime meridian", "The Arctic Circle", "The International Date Line"],
    sources: [sources.noaaLatitude]
  },
  {
    slug: "longitude-measures-east-west",
    title: "Longitude measures east-west position",
    categorySlug: "geography",
    cardType: "QUICK_FACT",
    content: "Longitude measures distance east or west of the prime meridian.",
    explanation: "Together, latitude and longitude create a coordinate system for locating places on Earth.",
    sources: [sources.noaaLongitude]
  },
  {
    slug: "watershed-drains-together",
    title: "A watershed is a drain family",
    categorySlug: "geography",
    cardType: "ANALOGY",
    content: "A watershed is an area of land where water drains toward a common outlet.",
    explanation: "Rain falling in different parts of the same watershed can eventually feed the same river, lake, or ocean.",
    analogy: "Picture a bathtub: everything on the sloped surface heads toward the same drain.",
    sources: [sources.usgsWatershed]
  },
  {
    slug: "rain-shadow-dry-side",
    title: "Mountains can make dry shadows",
    categorySlug: "geography",
    cardType: "MINI_EXPLANATION",
    content: "A rain shadow forms when mountains block moist air, leaving one side much drier.",
    explanation: "Air rises, cools, and drops moisture on the windward side; the leeward side receives drier air.",
    sources: [sources.nationalGeographicRainShadow]
  },
  {
    slug: "map-projections-distort",
    title: "Every flat world map distorts",
    categorySlug: "geography",
    cardType: "MISCONCEPTION",
    content: "No flat map can show the curved Earth perfectly in every way.",
    explanation: "Map projections trade off distortions in area, shape, distance, or direction depending on their purpose.",
    sources: [sources.usgsMapProjections]
  },
  {
    slug: "impressionism-captures-light",
    title: "Impressionism chased light",
    categorySlug: "art",
    cardType: "MINI_EXPLANATION",
    content: "Impressionist painters often emphasized light, color, and the feeling of a moment.",
    explanation: "Loose brushwork and modern scenes helped them capture perception rather than polished academic finish.",
    sources: [sources.metImpressionism]
  },
  {
    slug: "mona-lisa-in-louvre",
    title: "The Mona Lisa lives at the Louvre",
    categorySlug: "art",
    cardType: "QUICK_FACT",
    content: "Leonardo da Vinci's Mona Lisa is housed at the Louvre in Paris.",
    explanation: "Its fame comes from the painting itself, its history, and the massive cultural attention built around it.",
    sources: [sources.louvreMonaLisa]
  },
  {
    slug: "colour-changes-feeling",
    title: "Color carries structure and mood",
    categorySlug: "art",
    cardType: "ACTIVE_RECALL",
    content: "Artists use color for more than decoration: it can organize a work and shape emotional tone.",
    explanation: "Color choices affect contrast, focus, atmosphere, and how the viewer reads a composition.",
    prompt: "Name one job color can do in an artwork.",
    answer: "It can organize the composition or shape the emotional tone.",
    sources: [sources.tateColour]
  },
  {
    slug: "linear-perspective-depth-illusion",
    title: "Perspective fakes depth",
    categorySlug: "art",
    cardType: "ANALOGY",
    content: "Linear perspective creates the illusion of depth on a flat surface.",
    explanation: "Parallel lines appear to converge toward vanishing points, making space feel organized and three-dimensional.",
    analogy: "It is stagecraft for paper: a flat sheet learns to act like a deep room.",
    sources: [sources.nationalGalleryPerspective]
  },
  {
    slug: "ukiyo-e-floating-world",
    title: "Ukiyo-e means floating world",
    categorySlug: "art",
    cardType: "MINI_QUIZ",
    content: "Ukiyo-e is a Japanese print and painting tradition associated with the floating world.",
    explanation: "Its subjects included actors, courtesans, landscapes, city life, and scenes of leisure.",
    prompt: "Which country is most associated with ukiyo-e?",
    answer: "Japan",
    answerOptions: ["Japan", "Mexico", "Egypt", "Norway"],
    sources: [sources.metUkiyoe]
  },
  {
    slug: "haiku-compresses-observation",
    title: "Haiku compresses a moment",
    categorySlug: "literature",
    cardType: "ACTIVE_RECALL",
    content: "Haiku is a short poetic form often associated with concentrated observation and seasonal reference.",
    explanation: "In English, the spirit of compression often matters more than mechanically forcing every poem into a syllable count.",
    prompt: "What is haiku especially good at compressing?",
    answer: "A brief observation or moment.",
    sources: [sources.britannicaHaiku]
  },
  {
    slug: "sonnet-fourteen-lines",
    title: "A sonnet has fourteen lines",
    categorySlug: "literature",
    cardType: "QUICK_FACT",
    content: "A sonnet is traditionally a fourteen-line poem.",
    explanation: "Different sonnet traditions use different rhyme schemes and argument turns, but the fourteen-line frame is the anchor.",
    sources: [sources.poetrySonnet]
  },
  {
    slug: "unreliable-narrator-not-author",
    title: "A narrator is not the author",
    categorySlug: "literature",
    cardType: "MISCONCEPTION",
    content: "A first-person narrator's view is not automatically the author's view.",
    explanation: "Narrators can be limited, biased, mistaken, or deliberately unreliable. That gap is often part of the literary design.",
    sources: [sources.purdueNarration]
  },
  {
    slug: "gutenberg-bible-literary-circulation",
    title: "Printing changed reading scale",
    categorySlug: "literature",
    cardType: "MINI_EXPLANATION",
    content: "Movable-type printing helped books circulate in more consistent copies.",
    explanation: "The Gutenberg Bible is a famous marker of that shift from manuscript copying toward print culture in Europe.",
    sources: [sources.locGutenberg]
  },
  {
    slug: "metaphor-says-one-thing-is-another",
    title: "Metaphor skips like",
    categorySlug: "literature",
    cardType: "ONE_EXAMPLE",
    content: "A metaphor describes one thing as another to transfer meaning.",
    explanation: "For example, saying time is a thief suggests loss and stealth without using the word like.",
    sources: [sources.britannicaMetaphor]
  },
  {
    slug: "validity-differs-from-truth",
    title: "Validity is about form",
    categorySlug: "philosophy",
    cardType: "MINI_EXPLANATION",
    content: "In logic, validity means the conclusion follows from the premises if the premises are true.",
    explanation: "A valid argument can still have false premises. Soundness adds the extra requirement that the premises are actually true.",
    sources: [sources.sepClassicalLogic]
  },
  {
    slug: "categorical-imperative-universal-test",
    title: "Kant asks whether a rule can generalize",
    categorySlug: "philosophy",
    cardType: "ACTIVE_RECALL",
    content: "One version of Kant's categorical imperative asks whether your maxim could be willed as a universal law.",
    explanation: "The test shifts attention from private convenience to whether the rule could coherently apply to everyone.",
    prompt: "What does the universal-law test ask you to imagine?",
    answer: "Whether the rule of your action could apply universally.",
    sources: [sources.sepKant]
  },
  {
    slug: "veil-of-ignorance-fairness",
    title: "The veil hides your place",
    categorySlug: "philosophy",
    cardType: "ANALOGY",
    content: "Rawls's veil of ignorance asks people to choose principles without knowing their own position in society.",
    explanation: "The thought experiment is designed to make fairness less dependent on personal advantage.",
    analogy: "Design the rules before you know which seat at the table you will get.",
    sources: [sources.sepOriginalPosition]
  },
  {
    slug: "occams-razor-keep-it-simple",
    title: "Occam's razor favors fewer extras",
    categorySlug: "philosophy",
    cardType: "QUICK_FACT",
    content: "Occam's razor is the idea that explanations should not multiply assumptions without need.",
    explanation: "It does not prove the simplest answer is true; it is a preference for not adding unnecessary machinery.",
    sources: [sources.britannicaOccam]
  },
  {
    slug: "stoic-control-distinction",
    title: "Stoicism sorts control",
    categorySlug: "philosophy",
    cardType: "MNEMONIC",
    content: "Stoic ethics often emphasizes distinguishing what depends on us from what does not.",
    explanation: "That distinction helps redirect effort toward judgment, action, and character rather than uncontrollable outcomes.",
    mnemonic: "Control the choice, release the noise.",
    sources: [sources.sepStoicism]
  },
  {
    slug: "prime-number-two-factors",
    title: "A prime has exactly two positive divisors",
    categorySlug: "mathematics",
    cardType: "MINI_QUIZ",
    content: "A prime number is a positive integer greater than 1 with no positive divisors except 1 and itself.",
    explanation: "That is why 2 is prime, while 1 is not.",
    prompt: "Which number is prime?",
    answer: "2",
    answerOptions: ["1", "2", "4", "9"],
    sources: [sources.mathworldPrime]
  },
  {
    slug: "pythagorean-right-triangle",
    title: "Right triangles obey a square rule",
    categorySlug: "mathematics",
    cardType: "ONE_EXAMPLE",
    content: "The Pythagorean theorem relates the sides of a right triangle.",
    explanation: "For a 3-4-5 right triangle, 3 squared plus 4 squared equals 5 squared.",
    sources: [sources.britannicaPythagorean]
  },
  {
    slug: "logarithm-undoes-exponent",
    title: "A logarithm asks for the exponent",
    categorySlug: "mathematics",
    cardType: "ANALOGY",
    content: "A logarithm answers: what exponent gets the base to this number?",
    explanation: "If 10 squared is 100, then log base 10 of 100 is 2.",
    analogy: "Exponentiation is climbing the ladder; a logarithm asks which rung you reached from.",
    sources: [sources.britannicaLogarithm]
  },
  {
    slug: "expected-value-weighted-average",
    title: "Expected value is a weighted average",
    categorySlug: "mathematics",
    cardType: "QUICK_FACT",
    content: "Expected value combines possible outcomes by weighting each one by its probability.",
    explanation: "It is not a promise of what will happen next; it is the long-run average implied by the probabilities.",
    sources: [sources.khanExpectedValue]
  },
  {
    slug: "zero-placeholder-power",
    title: "Zero can hold a place",
    categorySlug: "mathematics",
    cardType: "MINI_EXPLANATION",
    content: "Zero is both a number and a powerful placeholder in positional notation.",
    explanation: "The difference between 105 and 15 depends on zero holding a position, not just on the digits 1 and 5.",
    sources: [sources.britannicaZero]
  },
  {
    slug: "cash-flow-is-not-profit",
    title: "Profit is not the same as cash",
    categorySlug: "business",
    cardType: "MISCONCEPTION",
    content: "A company can report profit and still face cash-flow pressure.",
    explanation: "Accounting income and cash movement are related but different views. Timing of payments can make the difference.",
    sources: [sources.secStatements]
  },
  {
    slug: "balance-sheet-snapshot",
    title: "A balance sheet is a snapshot",
    categorySlug: "business",
    cardType: "QUICK_FACT",
    content: "A balance sheet summarizes assets, liabilities, and shareholders' equity at a point in time.",
    explanation: "That makes it different from an income statement, which covers performance over a period.",
    sources: [sources.secStatements]
  },
  {
    slug: "market-research-finds-customers",
    title: "Market research narrows the customer",
    categorySlug: "business",
    cardType: "ACTIVE_RECALL",
    content: "Market research helps identify customers, competitors, and demand signals.",
    explanation: "It turns a vague audience into a more concrete set of people, needs, and alternatives.",
    prompt: "Name one thing market research helps identify.",
    answer: "Customers, competitors, or demand signals.",
    sources: [sources.sbaMarketResearch]
  },
  {
    slug: "risk-factors-name-uncertainty",
    title: "Risk factors are signposts",
    categorySlug: "business",
    cardType: "MINI_EXPLANATION",
    content: "Public-company filings often include risk factors that describe uncertainties facing the business.",
    explanation: "They are not predictions, but they highlight issues investors should understand before relying on the story.",
    sources: [sources.secRiskFactors]
  },
  {
    slug: "npv-discounts-future-cash",
    title: "NPV discounts the future",
    categorySlug: "business",
    cardType: "ANALOGY",
    content: "Net present value compares future cash flows in today's terms.",
    explanation: "Discounting recognizes that money expected later is not valued the same as money available now.",
    analogy: "It is financial translation: future dollars are converted into today's language.",
    sources: [sources.investopediaNpv]
  },
  {
    slug: "pollinators-move-pollen",
    title: "Pollinators move pollen",
    categorySlug: "nature",
    cardType: "QUICK_FACT",
    content: "Pollinators help move pollen between flowers, supporting reproduction in many plants.",
    explanation: "Bees, butterflies, birds, bats, and other animals can all play pollination roles in different ecosystems.",
    sources: [sources.usdaPollinators]
  },
  {
    slug: "keystone-species-outsized-role",
    title: "A keystone species punches above its weight",
    categorySlug: "nature",
    cardType: "ANALOGY",
    content: "A keystone species has an unusually large effect on its ecosystem relative to its abundance.",
    explanation: "Removing it can change the structure of the whole community.",
    analogy: "It is like one small pin holding a large hinge in place.",
    sources: [sources.nationalGeographicKeystone]
  },
  {
    slug: "invasive-means-harmful-nonnative",
    title: "Non-native is not always invasive",
    categorySlug: "nature",
    cardType: "MISCONCEPTION",
    content: "A species being non-native does not automatically make it invasive.",
    explanation: "Invasive species are non-native organisms that cause, or are likely to cause, harm to the environment, economy, or health.",
    sources: [sources.usdaInvasive]
  },
  {
    slug: "biodiversity-variety-of-life",
    title: "Biodiversity is variety of life",
    categorySlug: "nature",
    cardType: "MINI_QUIZ",
    content: "Biodiversity refers to the variety of life at genetic, species, and ecosystem levels.",
    explanation: "It is not just a count of animals; it includes the variation and systems that life depends on.",
    prompt: "Which is part of biodiversity?",
    answer: "Genetic, species, and ecosystem variety",
    answerOptions: ["Genetic, species, and ecosystem variety", "Only rainfall", "Only mountain height", "Only city size"],
    sources: [sources.cbdBiodiversity]
  },
  {
    slug: "mycorrhizae-connect-fungi-roots",
    title: "Mycorrhizae link fungi and roots",
    categorySlug: "nature",
    cardType: "MINI_EXPLANATION",
    content: "Mycorrhizae are associations between fungi and plant roots.",
    explanation: "The relationship can help plants access nutrients while fungi receive carbohydrates from the plant.",
    sources: [sources.usdaMycorrhizae]
  },
  {
    slug: "mars-fourth-from-sun",
    title: "Mars is fourth from the Sun",
    categorySlug: "space",
    cardType: "MINI_QUIZ",
    content: "The inner planets are Mercury, Venus, Earth, and Mars.",
    explanation: "Mars sits just beyond Earth in the inner solar system, making it the fourth planet from the Sun.",
    prompt: "Which planet is fourth from the Sun?",
    answer: "Mars",
    answerOptions: ["Venus", "Earth", "Mars", "Jupiter"],
    sources: [sources.nasaPlanets]
  },
  {
    slug: "webb-works-in-infrared",
    title: "Webb sees infrared light",
    categorySlug: "space",
    cardType: "MINI_EXPLANATION",
    content: "The James Webb Space Telescope is optimized for infrared astronomy.",
    explanation: "Infrared light helps it study cool objects, dusty regions, and very distant galaxies whose light has stretched to longer wavelengths.",
    sources: [sources.nasaWebb]
  },
  {
    slug: "exoplanet-outside-solar-system",
    title: "Exoplanets orbit other stars",
    categorySlug: "space",
    cardType: "ACTIVE_RECALL",
    content: "An exoplanet is a planet outside our solar system.",
    explanation: "Many known exoplanets orbit other stars, and scientists detect them with methods such as transits and stellar wobble.",
    prompt: "What is an exoplanet?",
    answer: "A planet outside our solar system.",
    sources: [sources.nasaExoplanets]
  },
  {
    slug: "expanding-universe-stretching-space",
    title: "Expansion stretches space itself",
    categorySlug: "space",
    cardType: "ANALOGY",
    content: "The expanding universe means space itself is stretching between distant galaxies.",
    explanation: "It is not simply galaxies flying through empty space from one central explosion point.",
    analogy: "Like dots on a balloon moving apart as the balloon surface expands, but in three-dimensional space.",
    sources: [sources.nasaExpansion]
  },
  {
    slug: "black-holes-trap-light",
    title: "Black holes trap light past a boundary",
    categorySlug: "space",
    cardType: "QUICK_FACT",
    content: "A black hole has gravity so strong that beyond its event horizon, light cannot escape.",
    explanation: "The event horizon is not a solid surface; it is the boundary after which escape is no longer possible.",
    sources: [sources.nasaBlackHoles]
  }
];
