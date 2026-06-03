const express = require("express");
const connection = require("./database/connection");

const app = express();

const PORT = 3000;

app.use(express.json());
//Ej 1
app.post("/categorias", (req,res)=>{
    const {nombre, descripcion} = req.body;
    const sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?,?)"
    connection.query(
        sql,
        [nombre, descripcion],
        (error, result) =>{
            if(error) {
                return res.status(500).json({
                    mensaje: "Error al registrar",
                    error
                });
            }
            res.status(201).json({
                mensaje:"Categoria creada",
                id: result.insertId
            });
        }
    )
});

//Ej 2

app.get("/categorias",(req,res) =>{
    const sql = "SELECT * FROM categorias";
    connection.query(
        sql,
        (error,results) =>{
            if(error) {
                return res.status(500).json({
                    mensaje: "Error al obtener las categorias",
                    error
                });
            }
            res.status(200).json(results);
        }
    )
});

//Ej 3

app.get("/categorias/:id",(req,res)=>{
    const id = req.params.id;
    const sqlCategoria = "SELECT * FROM categorias WHERE id = ?";
    connection.query(
        sqlCategoria,
        [id],
        (error,categoriaResult)=>{
            if(error){
                return res.status(500).json({
                    mensaje: "Error al obtener categoria",
                    error
                });
            }
            if(categoriaResult.length === 0){
                return res.status(404).json({
                    mensaje: "Categoria no encontrada"
                });
            }

            const categoria = categoriaResult[0];
            const  sqlProductos = "SELECT * FROM productos WHERE categoriaId = ?"
            connection.query(
                sqlProductos,
                [id],
                (error, productosResult) => {
                    if (error){
                        return res.status(500).json({
                            mensaje:"Error al obtener productos",
                            error
                        });
                    }
                    res.status(200).json({
                        ...categoria,
                        productos: productosResult
                    });
                }
            )
        }
    )
});

//Ej 4

app.patch("/categorias/:id", (req,res)=>{
    const {nombre, descripcion} = req.body;
    const id = req.params.id;
    const sql = 
    "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?";
    connection.query(
        sql,
        [nombre, descripcion, id],
        (error,results)=>{
            if (error){
                return res.status(500).json({
                    Mensaje:"Error al actualizar",
                    error
                });
            }
            if (results.affectedRows === 0){
                return res.status(404).json({
                    mensaje: "Categoria no encontrada"
                });
            }

            res.status(200).json({
                mensaje: "Categoria actualizada"
            });
        }
    )
});

//Ej 5
// Crea un endpoint DELETE /categorias/:id que elimine la categoría indicada
// y, al mismo tiempo, elimine automáticamente todos los productos que
// pertenecen a esa categoría.

app.delete("/categorias/:id",(req,res) =>{

    const id = req.params.id;

    const sqlProductos = "DELETE FROM productos WHERE categoriaId = ?";

    connection.query(
        sqlProductos,
        [id],
        (error)=>{
            if(error){
                return res.status(500).json({
                    mensaje: "Error al eliminar",
                    error,
                });
            }
           const sqlCategoria = "DELETE FROM categorias WHERE id = ?";

           connection.query(
            sqlCategoria,
            [id],
            (error,results)=>{
                 if (error) {
                        return res.status(500).json({
                            mensaje: "Error al eliminar",
                            error
                        });
                    }

                    if (results.affectedRows === 0) {
                        return res.status(404).json({
                            mensaje: "Categoria no encontrada"
                        });
                    }

                    res.status(200).json({
                        mensaje: "Categoria eliminada"
                    });
            }
           )

            

        }
    )
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
