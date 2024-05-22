function dateConversion(number) {
    let dateBase = new Date(1900, 0, 0); // Fecha base en Excel
    let days = number - 1; // Restamos 1 porque en Excel el día 1 es 1/1/1900
    let date = new Date(dateBase);
    date.setDate(date.getDate() + days);
    let day = ("0" + date.getDate()).slice(-2); // Añadir ceros a la izquierda si es necesario
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Añadir ceros a la izquierda si es necesario
    let year = date.getFullYear().toString().slice(-2); // Tomar los últimos dos dígitos del año
    return day + "/" + month + "/" + year;
}

export default dateConversion;