//import dependencies of react
import { Route, Routes  } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import DBtable from "./DBtable";
import Graphics from "./Graphics";
import GraphicsZona from "./GrapicsZona";
import HeaderMain from "./HeaderMain";
import Login from "./Login";
import SideBar from "./SideBar";
import TableMain from "./TableMain";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  const handleLogin = () => {
    setIsAuthenticated(false);
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <div  style={{display:"flex", justifyContent:"center", alignContent:"center", width:"100%"}}>
          <Login  onLogin={handleLogin}/>
        </div>
      ) : (
        <>
          <SideBar />
          <div className="app__content">
            <HeaderMain />
            <Routes>
              <Route path="/" element={<TableMain />} />
              <Route path="/DBdataTable" element={<DBtable />} />
              <Route path="/Graphics" element={<Graphics />} />
              <Route path="/GraphicsZona" element={<GraphicsZona />}></Route>
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
