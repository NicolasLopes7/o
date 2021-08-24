import React, { useContext, useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import MachineRow from "../components/MachineRow";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  Button,
} from "@windmill/react-ui";

import Machine from "../context/MachinesContext";
import Operator from "../context/OperatorsContext";
import CreateMachineModal from "../components/CreateMachineModal";
/**
 {
      "id": 14,
      "name": "MAQUINA A",
      "operator": {
        "id": 7,
        "name": "Nicolas"
      },
      "productionLine": {
        "id": 1,
        "name": "Gola polo branca"
      }
    },
 */
function Machines(props) {
  const machineContext = useContext(Machine);
  const operatorContext = useContext(Operator);
  const [isCreateMachineModalVisible, setCreateMachineModalVisibility] =
    useState(false);

  useEffect(() => {
    (async () => {
      await machineContext.fetch();
      await operatorContext.fetch();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setInterval(async () => {
        await machineContext.fetch();
        await operatorContext.fetch();
      }, 1000);
    })();
  }, []);

  return (
    <>
      {isCreateMachineModalVisible && (
        <CreateMachineModal
          handleClose={() => setCreateMachineModalVisibility(false)}
        />
      )}
      <div className="mb-5">
        <PageTitle>Máquinas</PageTitle>
        <Button onClick={() => setCreateMachineModalVisibility(true)}>
          Criar nova máquina
        </Button>
      </div>

      <TableContainer className="my-5">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Operador</TableCell>
              <TableCell>Linha de produção</TableCell>
              <TableCell>Qtd. produzida</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {machineContext.machines.map((machine) => (
              <MachineRow key={machine.id} machine={machine} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Machines;
