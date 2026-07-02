import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pickClientMessages } from "@/i18n/client-messages";
import "../globals.css";

export const dynamic = "force-static";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = pickClientMessages(messages);

  return (
    <html
      lang={locale}
      className={`light elevated-mode ${plusJakartaSans.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        <link rel="icon" href="/logo-nonbg.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-nonbg.png" />
        <link rel="apple-touch-icon" href="/logo-nonbg.png" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
