import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, FlatList, StatusBar, TouchableOpacity } from 'react-native'; 

export default function App() {
  // Estado para controlar qué tipo de lista mostrar (SectionList o FlatList)
  const [showFlatList, setShowFlatList] = useState(false);

  // Datos para SectionList - organizados en secciones con títulos
  const [datosSeccionados, setDatosSeccionados] = useState([
    {
      title: 'Mensajes Destacados',
      data: [
        { id: '1', nombre: 'Ana', mensaje: '¡Hola!' },
        { id: '2', nombre: 'Juan', mensaje: 'Salinas mató a Colosio.' },
      ],
    },
    {
      title: 'Mis Recordatorios',
      data: [
        { id: '3', nombre: 'Yo', mensaje: 'Comprar comida para la semana.' },
        { id: '4', nombre: 'Yo', mensaje: 'Revisar el clima.' },
        { id: '5', nombre: 'Yo', mensaje: 'Preocuparme por las tareas pendientes.' },
      ],
    },
    {
      title: 'Ideas para Proyectos',
      data: [
        { id: '6', nombre: 'Recetas', mensaje: 'App de recetas personalizadas.' },
        { id: '7', nombre: 'Copia de notion', mensaje: 'Un rastreador de hábitos diario.' },
      ],
    },
  ]);

  // Datos para FlatList - lista simple sin secciones
  const [datosFlatList, setDatosFlatList] = useState([
    { id: '1', nombre: 'María', mensaje: 'Buenos días a todos' },
    { id: '2', nombre: 'Pedro', mensaje: 'Recordar la junta de mañana' },
    { id: '3', nombre: 'Luis', mensaje: 'Enviar el reporte semanal' },
    { id: '4', nombre: 'Carmen', mensaje: 'Revisar las tareas pendientes' },
    { id: '5', nombre: 'Roberto', mensaje: 'Actualizar la documentación' },
    { id: '6', nombre: 'Sofia', mensaje: 'Preparar presentación' },
  ]);

  // Función para renderizar cada item individual
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemNombre}>{item.nombre}</Text>
      <Text style={styles.itemMensaje}>{item.mensaje}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de estado del dispositivo */}
      <StatusBar barStyle="dark-content" /> 
      
      {/* Título dinámico que cambia según el tipo de lista */}
      <Text style={styles.titulo}>{showFlatList ? 'Flat List' : 'Section List'}</Text>
      
      {/* Botón para alternar entre SectionList y FlatList */}
      <TouchableOpacity 
        style={styles.switchButton} 
        onPress={() => setShowFlatList(!showFlatList)}
      >
        <Text style={styles.switchButtonText}>
          Cambiar a {showFlatList ? 'SectionList' : 'FlatList'}
        </Text>
      </TouchableOpacity>

      {/* Renderizado condicional: muestra FlatList o SectionList según el estado */}
      {showFlatList ? (
        <FlatList
          data={datosFlatList}                    // Datos a mostrar
          keyExtractor={(item) => item.id}        // keyExtractor: Función que extrae una key única de cada item para optimizar el renderizado. React Native usa estas keys para identificar qué elementos cambiaron, se agregaron o eliminaron
          renderItem={renderItem}                 // Función para renderizar cada item
          style={styles.list}                     // Estilos del contenedor
          contentContainerStyle={styles.listContent} // Estilos del contenido interno
        />
      ) : (
        // SectionList: lista organizada en secciones con headers
        <SectionList
          sections={datosSeccionados}             // Datos organizados por secciones
          keyExtractor={(item, index) => item.id + index} // Key única por item
          renderItem={renderItem}                 // Función para renderizar cada item
          renderSectionHeader={({ section: { title } }) => ( // Renderiza el header de cada sección
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          style={styles.list}                     // Estilos del contenedor
          contentContainerStyle={styles.listContent} // Estilos del contenido interno
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal de la aplicación
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, 
    alignItems: 'center', 
  },
  // Estilo del título principal
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  // Estilo del botón para cambiar entre listas
  switchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  // Texto del botón de cambio
  switchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo base para ambas listas
  list: {
    width: '100%', 
  },
  // Estilo del contenido interno de las listas
  listContent: {
    paddingBottom: 20, 
  },
  // Estilo de los headers de sección (SectionList)
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15, 
    color: '#222',
  },
  // Estilo de cada tarjeta
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  // Estilo del nombre en cada item
  itemNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  // Estilo del mensaje en cada item
  itemMensaje: {
    fontSize: 16,
    color: '#555',
  },
});