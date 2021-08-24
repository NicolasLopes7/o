import React, { useState, useContext, useCallback } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "@windmill/react-ui";

import Operators from "../../context/OperatorsContext";

export default ({ handleClose }) => {
  const operatorContext = useContext(Operators)
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState("");

  async function createPublicAgency() {
    await operatorContext.create({
      name,
    });
    setIsModalOpen(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    handleClose();
  }

  const handleNameChange = useCallback((e) => {
    setName(e.currentTarget.value);
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>
        Criando: <span className="font-thin">{name}</span>
      </ModalHeader>
      <ModalBody>
        <div className="flex items-center text-lg">
          <div className="w-full">
            <Label className="mt-5 w-full">
              <span>Nome: </span>
              <Input
                onChange={handleNameChange}
                className="my-2 w-full"
                type="text"
                value={name}
              />
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
};
