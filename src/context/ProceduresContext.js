import React, { useState, createContext, useCallback } from 'react';
import api from '../services/api';
import moment from "moment";

function sanitizeDate(date) {
  return moment(new Date(date)).format("DD/MM/YYYY HH:mm");
}
const ProceduresContext = createContext({});

const monthDict = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro"
}

function getProceduresByType(procedures) {
  const data = {};
  data["Denúncia"] = 0;
  data["Sugestão"] = 0;
  data["Solicitação"] = 0;

  procedures.forEach((procedure) => {
    if(data[procedure.type] === undefined) data[procedure.type] = 1;
    else data[procedure.type] += 1;
  });

  return Object.values(data);
}

function getProceduresByMonthAndType(procedures) {
  const data = {}
  data["types"] = {};
  data["types"]["Denúncia"] = [];
  data["types"]["Sugestão"] = [];
  data["types"]["Solicitação"] = [];

  procedures.forEach((procedure) => {
    data[monthDict[new Date(procedure.created_at).getMonth()]] = {};
    data[monthDict[new Date(procedure.created_at).getMonth()]]["Denúncia"] = 0
    data[monthDict[new Date(procedure.created_at).getMonth()]]["Sugestão"] = 0;
    data[monthDict[new Date(procedure.created_at).getMonth()]]["Solicitação"] = 0;
  });

  procedures.forEach((procedure) => {
    data[monthDict[new Date(procedure.created_at).getMonth()]][procedure.type] += 1
  });

  
  for(let i = 0; i < Object.keys(monthDict).length; i++) {
    if(data[monthDict[i]]) {
      data["types"]["Denúncia"].push(data[monthDict[i]]["Denúncia"]);
      data["types"]["Sugestão"].push(data[monthDict[i]]["Sugestão"]);
      data["types"]["Solicitação"].push(data[monthDict[i]]["Solicitação"]);
    }
  }
  
  data["types"]["Denúncia"].push(0);
  data["types"]["Sugestão"].push(0);
  data["types"]["Solicitação"].push(0);

  if(Object.keys(data).length > 4) {
    const rawData = Object.entries(data)
    .filter((data) => data[0] !== "types")
    .slice(0, 3);

    const newData = {};
    rawData.forEach((data) => newData[data[0]] = data[1]);
    return newData;
  }
  return data;
}

export const ProceduresProvider = ({ children }) => {
  const [procedures, setProcedures] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [chartsData, setChartsData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('procedures');
      setProcedures(response.data.procedures.map((procedure) => ({...procedure, created_at: sanitizeDate(procedure.created_at)})));
      setSummaryData(response.data.summaryData);

      const proceduresType = getProceduresByType(response.data.procedures);
      const proceduresTime = getProceduresByMonthAndType(response.data.procedures);
      setChartsData({ doughnutOptions: proceduresType, barOptions: proceduresTime }); 
    } catch(error) {
      console.error(error)
      console.log("deu erro")
        // do something
    }
    setLoading(false);
  }, []);

  const update = useCallback(async (procedureId, toUpdateData) => {
    try {
      setLoading(true);
      await api.post(`procedure/${procedureId}`, toUpdateData);
      await fetch();
    } catch (error) {
        // do something
    }

    setLoading(false);
  }, [fetch]);

  return (
    <ProceduresContext.Provider value={{
      procedures, fetch, loading, update, summaryData, chartsData
    }}
    >
      {children}
    </ProceduresContext.Provider>
  );
};

export default ProceduresContext;