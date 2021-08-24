import React from "react";
import { Button, TableRow, TableCell } from "@windmill/react-ui";

export default ({ productionLine }) => {
  return (
    <>
      <TableRow key={productionLine.id}>
        <TableCell>
          <span className="font-semibold">{productionLine.id}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{productionLine.name}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{productionLine.machines}</span>
        </TableCell>
        <TableCell>
          <span className="font-semibold">{productionLine.actions}</span>
        </TableCell>
      </TableRow>
    </>
  );
};
