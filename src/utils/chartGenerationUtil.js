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
  
export function getProceduresByType(procedures) {
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
  
export function getProceduresByMonthAndType(procedures) {
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