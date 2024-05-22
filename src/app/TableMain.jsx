//xlsx
import { read, utils } from "xlsx";
import { useState } from "react";
//prime react
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import dateConversion from "../utils/dateConversion.js";
import numberConversion from "../utils/numberConversion.js";
import { Button } from "primereact/button";
function TableMain() {
  const [data, setData] = useState([]);

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

        <input
          onChange={handleXlsxUpload}
          type="file"
          name="files"
          accept=".xlsx, .xls"
          id="files"
        />
        <label htmlFor="files">Import .xlsx .xls</label>
        <Button label="Delete data"  severity="danger" onClick={()=>{setData()}}/>
        <Button label="Save data"/>
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

      //new procces
      data.forEach((obj) => {
        if (obj && obj["Fecha pedido"] !== undefined) {
          obj["Fecha pedido"] = dateConversion(obj["Fecha pedido"]);
          obj["Fecha envío"] = dateConversion(obj["Fecha envío"]);
          obj["Importe Coste total"]= numberConversion(obj["Importe Coste total"]);
          obj["Importe venta total"]= numberConversion(obj["Importe venta total"])
        }
      });

      /* update state */
      setData(data);
    } else {
      console.error("No se seleccionaron archivos");
    }
  }

  

  return (
    <div style={{ padding: "0px" }}>
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
        <Column field="ID Cliente" header="ID Cliente"></Column>
        <Column field="Zona" header="Zona"></Column>
        <Column field="País" header="País"></Column>
        <Column field="Tipo de producto" header="Tipo de producto"></Column>
        <Column field="Canal de venta" header="Canal de venta"></Column>
        <Column field="Prioridad" header="Prioridad"></Column>
        <Column field="Fecha pedido" header="Fecha pedido"></Column>
        <Column field="ID Pedido" header="ID Pedido"></Column>
        <Column field="Fecha envío" header="Fecha envío"></Column>
        <Column field="Unidades" header="Unidades"></Column>
        <Column field="Precio Unitario" header="Precio Unitario"></Column>
        <Column field="Coste unitario" header="Coste unitario"></Column>
        <Column
          field="Importe venta total"
          header="Importe venta total"
        ></Column>
        <Column
          field="Importe Coste total"
          header="Importe Coste total"
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableMain;
