import React, { useContext, useEffect, useState } from 'react'


import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CheckIcon, PeopleIcon, BalanceIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import ProcedureRow from "../components/Procedure";
import RecoveryPasswordModal from "../components/RecoveryPasswordModal";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
} from '@windmill/react-ui'

import {
  doughnutLegends,
  barLegends,
} from '../utils/demo/chartsData'

import Procedure from "../context/ProceduresContext";
import Authentication from "../context/AuthenticationContext";

function Dashboard(props) {
  const procedureContext = useContext(Procedure);
  const [safeChartData, setChartsData] = useState(procedureContext.chartsData);
  const authenticationContext = useContext(Authentication);
  
  useEffect(() => {
    setChartsData(procedureContext.chartsData);
  }, [procedureContext])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

   {authenticationContext.showModal && <RecoveryPasswordModal />}
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total de solicitantes" value={procedureContext.summaryData.sendersAmount}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total de protocolos" value={procedureContext.summaryData.proceduresAmount}>
          <RoundIcon
            icon={BalanceIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Atendimentos resolvidos" value={procedureContext.summaryData.solvedProcedures}>
          <RoundIcon
            icon={CheckIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Atendimentos pendentes" value={procedureContext.summaryData.pendingProcedures}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Solicitante</TableCell>
              <TableCell>Protocolo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data de envio</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ver mais</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {procedureContext.procedures.map((procedure) => <ProcedureRow key={procedure.id} procedure={procedure}/>)}
          </TableBody>
        </Table>
      </TableContainer>

      <PageTitle>Gráficos</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Tipos de protocolos">
          <Doughnut key={Math.random()}{...{
            data: {
              datasets: [
                {
                  data: safeChartData.doughnutOptions,
                  backgroundColor: ['#1c64f2', '#7e3af2', '#0694a2'],
                  label: 'Dataset 1',
                },
              ],
              labels: ['Denúncias', 'Sugestões', 'Solicitações' ],
            },
            options: {
              responsive: true,
              cutoutPercentage: 80,
            },
            legend: {
              display: false,
            }  
          }}/>
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Série temporal de protocolos">
          <Bar key={Math.random()}{...{
            data: {
              labels: Object.keys(safeChartData.barOptions ?? {}).filter((key) => key !== "types"),
              datasets: [ 
                {
                  label: 'Denúncias',
                  backgroundColor: '#1c64f2',
                  borderWidth: 1,
                  data: safeChartData?.barOptions?.types?.["Denúncia"] ?? [],
                },
                {
                  label: 'Solicitações',
                  backgroundColor: '#0694a2',
                  borderWidth: 1,
                  data: safeChartData?.barOptions?.types?.["Solicitação"],
                },
                {
                  label: 'Sugestões',
                  backgroundColor: '#7e3af2',
                  borderWidth: 1,
                  data: safeChartData?.barOptions?.types?.["Sugestão"],
                },
              ],
            },  
            options: {
              responsive: true,
            },
            legend: {
              display: false,
            },
          }} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
