import { useEffect, useState } from "react";
import { GiCow } from "react-icons/gi";
import { formatDate } from "./util/data";

function App() {
  const [dataInicio, setDataInicio] = useState<string>("")
  const [dataFim, setDataFim] = useState<string>("")
  const [filial, setFilial] = useState<string>("TODOS")

  const [pesquisaPeca, setPesquisaPeca] = useState<string>('')
  const [openRow, setOpenRow] = useState<number | null>(null)

  useEffect(() => {
    console.log(`Data inicio ${dataInicio} / data fim ${dataFim}, filail:${filial}`)
  }, [dataInicio, dataFim, filial])

  return (
    <div className="fixed inset-0 bg-primary overflow-hidden px-4 py-6 -mt-4 text-white">
      {/* filtro */}
      <header className="bg-secondary w-full h-[10%] px-4 py-3 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">

        {/* esquerda */}
        <div className="flex gap-4 items-center">
          <GiCow className="w-14 h-14 text-white" />
          <h1 className="text-2xl font-semibold text-white">Boi Casado</h1>
        </div>

        {/* direita (filtros) */}
        <div className="flex items-center gap-3">

          {/* data inicio */}
          <input
            type="date"
            onChange={(e) => setDataInicio(formatDate(e.target.value))}
            className="bg-primary border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
          />
          {/* data fim */}
          <input
            type="date"
            onChange={(e) => setDataFim(formatDate(e.target.value))}
            className="bg-primary border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
          />
          {/* filial */}
          <select
            value={filial}
            onChange={(e) => setFilial(e.target.value)}
            className="bg-primary border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-accent"
          >
            <option value="">Filial</option>
            <option value="1">Filial 1</option>
            <option value="2">Filial 2</option>
            <option value="3">Filial 3</option>
            <option value="4">Filial 4</option>
            <option value="5">Filial 5</option>
          </select>

        </div>

      </header>

      {/* conteúdo */}
      <main className="flex w-full h-[90%] gap-4 mt-4">

        {/* parte 1 */}
        <div className="w-1/2 h-full flex flex-col gap-4  pr-2 overflow-hidden">
          {/* resumo entrada */}
          <div className="w-full h-1/2 flex flex-col rounded-2xl border border-white/10 bg-secondary shadow-md transition hover:shadow-lg">

            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <h1 className="text-base font-semibold text-textPrimary">Explosão do Boi</h1>
                <p className="text-xs text-textSecondary">
                  Entradas, estoque e perdas
                </p>
              </div>

              <div className="rounded-xl bg-primary px-3 py-2 text-right border border-white/10">
                <p className="text-[10px] uppercase text-textSecondary">Total</p>
                <h2 className="text-lg font-bold text-textPrimary">
                  100<span className="ml-1 text-[10px] text-textSecondary">kg</span>
                </h2>
              </div>
            </div>

            {/* resumo compacto */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3">

              <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                <p className="text-[10px] text-textSecondary">Entrada por explosão</p>
                <h3 className="text-sm font-semibold text-textPrimary">60kg</h3>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                <p className="text-[10px] text-textSecondary">Estoque</p>
                <h3 className="text-sm font-semibold text-amarelo">40kg</h3>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                <p className="text-[10px] text-textSecondary">Aprov.</p>
                <h3 className="text-sm font-semibold text-verde">71%</h3>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                <p className="text-[10px] text-textSecondary">Perda</p>
                <h3 className="text-sm font-semibold text-accent">4kg - <span className="text-[12px]">29%</span></h3>
              </div>

            </div>

            {/* lista */}
            <div className="grid grid-cols-2 gap-3 px-4 mb-4 overflow-y-auto flex-1 min-h-0 pr-1">

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-textPrimary">Quarto Traseiro</h2>
                  <span className="text-[10px] text-textSecondary">24kg / 10kg</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Explosão</span>
                    <span>14kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Aproveitado</span>
                    <span className="text-verde">10kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Perda</span>
                    <span className="text-accent">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">%</span>
                    <span className="text-amarelo">71%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-textPrimary">Quarto Traseiro</h2>
                  <span className="text-[10px] text-textSecondary">24kg / 10kg</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Explosão</span>
                    <span>14kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Aproveitado</span>
                    <span className="text-verde">10kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Perda</span>
                    <span className="text-accent">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">%</span>
                    <span className="text-amarelo">71%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-textPrimary">Quarto Traseiro</h2>
                  <span className="text-[10px] text-textSecondary">24kg / 10kg</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Explosão</span>
                    <span>14kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Aproveitado</span>
                    <span className="text-verde">10kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Perda</span>
                    <span className="text-accent">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">%</span>
                    <span className="text-amarelo">71%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-semibold text-textPrimary">Quarto Traseiro</h2>
                  <span className="text-[10px] text-textSecondary">24kg / 10kg</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Explosão</span>
                    <span>14kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Aproveitado</span>
                    <span className="text-verde">10kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Perda</span>
                    <span className="text-accent">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">%</span>
                    <span className="text-amarelo">71%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
          {/* entrada das pecas na explosao */}
          <div className="w-full h-1/2 flex flex-col rounded-2xl border border-white/10 bg-secondary shadow-md transition hover:shadow-lg">
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              {/* lado esquerdo */}
              <div>
                <h1 className="text-base font-semibold text-textPrimary">
                  Peças da Explosão
                </h1>
                <p className="text-xs text-textSecondary">
                  Entrada, saída, saldo e participação por corte
                </p>
              </div>
              {/* lado direito */}
              <div className="flex items-center gap-3">
                {/* input pesquisa */}
                <input
                  type="text"
                  placeholder="Buscar peça..."
                  value={pesquisaPeca}
                  onChange={(e) => setPesquisaPeca(e.target.value)}
                  className="bg-primary border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-textSecondary focus:outline-none focus:border-accent w-40"
                />

                {/* total */}
                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2 text-right">
                  <p className="text-[10px] uppercase text-textSecondary">Total</p>
                  <h2 className="text-lg font-bold text-textPrimary">9</h2>
                </div>

              </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-3 gap-3 px-4 py-4 overflow-y-auto flex-1 min-h-0 pr-1">
              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Picanha</h2>
                  <span className="text-[10px] text-amarelo">12%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>8kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">5kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>3kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Alcatra</h2>
                  <span className="text-[10px] text-amarelo">15%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>10kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">7kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>3kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Fraldinha</h2>
                  <span className="text-[10px] text-amarelo">9%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>6kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>2kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Paulista</h2>
                  <span className="text-[10px] text-amarelo">8%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>5kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">3kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>2kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Filé</h2>
                  <span className="text-[10px] text-amarelo">11%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>7kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>3kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Bisteca</h2>
                  <span className="text-[10px] text-amarelo">10%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>6kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">5kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>1kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Carne Moída</h2>
                  <span className="text-[10px] text-amarelo">14%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>9kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">8kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>1kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Chambaril</h2>
                  <span className="text-[10px] text-amarelo">7%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>4kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">2kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>2kg</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-primary p-3">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-textPrimary">Rabo</h2>
                  <span className="text-[10px] text-amarelo">6%</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Entrada</span>
                    <span>3kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saída</span>
                    <span className="text-verde">2kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Saldo</span>
                    <span>1kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* parte 2 */}
        <div className="w-1/2 h-full flex flex-col gap-4">
          <div className="w-full h-[30%] flex rounded-2xl border border-white/10 bg-secondary shadow-md transition hover:shadow-lg">

            {/* lado esquerdo (dados) */}
            <div className="w-[70%] flex flex-col justify-between p-4">

              {/* título */}
              <div>
                <h1 className="text-base font-semibold text-textPrimary">
                  Resumo Geral
                </h1>
                <p className="text-xs text-textSecondary">
                  Entrada total, explosão, aproveitamento e perdas
                </p>
              </div>

              {/* métricas */}
              <div className="grid grid-cols-2 gap-3 mt-2">

                <div className="bg-primary rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-textSecondary">Entrada Total</p>
                  <h2 className="text-xs font-bold text-textPrimary">30kg</h2>
                </div>

                <div className="bg-primary rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-textSecondary">Explosão</p>
                  <h2 className="text-xs font-bold text-amarelo">14kg</h2>
                </div>

                <div className="bg-primary rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-textSecondary">Aproveitado</p>
                  <h2 className="text-xs font-bold text-verde">10kg</h2>
                </div>

                <div className="bg-primary rounded-xl p-2 border border-white/10">
                  <p className="text-[10px] text-textSecondary">Perda</p>
                  <h2 className="text-xs font-bold text-accent">4kg</h2>
                </div>

              </div>

              {/* percentual */}
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-textSecondary">Aproveitamento</span>
                <span className="text-verde font-semibold">71%</span>
              </div>

            </div>
            {/* lado direito (gráfico) */}
            <div className="w-[30%] flex flex-col items-center justify-center border-l border-white/10 px-4">

              <div className="mb-3 text-center">
                <h3 className="text-sm font-semibold text-textPrimary">Rendimento</h3>
                <p className="text-[10px] text-textSecondary">Aproveitado x perda</p>
              </div>

              <div className="relative flex items-center justify-center">
                {/* anel externo */}
                <div
                  className="relative w-32 h-32 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.25)]"
                  style={{
                    background: "conic-gradient(#27ae60 0% 71%, #e94560 71% 100%)",
                  }}
                >
                  {/* brilho suave */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                  {/* anel interno para dar profundidade */}
                  <div className="absolute inset-[10px] rounded-full bg-secondary border border-white/10 flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase tracking-wide text-textSecondary">
                      Aproveit.
                    </span>
                    <span className="text-2xl font-bold text-verde">71%</span>
                    <span className="text-[10px] text-textSecondary">10kg de 14kg</span>
                  </div>
                </div>
              </div>



            </div>

          </div>
          {/* resumo tabela */}
          <div className="w-full h-[70%] rounded-2xl border border-white/10 bg-secondary shadow-md transition hover:shadow-lg flex flex-col">
            {/* topo */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div>
                <h1 className="text-base font-semibold text-textPrimary">
                  Produtos Gerados
                </h1>
                <p className="text-xs text-textSecondary">
                  Entrada, saída, custo, preço e margem por produto
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={pesquisaPeca}
                  onChange={(e) => setPesquisaPeca(e.target.value)}
                  className="w-44 rounded-xl border border-white/10 bg-primary px-3 py-2 text-sm text-textPrimary placeholder:text-textSecondary outline-none focus:border-accent"
                />

                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2 text-right">
                  <p className="text-[10px] uppercase text-textSecondary">Total</p>
                  <h2 className="text-lg font-bold text-textPrimary">12</h2>
                </div>
              </div>
            </div>

            {/* tabela */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
              <table className="w-full border-separate border-spacing-y-2 text-sm">

                <thead className="sticky top-0 z-10 bg-secondary">
                  <tr className="text-left text-[11px] uppercase text-textSecondary">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Cód.</th>
                    <th className="px-3 py-2">Produto</th>
                    <th className="px-3 py-2">Entrada</th>
                    <th className="px-3 py-2">Saída</th>
                    <th className="px-3 py-2">Custo</th>
                    <th className="px-3 py-2">Preço</th>
                    <th className="px-3 py-2">Margem</th>
                  </tr>
                </thead>

                <tbody>
                  {/* linha principal */}
                  <tr className="rounded-xl border border-white/10 bg-primary text-textPrimary">
                    <td className="rounded-l-xl px-3 py-3">
                      <button
                        onClick={() => setOpenRow(openRow === 1001 ? null : 1001)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-secondary text-xs"
                      >
                        {openRow === 1001 ? "-" : "+"}
                      </button>
                    </td>
                    <td className="px-3 py-3">1001</td>
                    <td className="px-3 py-3 font-medium">Picanha</td>
                    <td className="px-3 py-3">8kg</td>
                    <td className="px-3 py-3">5kg</td>
                    <td className="px-3 py-3">R$ 32,00</td>
                    <td className="px-3 py-3">R$ 54,00</td>
                    <td className="rounded-r-xl px-3 py-3 text-verde">40%</td>
                  </tr>
                  {/* detalhe expandido */}
                  {openRow === 1001 && (
                    <tr>
                      <td colSpan={8} className="px-0 pt-0">
                        <div className="ml-10 rounded-xl border border-white/10 bg-primary/60 px-3 py-3">
                          <table className="w-full text-[12px]">
                            <thead>
                              <tr className="text-left uppercase text-textSecondary">
                                <th className="px-2 py-2">Cód.</th>
                                <th className="px-2 py-2">Produto associado</th>
                                <th className="px-2 py-2">Saída</th>
                                <th className="px-2 py-2">Custo</th>
                                <th className="px-2 py-2">Preço</th>
                                <th className="px-2 py-2">Margem</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-textPrimary">
                                <td className="px-2 py-2">2001</td>
                                <td className="px-2 py-2">Bife de Picanha</td>
                                <td className="px-2 py-2">3kg</td>
                                <td className="px-2 py-2">R$ 35,00</td>
                                <td className="px-2 py-2">R$ 58,00</td>
                                <td className="px-2 py-2 text-verde">39%</td>
                              </tr>
                              <tr className="text-textPrimary">
                                <td className="px-2 py-2">2002</td>
                                <td className="px-2 py-2">Picanha em Cubos</td>
                                <td className="px-2 py-2">2kg</td>
                                <td className="px-2 py-2">R$ 30,00</td>
                                <td className="px-2 py-2">R$ 50,00</td>
                                <td className="px-2 py-2 text-verde">40%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}

                  <tr className="rounded-xl border border-white/10 bg-primary text-textPrimary">
                    <td className="rounded-l-xl px-3 py-3">
                      <button
                        onClick={() => setOpenRow(openRow === 1002 ? null : 1002)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-secondary text-xs"
                      >
                        {openRow === 1001 ? "-" : "+"}
                      </button>
                    </td>
                    <td className="px-3 py-3">1002</td>
                    <td className="px-3 py-3 font-medium">Picanha</td>
                    <td className="px-3 py-3">8kg</td>
                    <td className="px-3 py-3">5kg</td>
                    <td className="px-3 py-3">R$ 32,00</td>
                    <td className="px-3 py-3">R$ 54,00</td>
                    <td className="rounded-r-xl px-3 py-3 text-verde">40%</td>
                  </tr>
                  {/* detalhe expandido */}
                  {openRow === 1002 && (
                    <tr>
                      <td colSpan={8} className="px-0 pt-0">
                        <div className="ml-10 rounded-xl border border-white/10 bg-primary/60 px-3 py-3">
                          <table className="w-full text-[12px]">
                            <thead>
                              <tr className="text-left uppercase text-textSecondary">
                                <th className="px-2 py-2">Cód.</th>
                                <th className="px-2 py-2">Produto associado</th>
                                <th className="px-2 py-2">Saída</th>
                                <th className="px-2 py-2">Custo</th>
                                <th className="px-2 py-2">Preço</th>
                                <th className="px-2 py-2">Margem</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="text-textPrimary">
                                <td className="px-2 py-2">2001</td>
                                <td className="px-2 py-2">Bife de Picanha</td>
                                <td className="px-2 py-2">3kg</td>
                                <td className="px-2 py-2">R$ 35,00</td>
                                <td className="px-2 py-2">R$ 58,00</td>
                                <td className="px-2 py-2 text-verde">39%</td>
                              </tr>
                              <tr className="text-textPrimary">
                                <td className="px-2 py-2">2002</td>
                                <td className="px-2 py-2">Picanha em Cubos</td>
                                <td className="px-2 py-2">2kg</td>
                                <td className="px-2 py-2">R$ 30,00</td>
                                <td className="px-2 py-2">R$ 50,00</td>
                                <td className="px-2 py-2 text-verde">40%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
