"use client";

import { useState } from "react";

// お問い合わせフォーム（仕様書 12.2）。
// 必須：名前 / メールアドレス / 内容。送信完了画面あり。
//
// デモでは送信処理をモックしている。本番では以下のいずれかに接続する：
//   - Formspree / Resend 等のフォーム送信サービス（静的サイト向け）
//   - Vercel 移行後は API Route + メール送信 + reCAPTCHA v3
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!data.name || !data.email || !data.message) {
      setError("必須項目を入力してください。");
      return;
    }

    setSending(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error("送信に失敗しました");
      } else {
        // デモ用モック送信
        await new Promise((r) => setTimeout(r, 800));
      }
      setSent(true);
    } catch (err) {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    // 送信完了画面
    return (
      <div className="border border-[var(--color-line)] py-20 text-center">
        <p className="text-sm tracking-wider-jp">送信が完了しました</p>
        <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
          お問い合わせありがとうございます。
          <br />
          内容を確認のうえ、追ってご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field label="お名前" name="name" required />
      <Field label="メールアドレス" name="email" type="email" required />
      <div>
        <label className="block text-xs tracking-wider-jp text-[var(--color-muted)]">
          内容 <span className="text-[var(--color-ink)]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-3 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)]"
        />
      </div>

      {error && <p className="text-xs text-[#b03a2e]">{error}</p>}

      <p className="text-[10px] leading-relaxed text-[var(--color-muted)]">
        ※ 本番環境では reCAPTCHA によるスパム対策を導入します。
      </p>

      <button
        type="submit"
        disabled={sending}
        className="border border-[var(--color-ink)] px-10 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] disabled:opacity-40"
      >
        {sending ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label className="block text-xs tracking-wider-jp text-[var(--color-muted)]">
        {label} {required && <span className="text-[var(--color-ink)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-3 w-full rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)]"
      />
    </div>
  );
}
