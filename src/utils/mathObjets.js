
export function mathObjest(data, prop) {
   const storage = {};
   

   data.forEach(item => {
    const zona = item[prop];

    if (!storage[zona]) {
      storage[zona] = {
        zona: zona,
        totalPedidos: 0,
        unidadesVendidas: 0,
        importeVentas: 0,
        importeCostes: 0,
        beneficio: 0
      };
    }

   
    storage[zona].totalPedidos += item.Zone? 0 : 1;
    storage[zona].unidadesVendidas += item.Unidades;
    storage[zona].importeVentas += item.ImporteVentaTotal;
    storage[zona].importeCostes += item.ImporteCosteTotal;
    storage[zona].beneficio =  storage[zona].importeVentas - storage[zona].importeCostes;
  });
   
  return Object.values(storage);

  }
  

  