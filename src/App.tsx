import { useState } from "react";
import { GiCow } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { formatDate } from "./util/data";
import ResumoEntrada from "./pages/ResumoEntrada";
import { useHttpEntrada } from "./hooks/useHttpEntrada";
import PecaExplosao from "./pages/PecaExplosao";
import Geral from "./pages/Geral";
import Tabela from "./pages/Tabela";

function App() {
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [filial, setFilial] = useState<string>("1");

  const {
    getExplosaoTotal,
    dataExplosao,
    getPecaExplosao,
    dataPecaExplosao,
    getEstoqueSaida,
    esotqueSaida,
    getEntradaSaida,
    entradaSaida,
  } = useHttpEntrada();

  const handlePesquisar = async () => {
    try {
      await Promise.all([
        getExplosaoTotal(dataInicio, dataFim, filial),
        getPecaExplosao(dataInicio, dataFim, filial),
        getEstoqueSaida(dataInicio, dataFim, filial),
        getEntradaSaida(dataInicio, dataFim, filial),
      ]);
    } catch (error) {
      console.log("Erro ao pesquisar:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary overflow-hidden px-4 py-6 -mt-4 text-white">
      {/* filtro */}
      <header className="bg-secondary w-full h-[10%] px-4 py-3 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
        {/* esquerda */}
        <div className="flex gap-4 items-center">
          <GiCow className="w-14 h-14 text-white" />
          <h1 className="text-2xl font-semibold text-white">Boi Casado</h1>
        </div>

        {/* direita */}
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

          {/* botão pesquisar */}
          <button
            onClick={handlePesquisar}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaSearch className="h-3.5 w-3.5" />
            Pesquisar
          </button>
        </div>
      </header>

      {/* conteúdo */}
      <main className="flex w-full h-[90%] gap-4 mt-4">
        {/* parte 1 */}
        <div className="w-1/2 h-full flex flex-col gap-4 pr-2 overflow-hidden">
          <ResumoEntrada dataExplosao={dataExplosao} />
          <PecaExplosao dataPecaExplosao={dataPecaExplosao} />
        </div>

        {/* parte 2 */}
        <div className="w-1/2 h-full flex flex-col gap-4">
          <Geral dataExplosao={dataExplosao} estoqueSaida={esotqueSaida} />
          <Tabela entradaSaida={entradaSaida} />
        </div>
      </main>
    </div>
  );
}

export default App;