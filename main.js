var objIngreso = document.getElementById("entrada");
var objResultado = document.getElementById("salida");


// Obtiene un objeto analiza si el valor de este esta vacio
function estaVacio(objeto) {

    if (objeto.value === "" || objeto.value === "-") return true;

    for (let i = 0; i < objeto.value.length; i++) {
        if (objeto.value.charAt(i) !== " ") return false;
    }

    return true;
}

// Revisa caracter por caracter si es o no un numero o caracter valido
function soloNumeros(objeto) {
    var flag = true;
    for (let x = 0; x < objeto.value.length; x++) {
        var c = objeto.value.charAt(x);
        if (c != '0' && c != '1' && c != '2' && c != '3' && c != '4' && c != '5' && c != '6' && c != '7' && c != '8' && c != '9' && c != '-' && c != ' ') {
            console.log(c);
            flag = false;
        }
    }

    return flag;
}

// Crea un array de los numeros que estan en el valor del objeto que se ingresa
function separarNumeros(objeto) {
    var numeros = [];
    var numeroString = "";
    var numeroint = 0;
    var cont = 0;

    // Se separan los caracteres numericos de los ' ' y las '-' y se van agregando a un arreglo los numeros ya transformados a Int
    for (let i = 0; i < objeto.value.length + 1; i++) {
        if (objeto.value.charAt(i) !== " " && objeto.value.charAt(i) !== "") {
            numeroString += (objeto.value).charAt(i);
        } else {
            numeroint = parseInt(numeroString);
            numeros[cont] = numeroint;
            numeroString = "";
            cont += 1;
        }
    }
    return numeros;

}

// Del arreglo que se ingresa de numeros y nans, quita los NaNs
function sacarNans(arreglo) {
    var arrNew = [];
    var cont = 0;
    for (let i = 0; i < arreglo.length; i++) {
        if (!Number.isNaN(arreglo[i])) {
            arrNew[cont] = arreglo[i];
            cont += 1;
        }
    }
    return arrNew;
}


function ordenar() {

    // Invoca a la funcion 'estaVacio' y si devuelve falso, por consola se muestra un "Esta Vacio"
    if (estaVacio(objIngreso)) {
        objResultado.innerHTML = "<br>"
        console.log("Esta vacio")
        return;
    }

    // Invoca a la funcion 'soloNumeros' y si devuelve falso, le da una advertencia al usuario para que ingrese solo numeros
    if (!soloNumeros(objIngreso)) {
        alert("Solo se pueden ingresar numeros");
        return;
    }

    // Deja solo los numeros (sin NaNs) en el arreglo 'numeros'
    var numeros = sacarNans(separarNumeros(objIngreso));
    console.log(numeros);
    var flag = false;

    // Recorre el indice 'i' comparandolo con los indices 'x'
    for (let i = 0; i < numeros.length; i++) {
            for (let x = i; x < numeros.length; x++) {
                
                // Si se cumple la condicion se cambian los indices dejando el numero del indice menor antes
                if (numeros[i] > numeros[x]) {
                    var num = numeros[x];
                    numeros.splice(x, 1, numeros[i]);
                    numeros.splice(i, 1, num);
                }
            }
    }

    var numerosDef = [];

    // Agrega los numeros del arreglo numeros al arreglo nuevo numerosDef agregandoles un " " (espacio) entre cada numeros para separarlos 
    for (let i = 0; i < numeros.length; i++) {
        numerosDef += numeros[i] + " ";
    }

    // Muestra el arreglo numerosDef por pantalla
    objResultado.innerHTML = numerosDef;
}



function ordenarJA() {

    //Obtiene texto ingresado por usuario, le agrega espacio al final para terminar siempre por un caracter separador
    var strNumeros = objIngreso.value + " ";

    //Variable para almacenar arreglo de numeros extraidos desde texto ingresado por usuario
    var arrNumeros = [];

    //Recorre texto revisando caracter por caracter para ir extrayendo los numeros
    var numero = "";
    for (var i = 0; i < strNumeros.length; i++) {

        //Obtiene siguiente caracter
        var c = strNumeros[i];

        //Si es un caracter separador (espacio), entonces...
        if (c == " ") {

            //...si ya tenemos un numero (como texto), lo convertimos y agregamos al arreglo
            if (numero != "") {

                //Se valida que la conversion a numero sea correcta, si no, termina
                if ((1 * numero).toString() != numero) {
                    alert("Tramposo!!!\n--------------\nEl texto '" + numero + "' NO es un numero realmente");
                    return;
                }
                //Se convierte y agrega a arreglo
                arrNumeros.push(1 * numero);
                numero = "";
            }
        }
        //Si no es un caracter valido, termina
        else if (c != '0' && c != '1' && c != '2' && c != '3' && c != '4' && c != '5' && c != '6' && c != '7' && c != '8' && c != '9' && c != '.' && c != '-') {
            alert("Tramposo!!!\n--------------\nEl caracter '" + c + "' NO esta permitido");
            return;
        }
        //Caso contrario, es decir, es un caracter valido que no es separador (espacio), lo concatena al numero actual
        else numero += c;
    }


    //Valida que arreglo de numeros tenga algo realmente
    if (arrNumeros.length == 0) {
        alert("Que quiere que ordene si no ingresa nada...?");
        return;
    }


    //Recorre arreglo de numeros para ordenarlos
    for (var i = 0; i < arrNumeros.length; i++) {

        //Busca siguiente elemento menor para dejarlo en la posicion i
        for (var j = i + 1; j < arrNumeros.length; j++) {

            //Si elemento j es menor que elemento i, los intercambia de posicion
            if (arrNumeros[j] < arrNumeros[i]) {
                var aux = arrNumeros[i];
                arrNumeros[i] = arrNumeros[j];
                arrNumeros[j] = aux;
            }
        }
    }


    //Muestra arreglo ordenado en salida
    var strNumerosOrdenados = "";
    for (var i = 0; i < arrNumeros.length; i++)  strNumerosOrdenados += arrNumeros[i] + " ";
    objResultado.innerHTML = strNumerosOrdenados;
}



function ordenar2JA() {

    
    //Muestra numeros ordenados, pero omitiendo elementos que no se pudieron convertir a numeros
    objResultado.innerHTML = objIngreso.value.split(" ").filter(e => e != '').map(e => 1 * e).filter(e => !isNaN(e)).sort((a, b) => a - b).join(" ");

    var expresion = /[0123456789 ]/;
    var arrCaracteresMalos = [];
    for (let i = 0; i < objIngreso.value.split(expresion).length; i++) {
        if(objIngreso.value.split(expresion)[i] != "")arrCaracteresMalos += objIngreso.value.split(expresion)[i] + " ";
    }
    console.log(arrCaracteresMalos);
    var arrEx = [];
    for (let i = 0; i < arrCaracteresMalos.length; i++) {
        if(arrCaracteresMalos[i] != "-" && arrCaracteresMalos[i] != " ") arrEx.push(arrCaracteresMalos[i] + " ");
    }
    alert(arrEx + " <= Estos caracteres deben ser eliminados para el correcto funcionamiento del programa");
}