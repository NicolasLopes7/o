import React, { useContext, useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Bar } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CheckIcon, PeopleIcon, BalanceIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import ProcedureRow from "../components/Procedure";
import EmptyRow from "../components/EmptyRow";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  Dropdown,
  DropdownItem,
  Button,
  Badge,
} from "@windmill/react-ui";

import { doughnutLegends, barLegends } from "../utils/demo/chartsData";

import PublicAgency from "../context/PublicAgenciesContext";
import Procedure from "../context/ProceduresContext";
import api from "../services/api";
import {
  getProceduresByMonthAndType,
  getProceduresByType,
} from "../utils/chartGenerationUtil";

function Dashboard(props) {
  const procedureContext = useContext(Procedure);
  const publicAgenciesContext = useContext(PublicAgency);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [procedures, setProcedures] = useState(procedureContext.procedures);
  const [summaryData, setSummaryData] = useState(procedureContext.summaryData);
  const [chartsData, setChartsData] = useState(procedureContext.chartsData);

  const [items, setItems] = useState([]);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSelectValue(value) {
    setSelectedValue(value);
    setIsOpen(false);
  }

  function getProcedures() {
    if (!selectedValue)
      return procedures.map((procedure) => (
        <ProcedureRow key={procedure.id} procedure={procedure} />
      ));
    else if (
      publicAgenciesContext.publicAgencies.find(
        (publicAgency) => publicAgency.name === selectedValue
      ).dangerous === true
    ) {
      return <EmptyRow />;
    } else {
      return procedures
        .filter((procedure) => procedure?.publicAgency?.name === selectedValue)
        .map((procedure) => (
          <ProcedureRow key={procedure.id} procedure={procedure} />
        ));
    }
  }

  useEffect(() => {
    (async () => {
      if (selectedValue) {
        const response = await api.get(
          `procedures?publicAgencyName=${selectedValue}`
        );
        setSummaryData(response.data.summaryData);
        setProcedures(response.data.procedures);

        const proceduresType = getProceduresByType(response.data.procedures);
        const proceduresTime = getProceduresByMonthAndType(
          response.data.procedures
        );
        setChartsData({
          doughnutOptions: proceduresType,
          barOptions: proceduresTime,
        });
      }
    })();
  }, [selectedValue]);

  // useEffect(() => {

  //   setItems(publicAgenciesContext.publicAgencies.map((publicAgency) => (
  //     <DropdownItem key={publicAgency.position} onClick={() => handleSelectValue(publicAgency.name)}>
  //       <span>{publicAgency.name}</span>
  //       {publicAgency.dangerous && (<Badge type="danger">Dados Sensíveis</Badge>)}
  //     </DropdownItem>
  //   )))

  // }, [publicAgenciesContext.publicAgencies]);

  return (
    <>
      <PageTitle>Atendimentos por orgão</PageTitle>
      <div className="flex flex-row">
        <div className="flex mb-8 mr-8">
          <select className="">
            <option>adasdas</option>
          </select>
        </div>
        <div className="flex mb-8">
          <Button
            onClick={toggleDropdown}
            aria-label="publicAgencyFilter"
            aria-haspopup="true"
          >
            {selectedValue ?? "Escolher o orgão para filtrar"}
          </Button>
          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="z-50"
          >
            {items}
          </Dropdown>
        </div>
      </div>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total de solicitantes"
          value={summaryData.sendersAmount}
        >
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Total de protocolos"
          value={summaryData.proceduresAmount}
        >
          <RoundIcon
            icon={BalanceIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Atendimentos resolvidos"
          value={summaryData.solvedProcedures}
        >
          <RoundIcon
            icon={CheckIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Atendimentos pendentes"
          value={summaryData.pendingProcedures}
        >
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
          <TableBody>{getProcedures()}</TableBody>
        </Table>
      </TableContainer>

      <PageTitle>Gráficos</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Tipos de protocolos">
          <Doughnut
            key={Math.random()}
            {...{
              data: {
                datasets: [
                  {
                    data: chartsData.doughnutOptions,
                    backgroundColor: ["#1c64f2", "#7e3af2", "#0694a2"],
                    label: "Dataset 1",
                  },
                ],
                labels: ["Denúncias", "Sugestões", "Solicitações"],
              },
              options: {
                responsive: true,
                cutoutPercentage: 80,
              },
              legend: {
                display: false,
              },
            }}
          />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Série temporal de protocolos">
          <Bar
            key={Math.random()}
            {...{
              data: {
                labels: Object.keys(chartsData.barOptions ?? {}).filter(
                  (key) => key !== "types"
                ),
                datasets: [
                  {
                    label: "Denúncias",
                    borderWidth: 1,
                    backgroundColor: "#1c64f2",
                    data: chartsData?.barOptions?.types?.["Denúncia"],
                  },
                  {
                    label: "Solicitações",
                    backgroundColor: "#0694a2",
                    borderWidth: 1,
                    data: chartsData?.barOptions?.types?.["Solicitação"],
                  },
                  {
                    label: "Sugestões",
                    backgroundColor: "#7e3af2",
                    borderWidth: 1,
                    data: chartsData?.barOptions?.types?.["Sugestão"],
                  },
                ],
              },
              options: {
                responsive: true,
              },
              legend: {
                display: false,
              },
            }}
          />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
