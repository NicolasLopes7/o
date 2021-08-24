export const doughnutLegends = [
  { title: 'Denúncias', color: 'bg-blue-500' },
  { title: 'Sugestões', color: 'bg-purple-600' },
  { title: 'Solicitações', color: 'bg-teal-600' },
]

export const lineLegends = [
  { title: 'Denúncias', color: 'bg-blue-500' },
  { title: 'Solicitações', color: 'bg-teal-600' },
  { title: 'Sugestões', color: 'bg-purple-600' },
]

export const barLegends = [
  { title: 'Denúncias', color: 'bg-blue-500' },
  { title: 'Solicitações', color: 'bg-teal-600' },
  { title: 'Sugestões', color: 'bg-purple-600' },
]

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
        label: 'Dataset 1',
      },
    ],
    labels: ['Denúncias', 'Solicitações', 'Sugestões'],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },  
}

export const lineOptions = {
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
    datasets: [
      {
        label: 'Denúncias',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
      {
        label: 'Solicitações',
        fill: false,
        backgroundColor: '#1c64f2',
        borderColor: '#1c64f2',
        data: [14, 50, 95, 75, 50, 51, 65],
      },
      {
        label: 'Sugestões',
        fill: false,
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2', 
        data: [90, 30, 75, 35, 59, 90, 30],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    },
  },
  legend: {
    display: false,
  },
}

export const barOptions = {
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      {
        label: 'Denúncias',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [30, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'Solicitações',
        backgroundColor: '#1c64f2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
      {
        label: 'Sugestões',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [75, 23, 33, 22, 64, 72, 94],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
