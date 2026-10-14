# CGM GS1 (Sibionics)

Loja do sensor CGM GS1 com o sistema de pagamento, integrações e painel da loja CardioChek
(painel `/admin` com pedidos, lucro, checkouts abandonados, preços e integrações; checkout Pix,
order bump, upsell, seguro de entrega, envio expresso, UTMify, Meta, Pushcut e Rotasync).

**Pagamento: Pix, pela SagacePay, PixGate ou MagicPay.** No `/admin` → Integrações você escolhe
qual gera os próximos Pix (padrão: SagacePay). Cada pedido guarda em qual gateway nasceu, então
status, webhook (`/api/public/pix-webhook`), upsell, envio expresso e relatórios consultam sempre o
gateway certo.

Fluxo: `/produto` → `/checkout?plano=1|2|3` → `/pedido/:id` (QR Code Pix) → `/upsell/:id` →
`/expresso/:id` → `/obrigado/:id`. Rastreio em `/rastreio`.

## Antes de publicar

- **Banco**: ative o Lovable Cloud neste projeto (banco novo, não use o da CardioChek) e rode as
  migrações de `supabase/migrations`.
- **Segredos** (Lovable Cloud): `ADMIN_PASSWORD`, `RASTREIO_API_KEY` (Rotasync; opcional
  `RASTREIO_API_URL`). As chaves da SagacePay, PixGate e MagicPay são cadastradas no `/admin` →
  Integrações (com botão de testar); os secrets `SAGACEPAY_API_KEY`, `PIXGATE_API_KEY`,
  `MAGICPAY_PUBLIC_KEY` e `MAGICPAY_SECRET_KEY` servem de reserva. UTMify, Meta e Pushcut também
  ficam no `/admin`.
- **Marca e empresa**: `src/lib/brand.ts` (razão social, CNPJ, ANVISA, e-mail, domínio, WhatsApp).
- **Preços e kits** (1, 2 e 3 unidades): `src/lib/bundles.ts` · **order bump** (adesivos):
  `src/lib/order-bump.ts` · **upsell** (+1 sensor, seguro, expresso): `src/lib/upsell.ts`. Todos os
  preços também podem ser trocados no `/admin` → Preços.
- **Pixels do `<head>`**: `src/lib/pixels.ts` (Meta, TikTok, UTMify). O Google Ads fica no
  `src/routes/__root.tsx`.
