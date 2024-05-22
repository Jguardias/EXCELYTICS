// react router dom
import { Link } from "react-router-dom";
//components prime react
import { Avatar } from "primereact/avatar";
//icons form ReactIcons
import { GoGraph } from "react-icons/go";
import { RiMedalFill } from "react-icons/ri";
//styles for sliderBar
import "../App.css";

function SideBar() {
  return (
    <nav className="sideBar">
      <div className="sideBar__logo">
        <Avatar
          label="©"
          style={{ backgroundColor: "#45A940", color: "#ffffff" }}
          shape="circle"
        />
        <h3>EXCELYTICS</h3>
      </div>
      <Link className="sideBar__item" to="/">
        <RiMedalFill />
        <p>Overview</p>
      </Link>
      <Link className="sideBar__item" to="/Graphics">
        <GoGraph />
        <p>Graphics</p>
      </Link>
      {/* <div style={{ background: "white", width:"100%",padding:"5px",display:"flex", alignItems:"center", justifyContent:"center", borderRadius: "5px"}} >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/01/Logo_Oficial_Unicartagena.png"
          style={{ width: "70%" }}
        />
      </div> */}
    </nav>
  );
}

export default SideBar;
