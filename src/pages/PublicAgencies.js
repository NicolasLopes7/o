import React, { useContext, useState } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import PublicAgencyRow from "../components/PublicAgency";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  Button
} from '@windmill/react-ui'

import PublicAgency from "../context/PublicAgenciesContext";
import CreatePublicAgencyModal from "../components/CreatePublicAgencyModal";

function PublicAgencies(props) {
  const publicAgenciesContext = useContext(PublicAgency);
  const [isCreatePublicAgencyModalVisible, setCreatePublicAgencyModalVisibility] = useState(false);
  return (
    <>
    {isCreatePublicAgencyModalVisible && <CreatePublicAgencyModal handleClose={() => setCreatePublicAgencyModalVisibility(false)}/>}
      <div className="mb-5">
        <PageTitle>Orgãos Públicos</PageTitle>
        <Button onClick={() => setCreatePublicAgencyModalVisibility(true)}>Criar novo orgão</Button>
      </div>

      <TableContainer className="my-5">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Posição</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Número de Telefone</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Dados Sensíveis</TableCell>
              <TableCell>Editar Informações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {publicAgenciesContext.publicAgencies.map((publicAgency) => <PublicAgencyRow key={publicAgency.id} publicAgency={publicAgency}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PublicAgencies
