const promesas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const condicional = true;
      if (condicional) {
        resolve("Exito! pasaron 3 segundos");
      } else {
        reject("Error en la promesa");
      }
    }, 3000);
  }); 
};

console.log("Comienza programa");
promesas()
  .then(resultado => console.log(resultado))
  .catch(error => console.log(error));
