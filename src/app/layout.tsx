import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Estoque GRAN | Moth Piercing',
  description: 'Sistema de gestão de estoque e fornecedores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 min-h-screen selection:bg-purple-500/30`}>
        {/* BARRA DE NAVEGAÇÃO UNIFICADA */}
        <nav className="border-b border-purple-900/20 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter uppercase">
                ESTOQUE <span className="text-purple-600 group-hover:text-purple-400 transition-colors">GRAN</span>
              </span>
            </Link>

            {/* CONTAINER DE LINKS (TUDO EM UMA LINHA) */}
            <div className="flex items-center gap-2 bg-zinc-900/40 p-1.5 rounded-2xl border border-zinc-800/50">
              <Link href="/produtos" className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 hover:text-purple-500 transition-colors">
                Produtos
              </Link>
              
              <Link href="/fornecedores" className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 border-l border-zinc-800/50 hover:text-purple-500 transition-colors">
                Fornecedores
              </Link>

              {/* RELATÓRIOS AGORA NO MENU PRINCIPAL */}
              <Link href="/relatorios" className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 border-l border-zinc-800/50 hover:text-purple-500 transition-colors">
                Relatórios
              </Link>

              {/* BOTÃO DE DESTAQUE */}
              <Link 
                href="/associacoes" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-500/10 ml-2"
              >
                Vincular Fornecedores
              </Link>
            </div>

          </div>
        </nav>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="animate-in fade-in duration-700">
          {children}
        </main>
      </body>
    </html>
  );
}