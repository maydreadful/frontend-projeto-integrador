import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-950 text-white selection:bg-purple-500/30">
        <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-black tracking-tighter hover:opacity-80 transition-opacity">
              ESTOQUE <span className="text-purple-600">GRAN</span>
            </Link>

            {/* Links de Navegação Organizados */}
            <div className="flex items-center gap-8">
              <Link href="/produtos" className="text-xs uppercase font-bold tracking-widest hover:text-purple-500 transition-colors">Produtos</Link>
              <Link href="/fornecedores" className="text-xs uppercase font-bold tracking-widest hover:text-purple-500 transition-colors">Fornecedores</Link>
              <Link href="/relatorios" className="text-xs uppercase font-bold tracking-widest hover:text-purple-500 transition-colors">Relatórios</Link>
              <Link href="/associacoes" className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20">
                Vincular Fornecedores
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}