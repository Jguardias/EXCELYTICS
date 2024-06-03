//Component React
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
//React
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
//Icons
import { IoLocationOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
// ApiRest
import { getData } from "../api/api";
//Helpers
import { includeArray } from "../utils/includeArray";
//Componentes
import GraphicsBasic from "./Graphics/GraphicsBasic";
import GraphicsPie from "./Graphics/GraphicsPie";

function GraphicsZona() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [Countries, setCountries] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState();


  useEffect(() => {
    getData().then((data) => {
      const Zonas = includeArray(data, "Zona");
      const countrys = data.filter((item) => item["Zona"] === selectedCity);
      setData(countrys);
      setCities(Zonas)
      setProducts(includeArray(countrys, "TipoDeProducto"));
      setCountries(includeArray(countrys, "Pais"));
    });
  }, [selectedCity]);

  console.log(cities);
  console.log(selectedCity);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        gap: "30px",
        paddingTop: "30px",
        width: "100%",
      }}
    >
      <Dropdown
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        placeholder="Select a Zone"
        style={{width:"90%",}}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "200px",
        }}
      >
        <Card
          title="Orders"
          style={{
            width: "360px",
            height: "200px",
            fontSize: "75px",
            background: "#fc8f27",
            color: "white",
          }}
        >
          <h3
            style={{
              fontSize: "45px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {data.length} <FaRegUser style={{ width: "0.6em" }} />
          </h3>
        </Card>

        <Card
          title="Types of products"
          style={{
            width: "360px",
            height: "200px",
            fontSize: "75px",
            background: "#349aff",
            color: "white",
          }}
        >
          <h3
            style={{ fontSize: "45px", display: "flex", alignItems: "center" }}
          >
            {products.length} <TbReportMoney />
          </h3>
        </Card>
        {/* #2abbce */}
        <Card
          title="Customers"
          style={{
            width: "360px",
            height: "200px",
            fontSize: "75px",
            background: "#66b661",
            color: "white",
          }}
        >
          <h3
            style={{
              fontSize: "45px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {Countries.length} <IoLocationOutline />
          </h3>
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "250px",
        }}
      >
        <Card title="IVT vs ICT">
          <GraphicsBasic data={data} condicion={"Pais"} />
        </Card>
        <Card title="Amount of products" style={{ display: "flex" }}>
          <GraphicsPie  data={data}/>
        </Card>
      </div>
    </div>
  );
}

export default GraphicsZona;
