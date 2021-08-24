import React, { useState, createContext, useCallback } from "react";
import api from "../services/api";

const ProductionLinesContext = createContext({});

export const ProductionLinesProvider = ({ children }) => {
  const [productionLines, setProductionLines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("productionLines");
      setProductionLines(response.data.productionLines);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  const update = useCallback(
    async (productionLineId, data) => {
      try {
        setLoading(true);
        await api.put(`productionLine/${productionLineId}`, data);
        await fetch();
      } catch (error) {
        // do something
      }

      setLoading(false);
    },
    [fetch]
  );

  const create = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await api.post("productionLine", data);
        await fetch();
      } catch (err) {
        console.info(err);
        // do something
      }
      setLoading(false);
    },
    [fetch]
  );

  return (
    <ProductionLinesContext.Provider
      value={{
        productionLines,
        fetch,
        loading,
        update,
        create,
      }}
    >
      {children}
    </ProductionLinesContext.Provider>
  );
};

export default ProductionLinesContext;
