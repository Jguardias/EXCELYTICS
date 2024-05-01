// react router dom
import { BrowserRouter, Link } from "react-router-dom";
//components prime react
import { Avatar } from "primereact/avatar";
//icons form ReactIcons
import { GoGraph } from "react-icons/go";
import { RiMedalFill } from "react-icons/ri";
//styles for sliderBar
import "../App.css";

function SideBar() {
  return (
    <BrowserRouter>
      <nav className="sideBar">
        <div className="sideBar__logo">
          <Avatar label="©" style={{ backgroundColor: '#45A940', color: '#ffffff' }} shape="circle" />
          <h3>EXCELYTICS</h3>
        </div>
        <Link className="sideBar__item" to="#">
          <RiMedalFill />
          <p>Overview</p>
        </Link>
        <Link className="sideBar__item" to="#">
          <GoGraph />
          <p>Graphics</p>
        </Link>
      </nav>
    </BrowserRouter>
  );
}

export default SideBar;
