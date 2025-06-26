import React, { useState, useEffect } from 'react';  
import {View,Text,TextInput,StyleSheet,Switch,Alert,ImageBackground,Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setSplashVisible(false), 2000);
  }, []);

  const handleRegistro = () => {
    if (nombre.trim() === '' || correo.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (!aceptaTerminos) {
      Alert.alert('Términos no aceptados', 'Debes aceptar los términos y condiciones.');
      return;
    }
    Alert.alert('Registro exitoso', `Nombre: ${nombre}\nEmail: ${correo}`);
  };

  if (splashVisible) {
    return (
      <ImageBackground
        source={require('./assets/3.png')}
        style={styles.splash}
        resizeMode="cover"
      >
        <View style={styles.splashOverlay}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.splashText}>Cargando...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/3.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.contenedor}>
        <Image source={require('./assets/5.png')} style={styles.logo} />
        <Text style={styles.titulo}>Registro de Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#bbb"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#bbb"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
        />

        <View style={styles.switchCont}>
          <Text style={styles.textoSwitch}>Aceptar términos y condiciones</Text>
          <Switch
            value={aceptaTerminos}
            onValueChange={setAceptaTerminos}
            trackColor={{ false: '#ccc', true: '#6fcf97' }}
            thumbColor={aceptaTerminos ? '#27ae60' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity onPress={handleRegistro} style={styles.boton}>
          <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    alignItems: 'center',
  },
  splashText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFD700',
  },
  fondo: {
    flex: 1,
    justifyContent: 'center',
  },
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  switchCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  textoSwitch: {
    color: '#eee',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
  },
  textoBoton: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
  },
});
