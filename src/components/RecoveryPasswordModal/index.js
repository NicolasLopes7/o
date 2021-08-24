import React, { useState, useCallback, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from  "@windmill/react-ui";
import Authentication from "../../context/AuthenticationContext"
import api from "../../services/api";

export default () => {
    const authenticationContext = useContext(Authentication)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState("");

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        authenticationContext.handleModalStatusChange(false);
    }, [authenticationContext]);
    
    const handlePasswordChange = useCallback((e) => {
      setPassword(e.currentTarget.value);
    }, []);

    const handleConfirmationPasswordChange = useCallback((e) => {
      setConfirmationPassword(e.currentTarget.value);
    }, []);


    const handleSubmit = useCallback(() => {
      if(password === confirmationPassword) {
        setError("")
        try {
          api.post("recovery", { password });          
        } catch {
          // do nothing
        }
        closeModal();
      } else {
        setError("As senhas náo coincidem!")
      }
    }, [closeModal, confirmationPassword, password])
      return (
        <>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Redefina a senha</ModalHeader>
              <ModalBody>
              <div className="flex items-center text-lg">
                <div>
                  <Label>
                    <span>Senha: </span>
                    <Input  onChange={handlePasswordChange} className="my-4" type="password" placeholder="**********" />
                  </Label>
                  
                  <Label>
                    <span>Confirme sua Senha: </span>
                    <Input  onChange={handleConfirmationPasswordChange} className="my-4" type="password" placeholder="**********" />
                  </Label>
                  <span className="flex justify-center mt-4 mb-0 text-xl font-bold text-red-700">{error}</span>
                </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button layout="outline" onClick={closeModal}>
                    Voltar
                  </Button>
                </div>
                <div className="hidden sm:block" onClick={handleSubmit}>
                  <Button>Redefinir senha</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClose={closeModal}>
                  Voltar
                  </Button>
                </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" onClick={handleSubmit}>
              Redefinir senha
              </Button>
            </div>
          </ModalFooter>
        </Modal>       
        </>
      );
}