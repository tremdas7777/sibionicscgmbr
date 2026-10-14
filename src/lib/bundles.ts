import { brand } from "@/lib/brand";

/** Kits: 1, 2 ou 3 sensores CGM GS1 (14 dias cada). */
export type BundleId = "1" | "2" | "3";

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valor mínimo (produtos + order bump, sem frete) para liberar o frete grátis. */
export const FREE_SHIPPING_MIN = 90;
export const FREE_SHIPPING_LABEL = `Frete grátis acima de ${brl(FREE_SHIPPING_MIN)}`;

export const isFreeShippingEligible = (subtotal: number) => subtotal >= FREE_SHIPPING_MIN;

/** Selo de frete por kit: grátis quando o próprio kit já passa do mínimo. */
export const bundleShippingLabel = (b: { price: number }) =>
  isFreeShippingEligible(b.price) ? "Frete grátis" : FREE_SHIPPING_LABEL;

export type Bundle = {
  id: BundleId;
  name: string;
  /** Sensores no kit (usado em relatórios, rastreio e no upsell). */
  units: number;
  price: number;
  compareAtPrice?: number;
  description: string;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
};

const PRODUCT_SUMMARY =
  "sensor de monitoramento contínuo de glicose de 14 dias, sem picadas nem calibração, com leituras em tempo real no celular";

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "1 Unidade",
    units: 1,
    price: 289,
    description: "1 sensor CGM GS1 (14 dias)",
    checkoutProductName: brand.productName,
    checkoutProductDescription: `${brand.productName}: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=1",
  },
  {
    id: "2",
    name: "2 Unidades",
    units: 2,
    price: 497,
    description: "2 sensores CGM GS1 (28 dias)",
    checkoutProductName: `${brand.productName} — 2 Unidades`,
    checkoutProductDescription: `2 unidades do ${brand.productName}: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=2",
    featured: true,
    badge: "Mais escolhido",
  },
  {
    id: "3",
    name: "3 Unidades",
    units: 3,
    price: 697,
    description: "3 sensores CGM GS1 (42 dias)",
    checkoutProductName: `${brand.productName} — 3 Unidades`,
    checkoutProductDescription: `3 unidades do ${brand.productName}: ${PRODUCT_SUMMARY}.`,
    checkoutUrl: "/checkout?plano=3",
    badge: "Melhor custo por sensor",
  },
];

/** Kits visíveis na loja. */
export const availableBundles = bundles;

/** Kit que abre selecionado na loja. */
export const DEFAULT_BUNDLE_ID: BundleId = "1";

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (raw === "1" || raw === "2" || raw === "3") return raw;
  return undefined;
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return availableBundles.find((b) => b.id === parsed) ?? availableBundles[0]!;
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

/** Próximo kit para upsell (1→2, 2→3) */
export function getUpgradeBundle(current: Bundle): Bundle | null {
  if (current.id === "1") return availableBundles.find((b) => b.id === "2") ?? null;
  if (current.id === "2") return availableBundles.find((b) => b.id === "3") ?? null;
  return null;
}

/** "1 unidade" / "3 unidades" */
export const unitsLabel = (units: number) => `${units} ${units > 1 ? "unidades" : "unidade"}`;

/** "14 dias de monitoramento" por kit (resumo do checkout). */
export function bundleDurationLabel(bundle: Bundle) {
  return `${bundle.units * 14} dias de monitoramento`;
}
