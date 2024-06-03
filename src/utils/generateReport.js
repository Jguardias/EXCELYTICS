import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateReport(data) {
    const doc = new jsPDF();
    
    // Fecha de generación del documento
    const currentDate = new Date().toLocaleDateString();

    // Encabezado
    const companyName = "EXCELYTICS";
    const reportTitle = "REPORTE GENERAL DE PEDIDOS";
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(12);
    doc.text(companyName, 14, 20);
    doc.text(`Fecha: ${currentDate}`, pageWidth - 14 - doc.getTextWidth(`Fecha: ${currentDate}`), 20);

    const titleWidth = doc.getTextWidth(reportTitle);
    const xTitle = (pageWidth - titleWidth) / 2;
    doc.text(reportTitle, xTitle, 30);

    // Resumen General en una tabla
    const summary = data.summary;
    doc.text("Resumen general", 14, 40);
    autoTable(doc, {
        startY: 45,
        head: [['Descripción', 'Valor']],
        body: [
            ["Total de Pedidos", summary.totalPedidos],
            ["Total de Unidades Vendidas", summary.totalUnidades],
            ["Importe Total de Ventas", summary.importeVentas],
            ["Importe Total de Costes", summary.importeCostes],
            ["Beneficio Total", summary.beneficioTotal]
        ]
    });

    // Detalles por Zona
    const zoneDetails = data.zoneDetails;
    doc.text("Detalles por zonas", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [['Zona', 'Total Pedidos', 'Unidades Vendidas', 'Importe Ventas', 'Importe Costes', 'Beneficio']],
        body: zoneDetails.map(zone => [
            zone.zona, 
            zone.totalPedidos, 
            zone.unidadesVendidas, 
            zone.importeVentas, 
            zone.importeCostes, 
            zone.beneficio
        ])
    });

    // Detalles por Zona
    const contriesDetais = data.contriesDetais;
    doc.text("Detalles por clientes", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [['País', 'Total Pedidos', 'Unidades Vendidas', 'Importe Ventas', 'Importe Costes', 'Beneficio']],
        body: contriesDetais.map(zone => [
            zone.zona, 
            zone.totalPedidos, 
            zone.unidadesVendidas, 
            zone.importeVentas, 
            zone.importeCostes, 
            zone.beneficio
        ])
    });

    // Detalles por Tipo de Producto
    const productDetails = data.productDetails;
    doc.text("Detalles por tipo de producto", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [['Tipo de Producto', 'Total Pedidos', 'Unidades Vendidas', 'Importe Ventas', 'Importe Costes', 'Beneficio']],
        body: productDetails.map(product => [
            product.zona, 
            product.totalPedidos, 
            product.unidadesVendidas, 
            product.importeVentas, 
            product.importeCostes, 
            product.beneficio
        ])
    });

   
    doc.save("General report.pdf");
}
