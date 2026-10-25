"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const TOPICS = ["個人様：絵のオーダー依頼", "インタビュー等取材依頼", "個展やPOPUP等の出展依頼", "PR依頼（ショート動画制作含む）", "テレビや映画・雑誌等の出演依頼", "店舗・事務所等に飾る絵の制作依頼", "名刺やショップカード・パッケージなど渦の絵を使ったデザイン依頼", "その他"];
const inputClass = "mt-2 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 py-3 text-sm focus:border-[var(--color-ink)]";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [receipt, setReceipt] = useState(true);
  const [topics, setTopics] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const container = useRef(null);
  const widget = useRef(null);
  const busy = useRef(false);
  function renderChallenge() {
    if (!SITE_KEY || !container.current || widget.current !== null || !window.turnstile) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: SITE_KEY, action: "contact", size: "flexible",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setError("認証を読み込めませんでした。ページを再読み込みしてください。"); },
    });
  }
  useEffect(() => {
    renderChallenge();
    return () => {
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy.current || !token) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    const data = Object.fromEntries(fields);
    if (!topics.length) { setError("お問い合わせ内容の概要を選択してください。"); return; }
    const files = fields.getAll("files").filter(f => f.size);
    if (files.length > 3 || files.reduce((n, f) => n + f.size, 0) > 5 * 1024 * 1024) { setError("添付資料は3ファイル、合計5MB以内でお願いします。"); return; }
    busy.current = true;
    setSending(true); setError(""); setSent(false);
    try {
      const attachments = await Promise.all(files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onerror = reject;
        reader.onload = () => resolve({ filename: file.name, content: reader.result.split(",")[1], contentType: file.type });
        reader.readAsDataURL(file);
      })));
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name.trim(), email: data.email.trim(), message: data.message.trim(), company: data.company.trim(), social: data.social.trim(), topics, budget: data.budget.trim(), deadline: data.deadline.trim(), confirmed: data.confirmed === "on", privacy: data.privacy === "on", attachments, website: data.website, token }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "送信を完了できませんでした。");
      form.reset(); setTopics([]); setReceipt(result.receiptSent !== false); setSent(true);
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "通信できませんでした。接続を確認して再度お試しください。" : err.message);
    } finally {
      busy.current = false; setSending(false); setToken("");
      if (widget.current !== null && window.turnstile) window.turnstile.reset(widget.current);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderChallenge} onError={() => setError("認証を読み込めませんでした。ページを再読み込みしてください。")} />}
      <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <Field label="メールアドレス" name="email" type="email" placeholder="Email@address" required />
      <Field label="お名前" name="name" placeholder="名字 名前" required />
      <Field label="会社名・所属団体名" name="company" />
      <Field label="SNSやHPリンク" name="social" />
      <fieldset>
        <legend className="text-xs">お問い合わせ内容の概要 <span className="text-red-600">*</span></legend>
        <div className="mt-2 space-y-4 rounded-sm border border-[var(--color-line)] p-3">
          {TOPICS.map(topic => <label key={topic} className="flex items-start gap-2 text-xs leading-relaxed"><input type="checkbox" name="topics" value={topic} checked={topics.includes(topic)} onChange={e => setTopics(e.target.checked ? [...topics, topic] : topics.filter(t => t !== topic))} className="mt-0.5 shrink-0" />{topic}</label>)}
        <p className="mt-1 text-xs text-[var(--color-muted)]">複数選択できます。</p>
      </fieldset>
      <div><label htmlFor="contact-message" className="text-xs">詳細 <span className="text-red-600">*</span></label><textarea id="contact-message" name="message" required rows={8} maxLength={5000} placeholder="ご依頼内容につきまして、詳細に教えてください" className={inputClass} /></div>
      <Field label="ご予算" name="budget" required />
      <Field label="希望納期" name="deadline" required />
      <div><label htmlFor="contact-files" className="block text-xs leading-relaxed">参考資料等がある際はこちらにアップロードをお願いいたします</label><input id="contact-files" name="files" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf" className="mt-2 w-full rounded-full border border-dashed border-[var(--color-line)] p-3 text-xs file:mr-3 file:border-0 file:bg-transparent" /><p className="mt-2 text-xs text-[var(--color-muted)]">画像・PDF：3ファイルまで、合計5MB以内</p></div>
      <div className="text-xs leading-relaxed">
        <p>フォーム送信後、1週間以内に担当者よりご連絡いたしますので、迷惑メールフォルダや受信設定をご確認ください。<br />連絡がない場合は、お手数ですが再度フォームよりご連絡ください。 <span className="text-red-600">*</span></p>
        <label className="mt-4 flex items-center gap-2"><input type="checkbox" name="confirmed" required />確認しました</label>
      </div>
      <label className="flex items-center justify-center gap-2 text-xs"><input type="checkbox" name="privacy" required /><span><Link href="/privacy" className="underline underline-offset-2">プライバシーポリシー</Link>に同意する</span></label>
      <div ref={container} />
      {!SITE_KEY && <p role="status" className="text-xs">お問い合わせフォームは準備中です。</p>}
      {error && <p role="alert" className="text-xs text-[#b03a2e]">{error}</p>}
      {sent && (
        <p role="status" className="text-xs leading-relaxed text-[var(--color-muted)]">
          {receipt ? "お問い合わせを受け付けました。受付完了メールをご確認ください。" : "お問い合わせを受け付けましたが、自動返信メールを送信できませんでした。再送信は不要です。担当者からの連絡をお待ちください。"}
        </p>
      )}

      <button
        type="submit"
        disabled={sending || !token}
        aria-busy={sending}
        className="border border-[var(--color-ink)] px-10 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] disabled:opacity-40"
      >
        {sending ? "送信中…" : "送信"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required, placeholder = "回答を入力" }) {
  return <div><label htmlFor={`contact-${name}`} className="block text-xs">{label}{required && <span className="text-red-600">*</span>}</label><input id={`contact-${name}`} name={name} type={type} required={required} placeholder={placeholder} maxLength={name === "name" ? 100 : 500} autoComplete={name === "name" ? "name" : name === "email" ? "email" : undefined} className={inputClass} /></div>;
}
