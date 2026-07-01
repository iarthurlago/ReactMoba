📱 Dashboard de Consciência Espacial

Um aplicativo minimalista e responsivo construído com React Native e Expo. Este projeto demonstra conceitos essenciais de desenvolvimento mobile, como reatividade espacial, integração de hardware (feedback tátil), adaptação por sistema operacional e animações nativas fluidas.

✨ Funcionalidades

Responsividade em Tempo Real: Utiliza o hook useWindowDimensions para recalcular dinamicamente o tamanho do card central (mantendo exatos 80% da largura da tela), reagindo instantaneamente à rotação do aparelho.

Tema Dinâmico (Light/Dark): Alternância fluida entre os modos claro e escuro, afetando o fundo, os textos e as cores dos componentes interativos.

Integração com Hardware (Haptics): Uso da biblioteca expo-haptics para emitir uma resposta tátil (Impact.Medium) sempre que o usuário interage com o botão, melhorando a experiência de uso.

Renderização por Plataforma: Implementação do Platform.select para exibir títulos dinâmicos baseados no sistema operacional onde o app está rodando ("Painel iOS" ou "Painel Android").

Barra de Status Inteligente: Uso do expo-status-bar para adaptar os ícones do sistema operacional de acordo com o tema escolhido.

Animação Nativa Contínua: Um spinner de carregamento customizado construído puramente com a API Animated do React Native, garantindo alta performance nativa (useNativeDriver) sem a necessidade de bibliotecas pesadas de terceiros.

🛠️ Tecnologias Utilizadas

React Native: Framework principal para construção da interface.

Expo (Template Blank): Ecossistema e build tool que simplifica o acesso a APIs nativas do dispositivo.

APIs Nativas / Hooks: useState, useEffect, useRef, useWindowDimensions, Animated, Platform.

Dependências Expo:

expo-haptics

expo-status-bar

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o aplicativo no seu ambiente local:

1. Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina. Recomenda-se também ter o aplicativo Expo Go instalado no seu dispositivo físico (iOS ou Android) para testes reais.

2. Clonando e Instalando

Clone este repositório e acesse a pasta do projeto:

git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO


Instale as dependências essenciais:

npm install
# ou
npx expo install expo-status-bar expo-haptics


3. Rodando o Aplicativo

Inicie o servidor de desenvolvimento do Expo:

npx expo start


Um QR Code aparecerá no seu terminal.

Abra o aplicativo Expo Go no seu celular e escaneie o código (ou use a câmera no iOS).

Alternativamente, pressione a no terminal para abrir em um emulador Android ou i para o simulador iOS.

📂 Estrutura do Projeto

Para manter o projeto simples e direto ao ponto, ele foi construído sobre o template Blank do Expo. Toda a lógica de estado, estilo e componentes reside no arquivo principal:

├── App.js             # Ponto de entrada, contém a lógica, animação e UI
├── app.json           # Configurações do Expo (nome, ícone, splash screen)
├── package.json       # Dependências e scripts do projeto
└── README.md          # Documentação


💡 Aprendizados e Foco

Este projeto foi desenvolvido com foco educacional para dominar a ponte entre o JavaScript e os módulos nativos do celular. A decisão de não utilizar bibliotecas externas para a animação de loading, por exemplo, serviu para aprofundar os conhecimentos matemáticos e de interpolação (interpolate) da API Animated nativa.

Desenvolvido com ☕ e React Native.
