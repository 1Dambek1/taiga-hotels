// app/layout.tsx
"use client"; // Превращаем layout в клиентский компонент для использования usePathname
import { usePathname } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});
const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
});

// Metadata переносим в отдельный файл или удаляем (в "use client" нельзя экспортировать metadata)
// Если metadata критична, layout нужно разбить на два файла.
// Но для быстрого решения:

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Если мы в админке, возвращаем чистый body без классов шрифтов вашего сайта
  const isStudio = pathname?.startsWith("/studio");

  return (
    <html lang="ru">
      <body
        // Добавляем data-атрибут для CSS фильтра курсора
        data-route={pathname}
        className={isStudio ? "" : `${cormorant.variable} ${manrope.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
