import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../../../../../services/productService";

export function useProductForm(id, navigate) {
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: 1,
    imagen: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    async function loadProduct() {
      try {
        const data = await getProductById(id);

        setForm({
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          precio: data.precio || "",
          stock: data.stock || "",
          categoria_id: data.categoria_id || 1,
          imagen: data.imagen || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id, isEdit]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre.trim()) {
      return alert("El nombre es obligatorio");
    }

    if (Number(form.precio) <= 0) {
      return alert("Precio inválido");
    }

    if (Number(form.stock) < 0) {
      return alert("Stock inválido");
    }

    try {
      if (isEdit) {
        await updateProduct(id, form);
      } else {
        await createProduct(form);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  }

  return {
    form,
    loading,
    isEdit,
    handleChange,
    handleSubmit,
  };
}
