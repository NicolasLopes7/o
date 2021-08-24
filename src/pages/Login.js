import React, { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";
import AuthenticationContext from "../context/AuthenticationContext";

const Login = () => {
  const history = useHistory();
  const authenticationContext = useContext(AuthenticationContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      authenticationContext.authenticate({ username, password }, () =>
        history.push({
          pathname: "/app/machines",
          state: { showModal: true },
        })
      );
    },
    [username, password, authenticationContext, history]
  );

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full">
            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Login
            </h1>
            <Label>
              <span>Usuário</span>
              <Input
                onChange={handleUsernameChange}
                className="mt-1"
                type="text"
                placeholder="Digite o seu usuário"
              />
            </Label>

            <Label className="mt-4">
              <span>Senha</span>
              <Input
                onChange={handlePasswordChange}
                className="mt-1"
                type="password"
                placeholder="***************"
              />
            </Label>

            <Button className="mt-4" block onClick={handleSubmit}>
              Log in
            </Button>

            <span className="flex justify-center mt-4 mb-0 text-xl font-bold text-red-700">
              {authenticationContext.error}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
