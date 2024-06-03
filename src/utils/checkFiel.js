export function checkFile(obj) {
  const reference = [
    "IDcliente",
    "Zona",
    "Pais",
    "TipoDeProducto",
    "CanalDeVenta",
    "Prioridad",
    "FechaPedido",
    "IDpedido",
    "FechaEnvio",
    "Unidades",
    "PrecioUnitario",
    "CosteUnitario",
    "ImporteVentaTotal",
    "ImporteCosteTotal"
  ].join();

  if(obj.length === 0 )  return [false, "ERROR: Empty file"];

  for (const item of obj) {
    const arrayKeys = Object.keys(item).join();
    if (!(arrayKeys === reference)) {
      return [false, "ERROR: There are missing fields or extra fields"];
    }
  }
 
  return [true, "Successful file upload"]
}
