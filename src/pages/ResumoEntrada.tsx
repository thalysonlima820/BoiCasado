
import type { typeTlExplosao } from '../interface/typeTlExplosao';

type ResumoEntradaProps = {
  dataExplosao: typeTlExplosao[];
};
const ResumoEntrada = ({ dataExplosao }: ResumoEntradaProps) => {

 
    const resumoExplosao = dataExplosao.reduce(
        (acc, item) => {
            acc.totalGeral += Number(item.TOTAL_GERAL || 0);
            acc.estoque += Number(item.ESTOQUE || 0);
            acc.qtAproveitado += Number(item.QT_APROVEITADO || 0);
            acc.qtDescarte += Number(item.QT_DESCARTE || 0);
            return acc;
        },
        {
            totalGeral: 0,
            estoque: 0,
            qtAproveitado: 0,
            qtDescarte: 0,
        }
    );

    const percAproveitado =
        resumoExplosao.totalGeral > 0
            ? (resumoExplosao.qtAproveitado / resumoExplosao.totalGeral) * 100
            : 0;

    const percDescarte =
        resumoExplosao.totalGeral > 0
            ? (resumoExplosao.qtDescarte / resumoExplosao.totalGeral) * 100
            : 0;

    return (
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
                         {resumoExplosao.totalGeral.toLocaleString("pt-BR")}<span className="ml-1 text-[10px] text-textSecondary">kg</span>
                    </h2>
                </div>
            </div>

            {/* resumo compacto */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3">
                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                    <p className="text-[10px] text-textSecondary">Qt Aprov.</p>
                    <h3 className="text-sm font-semibold text-verde">
                        {resumoExplosao.qtAproveitado.toLocaleString("pt-BR")}
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                    <p className="text-[10px] text-textSecondary">qt Perda</p>
                    <h3 className="text-sm font-semibold text-accent">
                        {resumoExplosao.qtDescarte.toLocaleString("pt-BR")}
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                    <p className="text-[10px] text-textSecondary">Aprov.</p>
                    <h3 className="text-sm font-semibold text-verde">
                        {percAproveitado.toFixed(2)}%
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-primary px-3 py-2">
                    <p className="text-[10px] text-textSecondary">Perda</p>
                    <h3 className="text-sm font-semibold text-accent">
                        {percDescarte.toFixed(2)}%
                    </h3>
                </div>
            </div>

            {/* lista */}
            <div className="grid grid-cols-2 gap-3 px-4 mb-4 overflow-y-auto flex-1 min-h-0 pr-1">

                {dataExplosao.map((p) => (
                    <div className="rounded-xl border border-white/10 bg-primary p-3">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-sm font-semibold text-textPrimary">{p.QUARTO}</h2>
                            <span className="text-[10px] text-textSecondary">{p.TOTAL_GERAL} / {p.ESTOQUE}</span>
                        </div>

                        <div className="space-y-1 text-[11px]">
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Explosão</span>
                                <span>{p.TOTAL_GERAL}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Aproveitado</span>
                                <span className="text-verde">{p.QT_APROVEITADO}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-textSecondary">Perda</span>
                                <span className="text-accent">{p.QT_DESCARTE}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-textSecondary">%</span>
                                <span className="text-amarelo">{p.PERC_APROVEITADO}%</span>
                            </div>
                        </div>
                    </div>
                ))}



            </div>
        </div>
    )
}

export default ResumoEntrada