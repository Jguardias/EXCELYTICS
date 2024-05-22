import { Card } from "primereact/card";
import GraphicsBasic from "./Graphics/GraphicsBasic";
import GraphicsPie from "./Graphics/GraphicsPie";
import { LuPackageCheck } from "react-icons/lu";
import { TbReportMoney } from "react-icons/tb";
import { LiaCoinsSolid } from "react-icons/lia";



function Graphics() {
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
          title="Products"
          style={{
            width: "360px",
            height: "200px",
            fontSize: "75px",
            background: "#fc8f27",
            color: "white",
          }}
        >
          <h3
            style={{ fontSize: "45px", display: "flex", alignItems: "center" }}
          >
            13 <LuPackageCheck />
          </h3>
          
        </Card>

        <Card
          title="Sales"
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
            50 <TbReportMoney />
          </h3>
        </Card>
        {/* #2abbce */}
        <Card
          title="Income"
          style={{
            width: "360px",
            height: "200px",
            fontSize: "75px",
            background: "#66b661",
            color: "white",
          }}
        >
          <h3
            style={{ fontSize: "45px", display: "flex", alignItems: "center" }}
          >
            $1.544.547 <LiaCoinsSolid />
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
        <Card title="Bar graphics">
          <GraphicsBasic />
        </Card>
        <Card title="Circle graphics" style={{ display: "flex" }}>
          <GraphicsPie />
        </Card>
      </div>
    </div>
  );
}

export default Graphics;
