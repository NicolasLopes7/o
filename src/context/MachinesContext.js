import React, { useState, createContext, useCallback } from "react";
import api from "../services/api";

const MachinesContext = createContext({});

export const MachinesProvider = ({ children }) => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("machines");
      setMachines(response.data.machines);
      console.log(response.data.machines);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  const updateOperator = useCallback(
    async (operatorId, machineId) => {
      try {
        setLoading(true);
        await api.put(`operator/${operatorId}`, { machineId });
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
        await api.post("machine", data);
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
    <MachinesContext.Provider
      value={{
        machines,
        fetch,
        loading,
        updateOperator,
        create,
      }}
    >
      {children}
    </MachinesContext.Provider>
  );
};

export default MachinesContext;
