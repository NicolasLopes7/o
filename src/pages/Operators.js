import React, { useContext, useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import OperatorRow from "../components/OperatorRow";

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
import CreateOperatorModal from "../components/CreateOperatorModal";

function Operators(props) {
  const machineContext = useContext(Machine);
  const operatorContext = useContext(Operator);
  const [isCreateOperatorModalVisible, setCreateOperatorModalVisible] =
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
      }, 5000);
    })();
  }, []);

  return (
    <>
      {isCreateOperatorModalVisible && (
        <CreateOperatorModal
          handleClose={() => setCreateOperatorModalVisible(false)}
        />
      )}
      <div className="mb-5">
        <PageTitle>Operadores</PageTitle>
        <Button onClick={() => setCreateOperatorModalVisible(true)}>
          Criar novo operador
        </Button>
      </div>

      <TableContainer className="my-5">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Máquina</TableCell>
              <TableCell>Qtd. Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {operatorContext.operators.map((operator) => (
              <OperatorRow key={operator.id} operator={operator} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Operators;
