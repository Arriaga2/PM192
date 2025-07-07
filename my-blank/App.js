import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  Keyboard,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [ciudad, setCiudad] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'TU_API_KEY'; // <-- Reemplaza con tu clave real

  const obtenerClima = async () => {
    if (!ciudad.trim()) return;

    setLoading(true);
    setError('');
    Keyboard.dismiss();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
      );

      const data = {
        id: Date.now().toString(),
        nombre: response.data.name,
        temperatura: response.data.main.temp,
        condicion: response.data.weather[0].description,
        icono: response.data.weather[0].icon,
      };

      setCiudades((prev) => [...prev, data]);
      setCiudad('');
    } catch (err) {
      setError('Ciudad no encontrada o error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const limpiarCiudades = () => {
    setCiudades([]);
    setError('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>🌤️ Clima por Ciudad</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa una ciudad"
        value={ciudad}
        onChangeText={setCiudad}
      />

      <TouchableOpacity style={styles.botonBuscar} onPress={obtenerClima}>
        <Text style={styles.textoBoton}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 15 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView style={styles.scroll}>
        {ciudades.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.ciudad}>{c.nombre}</Text>
            <Text style={styles.condicion}>
              {c.temperatura}°C - {c.condicion}
            </Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${c.icono}@2x.png` }}
              style={styles.icono}
            />
          </View>
        ))}
      </ScrollView>

      {ciudades.length > 0 && (
        <TouchableOpacity style={styles.botonLimpiar} onPress={limpiarCiudades}>
          <Text style={styles.textoBoton}>Limpiar Ciudades</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#e9f1f7',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  botonBuscar: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  botonLimpiar: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  scroll: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  ciudad: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  condicion: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  icono: {
    width: 60,
    height: 60,
  },
});
