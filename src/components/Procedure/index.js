import React, { useState, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, TableRow, TableCell, Avatar, Badge  } from  "@windmill/react-ui";
import Procedures from "../../context/ProceduresContext";

const typeDict = {
    "Denúncia": "danger",
    "Sugestão": "success",
    "Solicitação": "warning"
  }
  const statusDict = {
    "Resolvido": "success",
    "Pendente": "warning"
  }

export default ({ procedure }) => {
    const proceduresContext = useContext(Procedures);
    const [isModalOpen, setIsModalOpen] = useState(false)


    async function updateProcedureStatus() {
      await proceduresContext.update(procedure.id, { solved: true });
      setIsModalOpen(false);
    }

    function openModal() {
        setIsModalOpen(true)
      }
    
    function closeModal() {
        setIsModalOpen(false)
      }
    
      return (
        <>
          <Modal isOpen={isModalOpen} key={procedure.id} onClose={closeModal}>
            <ModalHeader>Visualizando o protocolo: {procedure.id.slice(0,15) + "..."}</ModalHeader>
              <ModalBody>
              <div className="flex items-center text-lg">
                <div>
                  <span className="font-semibold">Protocolo:</span> <span> {procedure.id}</span>
                  <br/>
                  <span className="font-semibold">Nome:</span> <span> {procedure.sender.name}</span>
                  <br/>
                  <span className="font-semibold">Número:</span> <span> {procedure.sender.phone}</span>
                  <br/>
                  <span className="font-semibold">Orgão endereçado:</span> <span> {procedure.publicAgency.name}</span>
                  <br/>
                  <div className="my-5">
                  <span className="font-semibold">Razão: </span><span>{procedure.reason}</span>
                  </div>
                  <span className="font-semibold">Data/Hora do protocolo:</span> <span> {procedure.created_at}</span>
                  <br/>
                  <span className="font-semibold">Tipo:</span> <span> {procedure.type}</span>
                  <br/>
                  <span className="font-semibold">Status:</span> <span> {procedure.status}</span>
                  <br/>
                  
                  {procedure.status === "Resolvido" && (
                    <>
                    <span className="font-semibold">Resolvido às:</span> <span> {procedure.solved_at}</span>
                    </>
                  )}

                </div>
              </div>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button layout="outline" onClick={closeModal}>
                    Voltar
                  </Button>
                </div>
                <div className="hidden sm:block" onClick={updateProcedureStatus}>
                  <Button>Marcar como resolvido</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClose={closeModal}>
                  Voltar
                  </Button>
                </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" onClick={updateProcedureStatus}>
              Marcar como resolvido
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        <TableRow key={procedure.id + "b"}>
          <TableCell>
            <div className="flex items-center text-sm">
              <Avatar className="hidden mr-3 md:block" src="https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png?ssl=1" alt="User image" />
              <div>
                <p className="font-semibold">{procedure.sender.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{procedure.sender.phone}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm">{procedure.id.slice(0, 15) + "..."}</span>
          </TableCell>
          <TableCell>
            <Badge type={typeDict[procedure.type]}>{procedure.type}</Badge>
          </TableCell>
          <TableCell>
            <span className="text-sm">{procedure.created_at}</span>
          </TableCell>
          <TableCell>
          <Badge type={statusDict[procedure.status]}>{procedure.status}</Badge>
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