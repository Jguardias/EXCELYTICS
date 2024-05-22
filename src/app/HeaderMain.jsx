import { Avatar } from "primereact/avatar";

import { IoSettings,IoNotifications } from "react-icons/io5";
import "../App.css";
function HeaderMain() {
  return (
    <div className="headerMain">
      <h2>Dashboard</h2>
      <footer className="headerMain__footer">
        <IoSettings className="headerMain__footer__icons" />
        <IoNotifications className="headerMain__footer__icons" />
        <hr className="headerMain__footer__line"></hr>
        <h5>Mercedes Maria López</h5>
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          size="large"
          className="mr-2"
          shape="circle"
        />
      </footer>
    </div>
  );
}

export default HeaderMain;
