import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  applyPrices,
  currentPrices,
  DEFAULT_PRICES,
  priceConfigSchema,
  PRICES_SETTING_KEY,
  type PriceConfig,
} from "@/lib/prices";

/** Preços em uso (público: a loja precisa deles para exibir). Sem banco, devolve os de fábrica. */
export const getPrices = createServerFn({ method: "GET" }).handler(
  async (): Promise<PriceConfig> => {
    try {
      const { syncPricesFromDb } = await import("@/lib/prices.server");
      return await syncPricesFromDb();
    } catch {
      return currentPrices();
    }
  },
);

const pw = z.object({ password: z.string().min(1).max(200) });

async function assertAdmin(password: string) {
  const { assertAdminPassword } = await import("@/lib/admin-auth.server");
  await assertAdminPassword(password);
}

/** Salva os preços (vale na hora para a loja, o checkout e as cobranças). */
export const savePrices = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.extend({ prices: priceConfigSchema }).parse(d))
  .handler(async ({ data }) => {
    await assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_settings").upsert({
      key: PRICES_SETTING_KEY,
      value: data.prices,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return applyPrices(data.prices);
  });

/** Apaga os preços do painel: a loja volta aos preços de fábrica. */
export const resetPrices = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    await assertAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .delete()
      .eq("key", PRICES_SETTING_KEY);
    if (error) throw new Error(error.message);
    applyPrices(null);
    return DEFAULT_PRICES;
  });
