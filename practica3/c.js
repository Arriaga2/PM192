function simularPeticionAPI() {
  return new Promise(resolve => {
    console.log("Simulando llamada a la API");
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 5000);
  });
}

async function obtenerDatos() {
  console.log("Obteniendo datos");
  const resultado = await simularPeticionAPI();
  console.log("Resultado:", resultado);
}

//funcion async
obtenerDatos();
