import React, { useState, useContext, useCallback } from "react";
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  } from  "@windmill/react-ui";

import PublicAgencies from "../../context/PublicAgenciesContext";

export default ({ handleClose }) => {
    const publicAgenciesContext = useContext(PublicAgencies);
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [active, setActive] = useState(true);
    const [dangerous, setDangerous] = useState(false);

    async function createPublicAgency() {
      await publicAgenciesContext.create({ name, login, password, phoneNumber, active });
      setIsModalOpen(false);
    }

    function closeModal() {
        setIsModalOpen(false)
        handleClose();
    }
    
    const handleNameChange = useCallback((e) => {
      setName(e.currentTarget.value);
    }, []);

    const handleLoginChange = useCallback((e) => {
        setLogin(e.currentTarget.value);
      }, []);

    const handlePasswordChange = useCallback((e) => {
        setPassword(e.currentTarget.value);
    }, []);

    const handleActiveChange = useCallback((e) => {
      setActive(e.currentTarget.checked);
    }, []);

    const handlePhoneNumberChange = useCallback((e) => {
      setPhoneNumber(e.currentTarget.value);
    }, []);

    const handleDangerousChange = useCallback((e) => {
      setDangerous(e.currentTarget.checked);
    }, []);

      return (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader>Criando: <span className="font-thin">{name}</span></ModalHeader>
              <ModalBody>
              <div className="flex items-center text-lg">
                <div className="w-full">

                  <Label className="mt-5 w-full">
                    <span>Nome: </span>
                    <Input  onChange={handleNameChange} className="my-2 w-full" type="text" value={name} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Login: </span>
                    <Input  onChange={handleLoginChange} className="my-2 w-full" type="text" value={login} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Senha: </span>
                    <Input  onChange={handlePasswordChange} className="my-2 w-full" type="password" value={password} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Número de telefone: </span>
                    <Input 
                      onChange={handlePhoneNumberChange}
                      className="my-2 w-full"
                      value={phoneNumber}/>
                  </Label>

                  <Label className="mt-5">
                    <span>Ativo: </span>
                    <Input onChange={handleActiveChange} className="my-2" type="checkbox" defaultChecked={active} />
                  </Label>

                  <Label className="mt-5">
                    <span>Dados Sensíveis: </span>
                    <Input onChange={handleDangerousChange} className="my-2" type="checkbox" defaultChecked={dangerous} />
                  </Label>

                </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button layout="outline" onClick={closeModal}>
                    Voltar
                  </Button>
                </div>
                <div className="hidden sm:block" onClick={createPublicAgency}>
                  <Button>Criar</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClose={closeModal}>
                  Voltar
                  </Button>
                </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" onClick={createPublicAgency}>
              Criar
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      );
}