import heroProduct from "@/assets/hero-product.webp.asset.json";

const imgAdesivos = heroProduct.url;

/**
 * Order bumps do checkout (ofertas logo acima do botão de finalizar).
 * Preços usados no servidor — o cliente só exibe. Lista vazia = checkout sem bump.
 */
export type OrderBumpItem = {
  id: string;
  name: string;
  fullName: string;
  /** Nome enviado ao gateway (fatura). */
  gatewayName: string;
  price: number;
  /** Preço "de" (riscado). Sem ele, a oferta mostra só o preço. */
  compareAt?: number;
  img: string;
  /** Texto de venda exibido no checkout. */
  question: string;
  body: string;
  benefits: string[];
  /** Texto do checkbox; `{preco}` vira o preço formatado. */
  cta: string;
};

export type BumpId = OrderBumpItem["id"];

export const ORDER_BUMPS: readonly OrderBumpItem[] = [
  {
    id: "adesivos",
    name: "+10 adesivos de fixação",
    fullName: "10 adesivos de fixação à prova d'água para o sensor SIBIONICS GS1",
    gatewayName: "Pedido SIBIONICS",
    price: 29.9,
    compareAt: 49.9,
    img: imgAdesivos,
    question: "Deixe o sensor firme os 14 dias inteiros.",
    body: "Banho, academia, praia e suor soltam o adesivo original antes da hora, e sensor que descola é sensor perdido. Leve 10 adesivos de reforço agora, no mesmo envio, com o desconto que só aparece nesta tela.",
    benefits: [
      "À prova d'água: banho, piscina e treino",
      "Mesmo envio do sensor, sem frete extra",
      "Protege o sensor até o último dia",
    ],
    cta: "Sim! Quero +10 adesivos por + {preco}",
  },
];

/** Bumps escolhidos, na ordem do checkout (ids repetidos ou desconhecidos são ignorados). */
export const getBumps = (ids: readonly string[]) => ORDER_BUMPS.filter((b) => ids.includes(b.id));

/** Soma dos bumps escolhidos, em reais. */
export const bumpsTotal = (ids: readonly string[]) =>
  Math.round(getBumps(ids).reduce((s, b) => s + b.price * 100, 0)) / 100;
