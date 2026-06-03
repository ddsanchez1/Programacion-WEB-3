function miFuncionCallback(callback) {
  setTimeout(() => {
    callback(null, "Funcion ejecutada");
  }, 1000);
}

function miFuncionPromesa() {
  return new Promise((resolve, reject) => {
    miFuncionCallback((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

miFuncionPromesa()
    .then(console.log);
