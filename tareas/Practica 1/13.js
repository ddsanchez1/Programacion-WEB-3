let promesa1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Primer paso");
    }, 1000);
  });
};

let promesa2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Segundo paso");
    }, 1000);
  });
};

let promesa3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Ultimo paso");
    }, 1000);
  });
};

async function ejecutar() {
  try {
    console.log(await promesas());
    console.log(await promesa2());
    console.log(await promesa3());
    console.log("Fin");
  } catch (error) {
    console.log(error);
  }
}

ejecutar();