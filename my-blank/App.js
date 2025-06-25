// ImagenFondoPantalla.js

import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const FondoBienvenida = () => {
  return (
    <ImageBackground
      source={require('./assets/fondo.png')}
      style={styles.fondo}
    >
      <View style={styles.contenido}>
        <Text style={styles.titulo}>¡Pantalla de inicio!</Text>
      </View>
    </ImageBackground>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FondoBienvenida />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
