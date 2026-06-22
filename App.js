import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [leitura, setleitura] = useState({x: 0, y: 0, z: 0})

  useEffect(() => {
    // define quantos milissegundos entre cada leitura
    // 100ms = 10 leituras por segundo - fluido e econômico para bateria
    Accelerometer.setUpdateInterval(50)
    // inscreve: o sensor chama setLeitura toda vez que o valor muda
    const inscricao = Accelerometer.addListener(setleitura) //constroi uma ponte entre voce e o componente de comunicaçao entre voce e...
    // cleanup: cancela a inscrição quando o componente sai da tela
    // sem isso o listener continua rodando mesmo invicível
    return inscricao.remove()
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 50
  }
});
}