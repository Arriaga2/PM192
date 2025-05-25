const personas = [ 
  { nombre: "Ana", edad: 22 }, 
  { nombre: "Luis", edad: 35 }, 
  { nombre: "Maria", edad: 28 } 
];

const personaLuis = personas.find(persona => persona.nombre === "Luis");
console.log(`Persona encontrada: ${personaLuis.nombre}.`);

personas.forEach(persona => {
  console.log(`${persona.nombre} tiene ${persona.edad} años.`);
});

const totalEdades = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);
console.log("Suma total de edades:", totalEdades);
