const conteo = (texto) => {
  let objeto = {
    lA: 0,
    lE: 0,
    lI: 0,
    lO: 0,
    lU: 0,
  };
  texto = texto.toLowerCase();
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] == "a") {
      objeto.lA = objeto.lA + 1;
    };
    if (texto[i] == "e") {
      objeto.lE = objeto.lE + 1;
    };
    if (texto[i] == "i") {
      objeto.lI = objeto.lI + 1;
    };
    if (texto[i] == "o") {
      objeto.lO = objeto.lO + 1;
    };
    if (texto[i] == "u") {
      objeto.lU = objeto.lU + 1;
    };
  };
  return objeto;
};

//let objeto = miFuncion("euforia");
console.log(conteo("euforiaAA"));
