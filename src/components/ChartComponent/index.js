import { useEffect, useState } from "react";
import 'chart.js/auto';
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Pie, Bar, PolarArea, Radar, Bubble } from 'react-chartjs-2';


const ChartComponent = ({chartData, type}) => {
  const optionsHorizontal = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };
  const [data,setData] = useState({
   labels: [],
   datasets: [
     {
       data: [],
       backgroundColor: [
       ],
     },
   ],
 })
 const [options, setOptions] = useState(
   {
     plugins: {
        legend: {
          display: false
        }
      }

   }
 )

  useEffect(()=>{
    let newLabels = [];
    let newColors = [];
    let newData = [];
    for (var i = 0; i < chartData.length; i++) {
        newLabels.push(chartData[i].label)
      newColors.push(chartData[i].color)
      newData.push(chartData[i].amount)
    }
    setData({...data, labels:newLabels, datasets:[{
      label:"Amount of clicks per color",
      data: newData,
      backgroundColor: newColors,
    }]})

  },[chartData])

  function renderChart(){

    switch (type) {
      case "pie":
        return <Pie data={data} />
        break;
      case "bar":
        return <div style={{marginTop:"25%"}}><Bar optiones={options} data={data} /></div>
        break;
      case "polar":
        return <PolarArea data={data} />
        break;
      case "radar":
        return <Radar data={data} />
        break;

    }
  }

  return(
    <div className="chart-container">
      {renderChart()}
    </div>
  )
}

export default ChartComponent;
