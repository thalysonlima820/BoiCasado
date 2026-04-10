import { useMemo, useState } from 'react'
import type { TypeEntradaSaida } from '../interface/TypeEntradaSaida';

type ResumoPecaProps = {
    entradaSaida: TypeEntradaSaida[];
};

const Tabela = ({ entradaSaida }: ResumoPecaProps) => {
    const [pesquisaPeca, setPesquisaPeca] = useState<string>('')
    const [openRow, setOpenRow] = useState<number | null>(null)

    const toNum = (value: any): number => {
        if (value === null || value === undefined) return 0
        if (typeof value === 'number') return value

        const str = String(value).trim()
        if (!str) return 0

        if (str.includes(',') && str.includes('.')) {
            return Number(str.replace(/\./g, '').replace(',', '.')) || 0
        }

        if (str.includes(',')) {
            return Number(str.replace(',', '.')) || 0
        }

        return Number(str) || 0
    }

    const toKg = (value: any) => {
        return `${toNum(value).toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })}kg`
    }

    const toMoney = (value: any) => {
        return toNum(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const calcMargem = (custo: any, preco: any) => {
        const custoNum = toNum(custo)
        const precoNum = toNum(preco)

        if (!precoNum || precoNum <= 0) return 0
        return ((precoNum - custoNum) / precoNum) * 100
    }

    const getMargemClass = (margem: number) => {
        if (margem > 0) return 'text-verde'
        if (margem < 0) return 'text-red-400'
        return 'text-yellow-400'
    }

    const dadosAgrupados = useMemo(() => {
        const mapa = new Map<number, any>()

        entradaSaida.forEach((item: any) => {
            const codprod = Number(item.CODPROD)

            if (!mapa.has(codprod)) {
                mapa.set(codprod, {
                    CODPROD: codprod,
                    PRODUTO_MASTER: item.PRODUTO_MASTER,
                    QT_ENRTADA: toNum(item.QT_ENRTADA),
                    QT_SAIDA_TOTAL: 0,
                    VL_VENDA_TOTAL: 0,
                    ESTOQUE: toNum(item.ESTOQUE),
                    detalhes: [],
                })
            }

            const grupo = mapa.get(codprod)

            grupo.QT_SAIDA_TOTAL += toNum(item.QT_SAIDA)
            grupo.VL_VENDA_TOTAL += toNum(item.VL_VENDA)

            grupo.detalhes.push({
                CODAUXILIAR: item.CODAUXILIAR,
                PRODUTO: item.PRODUTO,
                QT_SAIDA: toNum(item.QT_SAIDA),
                CUSTO: toNum(item.CUSTO),
                PRECO: toNum(item.PRECO),
                MARGEM: calcMargem(item.CUSTO, item.PRECO),
            })
        })

        return Array.from(mapa.values()).filter((item) => {
            const texto = pesquisaPeca.toLowerCase().trim()

            if (!texto) return true

            return (
                String(item.CODPROD).includes(texto) ||
                String(item.PRODUTO_MASTER || '').toLowerCase().includes(texto) ||
                item.detalhes.some((det: any) =>
                    String(det.CODAUXILIAR || '').includes(texto) ||
                    String(det.PRODUTO || '').toLowerCase().includes(texto)
                )
            )
        })
    }, [entradaSaida, pesquisaPeca])

    return (
        <div className="w-full h-[50%] rounded-2xl border border-white/10 bg-secondary shadow-md transition hover:shadow-lg flex flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div>
                    <h1 className="text-base font-semibold text-textPrimary">
                        Produtos Gerados
                    </h1>
                    <p className="text-xs text-textSecondary">
                        Entrada, saída, estoque e venda por produto master
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
                        <h2 className="text-lg font-bold text-textPrimary">
                            {dadosAgrupados.length}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
                <table className="w-full border-separate border-spacing-y-2 text-sm">
                    <thead className="sticky top-0 z-10 bg-secondary">
                        <tr className="text-left text-[11px] uppercase text-textSecondary">
                            <th className="px-3 py-2">#</th>
                            <th className="px-3 py-2">Cód.</th>
                            <th className="px-3 py-2">Produto</th>
                            <th className="px-3 py-2">Entrada</th>
                            <th className="px-3 py-2">Saída</th>
                            <th className="px-3 py-2">Estoque</th>
                            <th className="px-3 py-2">Vl. Venda</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dadosAgrupados.map((item) => (
                            <tr key={item.CODPROD}>
                                <td colSpan={7} className="px-0 py-0">
                                    <table className="w-full border-separate border-spacing-y-2 text-sm">
                                        <tbody>
                                            <tr className="rounded-xl border border-white/10 bg-primary text-textPrimary">
                                                <td className="rounded-l-xl px-3 py-3">
                                                    <button
                                                        onClick={() =>
                                                            setOpenRow(openRow === item.CODPROD ? null : item.CODPROD)
                                                        }
                                                        className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-secondary text-xs"
                                                    >
                                                        {openRow === item.CODPROD ? '-' : '+'}
                                                    </button>
                                                </td>
                                                <td className="px-3 py-3">{item.CODPROD}</td>
                                                <td className="px-3 py-3 font-medium">{item.PRODUTO_MASTER}</td>
                                                <td className="px-3 py-3">{toKg(item.QT_ENRTADA)}</td>
                                                <td className="px-3 py-3">{toKg(item.QT_SAIDA_TOTAL)}</td>
                                                <td className="px-3 py-3">{toKg(item.ESTOQUE)}</td>
                                                <td className="rounded-r-xl px-3 py-3">
                                                    {toMoney(item.VL_VENDA_TOTAL)}
                                                </td>
                                            </tr>

                                            {openRow === item.CODPROD && (
                                                <tr>
                                                    <td colSpan={7} className="px-0 pt-0">
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
                                                                    {item.detalhes.map((det: any, index: number) => (
                                                                        <tr
                                                                            key={`${det.CODAUXILIAR}-${index}`}
                                                                            className="text-textPrimary"
                                                                        >
                                                                            <td className="px-2 py-2">{det.CODAUXILIAR}</td>
                                                                            <td className="px-2 py-2">{det.PRODUTO}</td>
                                                                            <td className="px-2 py-2">{toKg(det.QT_SAIDA)}</td>
                                                                            <td className="px-2 py-2">{toMoney(det.CUSTO)}</td>
                                                                            <td className="px-2 py-2">{toMoney(det.PRECO)}</td>
                                                                            <td className={`px-2 py-2 font-semibold ${getMargemClass(det.MARGEM)}`}>
                                                                                {det.MARGEM.toLocaleString('pt-BR', {
                                                                                    minimumFractionDigits: 2,
                                                                                    maximumFractionDigits: 2,
                                                                                })}%
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tabela