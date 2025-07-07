import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Keyboard,
  StatusBar,
  FlatList,
} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

// Configuración de API GeoDB
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const GEO_API_HOST = 'wft-geo-db.p.rapidapi.com';
const GEO_API_KEY = 'fc5c2b39a1mshd5b7c2596db9be3p11b083jsn8aaae699ce4d'; 

// API Tomorrow.io
const TOMORROW_API_KEY = '7ni2UxbWgN7uE5ndOInyQHjgSs4naHRQ';

export default function App() {
  const [ciudad, setCiudad] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sugerencias, setSugerencias] = useState([]);


  useEffect(() => {
    const fetchSugerencias = async () => {
      if (ciudad.length < 2) {
        setSugerencias([]);
        return;
      }
      try {
        const res = await axios.get(GEO_API_URL, {
          params: { namePrefix: ciudad, limit: 5, sort: '-population' },
          headers: {
            'X-RapidAPI-Key': GEO_API_KEY,
            'X-RapidAPI-Host': GEO_API_HOST,
          },
        });
        const ciudadesData = res.data.data;
        const resultados = ciudadesData.map(c => ({
          id: c.id,
          nombre: `${c.city}, ${c.region}, ${c.countryCode}`,
          lat: c.latitude,
          lon: c.longitude,
        }));
        setSugerencias(resultados);
      } catch (err) {
        console.error('Error buscando sugerencias:', err.message);
        setSugerencias([]);
      }
    };

    fetchSugerencias();
  }, [ciudad]);
d
  const obtenerClima = async (ciudadSeleccionada) => {
    if (!ciudadSeleccionada) return;

    setLoading(true);
    setError('');
    Keyboard.dismiss();

    try {
      const { nombre, lat, lon } = ciudadSeleccionada;

      const geoRes = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${TOMORROW_API_KEY}`
      );


      const clima = geoRes.data.timelines?.minutely?.[0]?.values
        || geoRes.data.timelines?.hourly?.[0]?.values
        || geoRes.data.timelines?.daily?.[0]?.values;

      if (!clima) throw new Error('Datos de clima no disponibles');

      const data = {
        id: Date.now().toString(),
        nombre,
        temperatura: clima.temperature,
        condicion: clima.weatherCode,
      };

      setCiudades(prev => [...prev, data]);
      setCiudad('');
      setSugerencias([]);
    } catch (err) {
      console.log(err.message);
      setError('Ciudad no encontrada o error al conectar con Tomorrow.io.');
    } finally {
      setLoading(false);
    }
  };

  const limpiarCiudades = () => {
    setCiudades([]);
    setError('');
  };

  const traducirCondicion = codigo => {
    const condiciones = {
      1000: 'Despejado',
      1001: 'Nublado',
      1100: 'Mayormente despejado',
      1101: 'Parcialmente nublado',
      1102: 'Mayormente nublado',
      2000: 'Niebla',
      2100: 'Niebla ligera',
      4000: 'Llovizna',
      4001: 'Lluvia',
      4200: 'Lluvia ligera',
      4201: 'Lluvia fuerte',
      5000: 'Nieve',
      5100: 'Nieve ligera',
      5101: 'Nieve intensa',
      8000: 'Tormenta',
    };
    return condiciones[codigo] || 'Condición desconocida';
  };

  const obtenerIcono = codigo => {
    if ([1000, 1100].includes(codigo)) return require('./assets/sun.png');
    if ([1001, 1102, 1101].includes(codigo)) return require('./assets/cloud.png');
    if ([4001, 4200, 4201].includes(codigo)) return require('./assets/rain.jpg');
    if ([5000, 5100, 5101].includes(codigo)) return require('./assets/snow.png');
    if (codigo === 8000) return require('./assets/storm.jpg');
    return require('./assets/weather.png');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>🌦️ Clima</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una ciudad..."
        value={ciudad}
        onChangeText={setCiudad}
        autoCorrect={false}
      />

      {sugerencias.length > 0 && (
        <FlatList
          data={sugerencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => obtenerClima(item)}>
              <Text style={styles.sugerencia}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 150, width: '100%' }}
        />
      )}

      <TouchableOpacity
        style={styles.botonBuscar}
        onPress={() => {
          if (sugerencias.length > 0) {
            obtenerClima(sugerencias[0]);
          } else {
            setError('Selecciona una ciudad válida de la lista.');
          }
        }}
      >
        <Text style={styles.textoBoton}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 15 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView style={styles.scroll}>
        {ciudades.map(c => (
          <Animatable.View key={c.id} style={styles.card} animation="bounceIn" duration={1000}>
            <Text style={styles.ciudad}>{c.nombre}</Text>
            <Image source={obtenerIcono(c.condicion)} style={styles.icono} />
            <Text style={styles.temp}>{c.temperatura}°C</Text>
            <Text style={styles.condicion}>{traducirCondicion(c.condicion)}</Text>
          </Animatable.View>
        ))}
      </ScrollView>

      {ciudades.length > 0 && (
        <TouchableOpacity style={styles.botonLimpiar} onPress={limpiarCiudades}>
          <Text style={styles.textoBoton}>Limpiar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#1d1f27',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#00ffc3',
    textShadowColor: '#ff00c8',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#2c2f3c',
    padding: 14,
    borderRadius: 10,
    borderColor: '#00ffc3',
    borderWidth: 1.2,
    marginBottom: 12,
    color: '#fff',
    fontSize: 16,
  },
  sugerencia: {
    padding: 10,
    backgroundColor: '#2a2a38',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  botonBuscar: {
    backgroundColor: '#ff00c8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#00ffc3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  botonLimpiar: {
    backgroundColor: '#00ffc3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBoton: {
    color: '#1d1f27',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff4e4e',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  scroll: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2c2f3c',
    borderRadius: 15,
    padding: 25,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#00ffc3',
    borderWidth: 1,
    shadowColor: '#ff00c8',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 20,
    elevation: 10,
  },
  ciudad: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ffc3',
    marginBottom: 10,
    textShadowColor: '#ff00c8',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
    textShadowColor: '#00ffc3',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  condicion: {
    fontSize: 18,
    color: '#bbb',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  icono: {
    width: 70,
    height: 70,
    marginVertical: 15,
  },
});
