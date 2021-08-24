import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
} from "@windmill/react-ui";

import Machines from "../../context/MachinesContext";
import ProductionLines from "../../context/ProductionLinesContext";

export default ({ handleClose }) => {
  const machineContext = useContext(Machines);
  const ProductionLineContext = useContext(ProductionLines);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState("");
  const [selectedProductionLine, setSelectedProductionLine] =
    useState(undefined);
  const [productionLines, setProductionLines] = useState([]);

  async function createPublicAgency() {
    await machineContext.create({
      name,
      productionLineId: selectedProductionLine,
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

  useEffect(() => {
    (async () => {
      await ProductionLineContext.fetch();
    })();
  }, []);

  useEffect(() => {
    setProductionLines(
      ProductionLineContext.productionLines.map((productionLine) => (
        <option key={productionLine.id} value={productionLine.id}>
          {productionLine.name}
        </option>
      ))
    );
  }, [ProductionLineContext.productionLines]);
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

            <Label className="mt-5 w-full">
              <span>Operador: </span>
              <select
                className="bg-gray-800 border-white"
                name="operators"
                onChange={(e) => setSelectedProductionLine(e.target.value)}
              >
                {productionLines}
              </select>
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
