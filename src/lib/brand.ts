/** Marca da loja — CGM GS1 (sensor de monitoramento contínuo de glicose) */
export const brand = {
  name: "CGM GS1",
  productName: "Sensor CGM GS1",
  /** Descrição genérica enviada ao gateway na cobrança (sem detalhes do produto). */
  chargeDescription: "Pedido CGM GS1",
  tagline: "Sua glicose 24 horas por dia, sem picadas",
  taglineShort: "Monitoramento contínuo de glicose",
  /**
   * Dados da empresa — preencha antes de publicar. Campos vazios ficam ocultos
   * no rodapé, no contato e nas políticas.
   */
  company: {
    legalName: "",
    cnpj: "",
  },
  /** Registro ANVISA do produto revendido. */
  anvisa: "",
  email: "",
  /** Domínio da loja (ex.: "https://cgmgs1.com.br"), sem barra no final. Usado no og:image. */
  siteUrl: "",
  whatsapp: {
    /** Número em E.164 (DDI + DDD + número), sem símbolos */
    phoneE164: "",
    display: "",
  },
  colors: {
    primary: "#10b98a",
    primaryDark: "#0ea77b",
    primaryDeep: "#02141a",
    onPrimary: "#ffffff",
    surfaceTint: "#f6faf9",
  },
};
