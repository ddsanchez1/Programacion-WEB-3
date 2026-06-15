import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateInventoryPdf(products) {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("VIDA NOVA", 14, 20);

  doc.setFontSize(16);

  doc.text("Reporte de Inventario", 14, 30);

  doc.setFontSize(11);

  const reportDate = new Date().toLocaleString();

  doc.setFontSize(11);

  doc.text(`Generado: ${reportDate}`, 14, 40);

  const rows = products.map((product) => [
    product.nombre,
    product.categoria,
    `Bs. ${product.precio}`,
    product.stock,
  ]);
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

  doc.setFontSize(12);

  doc.text(`Productos registrados: ${products.length}`, 14, 55);

  doc.text(`Stock total: ${totalStock}`, 14, 63);

  const productsWithoutStock = products.filter(
    (product) => product.stock === 0,
  ).length;
  doc.text(`Productos agotados: ${productsWithoutStock}`, 14, 71);

  autoTable(doc, {
    startY: 80,

    head: [["Producto", "Categoría", "Precio", "Stock"]],

    body: rows,

    headStyles: {
      fillColor: [41, 128, 185],
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    didParseCell: function (data) {
      if (data.section === "body" && data.column.index === 3) {
        const stock = Number(data.cell.raw);

        if (stock === 0) {
          data.cell.styles.fillColor = [255, 220, 220];
        }
      }
    },
  });

  const finalY = (doc.lastAutoTable?.finalY || 80) + 15;
  const pageHeight = doc.internal.pageSize.height;

  doc.text(`Total productos: ${products.length}`, 14, finalY);

  doc.text(`Stock total: ${totalStock}`, 14, finalY + 10);
  doc.setFontSize(9);

  doc.text(
    "Documento generado automáticamente por Vida Nova",
    14,
    pageHeight - 10,
  );
  doc.save("reporte_inventario.pdf");
}
