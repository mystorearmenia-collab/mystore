"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import {
  toPayRange,
  tradeInRange,
  type Range,
  type TradeInModel,
  type TradeInProduct,
} from "@/lib/tradein-estimate";
import { WhatsAppIcon } from "./icons";

type CategoryOption = { id: string; name: string };

const field =
  "w-full appearance-none rounded-[var(--radius-sm)] border border-line bg-surface-elevated px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors focus:border-[var(--orange-line)] disabled:opacity-40";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="card rounded-[var(--radius-lg)] bg-surface p-[clamp(1.25rem,3vw,2rem)]">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--orange-soft)] text-[0.85rem] font-semibold text-orange">
          {n}
        </span>
        <h2 className="text-[1.15rem] font-medium tracking-[-0.02em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.8rem] text-muted">{text}</span>
      {children}
    </label>
  );
}

export default function TradeInCalculator({
  categories,
  products,
  models,
  whatsapp,
}: {
  categories: CategoryOption[];
  products: TradeInProduct[];
  models: TradeInModel[];
  whatsapp: string;
}) {
  const t = useTranslations("tradeIn");
  const locale = useLocale() as Locale;

  // New device
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [productId, setProductId] = useState("");
  const [newStorage, setNewStorage] = useState("");

  // Old iPhone
  const [oldModel, setOldModel] = useState("");
  const [oldStorage, setOldStorage] = useState("");

  // Request
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const productsInCategory = useMemo(
    () => products.filter((p) => p.cats.includes(categoryId)),
    [products, categoryId],
  );
  const product = products.find((p) => p.id === productId);

  const storageOptions = useMemo(() => {
    const out: { storage: string; price: number }[] = [];
    for (const v of product?.variants ?? []) {
      if (!v.storage) continue;
      const seen = out.find((o) => o.storage === v.storage);
      if (!seen) out.push({ storage: v.storage, price: v.price });
      else if (v.price < seen.price) seen.price = v.price;
    }
    return out;
  }, [product]);

  const newPrice = product
    ? (storageOptions.find((o) => o.storage === newStorage)?.price ?? product.price)
    : null;

  const oldStorages = models.find((m) => m.model === oldModel)?.storage ?? [];
  const oldComplete = Boolean(oldModel && oldStorage);
  const credit = oldComplete ? tradeInRange(models, oldModel, oldStorage) : null;
  const toPay = newPrice != null && credit ? toPayRange(newPrice, credit) : null;
  const range = (r: Range) =>
    r.min === r.max
      ? formatPrice(r.min, locale)
      : `${formatPrice(r.min, locale)} – ${formatPrice(r.max, locale)}`;

  const newLabel = product ? [product.name, newStorage].filter(Boolean).join(" ") : "";
  const oldLabel = `${oldModel} ${oldStorage}`;

  const message = [
    t("waGreeting"),
    `${t("waNew")}: ${newLabel}${newPrice != null ? ` — ${formatPrice(newPrice, locale)}` : ""}`,
    `${t("waOld")}: ${oldLabel}`,
    credit ? `${t("credit")}: ${range(credit)}` : t("assessInStore"),
    toPay ? `${t("toPay")}: ${range(toPay)}` : "",
    `${t("name")}: ${name.trim()}`,
    `${t("phone")}: ${phone.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const canSend = Boolean(product && oldComplete && name.trim() && phone.trim());
  const waHref = `${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1fr_1fr_minmax(300px,0.9fr)] lg:items-start">
      <Step n={1} title={t("step1")}>
        <div className="space-y-4">
          <Label text={t("category")}>
            <select
              className={field}
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setProductId("");
                setNewStorage("");
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Label>

          <Label text={t("model")}>
            <select
              className={field}
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
                setNewStorage("");
              }}
            >
              <option value="">{t("chooseModel")}</option>
              {productsInCategory.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Label>

          {storageOptions.length > 0 && (
            <Label text={t("storage")}>
              <select className={field} value={newStorage} onChange={(e) => setNewStorage(e.target.value)}>
                <option value="">{t("chooseStorage")}</option>
                {storageOptions.map((o) => (
                  <option key={o.storage} value={o.storage}>
                    {o.storage} — {formatPrice(o.price, locale)}
                  </option>
                ))}
              </select>
            </Label>
          )}

          {newPrice != null && (
            <p className="flex items-baseline justify-between border-t border-line pt-4 text-[0.9rem]">
              <span className="text-muted">{t("newPrice")}</span>
              <span className="text-[1.1rem] font-medium">{formatPrice(newPrice, locale)}</span>
            </p>
          )}
        </div>
      </Step>

      <Step n={2} title={t("step2")}>
        <div className="space-y-4">
          <Label text={t("oldModel")}>
            <select
              className={field}
              value={oldModel}
              onChange={(e) => {
                setOldModel(e.target.value);
                setOldStorage("");
              }}
            >
              <option value="">{t("chooseModel")}</option>
              {models.map((m) => (
                <option key={m.model} value={m.model}>
                  {m.model}
                </option>
              ))}
            </select>
          </Label>

          <Label text={t("storage")}>
            <select
              className={field}
              value={oldStorage}
              disabled={!oldModel}
              onChange={(e) => setOldStorage(e.target.value)}
            >
              <option value="">{t("chooseStorage")}</option>
              {oldStorages.map((s) => (
                <option key={s.size} value={s.size}>
                  {s.size}
                </option>
              ))}
            </select>
          </Label>

        </div>
      </Step>

      <div className="lg:sticky lg:top-[96px]">
        <Step n={3} title={t("step3")}>
          <dl className="space-y-3 text-[0.95rem]">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{t("newPrice")}</dt>
              <dd>{newPrice != null ? formatPrice(newPrice, locale) : "—"}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{t("credit")}</dt>
              <dd className="text-right">
                {!oldComplete ? "—" : credit ? range(credit) : t("assessInStore")}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <dt className="font-medium">{t("toPay")}</dt>
              <dd className="text-right text-[1.25rem] font-semibold tracking-[-0.02em] text-orange">
                {toPay ? range(toPay) : "—"}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-muted">{t("disclaimer")}</p>

          <div className="mt-6 space-y-3 border-t border-line pt-6">
            <Label text={t("name")}>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </Label>
            <Label text={t("phone")}>
              <input
                className={field}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+374"
              />
            </Label>
            <a
              href={canSend ? waHref : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canSend}
              className={`btn btn-primary w-full ${canSend ? "" : "pointer-events-none opacity-40"}`}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              {t("send")}
            </a>
            <p className="text-[0.75rem] text-muted">{canSend ? t("sendNote") : t("fillAll")}</p>
          </div>
        </Step>
      </div>
    </div>
  );
}
