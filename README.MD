# Google Chat Desktop Application

Esta é uma aplicação desktop para o Google Chat, criada utilizando Electron. A aplicação carrega o Google Chat em uma janela dedicada sem as barras de navegação, permitindo uma experiência semelhante à de um aplicativo nativo. Além disso, a aplicação monitora mudanças no favicon para detectar novas mensagens e exibe notificações e badges no ícone do Dock.

## Funcionalidades

- Carrega o Google Chat em uma janela sem barras de navegação.
- Monitora mudanças no favicon para detectar novas mensagens.
- Exibe notificações no sistema quando uma nova mensagem é detectada.
- Atualiza o badge do ícone no Dock quando há novas mensagens.

## Requisitos

- Node.js e npm (https://nodejs.org/)
- macOS (para o ícone do Dock e notificações nativas)

## Como Compilar e Rodar

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/google-chat-desktop.git
cd google-chat-desktop 
```


### Instalar Dependências
```bash
npm install
```

### Rodar a Aplicação em Modo de Desenvolvimento
```bash
npm start
```

### Empacotar a Aplicação
```bash
npm run dist
```

### Estrutura do Projeto
```bash
google-chat-desktop/
├── assets/
│   └── icon.icns
├── dist/
├── node_modules/
├── main.js
├── preload.js
├── package.json
└── README.md
```


- main.js: Script principal que cria a janela do navegador e gerencia notificações.
- preload.js: Script injetado na página do Google Chat para monitorar mudanças no favicon e gerar alertas.
- assets/icon.icns: Ícone da aplicação para o macOS.
- package.json: Configurações do projeto e dependências.
- dist/: Pasta onde os arquivos empacotados serão gerados.

### Contribuições

Sinta-se à vontade para abrir issues e pull requests no GitHub para sugerir melhorias ou correções.

