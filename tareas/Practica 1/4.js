let extremos = (miArreglo) => {
  objeto = {
    mayor: miArreglo[0],
    menor: miArreglo[0],
  };
  for (let i = 0; i < miArreglo.length; i++) {
    if (miArreglo[i] > objeto.mayor) {
      objeto.mayor = miArreglo[i];
    }; 
    if (miArreglo[i] < objeto.menor) {
      objeto.menor = miArreglo[i];
    };
  };
  return objeto;
};

let arreglo = [3,1,5,4,2];
console.log(extremos(arreglo));