let promesas = () => {
  return new Promise((resolve, reject) => {
    const condicion = true;
    setTimeout(() => {
      if (condicion) {
        resolve(" Wx`Primer paso");
      } else {
        reject("error");
      }
    }, 2000);
  });
};

let promesa2 = (variable) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(variable + " Segundo paso");
    }, 2000);
  });
};

let promesa3 = (variableC) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(variableC + " Ultimo paso");
    }, 1000);
  });
};

promesas()
  .then(resultado => promesa2(resultado))
  .then(resultado => promesa3(resultado))
  .then(resultadoF => console.log(resultadoF))
  .catch((error) => console.log(error));

