# Diario de Dev
## Ambiente de desenvolvimento:
- Windows 10
- nodeJS
- VScode
- ReactNative
- npm
- yarn


## Instalando android studio
Será utilizado o emulador dispositivo do android para desenvolvimento com ReactNative

## Instalando o SDK do android studio, home do android studio
~~~
File > Settings
      na proxima tela, informar no campo, Android SDK Location: c:\Users\<user>\AppData\Local\Android\Sdk ( e clicar no link edit)
      na proxima tela, clicar no botão next
~~~

## configurar as variaveis de sistema
`ANDROID_HOME` ou `ANDROID_SDK_ROOT`

Localização do sdk android no windows 10
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

## Processo demorado...ele vai o abrir o Metro Bundler e a aplicação no emulador
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

## configurando a variavel _DEV_ do reactroton no file:
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

## Instalando plugins do babel para customizar o Root  import de acesso aos componentes da app usando o ~
Possibilita o uso do ~  (simboliza o ./src) no path dos import dos componentes

`yarn add babel-plugin-root-import eslint-import-resolver-babel-plugin-root-import -D`

## Configuração do file babel.config.js
Adicionar o conteudo abaixo no file babel.config.js:
~~~
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'babel-plugin-root-import',
            {
                rootPathSuffix: 'src',
            }
        ]
    ]
};
~~~

E adicionar no file .eslintrc.js o conteúdo:
~~~
settings: {
    'import/resolver': {
        'babel-plugin-root-import': {
            rootPathSuffix: 'src'
        }
    }
},
~~~

Criar o file jsconfig.json em src > e adicionar o conteúdo:
~~~
{
   "compilerOptions":{
       "baseUrl": "src",
       "paths": {
           "~/*": ["*"]
       }
   }
}
~~~


## Instalando o react-navigation (tools para navegar entre telas e rotas)
`yarn add react-navigation`

## Instalando dependencias do react-navigation no projeto
Visitar site: https://reactnavigation.org/docs/4.x/getting-started
Obter o comando no site na sessão: Installing dependencies into a bare React Native project

`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

Adicionar o conteudo abaixo no file

Instalar o jetifier:
`yarn add jetifier --save-dev`

Configurar no package.json:
~~~
"scripts": {
  "postinstall": "jetifier -r"
}
~~~
Para finalizar a instalação do react-native-gesto-manipulador para Android, adicione o seguinte codigo no MainActivity.java:
Em:`\android\app\src\main\java\com\belezmob\MainActivity.java`

Na sessão de imports:
~~~
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
~~~

Abaixo do metodo getMainComponentName:
~~~
 @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
~~~

Colocar no file index.js da app na raiz src o conteúdo abaixo:
`import 'react-native-gesture-handler';`

** LEMBRETE:
- Restartar o emulador do android
- Compilar e rodar a app com:
`npx react-native run-android`
Caso a app não responda use:
To open developer menu press "d"
ao compilar.

- Reiniciar a app com
`npx react-native start --reset-cache`

Criar o file `routes.js` em src com o conteudo:
~~~
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';

export default createAppContainer(
    createSwitchNavigator({
        SignIn,
    })
);
~~~

Criar a estrutura de pasta abaixo para teste de configuração do ReactNavigation apos configurações:
src >
    pages >
      `SignIn > index.js`

com o conteudo abaixo:
~~~
import React from 'react';
import { Text } from 'react-native';

export default function SignIn () {
  return <Text>SignIn </Text>;
}
~~~


## Instalando lib para aplicar tratamento visual em gradiente de telas
`yarn add react-native-linear-gradient`

Linkando a lib (até essa versao não tinhalink automatico)
`yarn link react-native-linear-gradient`

## #instalando o styled-components
`yarn add styled-components`

## Configurando o background da app com `react-native-linear-gradient`
Criar pasta components e pasta Background  em:
 `src > components > Background > index.js`
 no file index.js adicionar o conteudo:
 ~~~
 import LinearGradient from 'react-native-linear-gradient'; // permite usar gradiente nas telas
import styled from 'styled-components/native'; // permite usar CSS para estilizar componentes React.

export default styled(LinearGradient).attrs({
    colors: ['#7159c1', '#ab59c1' ], // attrs - permite configurar oa atributos de LinearGradientes e outros componentes
})`
    flex: 1;
`;
~~~

## Aconteceu um Erro de congelamento do emulador apos instalar linear gradiente
***Error: Text string must be rendered within a <Text> component.
this error is locate at:
in RCTView(at react-native-linear-gradient/index.android.js:84)

Resolvido com os comandos abaixo:
Recompila o projeto:
`npx react-native run-android`

Reset o cache do projeto
`npx react-native start --reset-cache`

Ativar solicitação de rede de transmissão:
`adb reverse tcp: 8081 tcp: 8081`

Recarregamento da página:
`adb shell input keyevent 82`

Falha ao rodar o projeto:
`adb kill-server`

## Criando componentes Button
Em: `src > components > Button > index.js`
Conteudo:

## Criando componentes Input
Em: `src > components > Input > index.js`
Conteudo:

## Instalando prop-types
`yarn add prop-types`

## Instalando lib de icones e fontes (icones em formato de vetores)
`yarn add react-native-vector-icons`


Acessar o site: Site: https://github.com/oblador/react-native-vector-icons
Nota: Executar todos os passos da sessão Android:
Copiando e colando os conteudos da sessão:
No file android > app > build.gradle inserir o conteudo abaixo, antes da ultima sessão apply do file:

~~~
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
~~~


## Erro apos a instalação do MaterialIcons

 Error: Unable to resolve module `@react-native-community/toolbar-android` from `node_modules\react-native-vector-icons\lib\toolbar-android.js`: @react-native-community/toolbar-android could not be found within the project.

Solução: Foi instalado o community/toolbar-android
`yarn add @react-native-community/toolbar-android`

E executado os comandos:
1. recompila a app
`npx react-native run-android`
2. Delete node_modules:
 `rm -rf node_modules`
2. Remove the cache:
  `rm -rf /tmp/metro-*`
3. reinstala pacotes
  `yarn install`
4. Reset Metro's cache:
   `yarn start --reset-cache`


## Criado pagina SignIn e SignIn
Reusado os componentes Input e Button criados anteriormente

## Implementado Status bar
~~~~
import { StatusBar } from 'react-native';
import Routes from './routes';

import './config/ReactrotonConfig';

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Routes />
        </>
    )
}
~~~~





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