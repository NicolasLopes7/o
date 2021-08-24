import React, { useState, createContext, useCallback } from "react";
import api from "../services/api";

const OperatorsContext = createContext({});

export const OperatorsProvider = ({ children }) => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("operators");
      setOperators(response.data.operators);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  const updateOperator = useCallback(
    async (operatorId, data) => {
      try {
        setLoading(true);
        await api.put(`operator/${operatorId}`, data);
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
        await api.post("operator", data);
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
    <OperatorsContext.Provider
      value={{
        operators,
        fetch,
        loading,
        updateOperator,
        create,
      }}
    >
      {children}
    </OperatorsContext.Provider>
  );
};

export default OperatorsContext;
