
export function includeArray (array,value){

    const newArray = array
  .map(obj => obj[value])
  .filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);

    return newArray;
}