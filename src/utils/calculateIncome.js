export function   calculateIncome( data,arrayCon,string1, string2) {

    // Inicializa newValue con los continentes en arrayCon y valores iniciales en 0
    let newValue = {};
    for (let i = 0; i < arrayCon.length; i++) {
        newValue[arrayCon[i]] = 0;
    }

    // Recorre los datos y suma los valores de ImporteVentaTotal por continente
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < arrayCon.length; j++) {
            if (data[i][string1] === arrayCon[j]) {
                newValue[arrayCon[j]] += data[i][string2];
            }
        }
    }

    let valores = [];
    for (let i = 0; i < arrayCon.length; i++) {
        valores.push(newValue[arrayCon[i]]);
    }

    return valores;
    


}