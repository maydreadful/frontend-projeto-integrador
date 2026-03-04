import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
          <Link href="/produtos" style={{ marginRight: "15px" }}>
            Produtos
          </Link>

          <Link href="/fornecedores" style={{ marginRight: "15px" }}>
            Fornecedores
          </Link>

          <Link href="/associacoes">
            Associações
          </Link>
        </nav>

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}