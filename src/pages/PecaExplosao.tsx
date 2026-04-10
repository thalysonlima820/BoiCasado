import { useEffect, useState } from 'react'
import type { typePcExplosao } from '../interface/typePcExplosao';

type ResumoPecaProps = {
    dataPecaExplosao: typePcExplosao[];
};
const PecaExplosao = ({ dataPecaExplosao }: ResumoPecaProps) => {
    const [dados, setDados] = useState<typePcExplosao[]>(dataPecaExplosao)
    const [pesquisaPeca, setPesquisaPeca] = useState<string>('')

    useEffect(() => {
        const filtrado = dataPecaExplosao.filter(item =>
            item.DESCRICAO?.toLowerCase().includes(pesquisaPeca.toLowerCase())
        )

        const timer = setTimeout(() => {
            setDados(filtrado)
        }, 0)

        return () => clearTimeout(timer)
    }, [dataPecaExplosao, pesquisaPeca])

    return (
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
                        <h2 className="text-lg font-bold text-textPrimary">{dados.length}</h2>
                    </div>

                </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-3 gap-3 px-4 py-4 overflow-y-auto flex-1 min-h-0 pr-1">
                {dados.map((p) => (
                    <div className="rounded-xl border border-white/10 bg-primary p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-textPrimary">{p.DESCRICAO}</h2>
                            {/* <span className="text-[10px] text-amarelo">12%</span> */}
                        </div>
                        <div className="space-y-1 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Entrada</span>
                                <span>{p.QT_ENTRADA}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Saída</span>
                                <span className="text-verde">{p.QT_SAIDA}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Saldo</span>
                                <span>{p.GERAL}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PecaExplosao