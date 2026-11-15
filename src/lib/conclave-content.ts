export type TierId = "pista" | "mezanino" | "camarote";
export type NewsKind = "filmes" | "series" | "jogos";
export type PlanId = "gratis" | "estudio" | "festival";

export type CatalogEvent = {
  id: string;
  title: string;
  when: string;
  place: string;
  blurb: string;
  image: string;
  position: string;
  badge: [string, string];
};

export type Story = {
  id: string;
  kind: NewsKind;
  kicker: string;
  title: string;
  when: string;
  dek: string;
  image: string;
  position: string;
  body: [string, string];
};

export const tiers: { id: TierId; name: string; price: number; detail: string }[] = [
  { id: "pista", name: "Pista", price: 80, detail: "Feira, mesas abertas e novidades." },
  { id: "mezanino", name: "Mezanino", price: 140, detail: "Lugar marcado na trilha de filmes." },
  { id: "camarote", name: "Camarote", price: 260, detail: "Encontro curto com a mesa de criação." },
];

export const promos: Record<string, { kind: "percent" | "flat"; value: number; label: string }> = {
  ARCADE10: { kind: "percent", value: 0.1, label: "10% no ingresso" },
  LORE20: { kind: "percent", value: 0.2, label: "20% no ingresso" },
  FAS15: { kind: "flat", value: 15, label: "R$ 15 por ingresso" },
};

export const events: CatalogEvent[] = [
  {
    id: "feira",
    title: "Feira Geek de Outono",
    when: "Sáb, 14 out · 10:00",
    place: "Hall Meadow, Recife",
    blurb: "Mesas de jogo, pré-estreias e oficinas. O encontro que abre a temporada.",
    image: "/art/harvest.jpg",
    position: "62% 46%",
    badge: ["OUT", "14"],
  },
  {
    id: "iris",
    title: "Clube das Íris",
    when: "Ter, 21 out · 19:30",
    place: "Sala Jardim, Recife",
    blurb: "Leitura de fantasia para dez pessoas. Chá, um quadro e nenhum spoiler na porta.",
    image: "/art/irises.jpg",
    position: "70% 22%",
    badge: ["OUT", "21"],
  },
  {
    id: "astronomo",
    title: "Noite do Astrônomo",
    when: "Sáb, 2 nov · 20:00",
    place: "Cúpula Leste, Olinda",
    blurb: "Piloto da série com debate e um mapa desenhado na hora.",
    image: "/art/astronomer.jpg",
    position: "50% 28%",
    badge: ["NOV", "02"],
  },
  {
    id: "dragao",
    title: "Mesa do Dragão",
    when: "Dom, 9 nov · 15:00",
    place: "Galpão 4, Recife",
    blurb: "Pré-venda do jogo de tabuleiro e pintura de miniaturas no estande.",
    image: "/art/dragon.jpg",
    position: "48% 42%",
    badge: ["NOV", "09"],
  },
];

