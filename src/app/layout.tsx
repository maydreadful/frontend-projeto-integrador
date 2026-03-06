import type { Metadata } from "next"; // Importa o tipo para os metadados
import "./globals.css";
import Link from "next/link";

// Tipagem do Metadata (ajuda o VS Code a te dar sugestões)
export const metadata: Metadata = {
  title: "GRAN | Controle de Estoque",
  description: "Projeto Integrador - Gestão de Produtos e Fornecedores",
};

// Aqui está o segredo: definimos que 'children' é um React.ReactNode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased bg-white text-black font-sans">
        
        {/* Header Profissional: Fundo Preto, Borda Roxa */}
        <header className="bg-black text-white shadow-2xl border-b-4 border-purple-700 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
            
            {/* Logo com Identidade Visual */}
            <Link href="/" className="group">
              <h1 className="text-2xl font-black tracking-tighter transition-all group-hover:scale-105">
                ESTOQUE <span className="text-purple-500 underline decoration-2 underline-offset-4">GRAN</span>
              </h1>
            </Link>

            {/* Menu de Navegação */}
            <nav className="flex items-center space-x-1 mt-4 md:mt-0 bg-zinc-900 p-1 rounded-xl">
              <Link 
                href="/produtos" 
                className="px-5 py-2 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Produtos
              </Link>
              <Link 
                href="/fornecedores" 
                className="px-5 py-2 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Fornecedores
              </Link>
              <Link 
                href="/associacoes" 
                className="px-5 py-2 rounded-lg font-bold text-sm uppercase tracking-widest bg-purple-700 text-white hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                VINCULAR FORNECEDORES
              </Link>
            </nav>
          </div>

          <Link href="/relatorios" className="hover:text-purple-500 transition-colors uppercase text-xs font-bold tracking-widest">
            Relatórios
          </Link>
        </header>

        {/* Área de Conteúdo */}
        <main className="min-h-screen">
          {/* Nota: As classes 'animate-in' e 'fade-in' precisam do plugin 'tailwindcss-animate' instalado */}
          <div className="container mx-auto">
            {children}
          </div>
        </main>

        <footer className="bg-zinc-50 border-t border-gray-100 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
              © 2026 Projeto Integrador - Desenvolvido por Mayara Soares
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}