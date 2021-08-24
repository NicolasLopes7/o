import React, { useState, createContext, useCallback } from "react";
import api from "../services/api";

const PublicAgenciesContext = createContext({});

export const PublicAgenciesProvider = ({ children }) => {
  const [publicAgencies, setPublicAgencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("publicAgencies");
      setPublicAgencies(response.data.publicAgencies);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  const update = useCallback(
    async (publicAgencyId, toUpdateData) => {
      try {
        setLoading(true);
        await api.post(`publicAgency/${publicAgencyId}`, toUpdateData);
        await fetch();
      } catch (error) {
        // do something
      }

      setLoading(false);
    },
    [fetch]
  );

  // { name, dangerous, login, password, phoneNumber }
  const create = useCallback(
    async (data) => {
      data.position = (publicAgencies.slice(-1)[0]?.position ?? 0) + 1;
      try {
        setLoading(true);
        await api.post("publicAgency", data);
        await fetch();
      } catch (err) {
        console.info(err);
        // do something
      }
      setLoading(false);
    },
    [publicAgencies, fetch]
  );

  return (
    <PublicAgenciesContext.Provider
      value={{
        publicAgencies,
        fetch,
        loading,
        update,
        create,
      }}
    >
      {children}
    </PublicAgenciesContext.Provider>
  );
};

export default PublicAgenciesContext;
