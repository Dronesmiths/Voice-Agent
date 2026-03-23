import "./globals.css";

export const metadata = {
  title: "AI Pilots Dashboard",
  description: "AI Voice Agent Configuration and Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
