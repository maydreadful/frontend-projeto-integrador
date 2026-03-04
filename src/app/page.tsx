import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Painel de Controle
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Bem-vinda ao seu sistema de gestão. Selecione uma opção no menu acima para começar.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards de resumo rápido */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <h2 className="text-sm font-medium text-zinc-500">Total de Produtos</h2>
            <p className="text-2xl font-bold mt-1">124</p>
          </div>
          
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <h2 className="text-sm font-medium text-zinc-500">Fornecedores Ativos</h2>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
            <h2 className="text-sm font-medium text-zinc-500">Associações Pendentes</h2>
            <p className="text-2xl font-bold mt-1">5</p>
          </div>
        </section>
      </main>
    </div>
  );
}