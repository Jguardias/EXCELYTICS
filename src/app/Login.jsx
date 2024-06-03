import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí deberías añadir la lógica de autenticación
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      alert("Credenciales incorrectas");
    }
  };
  return (
    <div
      style={{
        width: "25em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <img src="/Excelytics.png" alt="" width={"400px"} />
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="p-inputgroup flex-1" style={{ width: "25em" }}>
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <InputText
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br />
        <Button style={{ width: "25em" }} label="Login" />
      </form>
    </div>
  );
}

export default Login;
