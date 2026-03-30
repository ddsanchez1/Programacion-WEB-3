const paso1 = () =>
  new Promise((res) =>
    setTimeout(() => {
      console.log("Paso 1");
      res();
    }, 1000),
  );

const paso2 = () =>
  new Promise((res) =>
    setTimeout(() => {
      console.log("Paso 2");
      res();
    }, 2000),
  );

async function ejecutar() {
  await paso1();
  await paso2();
}
ejecutar();
