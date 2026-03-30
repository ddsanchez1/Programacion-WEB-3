let paridad = (miArreglo) => {
  let objeto = {
    pares: [] ,
    impares: [],
  };
  let aux1 = (aux2 = 0);
  for (let i = 0; i < miArreglo.length; i++) {
    if (miArreglo[i] % 2 === 0) {
      objeto.pares[aux1] = miArreglo[i];
      aux1 += 1;
    } else {
      objeto.impares[aux2] = miArreglo[i];
      aux2 += 1;
    }
  }
  return objeto;
};

let arreglo = [1, 2, 3, 4, 5];
console.log(paridad(arreglo));
