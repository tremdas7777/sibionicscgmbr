import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getChargeNameFn, saveChargeNameFn } from "@/lib/charge-name.functions";

type Status = { name: string; custom: boolean; fallback: string };

/** Nome do produto que aparece no gateway do Pix (SagacePay, PixGate e MagicPay). */
export function ChargeNameCard({ password }: { password: string }) {
  const statusFn = useServerFn(getChargeNameFn);
  const saveFn = useServerFn(saveChargeNameFn);
  const [status, setStatus] = useState<Status | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = () =>
    statusFn({ data: { password } })
      .then((s) => {
        setStatus(s);
        setName(s.name);
      })
      .catch(() => setStatus(null));

  useEffect(() => {
    if (password) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const save = async (value: string) => {
    setBusy(true);
    setMsg(null);
    try {
      await saveFn({ data: { password, name: value } });
      setMsg(value.trim() ? "Nome salvo. Vale para os próximos Pix." : "Voltou ao nome padrão.");
      await refresh();
    } catch (e) {
      setMsg(e instanceof Error && e.message ? e.message : "Algo deu errado. Tente de novo.");
    } finally {
      setBusy(false);
    }
  };

  const changed = !!status && name.trim() !== status.name && name.trim().length > 0;

  return (
    <Card className="mt-3 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-muted-foreground" aria-hidden />
          <div>
            <div className="font-medium">Nome do produto no gateway</div>
            <div className="text-xs text-muted-foreground">
              É o nome que chega na SagacePay, PixGate e MagicPay em cada Pix (pedido, ofertas e
              envio expresso). Não aparece para o cliente na loja.
            </div>
          </div>
        </div>
        <span className="text-xs whitespace-nowrap text-muted-foreground">
          {status === null ? "…" : status.custom ? "Personalizado" : "Padrão"}
        </span>
      </div>

      <label className="text-sm">
        <span className="font-medium">Nome</span>
        <Input
          className="mt-1"
          maxLength={80}
          autoComplete="off"
          placeholder={status?.fallback ?? ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" disabled={!changed || busy} onClick={() => save(name)}>
          {busy ? "Salvando…" : "Salvar"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!status?.custom || busy}
          onClick={() => save("")}
        >
          Voltar ao padrão ({status?.fallback ?? "…"})
        </Button>
      </div>
      {msg && <p className="text-xs">{msg}</p>}
    </Card>
  );
}
