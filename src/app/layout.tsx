import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Barbie Skin & Laser Clinic | Dedicated Vitiligo & Cosmetic Center",
  description: "Barbie Skin & Laser Clinic, backed by over 30 years of clinical experience. Leading vitiligo treatment center, cosmetic & laser clinic offering advanced, USFDA-approved skin and hair treatments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme-color="skin-2" className="h-full">
      <head>
        <link rel="stylesheet" type="text/css" href="/vendor/tempus-dominus/css/tempus-dominus.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/twentytwenty/css/twentytwenty.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/magnific-popup/magnific-popup.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
      </head>
      <body id="bg" className={`${poppins.variable} font-sans`}>
        {children}

        {/* Global JS files */}
        <Script src="/js/global.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/popper/popper.js" strategy="beforeInteractive" />
        <Script src="/vendor/swiper/swiper-bundle.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/tempus-dominus/js/tempus-dominus.min.js" strategy="lazyOnload" />
        <Script src="/vendor/imagesloaded/imagesloaded.js" strategy="lazyOnload" />
        <Script src="/vendor/masonry/isotope.pkgd.min.js" strategy="lazyOnload" />
        <Script src="/vendor/twentytwenty/js/jquery.event.move.js" strategy="lazyOnload" />
        <Script src="/vendor/twentytwenty/js/jquery.twentytwenty.js" strategy="lazyOnload" />
        <Script src="/vendor/wnumb/wNumb.js" strategy="lazyOnload" />
        <Script src="/vendor/countdown/jquery.countdown.js" strategy="lazyOnload" />
        <Script src="/js/dz.carousel.js" strategy="lazyOnload" />
        <Script src="/js/dz.ajax.js" strategy="lazyOnload" />
        <Script src="/js/custom.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
