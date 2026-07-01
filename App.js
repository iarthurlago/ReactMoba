import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  useWindowDimensions, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

export default function App() {
  // Extrai a largura e altura da tela em tempo real
  const { width, height } = useWindowDimensions();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define o título dinamicamente com base no sistema operacional
  const dashboardTitle = Platform.select({
    ios: 'Painel iOS',
    android: 'Painel Android',
    default: 'Painel Web',
  });
  
  const toggleTheme = () => {
    // Dispara o feedback tátil do tipo Impact.Medium ao interagir
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsDarkMode(!isDarkMode);
  };

  /* CÁLCULO DE LARGURA RESPONSIVA (80%)
    A largura do card é calculada extraindo a largura total atual da tela (width)
    fornecida pelo hook useWindowDimensions e multiplicando por 0.8.
    Isso garante que o componente sempre ocupe exatos 80% do espaço horizontal 
    disponível, recalculando automaticamente caso o usuário rotacione o aparelho.
  */
  const cardWidth = width * 0.8;

  // Variáveis de estilo dinâmico baseadas no tema
  const currentTheme = isDarkMode ? styles.darkTheme : styles.lightTheme;
  const currentCardTheme = isDarkMode ? styles.darkCard : styles.lightCard;
  const currentTextColor = isDarkMode ? styles.textDark : styles.textLight;

  return (
    <View style={[styles.container, currentTheme]}>
      {/* A StatusBar muda dinamicamente entre 'light' e 'dark' com base no estado */}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* Componente Card Centralizado */}
      <View style={[styles.card, currentCardTheme, { width: cardWidth }]}>
        
        <Text style={[styles.title, currentTextColor]}>
          {dashboardTitle}
        </Text>
        
        <Text style={[styles.subtitle, currentTextColor]}>
          Consciência Espacial
        </Text>

        <View style={styles.dimensionsContainer}>
          <Text style={[styles.dimensionsText, currentTextColor]}>
            Largura: {Math.round(width)}px
          </Text>
          <Text style={[styles.dimensionsText, currentTextColor]}>
            Altura: {Math.round(height)}px
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Alternar Tema</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centraliza os itens horizontalmente (eixo cruzado)
    justifyContent: 'center', // Centraliza os itens verticalmente (eixo principal)
  },
  lightTheme: {
    backgroundColor: '#F3F4F6', // Cinza muito claro para o fundo
  },
  darkTheme: {
    backgroundColor: '#111827', // Azul escuro/quase preto para o fundo
  },
  card: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // Elevação para Android
    elevation: 8,
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.8,
  },
  dimensionsContainer: {
    width: '100%',
    backgroundColor: 'rgba(156, 163, 175, 0.2)', // Fundo translúcido
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 2,
  },
  textLight: {
    color: '#1F2937',
  },
  textDark: {
    color: '#F9FAFB',
  },
  button: {
    backgroundColor: '#3B82F6', // Azul moderno
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});