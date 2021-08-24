import React,{ useState } from 'react'
import { Card, CardBody, Input, Button  } from "@windmill/react-ui";

import PageTitle from '../components/Typography/PageTitle'
import api from "../services/api";

function Messages(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const submitForm =  () => {
    try {
      const formData = new FormData();
      formData.append("name", selectedFile.name);
      formData.append("file", selectedFile);
      api.post("pharmacyImage", formData)
      setStatus("A imagem foi atualizada com sucesso!")
    } catch (error) {
      console.info(error);
      setStatus("Ocorreu um erro em enviar a imagem para o servidor!")
    }
  };

  return (
    <>
    <PageTitle>Foto das farmácias de plantão</PageTitle>
      
    <div className="flex justify-center w-full h-full">
      <Card>
        <CardBody className="flex-col items-center w-full h-full">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Selecione a imagem das farmácias de plantão</p>
            <Input 
              type="file"
              className="border-dotted my-4"
              onChange={(e) => setSelectedFile(e.target.files[0])}/>
            <Button className="w-full h-full" onClick={() => submitForm()}>Enviar foto</Button>
            <span className="text-sm font-medium text-gray-400 dark:text-gray-600">{status}</span>
          </div>
        </CardBody>
      </Card>
      </div>
    </>
  )
}

export default Messages
