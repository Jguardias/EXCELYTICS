import { useState, useRef, useEffect } from "react";
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
//ENDPOINTS APIREST
import { getData } from "../api/api.js";
import { MdDeleteForever } from "react-icons/md";
import "../App.css";

function DBtable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
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
        accept();
      },
      reject,
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
          label="Delete table"
          severity="danger"
          onClick={() => {
            confirm2();
          }}
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div style={{ padding: "0px" }}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        value={data}
        filters={filters}
        globalFilterFields={["ID Cliente", "Zona", "Pais"]}
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
        <Column header="Opciones"
          body={(data) => (
            <button 
              className="btnDelete"
              onClick={() => {
                setData(data.id);
              }}
            >
              <MdDeleteForever />
            </button>
          )}
        >
          {" "}
        </Column>
      </DataTable>
    </div>
  );
}

export default DBtable;
