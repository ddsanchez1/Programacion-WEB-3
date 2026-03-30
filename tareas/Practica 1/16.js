function paso1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Paso 1"), 1000);
  });
}

function paso2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Paso 2"), 1000);
  });
}

function paso3() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Paso 3"), 1000);
  });
}

async function ejecutar() {
  try {
    console.log(await paso1());
    console.log(await paso2());
    console.log(await paso3());
  } catch (error) {
    console.log(error);
  }
}

ejecutar();
