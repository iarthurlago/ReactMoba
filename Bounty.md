🎯 RELATÓRIO DE ANOMALIA: EXPO HUNTERS

📋 Metadados do Bounty

API Explorada: expo-haptics [M03]

Nível Classificado: [Nível 3] Erro Explicado (Causa identificada, reproduzível intencionalmente e com solução arquitetural).

Vetor de Exploração: Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

Status: Documentado para Apresentação Final.

🚨 1. Descrição da Anomalia (O Bug)

Durante a implementação de feedback físico em botões de ação principal, foi detectado um "engasgo" ou silenciamento completo do Taptic Engine/Vibrator.

O Comportamento: Nos primeiros segundos após o lançamento da aplicação (App Launch), toques rápidos no botão disparam a lógica de negócio do aplicativo, mas o dispositivo não vibra. O hardware parece ignorar completamente as chamadas iniciais. O comportamento apenas se normaliza e "acorda" após o usuário realizar um clique mais longo e pausado. A partir desse momento, os toques rápidos subsequentes passam a funcionar normalmente.

🕹️ 2. Reprodução Intencional (SYS.REQ)

Para demonstrar este erro ao vivo, o seguinte cenário foi isolado:

Feche completamente o aplicativo (kill app).

Abra o aplicativo.

Assim que a tela renderizar, efetue de 3 a 5 toques extremamente rápidos (spam) no botão com impactAsync.

Resultado: Nenhuma vibração ocorre.

Pressione o botão novamente, mas segure por meio segundo antes de soltar (long press/clique lento).

Resultado: O dispositivo vibra.

Volte a efetuar toques rápidos.

Resultado: O dispositivo agora vibra em todos eles.

🧠 3. Análise de Causa Raiz (Por que isso acontece?)

A anomalia não é um erro de sintaxe, mas sim um choque arquitetural entre a Thread do JavaScript, a Bridge do React Native e as leis de energia do hardware nativo.

1. O Gargalo da "Bridge" no App Launch:
Quando o aplicativo abre, o React Native está ocupado montando a árvore de componentes e renderizando a interface. Se o usuário clica rapidamente nesse momento, as chamadas para o módulo nativo do Expo são enfileiradas na "Bridge" assíncrona.

2. A Fisiologia do Hardware (Idle vs. Prepare):
No nível do Sistema Operacional (especialmente iOS com UIKit/CoreHaptics), o motor de vibração não está ligado 100% do tempo para economizar bateria (Estado Idle). Ele precisa de milissegundos para aquecer (método .prepare()).
Como as chamadas do JS ficaram presas na Bridge, elas chegam ao lado nativo todas de uma vez. O módulo nativo tenta ligar o motor e disparar o impacto quase no mesmo milissegundo. Sem tempo hábil para energizar a bobina magnética, o impacto falha fisicamente.

3. O Mecanismo Anti-Spam Nativo:
O SO (iOS) possui um mecanismo de defesa. Quando ele recebe aquele "tiroteio" de requisições retidas na Bridge todas de uma vez (frequência > 25Hz), ele considera aquilo um spam ou loop infinito de software e silencia o atuador para proteger o hardware.

4. Por que o "clique longo" resolve?
Um clique lento dá tempo suficiente para o Event Loop do JS respirar, esvaziar a fila da Bridge e enviar o comando sozinho. Isso dá tempo ao sistema nativo para rodar o .prepare() com sucesso, ativar o motor de vibração e executar o impacto. Uma vez "acordado", o motor mantém um estado de latência por alguns segundos, permitindo que os toques rápidos seguintes funcionem.

🏗️ 4. O Cenário de Uso e Mitigação (Código)

Por que do Cenário: Em uma tela de Login ou de "Skip Tutorial", é muito comum o usuário impaciente começar a clicar assim que o botão aparece, antes mesmo das animações terminarem. Entregar uma experiência tátil "quebrada" logo no início prejudica a percepção de polimento do app.

A Entrega Final (Solução):
Para resolver este problema e resgatar a anomalia, implementei uma técnica de "Consciência de Renderização" usando o InteractionManager. O botão nasce silencioso para proteger a enxurrada na bridge, e só habilita o hardware quando o render pesado termina.

---------------------------------------------------------------------------------------------------------
import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Text, InteractionManager } from 'react-native';
import * as Haptics from 'expo-haptics';

export const SmartHapticButton = ({ onPress, title }) => {
  const [isHardwareReady, setIsHardwareReady] = useState(false);

  useEffect(() => {
    // Bounty Resolution: Só libera o Haptics após o app respirar das animações iniciais
    const task = InteractionManager.runAfterInteractions(() => {
      setIsHardwareReady(true);
      // Opcional (Warm-up silencioso): Haptics.selectionAsync() aqui acordaria o motor no iOS
    });
    return () => task.cancel();
  }, []);

  const handlePress = useCallback(async () => {
    if (isHardwareReady) {
      // Hardware pronto, bridge livre. Impacto limpo.
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } 
    onPress(); // Executa a lógica de negócio independente da vibração
  }, [isHardwareReady, onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
---------------------------------------------------------------------------------------------------------