export const stories: Story[] = [
  {
    id: "nevoa",
    kind: "filmes",
    kicker: "Filme",
    title: "Névoa Alta",
    when: "Pré-estreia · 18 out",
    dek: "Fantasia quase sem fala: um viajante, um penhasco e um mapa que ninguém lê igual.",
    image: "/art/castle.jpg",
    position: "50% 32%",
    body: [
      "A sessão de abertura da Feira Geek de Outono cabe numa hora. Névoa Alta segue alguém que sobe até a serra com uma carta no bolso e não decide se vai entregá-la.",
      "Depois da projeção, a direção comenta o quadro do cartaz e deixa a mesa livre para quem quiser jogar a cena de outro jeito. Mezanino inclui lugar marcado.",
    ],
  },
  {
    id: "lanca",
    kind: "filmes",
    kicker: "Filme",
    title: "A Lança e o Dragão",
    when: "Animação · 2 nov",
    dek: "Releitura curta de um quadro clássico, com trilha ao vivo no galpão.",
    image: "/art/dragon.jpg",
    position: "50% 40%",
    body: [
      "Oito minutos, tinta e madeira. A Lança e o Dragão não tenta ganhar do quadro: para no gesto em que a lança ainda não acertou nada.",
      "A sessão dupla com o piloto da série acontece no Galpão 4. Quem estiver na Mesa do Dragão entra com o mesmo ingresso de pista.",
    ],
  },
  {
    id: "alquimista",
    kind: "series",
    kicker: "Série",
    title: "O Alquimista",
    when: "6 episódios · 7 nov",
    dek: "Laboratório, dívidas e uma fórmula que muda de mãos toda semana.",
    image: "/art/alchemist.jpg",
    position: "50% 40%",
    body: [
      "Minissérie de época sobre um laboratório que não fecha as contas. Cada episódio entrega a fórmula para uma pessoa diferente e desmente a versão anterior.",
      "O capítulo 1 passa na feira, de graça para quem já tem ingresso. O cupom LORE20 está impresso no cartaz da sala.",
    ],
  },
  {
    id: "cartas",
    kind: "series",
    kicker: "Série",
    title: "Cartas do Astrônomo",
    when: "Estreia · 21 nov",
    dek: "Um astrônomo recebe cartas de um céu que ainda não foi mapeado.",
    image: "/art/astronomer.jpg",
    position: "55% 30%",
    body: [
      "Drama lento, quase um jogo de correspondência. As cartas chegam com coordenadas que não batem com nenhum atlas da época.",
      "A Noite do Astrônomo mostra o piloto e abre uma mesa para escrever a carta do episódio 2. Camarote senta na primeira fila.",
    ],
  },
  {
    id: "mesa",
    kind: "jogos",
    kicker: "Jogo",
    title: "Mesa do Dragão",
    when: "Pré-venda · 9 nov",
    dek: "Tático de 2 a 4 pessoas. Miniaturas pintadas à mão no estande da feira.",
    image: "/art/dragon.jpg",
    position: "30% 55%",
    body: [
      "Tabuleiro curto, uma hora, sem aplicativo. A lança só entra no terceiro turno, e o dragão não é o inimigo de ninguém no primeiro.",
      "A pré-venda fecha no domingo da Mesa do Dragão. Quem jogar a demo na feira leva o cupom ARCADE10 no verso do manual.",
    ],
  },
  {
    id: "laboratorio",
    kind: "jogos",
    kicker: "Jogo",
    title: "Laboratório",
    when: "Demo na feira · 14 out",
    dek: "Cooperativo de dedução. Três frascos, uma dívida e vinte minutos.",
    image: "/art/alchemist.jpg",
    position: "62% 35%",
    body: [
      "Inspirado na série, mas não precisa ter visto. O grupo tenta repetir uma fórmula com pistas que se contradizem de propósito.",
      "A demo roda o dia inteiro na Feira Geek de Outono, sem hora marcada. Chegou, sentou, misturou.",
    ],
  },
];

export const plans: {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  detail: string;
  points: string[];
}[] = [
  {
    id: "gratis",
    name: "Grátis",
    price: "R$ 0",
    period: "",
    detail: "Para o primeiro encontro. Página no ar no mesmo dia.",
    points: ["1 evento em destaque", "Até 50 inscrições", "Cupom simples"],
  },
  {
    id: "estudio",
    name: "Estúdio",
    price: "R$ 49",
    period: "/mês",
    detail: "Para quem repete a mesa toda temporada.",
    points: ["Eventos sem teto", "Três cupons ativos", "Lembrete na página"],
  },
  {
    id: "festival",
    name: "Festival",
    price: "R$ 149",
    period: "/mês",
    detail: "Para feira com trilha de filme, série e jogo.",
    points: ["Check-in na porta", "Várias trilhas", "Camarote e encontro"],
  },
];

export const chronicles: { quote: string; name: string; role: string }[] = [
  {
    quote: "Publiquei a página do clube no intervalo do ensaio. Dez cadeiras, e encheu antes do chá esquentar.",
    name: "Helena Vargas",
    role: "Clube das Íris",
  },
  {
    quote: "A trilha de filmes e a mesa de jogo dividem o mesmo ingresso. Ninguém ficou perguntando em qual fila entrar.",
    name: "Miguel Torres",
    role: "Feira Geek de Outono",
  },
  {
    quote: "O check-in coube no celular, na porta do galpão, sem planilha emprestada de última hora.",
    name: "Rita Nogueira",
    role: "Mesa do Dragão",
  },
];

export function normalizePromo(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function unitPrice(tier: TierId, promo: string | null): number {
  const base = tiers.find((item) => item.id === tier)?.price ?? 0;
  if (!promo || !promos[promo]) return base;
  const deal = promos[promo];
  if (deal.kind === "percent") return Math.round(base * (1 - deal.value));
  return Math.max(0, base - deal.value);
}

export const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
