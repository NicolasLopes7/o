import React, { useState, useContext, useCallback } from "react";
import { 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TableRow,
  TableCell,
  Badge,
  Label,
  Input  } from  "@windmill/react-ui";
import PublicAgencies from "../../context/PublicAgenciesContext";

export default ({ publicAgency }) => {
    const publicAgenciesContext = useContext(PublicAgencies);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState(publicAgency.name);
    const [login, setLogin] = useState(publicAgency.login);
    const [password, setPassword] = useState(publicAgency.password);
    const [position, setPosition] = useState(publicAgency.position);
    const [phoneNumber, setPhoneNumber] = useState(publicAgency.phoneNumber);
    const [active, setActive] = useState(publicAgency.active);
    const [dangerous, setDangerous] = useState(publicAgency.dangerous);

    async function updatePublicAgency() {
      await publicAgenciesContext.update(publicAgency.id, { name, position, phoneNumber, active, dangerous, login, password });
      setIsModalOpen(false);
    }

    function openModal() {
        setIsModalOpen(true)
      }
    
    function closeModal() {
        setIsModalOpen(false)
      }
    
    const handleNameChange = useCallback((e) => {
      setName(e.currentTarget.value);
    }, []);

    const handlePositionChange = useCallback((e) => {
      setPosition(e.currentTarget.value);
    }, []); 

    const handleActiveChange = useCallback((e) => {
      setActive(e.currentTarget.checked);
    }, []);

    const handleDangerousChange = useCallback((e) => {
      setDangerous(e.currentTarget.checked);
    }, []);

    const handlePhoneNumberChange = useCallback((e) => {
      setPhoneNumber(e.currentTarget.value);
    }, []);

    const handleLoginChange = useCallback((e) => {
      setLogin(e.currentTarget.value);
    }, []);

    const handlePasswordChange = useCallback((e) => {
      setPassword(e.currentTarget.value);
    }, []);

      return (
        <>
          <Modal isOpen={isModalOpen} key={publicAgency.id + "A"} onClose={closeModal}>
            <ModalHeader>Visualizando: ({name})</ModalHeader>
              <ModalBody>
              <div className="flex items-center text-lg">
                <div className="w-full">

                  <Label className="mt-5 w-full">
                    <span>Nome: </span>
                    <Input  onChange={handleNameChange} className="my-2 w-full" type="text" value={name} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Posição: </span>
                    <Input  onChange={handlePositionChange} className="my-2 w-full" type="number" value={position} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Número de telefone: </span>
                    <Input  onChange={handlePhoneNumberChange} className="my-2 w-full" type="text" value={phoneNumber} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Login: </span>
                    <Input  onChange={handleLoginChange} className="my-2 w-full" type="text" value={login} />
                  </Label>

                  <Label className="mt-5 w-full">
                    <span>Senha: </span>
                    <Input  onChange={handlePasswordChange} className="my-2 w-full" type="text" value={password} />
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
                <div className="hidden sm:block" onClick={updatePublicAgency}>
                  <Button>Atualizar</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClose={closeModal}>
                  Voltar
                  </Button>
                </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" onClick={updatePublicAgency}>
              Atualizar
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        <TableRow key={publicAgency.id + "b"}>
          <TableCell>
            <span className="font-semibold">{position}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{name}</span>
          </TableCell>
          <TableCell>
            <span>{phoneNumber}</span>
          </TableCell>
          <TableCell>
            <Badge type={active ? "success" : "warning"}>{active ? "Ativo" : "Inativo"}</Badge>
          </TableCell>
          <TableCell>
            <Badge type={dangerous ? "success" : "warning"}>{dangerous ? "Possui" : "Não possui"}</Badge>
          </TableCell>
          <TableCell>
            <Button onClick={openModal}>
              Clique aqui
            </Button>
          </TableCell>
        </TableRow>
        </>
      );
}