// Senha do painel /admin. Somente servidor.
// Vale o segredo ADMIN_PASSWORD do Lovable OU a senha salva no banco
// (private_settings, chave "admin_password"), que pode ser definida por SQL:
//   insert into public.private_settings (key, value) values ('admin_password', 'SUA_SENHA')
//   on conflict (key) do update set value = excluded.value, updated_at = now();

export const ADMIN_PASSWORD_KEY = "admin_password";
/** Texto de exemplo do setup-banco.sql: nunca vale como senha. */
const PLACEHOLDER = "COLOQUE_SUA_SENHA_AQUI";

async function dbPassword(): Promise<string> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("private_settings")
      .select("value")
      .eq("key", ADMIN_PASSWORD_KEY)
      .maybeSingle();
    return String(data?.value ?? "").trim();
  } catch {
    return "";
  }
}

/** Senhas aceitas agora (sem espaços sobrando). Lista vazia = nenhuma senha configurada. */
async function adminPasswords(): Promise<string[]> {
  const env = process.env["ADMIN_PASSWORD"]?.trim() ?? "";
  return [env, await dbPassword()].filter((p) => p && p !== PLACEHOLDER);
}

export async function checkAdminPassword(
  password: string,
): Promise<{ ok: boolean; missing: boolean }> {
  const accepted = await adminPasswords();
  if (!accepted.length) return { ok: false, missing: true };
  return { ok: accepted.includes(password.trim()), missing: false };
}

export async function assertAdminPassword(password: string): Promise<void> {
  if (!(await checkAdminPassword(password)).ok) throw new Error("Não autorizado");
}
