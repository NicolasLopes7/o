/* eslint-disable no-template-curly-in-string */
import React,{ useState, useEffect, useCallback } from 'react'
import { Textarea, Card, CardBody, Button  } from "@windmill/react-ui";

import PageTitle from '../components/Typography/PageTitle'
import api from "../services/api";

function Messages(props) {
  const [firstMessageContent, setFirstMessageContent] = useState("");
  const [selectOptionContent, setSelectOptionContent] = useState(["",""]);
  const [detailSugestionContent, setDetailSugestionContent] = useState("");
  const [detailSolicitationContent, setDetailSolicitationContent] = useState("");
  const [detailReportContent, setDetailReportContent] = useState("");

  const [thanksSugestion, setThanksSugestion] = useState("");
  const [thanksSolicitation, setThanksSolicitation] = useState("");
  const [thanksReport, setThanksReport] = useState("");

  const [status, setStatus] = useState("");

  function getOptionContents(message) {
    const parts = message.split("${name}");
    return [parts[0], parts[1].split("\\n")[0]];
  }

  useEffect(() => {
    (async () => {
      const { data: { messages } } = await api.get("messages/active")
      messages.forEach(message => {
        switch (message.identifier) {
          case 1:
            setFirstMessageContent(message.content);
            break;
          case 2:
            setSelectOptionContent(getOptionContents(message.content));
            break;
          case 3:
            setDetailSugestionContent(message.content);
            break;
          case 4:
            setDetailSolicitationContent(message.content);
            break;
          case 5:
            setDetailReportContent(message.content);
            break;

          case 6:
            setThanksSugestion(message.content);
            break;
          case 7:
            setThanksSolicitation(message.content);
            break;  
          case 8:
            setThanksReport(message.content);
            break;          
        
            
          default:
            break;
        }
      })
    })()
  }, [])


  const handleFirstMessageContent = useCallback((e) => {
    setFirstMessageContent(e.currentTarget.value);
  }, []);

  const handleSelectOptionFirstContent = useCallback((e) => {
    setSelectOptionContent([e.currentTarget.value, selectOptionContent[1]]);
  }, [selectOptionContent]);

  const handleSelectOptionSecondContent = useCallback((e) => {
    setSelectOptionContent([selectOptionContent[0], e.currentTarget.value]);
  }, [selectOptionContent]);

  const handleDetailSugestionContent = useCallback((e) => {
    setDetailSugestionContent(e.currentTarget.value);
  }, []);

  const handleDetailSolicitationContent = useCallback((e) => {
    setDetailSolicitationContent(e.currentTarget.value);
  }, []);
  
  const handleDetailReportContent = useCallback((e) => {
    setDetailReportContent(e.currentTarget.value);
  }, []);

  const handleThanksSugestion = useCallback((e) => {
    setThanksSugestion(e.currentTarget.value);
  }, []);

  const handleThanksSolicitation = useCallback((e) => {
    setThanksSolicitation(e.currentTarget.value);
  }, []);

  const handleThanksReport = useCallback((e) => {
    setThanksReport(e.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await api.post("/messages", {
        firstMessageContent,
        selectOptionContent: selectOptionContent.join("${name}"),
        detailSugestionContent,
        detailSolicitationContent,
        detailReportContent,
        thanksSugestion,
        thanksSolicitation,
        thanksReport
      })
      setStatus("Mensagens atualizadas no banco de dados!")
    } catch (error) {
      setStatus("Ocorreu um erro em atualizar as mensagens!")

    }

  }, [firstMessageContent,
    selectOptionContent,
    detailSugestionContent,
    detailSolicitationContent,
    detailReportContent,
    thanksSugestion,
    thanksSolicitation,
    thanksReport])

  return (
    <>
    <PageTitle>Mensagens Automáticas</PageTitle>
      
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardBody className="flex-col items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Primeira Mensagem</p>
            <Textarea value={firstMessageContent} onChange={handleFirstMessageContent}/>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex-col items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de selecionar opção</p>
            <Textarea value={selectOptionContent[0]} onChange={handleSelectOptionFirstContent}/>
            <p className="my-2 text-sm font-medium text-gray-600 dark:text-gray-400">(Nome do usuário)</p>
            <Textarea value={selectOptionContent[1]} onChange={handleSelectOptionSecondContent}/>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex-col items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de detalhar (Sugestão)</p>
            <Textarea value={detailSugestionContent} onChange={handleDetailSugestionContent}/>
            <br/>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de detalhar (Solicitação)</p>
            <Textarea value={detailSolicitationContent} onChange={handleDetailSolicitationContent}/>
            <br/>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de detalhar (Denúncia)</p>
            <Textarea value={detailReportContent} onChange={handleDetailReportContent}/>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex-col items-center">
          <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de obrigado (Sugestão)</p>
            <Textarea value={thanksSugestion} onChange={handleThanksSugestion}/>
            <br/>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de obrigado (Solicitação)</p>
            <Textarea value={thanksSolicitation} onChange={handleThanksSolicitation}/>
            <br/>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Mensagem de obrigado (Denúncia)</p>
            <Textarea value={thanksReport} onChange={handleThanksReport}/>
          </div>
        </CardBody>
      </Card>
      <Button onClick={handleSubmit} aria-label="publicAgencyFilter" aria-haspopup="true"> Salvar </Button>
      <span className="text-sm font-medium text-gray-400 dark:text-gray-600">{status}</span>
      </div>
    </>
  )
}

export default Messages
