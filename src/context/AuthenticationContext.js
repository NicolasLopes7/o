import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";

import api from "../services/api";
import Operators from "./OperatorsContext";
import Machines from "./MachinesContext";

const AuthenticationContext = createContext({});

const initialAuthenticationData = JSON.parse(
  localStorage.getItem("authenticationData")
);

export const AuthenticationProvider = ({ children }) => {
  const [signed, setSigned] = useState(
    initialAuthenticationData?.signed ?? false
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setModalStatus] = useState(false);

  const { fetch: fetchOperators } = useContext(Operators);
  const { fetch: fetchMachines } = useContext(Machines);

  const handleModalStatusChange = (value) => {
    setModalStatus(value);
  };

  const logOut = () => {
    localStorage.removeItem("authenticationData");
    setSigned(false);
  };
  const authenticate = useCallback(
    async ({ username, password }, redirect) => {
      try {
        setLoading(true);

        await api.post("authenticate", {
          login: username,
          password,
        });

        setTimeout(() => {
          setSigned(true);
        });

        localStorage.setItem(
          "authenticationData",
          JSON.stringify({ signed: true })
        );

        // fetchProcedures();
        await fetchMachines();
        await fetchOperators();
        redirect();
        // setError("");
      } catch (responseError) {
        console.info(responseError);
        setError("Credenciais inválidas.");
        setLoading(false);
      }
    },
    [fetchMachines, fetchOperators]
  );

  useEffect(() => {
    const authenticationdata = localStorage.getItem("authenticationData");
    if (authenticationdata?.signed) {
      setSigned(true);
      setError("");

      // fetchProcedures();
      fetchMachines();
    }
  }, [fetchMachines]);

  return (
    <AuthenticationContext.Provider
      value={{
        signed,
        loading,
        error,
        authenticate,
        showModal,
        handleModalStatusChange,
        logOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
