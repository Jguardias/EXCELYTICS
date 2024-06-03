import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import { calculateIncome } from "../../utils/calculateIncome";
import { includeArray } from "../../utils/includeArray";
function GraphicsBasic({data,condicion}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});


  useEffect(() => {
    if (data.length > 0) {
      const labels = includeArray(data, condicion);
      const income = calculateIncome(data, labels,condicion,"ImporteVentaTotal");
      const income2 = calculateIncome(data, labels,condicion,"ImporteCosteTotal");
      const x = {
        labels: labels,
        datasets: [
          {
            label: "Importe de vental total",
            data: income,
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },{
            label: "Importe de costo total",
            data: income2,
            backgroundColor: [
              "rgba(255, 159, 64, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
              "rgb(255, 159, 64)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      setChartData(x);
      setChartOptions(options);
    }
  }, [data,condicion]);
  return (
    <>
      <Chart type="bar" data={chartData} options={chartOptions} style={{width:"800px"}}/>
    </>
  );
}

export default GraphicsBasic;
