import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { getData } from "../../api/api";
import { calculateIncome } from "../../utils/calculateIncome";
import { includeArray } from "../../utils/includeArray";
function GraphicsPie({data}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  // const [datas, setData] = useState([]);

  // useEffect(() => {
  //   getData().then((data) => {
  //     setData(data);
  //   });
  // }, []);

  useEffect(() => {
    if (data.length > 0) {
      const labels = includeArray(data, "TipoDeProducto");
      const unis = calculateIncome(data, labels,"TipoDeProducto","Unidades");

      const x = {
        labels: labels,
        datasets: [
          {
            data: unis,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(199, 199, 199, 0.7)",
              "rgba(83, 102, 255, 0.7)",
              "rgba(178, 235, 52, 0.2)",
              "rgba(255, 87, 34, 0.7)",
              "rgba(121, 85, 72, 0.7)",
              "rgba(96, 125, 139, 0.7)"
            ],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      };

      setChartData(x);
      setChartOptions(options);
    }
  }, [data]);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
        style={{ width: "350px" }}
      />
    </div>
  );
}

export default GraphicsPie;
