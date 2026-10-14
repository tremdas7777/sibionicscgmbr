import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabase
    .from("site_settings")
    .select("key,value")
    .in("key", ["whatsapp_enabled"]);
  const map = new Map((data ?? []).map((r) => [r.key, r.value]));
  return {
    whatsappEnabled: map.get("whatsapp_enabled") === true,
  };
});

export const setWhatsappEnabled = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ password: z.string().min(1).max(200), enabled: z.boolean() }).parse(d),
  )
  .handler(async ({ data }) => {
    const { assertAdminPassword } = await import("@/lib/admin-auth.server");
    await assertAdminPassword(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("site_settings").upsert({
      key: "whatsapp_enabled",
      value: data.enabled,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true, enabled: data.enabled };
  });
