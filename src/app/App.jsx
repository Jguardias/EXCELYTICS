//import dependencies of react
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderMain from "./HeaderMain";
import TableMain from "./TableMain";
import Graphics from "./Graphics";
import "../App.css";



function App() {
  const e = true;
  return (
    <div className="app">
      <SideBar />
      <div className="app__content">
       {e ? <HeaderMain /> : <p>a</p>}
        <Routes>
          <Route path="/" element={ <TableMain />} />
          <Route path="/Graphics" element={<Graphics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
