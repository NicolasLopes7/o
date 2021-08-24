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

export default ({ operator }) => {
  const MachineContext = useContext(Machines);
  const OperatorContext = useContext(Operators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(undefined);

  async function updateMachine() {
    if (selectedMachine) {
      await MachineContext.updateOperator(operator.id, selectedMachine);
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
    setMachines(
      MachineContext.machines.map((machine) => (
        <option key={machine.id} value={machine.id}>
          {`${machine.productionLine.name} - ${machine.name}`}
        </option>
      ))
    );
  }, [MachineContext.machines]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        key={operator.id + " - modal"}
        onClose={closeModal}
      >
        <ModalHeader>Editando: {operator.name}</ModalHeader>
        <ModalBody>
          <div className="flex items-center text-lg">
            <div className="w-full">
              <Label className="mt-5 w-full">
                <span>Máquina: </span>
                <select
                  className="bg-gray-800 border-white"
                  name="machine"
                  onChange={(e) => setSelectedMachine(e.target.value)}
                >
                  {machines}
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
      <TableRow key={operator.id}>
        <TableCell>
          <span className="font-semibold">{operator.id}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{operator.name}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">
            <div className="hidden sm:block" onClick={() => openModal()}>
              <Button>
                {operator.machine.name && operator.productionLine.name
                  ? `${operator.machine.name} - ${operator.productionLine.name}`
                  : "Adicionar Máquina"}
              </Button>
            </div>
          </span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{operator.actions}</span>
        </TableCell>
      </TableRow>
    </>
  );
};
