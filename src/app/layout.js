import "./globals.css";

export const metadata = {
  title: "Closing Brackets",
  description: "Closing Brackets — company site.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
