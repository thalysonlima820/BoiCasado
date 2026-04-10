import { useState } from "react";
import axios from "axios";
import type { typeTlExplosao } from "../interface/typeTlExplosao";
import type { typeTlEntrada } from "../interface/typeTlEntrada";
import type { typePcExplosao } from "../interface/typePcExplosao";
import type { EstoqueSaida } from "../interface/EstoqueSaida";
import type { TypeEntradaSaida } from "../interface/TypeEntradaSaida";


export function useHttpEntrada() {
  const [dataEntrada, setDataEntrada] = useState<typeTlEntrada[]>([]);
  const [dataExplosao, setDataExplosao] = useState<typeTlExplosao[]>([]);
  const [dataPecaExplosao, setDataPecaExplosao] = useState<typePcExplosao[]>([]);
  const [esotqueSaida, setEsotqueSaida] = useState<EstoqueSaida[]>([]);
  const [entradaSaida, setEntradaSaida] = useState<TypeEntradaSaida[]>([]);
  const [loading, setLoading] = useState(false);



  const getEntradaTotal = async (datainicio:string, datafinal:string, codfilial:string) => {
    try {
      setLoading(true);  
      const response = await axios.get<typeTlEntrada[]>(
        `https://api.devbr.site/adm/boicasado/total/entrada/${datainicio}/${datafinal}/${codfilial}`,
      );
      setDataEntrada(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Erro ao buscar dados";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getExplosaoTotal = async (datainicio:string, datafinal:string, codfilial:string) => {
    try {
      setLoading(true);
      const response = await axios.get<typeTlExplosao[]>(
        `https://api.devbr.site/adm/boicasado/total/explosao/${datainicio}/${datafinal}/${codfilial}`,
      );
      setDataExplosao(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Erro ao buscar dados";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getPecaExplosao = async (datainicio:string, datafinal:string, codfilial:string) => {
    try {
      setLoading(true);
      const response = await axios.get<typePcExplosao[]>(
        `https://api.devbr.site/adm/boicasado/peca/explosao/${datainicio}/${datafinal}/${codfilial}`,
      );
      setDataPecaExplosao(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Erro ao buscar dados";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getEstoqueSaida = async (datainicio:string, datafinal:string, codfilial:string) => {
    try {
      setLoading(true);
      const response = await axios.get<EstoqueSaida[]>(
        `https://api.devbr.site/adm/boicasado/estoque/explosao/${datainicio}/${datafinal}/${codfilial}`,
      );
      setEsotqueSaida(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Erro ao buscar dados";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getEntradaSaida = async (datainicio:string, datafinal:string, codfilial:string) => {
    try {
      setLoading(true);
      const response = await axios.get<TypeEntradaSaida[]>(
        `https://api.devbr.site/adm/boicasado/entrada/saida/${datainicio}/${datafinal}/${codfilial}`,
      );
      setEntradaSaida(response.data);
      return response.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Erro ao buscar dados";
      console.log(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };



  return {
    loading,
    getEntradaTotal, dataEntrada,
    getExplosaoTotal, dataExplosao,
    getPecaExplosao, dataPecaExplosao,
    getEstoqueSaida, esotqueSaida,
    getEntradaSaida, entradaSaida
  };
}
