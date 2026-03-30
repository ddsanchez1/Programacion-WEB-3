let inversion = (cadena) =>{
    let objeto = {
        inverso: "",
    };
    let largo = cadena.length - 1;
    for (let i = 0; i < cadena.length;i++){
        objeto.inverso = objeto.inverso + cadena[largo];
        largo -=1; 
    };
    return objeto;
};

console.log(inversion("abcd"));