import React, { useContext, useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import ProductionLineRow from "../components/ProductionLineRow";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  Button,
} from "@windmill/react-ui";

import ProductionLine from "../context/ProductionLinesContext";

import CreateProductionLineModal from "../components/CreateProductionLineModal";

function ProductionLines(props) {
  const productionLineContext = useContext(ProductionLine);
  const [
    isCreateProductionModalVisible,
    setCreateProductionLineModalVisibility,
  ] = useState(false);

  useEffect(() => {
    (async () => {
      await productionLineContext.fetch();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setInterval(async () => {
        await productionLineContext.fetch();
      }, 5000);
    })();
  }, []);

  return (
    <>
      {isCreateProductionModalVisible && (
        <CreateProductionLineModal
          handleClose={() => setCreateProductionLineModalVisibility(false)}
        />
      )}
      <div className="mb-5">
        <PageTitle>Linhas de produção</PageTitle>
        <Button onClick={() => setCreateProductionLineModalVisibility(true)}>
          Criar nova linha de produção
        </Button>
      </div>

      <TableContainer className="my-5">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>id</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Qtd. Máquinas</TableCell>
              <TableCell>Qtd. Produzida</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {productionLineContext.productionLines.map((productionLine) => (
              <ProductionLineRow
                key={productionLine.id}
                productionLine={productionLine}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductionLines;
