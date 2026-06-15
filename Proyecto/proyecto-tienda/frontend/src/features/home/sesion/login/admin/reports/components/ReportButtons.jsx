import { generateInventoryPdf }
from "../utils/inventoryPdf";

export default function ReportButtons({
  products,
}) {
  return (
    <button
      className="button"
      onClick={() =>
        generateInventoryPdf(
          products,
        )
      }
    >
      Descargar Inventario PDF
    </button>
  );
}