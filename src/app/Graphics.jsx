import { Card } from "primereact/card";
import GraphicsBasic from "./Graphics/GraphicsBasic";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { getData } from "../api/api";
import { includeArray } from "../utils/includeArray";
import GraphicsPie from "./Graphics/GraphicsPie";


function Graphics() {

  const [data,setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [Countries, setCountries] = useState([]);



  useEffect(()=>{
    getData().then((data)=> {
      setData(data)
      setProducts(includeArray(data,"TipoDeProducto"));
      setCountries(includeArray(data, "Pais"));
    });
    
  },[])


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        paddingTop: "30px",
        width: "100%",
      }}
    >
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
            style={{ fontSize: "45px", display: "flex", alignItems: "center" , gap:"5px"}}
          >
            {data.length}  <FaRegUser  style={{width:"0.6em"}}/>
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
            style={{ fontSize: "45px", display: "flex", alignItems: "center", gap:"5px" }}
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
          <GraphicsBasic data={data} condicion="Zona"/>
        </Card>
        <Card title="Amount of products" style={{ display: "flex" }}>
          <GraphicsPie data={data}/>
        </Card>
      </div>
    </div>
  );
}

export default Graphics;
