let palindromo = (cadena) => {
    aux = "";
    aux2 = cadena.length -1;
    for (let i = 0; i < cadena.length; i++) {
        aux = aux + cadena[aux2];
        aux2 -= 1;
    };
    if (aux === cadena){
        return true;
    }else{
        return false;
    };

};

console.log(palindromo("oruro"));
console.log(palindromo("hola"));

