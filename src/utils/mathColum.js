export function mathColum(data, prop) {
   
    let suma = 0;
    data.forEach(obj => {
      if (obj.hasOwnProperty(prop)) {
        suma += obj[prop];
      }
    });
  
    return suma;
  }