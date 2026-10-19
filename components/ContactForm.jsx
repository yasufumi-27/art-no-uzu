"use client";

import { useState } from "react";
import Link from "next/link";

// 入力内容をメールアプリに渡す。実際の送信はメールアプリで行う。
const CONTACT_EMAIL = "art.no.uzu@gmail.com";

export default function ContactForm() {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setOpened(false);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setError("必須項目を入力してください。");
      return;
    }

    const subject = "【ART NO UZU】お問い合わせ";
    const body = [
      `お名前：${data.name.trim()}`,
      `メールアドレス：${data.email.trim()}`,
      "",
      "お問い合わせ内容：",
      data.message.trim(),
    ].join("\r\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="text-xs leading-relaxed text-[var(--color-muted)]">
        入力後、メールアプリを開きます。内容を確認して、メールアプリから送信してください。
        <br />
        送信先：<a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a>
      </p>
      <Field label="お名前" name="name" required />
      <Field label="メールアドレス" name="email" type="email" required />
      <div>
        <label htmlFor="contact-message" className="block text-xs tracking-wider-jp text-[var(--color-muted)]">
          内容 <span className="text-[var(--color-ink)]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="mt-3 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)]"
        />
      </div>

      {error && <p role="alert" className="text-xs text-[#b03a2e]">{error}</p>}
      {opened && (
        <p role="status" className="text-xs leading-relaxed text-[var(--color-muted)]">
          メールアプリで送信を完了してください。開かない場合は、上記アドレス宛てに直接メールをお送りください。
        </p>
      )}

      <p className="text-[10px] leading-relaxed text-[var(--color-muted)]">
        ※ 送信いただいた個人情報は
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-ink)]">
          プライバシーポリシー
        </Link>
        に基づき取り扱います。
      </p>

      <button
        type="submit"
        className="border border-[var(--color-ink)] px-10 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] disabled:opacity-40"
      >
        メールアプリを開く
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="block text-xs tracking-wider-jp text-[var(--color-muted)]">
        {label} {required && <span className="text-[var(--color-ink)]">*</span>}
      </label>
      <input
        id={`contact-${name}`}
        autoComplete={name === "name" ? "name" : name === "email" ? "email" : undefined}
        type={type}
        name={name}
        required={required}
        className="mt-3 w-full rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm outline-none transition-colors focus:border-[var(--color-ink)]"
      />
    </div>
  );
}
