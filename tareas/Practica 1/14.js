let promesas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa transformada");
    }, 1000);
  });
};

function promesaAcallback(callback) {
  promesas()
    .then((resultado) => callback(null, resultado))
    .catch((error) => callback(error, null));
}

promesaAcallback((err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
