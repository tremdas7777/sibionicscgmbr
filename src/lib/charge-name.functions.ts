import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { brand } from "@/lib/brand";

const pw = z.object({ password: z.string().min(1).max(200) });

async function assertAdmin(password: string) {
  const { assertAdminPassword } = await import("@/lib/admin-auth.server");
  await assertAdminPassword(password);
}

/** Nome em uso no gateway e o padrão da loja. */
export const getChargeNameFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.parse(d))
  .handler(async ({ data }) => {
    await assertAdmin(data.password);
    const { getSavedChargeName } = await import("@/lib/charge-name.server");
    const saved = await getSavedChargeName();
    return { name: saved || brand.chargeDescription, custom: !!saved, fallback: brand.chargeDescription };
  });

/** Salva o nome que chega no gateway (vazio = volta ao padrão). */
export const saveChargeNameFn = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => pw.extend({ name: z.string().trim().max(80) }).parse(d))
  .handler(async ({ data }) => {
    await assertAdmin(data.password);
    const { saveChargeName } = await import("@/lib/charge-name.server");
    await saveChargeName(data.name);
    return { ok: true };
  });
