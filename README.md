## Diario de Dev
# Configurando ambiente de desenvolvimento:
`node, npm, yarn, vscode`

## Instalando android studio para usar seu o emulador dispositivo para desenvolvimento com ReactNative

## Instalando o SDK do android studio, home do android studio
~~~
File > Settings
      na proxima tela, informar no campo, Android SDK Location: c:\Users\<user>\AppData\Local\Android\Sdk ( e clicar no link edit)
      na proxima tela, clicar no botão next
~~~

## configuracao da variavel de sistema ANDROID_HOME ou ANDROID_SDK_ROOT
`C:\Users\Udinei\AppData\Local\Android\Sdk`

## Instalação da Versão LTS Mais Recente: 12.18.0 (includes npm 6.14.4)
`https://nodejs.org/en/download/`

## Instalando o npm global ou (atualizando)
`npm install npm@latest -g`

## criando o projeto ReactNative
`npx react-native init <nomeDoProjeto>`
`npx react-native init conceitosreactnative`

## acessando projeto
`cd nomeDoProjeto`

## compilando e instalando a app no  emulador do android ( o emulador deve estar executando)

# Processo demorado...ele vai o abrir o Metro Bundler e a aplicação no emulador
`npx react-native run-android`

## rodando aplicação caso fechar o metro bundler
`react-native start`


## restartando o terminal metro bundle.js (usar sempre apos a primeira vez de execução)

## em caso de erro persistente usar (dentro da janela do metro bundle.js)
`npx react-native start --reset-cache`
ou:
`npx react-native run-android`

## comandos uteis: Cmd+R (reload)

## habilitar o editorconfig na app (no vscode, clicar na raiz do projeto, e selecionar, editorconfig )
## O file editorconfig sera criado na raiz da app (o plugin ja deve estar instalado)
no file .editorconfig:
Alterar as duas ultimas linhas abaixo para true:
~~~
trim_trailing_whitespace = true
insert_final_newline = true
~~~

## Inserir a linha abaixo:
~~~
  end_of_line = lf
  #e alterar as linhas para true
   trim_trailing_whitespace = true
   insert_final_newline = true
~~~

## Instalar o eslint(nao executar pelo terminal do vscode da erro)
`npm install eslint -g`

## Configurando eslint no settings.json do vscode (ctrl+, para abrir o file) adicionar o codigo abaixo:
~~~
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
~~~

## Configurar o eslint
`yarn eslint --init`

## Excluir o file package-lock.json (criado pelo npm) executar o comando yarn para atualizar node_modules
yarn


## instalando prettier
`yarn add prettier eslint-config-prettier` `eslint-plugin-prettier babel-eslint -D`

## configuração do file .eslintrc.js (conteudo)
~~~
module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        __DEV__: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'jsx-a11y',
        'import',
        'react-hooks',
        'prettier',
    ],
    rules: {
        'keyword-spacing': [2, 'always'],
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
        'import/prefer-default-export': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'react/jsx-one-expression-per-line': 'off',
        'global-require': 'off',
        'react-native/no-raw-text': 'off',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        camelcase: 'off',
        'no-console': ['error', { allow: ['tron'] }],
        'react-hooks/rule-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
~~~
## NOTA: ABRIR E FECHAR O VSCODE APOS CONFIGURAR O ESLINT

## Criando e configurando file .prettierrc (conteudo)
~~~
module.exports = {
  singleQuote: true,
  trailingComma: 'es6',
  endOfLine: 'auto',
  bracketSpacing: true,
  jsxBracketSameLine: false,
};
~~~
## Instalando o reactotron para debugar o codigo ReactNative
download: https://github.com/infinitered/reactotron/releases
IDE do reactotron

## instalando pacote do reactroton no projeto
`yarn add reactotron-react-native`

# configurando a variavel _DEV_ do reactroton no file:
src > config > ReactrotonConfig.js (criar, pastas e files)
adicionar conteudo abaixo:

~~~
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    const tron = Reactotron.configure().useReactNative().connect();

    console.tron = tron;

    tron.clear();
}
~~~

# criar na pasta src > index.js
copiar conteudo de App.js para o index.js e apagar App.js
alterar a linha: `import App from './App'` para: `import App from './src'`


## Habilitando a integração do reactroton via adb (o ADB precisa estar nas variaveis de hambiente, digitar o terminal)
`adb reverse tcp:9090 tcp:9090`


## Instalando o react-navigation (tools para navegar entre telas e rotas)
`yarn add react-navigation`

## Instalando dependencias do react-navigation no projeto (visitar site: https://reactnavigation.org/docs/4.x/getting-started)
`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

## Instalando o react-navigation-stack (para navegação em pilha)
`yarn add react-navigation-stack @react-native-community/masked-view react-native-safe-area-context`

## Instalando o styled-components
`yarn add styled-components`

## Instalando lib de icones (icones em formato de vetores)
`yarn add react-native-vector-icons`

## Configurando lib de icones no projeto no file: android/app/build.gradle
`site: https://github.com/oblador/react-native-vector-icons#android`

## Site para ver todos os pacotes e nomes de icones do react-native-vector-icons
`https://oblador.github.io/react-native-vector-icons/`

## instalando a lib axios para acesso as apis externas
`yarn add axios`

## exibindo o menu de desenvolvedor para executar o reload na app atraves do adb via linha de cmd
`adb shell input keyevent 82`

## visualizar os dispositivos ativos no adb
`adb devices`


## Instalando lib para armazenamento de dados no celular
`yarn add @react-native-community/async-storage`

# adicionando o prop-types para validação de atributos no app
`yarn add prop-types`

NOTAS:
#desinstalacao do node.js
`cuninst nodejs`

## Erro de versao do gradle, para ver a versao instalada
`gradle -v`