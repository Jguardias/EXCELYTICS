//xlsx
import { read, utils } from "xlsx";
import { useState, useRef } from "react";
//prime react
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
//helpers
import dateConversion from "../utils/dateConversion.js";
import numberConversion from "../utils/numberConversion.js";
//ENDPOINTS APIREST

import { createData } from "../api/api.js";
import { checkFile } from "../utils/checkFiel.js";

function TableMain() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const accept = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: message,
      life: 3000,
    });
  };

  const reject = (message) => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: message,
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => {
        createData(data).then(() => {
          accept("successful action");
        });
      },
      reject: ()=>{
        reject("  Action denied")
      },
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => {
        setData([]);
        accept("file deleted from cache");
      },
            reject: ()=>{
        reject("  Action denied")
      },
    });
  };
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-end"
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <IconField unstyled={false} iconPosition="left">
          <InputIcon
            className="pi pi-search"
            style={{ position: "absolute", top: "15px" }}
          />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>

        <Button
          label="Import .xlsx .xls"
          style={{backgroundColor:"#07b7d4" , borderColor:"#07b7d4"}}
          onClick={() => {
            setVisible((state) => !state);
          }}
        />

        <Button
          label="Delete data"
          severity="danger"
          onClick={() => {
            confirm2();
          }}
        />

        <Button
          label="Save data"
          onClick={() => {
            confirm1();
          }}
        />
      </div>
    );
  };

  const header = renderHeader();

  async function handleXlsxUpload(e) {
    const input = e.target;
    const files = input.files;
    const firstFile = files[0];

    if (e.target.files) {
      /* Download from https://docs.sheetjs.com/pres.numbers */
      const f = firstFile;
      const ab = await f.arrayBuffer();
      /* parse */
      const wb = read(ab);
      /* generate array of objects from first worksheet */
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet

      const data = utils.sheet_to_json(ws); // generate objects
     
      // if(data.length > 0) {
      //   console.log("empty")
      //   return;
      // } 
      const [check,message] = checkFile(data);
      
      if(!check) {
        reject(message);
        return;
      }
      //new procces
      data.forEach((obj) => {
        if (obj && obj["FechaPedido"] !== undefined) {
          obj["FechaPedido"] = dateConversion(obj["FechaPedido"]);
          obj["FechaEnvio"] = dateConversion(obj["FechaEnvio"]);
          obj["ImporteCosteTotal"] = numberConversion(obj["ImporteCosteTotal"]);
          obj["ImporteVentaTotal"] = numberConversion(obj["ImporteVentaTotal"]);
        }
      });

      /* update state */
      setData(data);
      setVisible(false);
      accept(message);
      input.value = "";
    } else {
      console.error("No se seleccionaron archivos");
    }
  }

  return (
    <div style={{ padding: "0px" }}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog
        header="Select document (.xlsx .xls)"
        visible={visible}
        style={{ width: "20vw"}}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        
          <div className="bodymodal" >
          <button className="modalDownloadFile">
            <a href="/Referencefile.xls">
            <img src="/excel.svg" alt="" />
            Download reference file
            </a>
          </button>
          <input  className="modalInput"
            onChange={handleXlsxUpload}
            type="file"
            name="files"
            accept=".xlsx, .xls"
            id="files"
          />
          <label className="modalInput__label"htmlFor="files">Import .xlsx .xls</label>

          </div>

       
      </Dialog>
      <DataTable
        value={data}
        filters={filters}
        globalFilterFields={["ID Cliente", "Zona"]}
        header={header}
        scrollable
        style={{ minWidth: "50rem" }}
        scrollHeight="700px"
        paginator
        rows={15}
        columnResizeMode="expand"
      >
        <Column field="IDcliente" header="ID Cliente"></Column>
        <Column field="Zona" header="Zona"></Column>
        <Column field="Pais" header="País"></Column>
        <Column field="TipoDeProducto" header="Tipo de producto"></Column>
        <Column field="CanalDeVenta" header="Canal de venta"></Column>
        <Column field="Prioridad" header="Prioridad"></Column>
        <Column field="FechaPedido" header="Fecha pedido"></Column>
        <Column field="IDpedido" header="ID Pedido"></Column>
        <Column field="FechaEnvio" header="Fecha envío"></Column>
        <Column field="Unidades" header="Unidades"></Column>
        <Column field="PrecioUnitario" header="Precio unitario"></Column>
        <Column field="CosteUnitario" header="Coste unitario"></Column>
        <Column field="ImporteVentaTotal" header="Importe venta total"></Column>
        <Column field="ImporteCosteTotal" header="Importe coste total"></Column>
      </DataTable>
    </div>
  );
}

export default TableMain;
