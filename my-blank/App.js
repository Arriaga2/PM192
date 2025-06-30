// Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

// Zona de componentes hijo con props
const IndicadorCarga = ({ color, size }) => {
  return <ActivityIndicator style={styles.indicador} color={color} size={size} />;
};

// Zona de componente principal
export default function App() {
  const [cargando, setCargando] = useState(false);

  // Función de carga
  const iniciarCarga = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 3000); // simulación de carga
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Uso de ActivityIndicator</Text>

      {cargando ? (
        <IndicadorCarga color="deepskyblue" size="large" />
      ) : (
        <Text style={styles.textoSecundario}>Presiona el botón para comenzar</Text>
      )}

      <Button title="Iniciar Carga" onPress={iniciarCarga} color="#ff6f61" />
      <StatusBar style="auto" />
    </View>
  );
}

// Zona de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccff90',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textoPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textoSecundario: {
    fontSize: 16,
    marginBottom: 20,
  },
  indicador: {
    marginBottom: 20,
  },
});
