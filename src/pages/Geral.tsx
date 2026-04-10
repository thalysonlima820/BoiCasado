import { useEffect, useState } from "react";
import type { typeTlExplosao } from "../interface/typeTlExplosao";
import type { EstoqueSaida } from "../interface/EstoqueSaida";

type ResumoEntradaProps = {
    dataExplosao: typeTlExplosao[];
    estoqueSaida: EstoqueSaida[];
};

type TotalGeral = {
    QT_ENTRADA_MERCADOPRIA: number;
    QT_APROVEITADO: number;
    QT_DESCARTE: number;
    TOTAL_GERAL: number;
    PERC_DESCARTE: number;
    PERC_APROVEITADO: number;
    TOTAL_SAIDA: number;
    ESTOQUE: number;
    DIF_ENTRADA_EXPLOSAO: number;
    SALDO_ESPERADO: number;
    DIF_ESTOQUE: number;
};

const Geral = ({ dataExplosao, estoqueSaida }: ResumoEntradaProps) => {
    const [total, setTotal] = useState<TotalGeral>({
        QT_ENTRADA_MERCADOPRIA: 0,
        QT_APROVEITADO: 0,
        QT_DESCARTE: 0,
        TOTAL_GERAL: 0,
        PERC_DESCARTE: 0,
        PERC_APROVEITADO: 0,
        TOTAL_SAIDA: 0,
        ESTOQUE: 0,
        DIF_ENTRADA_EXPLOSAO: 0,
        SALDO_ESPERADO: 0,
        DIF_ESTOQUE: 0,
    });

    useEffect(() => {
        const qtAproveitado = dataExplosao.reduce(
            (acc, item) => acc + Number(item.QT_APROVEITADO || 0),
            0
        );

        const qtDescarte = dataExplosao.reduce(
            (acc, item) => acc + Number(item.QT_DESCARTE || 0),
            0
        );

        const totalGeral = dataExplosao.reduce(
            (acc, item) => acc + Number(item.TOTAL_GERAL || 0),
            0
        );

        const entradasUnicas = new Map<number, number>();

        dataExplosao.forEach((item) => {
            const cod = Number(item.CODPRODUTO_QUARTO);
            if (!entradasUnicas.has(cod)) {
                entradasUnicas.set(cod, Number(item.QT_ENTRADA_MERCADOPRIA || 0));
            }
        });

        const qtEntradaMercadopria = Array.from(entradasUnicas.values()).reduce(
            (acc, valor) => acc + valor,
            0
        );

        const percDescarte =
            totalGeral > 0 ? Number(((qtDescarte / totalGeral) * 100).toFixed(2)) : 0;

        const percAproveitado =
            totalGeral > 0 ? Number(((qtAproveitado / totalGeral) * 100).toFixed(2)) : 0;

        const totalSaida = estoqueSaida.reduce(
            (acc, item) => acc + Number(item.TOTAL_SAIDA || 0),
            0
        );

        const estoqueAtual = estoqueSaida.reduce(
            (acc, item) => acc + Number(item.ESTOQUE || 0),
            0
        );

        const difEntradaExplosao = Number((qtEntradaMercadopria - totalGeral).toFixed(3));
        const saldoEsperado = Number(
            (qtEntradaMercadopria - totalSaida - qtDescarte).toFixed(3)
        );

        const difEstoque = Number((saldoEsperado - estoqueAtual).toFixed(3));
        const timer = setTimeout(() => {
            setTotal({
                QT_ENTRADA_MERCADOPRIA: qtEntradaMercadopria,
                QT_APROVEITADO: qtAproveitado,
                QT_DESCARTE: qtDescarte,
                TOTAL_GERAL: totalGeral,
                PERC_DESCARTE: percDescarte,
                PERC_APROVEITADO: percAproveitado,
                TOTAL_SAIDA: totalSaida,
                ESTOQUE: estoqueAtual,
                DIF_ENTRADA_EXPLOSAO: difEntradaExplosao,
                SALDO_ESPERADO: saldoEsperado,
                DIF_ESTOQUE: difEstoque,
            });
        }, 0);

        return () => clearTimeout(timer);
    }, [dataExplosao, estoqueSaida]);

    const toKg = (valor: number) =>
        `${valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
        })}kg`;

    return (
        <div className="w-full h-[50%] flex rounded-2xl border border-white/10 bg-secondary shadow-md overflow-hidden">
            <div className="w-[66%] h-full p-2.5 flex flex-col justify-between">
                <header className="mb-1">
                    <h1 className="text-xs font-bold text-textPrimary">
                        Resumo Geral
                    </h1>
                    <p className="text-[9px] text-textSecondary leading-tight">
                        Comparativo consolidado de entrada, explosão, aproveitamento, perda, saída e estoque
                    </p>
                </header>

                <main className="grid grid-cols-2 gap-1.5">
                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Entrada</p>
                        <h2 className="text-[18px] font-bold leading-none text-textPrimary">
                            {toKg(total.QT_ENTRADA_MERCADOPRIA)}
                        </h2>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Explodido</p>
                        <h2 className="text-[18px] font-bold leading-none text-amarelo">
                            {toKg(total.TOTAL_GERAL)}
                        </h2>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Aproveitado</p>
                        <h2 className="text-[18px] font-bold leading-none text-verde">
                            {toKg(total.QT_APROVEITADO)}
                        </h2>
                        <span className="text-[9px] text-verde/80 font-semibold">
                            {total.PERC_APROVEITADO.toFixed(2)}%
                        </span>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Perda</p>
                        <h2 className="text-[18px] font-bold leading-none text-accent">
                            {toKg(total.QT_DESCARTE)}
                        </h2>
                        <span className="text-[9px] text-accent/80 font-semibold">
                            {total.PERC_DESCARTE.toFixed(2)}%
                        </span>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Saída</p>
                        <h2 className="text-[18px] font-bold leading-none text-textPrimary">
                            {toKg(total.TOTAL_SAIDA)}
                        </h2>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-primary p-2">
                        <p className="text-[9px] text-textSecondary">Estoque</p>
                        <h2 className="text-[18px] font-bold leading-none text-textPrimary">
                            {toKg(total.ESTOQUE)}
                        </h2>
                    </div>
                </main>

                <footer className="mt-1.5 rounded-xl border border-white/10 bg-primary px-2 py-1.5">
                    <div className="flex items-center justify-between text-[9px] mb-1">
                        <span className="text-textSecondary">Rendimento geral</span>
                        <span className="text-verde font-bold">
                            {total.PERC_APROVEITADO.toFixed(2)}%
                        </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="h-full bg-verde rounded-full"
                            style={{ width: `${total.PERC_APROVEITADO}%` }}
                        />
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[9px]">
                        <span className="text-textSecondary">
                            {toKg(total.QT_APROVEITADO)} aproveitado
                        </span>
                        <span className="text-accent font-semibold">
                            {toKg(total.QT_DESCARTE)} perda
                        </span>
                    </div>
                </footer>
            </div>

            <div className="w-[34%] h-full border-l border-white/10 px-2 py-2 flex flex-col items-center justify-center">
                <div className="text-center mb-1.5">
                    <h3 className="text-[11px] font-bold text-textPrimary">Painel</h3>
                    <p className="text-[8px] text-textSecondary leading-tight">
                        visão consolidada
                    </p>
                </div>

                <div
                    className="relative w-20 h-20 rounded-full"
                    style={{
                        background: `conic-gradient(#27ae60 0% ${total.PERC_APROVEITADO}%, #e94560 ${total.PERC_APROVEITADO}% 100%)`,
                    }}
                >
                    <div className="absolute inset-[7px] rounded-full bg-secondary border border-white/10 flex flex-col items-center justify-center text-center px-1">
                        <span className="text-[7px] uppercase tracking-wide text-textSecondary">
                            Aproveit.
                        </span>
                        <span className="text-sm font-bold text-verde leading-none">
                            {total.PERC_APROVEITADO.toFixed(0)}%
                        </span>
                        <span className="text-[7px] text-textSecondary leading-tight">
                            de {toKg(total.TOTAL_GERAL)}
                        </span>
                    </div>
                </div>

                <div className="mt-2 w-full space-y-1.5">
                    <div className="rounded-lg border border-white/10 bg-primary px-2 py-1">
                        <p className="text-[8px] text-textSecondary">Entrada x Explodido</p>
                        <h4 className="text-[10px] font-bold text-textPrimary leading-tight">
                            {toKg(total.QT_ENTRADA_MERCADOPRIA)} / {toKg(total.TOTAL_GERAL)}
                        </h4>

                        <p
                            className={`text-[8px] font-semibold leading-tight mt-0.5 ${total.DIF_ENTRADA_EXPLOSAO > 0
                                ? "text-yellow-400"
                                : total.DIF_ENTRADA_EXPLOSAO < 0
                                    ? "text-red-400"
                                    : "text-verde"
                                }`}
                        >
                            {total.DIF_ENTRADA_EXPLOSAO > 0
                                ? `faltou explodir ${toKg(total.DIF_ENTRADA_EXPLOSAO)}`
                                : total.DIF_ENTRADA_EXPLOSAO < 0
                                    ? `explodiu ${toKg(Math.abs(total.DIF_ENTRADA_EXPLOSAO))} a mais`
                                    : "entrada e explosão batem"}
                        </p>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-primary px-2 py-1">

                        <p className="text-[8px] text-textSecondary">Fluxo x Estoque</p>

                        {/* valores principais */}
                        <div className="text-[9px] text-textPrimary font-semibold leading-tight mt-0.5">
                            <span className="text-white">
                                {toKg(total.QT_ENTRADA_MERCADOPRIA)}
                            </span>
                            <span className="text-textSecondary"> - </span>
                            <span className="text-white">
                                {toKg(total.TOTAL_SAIDA)}
                            </span>
                            <span className="text-textSecondary"> - </span>
                            <span className="text-accent">
                                {toKg(total.QT_DESCARTE)}
                            </span>
                        </div>

                        {/* resultado */}
                        <div className="text-[10px] font-bold text-white mt-0.5">
                            {toKg(total.SALDO_ESPERADO)}
                            <span className="text-textSecondary"> / </span>
                            {toKg(total.ESTOQUE)}
                        </div>

                        {/* explicação */}
                        <p className="text-[8px] text-textSecondary leading-tight">
                            (entrada - saída - perda / estoque)
                        </p>

                        {/* status */}
                        <p
                            className={`text-[8px] font-semibold leading-tight ${total.DIF_ESTOQUE > 0
                                    ? "text-red-400"
                                    : total.DIF_ESTOQUE < 0
                                        ? "text-yellow-400"
                                        : "text-verde"
                                }`}
                        >
                            {total.DIF_ESTOQUE > 0
                                ? `sumiu ${toKg(total.DIF_ESTOQUE)}`
                                : total.DIF_ESTOQUE < 0
                                    ? `sobrou ${toKg(Math.abs(total.DIF_ESTOQUE))}`
                                    : "estoque confere"}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Geral;