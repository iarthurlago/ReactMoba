import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [leitura, setleitura] = useState({ x: 0, y: 0, z: 0 });
  const [ativo, setativo] = useState(true);

  useEffect(() => {
    let inscricao;
    if (ativo) {
    // define quantos milissegundos entre cada leitura
    // 100ms = 10 leituras por segundo - fluido e econômico para bateria
      Accelerometer.setUpdateInterval(50);
      inscricao = Accelerometer.addListener((dados) => {
        setleitura(dados);
      });
    }

    return () => {
      if (inscricao) {
        inscricao.remove();
      }
    };
  }, [ativo]);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Eixos</Text>
      <Text>{`x: ${leitura.x.toFixed(2)} | y: ${leitura.y.toFixed(2)} | z: ${leitura.z.toFixed(2)}`}</Text>
      <TouchableOpacity onPress={() => setativo((valor) => !valor)}>
        <Text>{ativo ? 'Parar' : 'Iniciar'}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 50,
  },
});