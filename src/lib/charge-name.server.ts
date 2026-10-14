// Nome do produto que chega no gateway do Pix (SagacePay, PixGate e MagicPay). Somente servidor.
// Editável no /admin → Integrações; guardado em private_settings. Vazio = padrão de brand.ts.
import { brand } from "@/lib/brand";

export const CHARGE_NAME_KEY = "gateway_charge_name";
export const CHARGE_NAME_MAX = 80;

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Nome salvo no painel ("" quando não há). */
export async function getSavedChargeName(): Promise<string> {
  const { data } = await (await db())
    .from("private_settings")
    .select("value")
    .eq("key", CHARGE_NAME_KEY)
    .maybeSingle();
  return String(data?.value ?? "").trim();
}

/** Nome enviado em cada cobrança. Se o banco falhar, usa o padrão (o Pix nunca trava por isso). */
export async function getChargeName(): Promise<string> {
  try {
    return (await getSavedChargeName()) || brand.chargeDescription;
  } catch {
    return brand.chargeDescription;
  }
}

/** Salva o nome (vazio = volta ao padrão). */
export async function saveChargeName(name: string): Promise<void> {
  const client = await db();
  const value = name.trim().slice(0, CHARGE_NAME_MAX);
  const { error } = value
    ? await client
        .from("private_settings")
        .upsert({ key: CHARGE_NAME_KEY, value, updated_at: new Date().toISOString() })
    : await client.from("private_settings").delete().eq("key", CHARGE_NAME_KEY);
  if (error) throw new Error(error.message);
}
