import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  TableRow,
  TableCell,
  Label,
} from "@windmill/react-ui";
import Machines from "../../context/MachinesContext";
import Operators from "../../context/OperatorsContext";

export default ({ machine }) => {
  const MachineContext = useContext(Machines);
  const OperatorContext = useContext(Operators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(undefined);

  async function updateMachine() {
    if (selectedOperator) {
      await MachineContext.updateOperator(selectedOperator, machine.id);
      setIsModalOpen(false);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    setOperators(
      OperatorContext.operators.map((operator) => (
        <option key={operator.id} value={operator.id}>
          {operator.name}
        </option>
      ))
    );
  }, [OperatorContext.operators]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        key={machine.id + " - modal"}
        onClose={closeModal}
      >
        <ModalHeader>Editando: {machine.name}</ModalHeader>
        <ModalBody>
          <div className="flex items-center text-lg">
            <div className="w-full">
              <Label className="mt-5 w-full">
                <span>Operador: </span>
                <select
                  className="bg-gray-800 border-white"
                  name="operators"
                  onChange={(e) => setSelectedOperator(e.target.value)}
                >
                  {operators}
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
          <div className="hidden sm:block" onClick={updateMachine}>
            <Button>Atualizar</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClose={closeModal}>
              Voltar
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={updateMachine}>
              Atualizar
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <TableRow key={machine.id}>
        <TableCell>
          <span className="font-semibold">{machine.id}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{machine.name}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">
            <div className="hidden sm:block" onClick={() => openModal()}>
              <Button>{machine.operator.name ?? "Adicionar Operador"}</Button>
            </div>
          </span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{machine.productionLine.name + " - " + machine.productionLine.id}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{machine.actions}</span>
        </TableCell>
      </TableRow>
    </>
  );
};
