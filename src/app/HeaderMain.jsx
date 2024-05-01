import { Avatar } from "primereact/avatar";
import { HiMiniBellAlert } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";
import "../App.css";
function HeaderMain() {
  return (
    <header className="headerMain">
      <h2>Dashboard</h2>
      <footer className="headerMain__footer">
        <IoSettings
          style={{ height: "1.5em", width: "1.5em", color: "#c5c6cc" }}
        />
        <HiMiniBellAlert
          style={{ height: "1.5em", width: "1.5em", color: "#c5c6cc" }}
        />
        <hr className="headerMain__footer__line"></hr>
        <h5>Mercedes Maria López</h5>
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          size="large"
          className="mr-2"
          shape="circle"
        />
      </footer>
    </header>
  );
}

export default HeaderMain;
