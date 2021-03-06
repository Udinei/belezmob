# Diario de Dev
 BelezMob é um clone do App Mobile GoBaber da Rocketseat, um sistema
 escrito em React Native, que tem como objetivo controlar agendamentos
 de serviços para clientes de barbearias e salão de beleza.
 O profissional se cadastra e visualiza seus agendamento via uma aplicação web, e os clintes escolhem o profissional e os horarias via aplicação
 mobile.

 # Ambiente de desenvolvimento:
- Windows 10
- VScode
- ReactNative
- npm
- yarn

## Tecnologias
- NodeJS
- Postgres
- Sequelize
- MongoDB
- Redis
- NodeMailer
- Sentry
- ESLint
- Prettier
- Nodemon

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
No emulador Configurar > Sistema:
- Dispositivo emulado:
  AOSP on IA Emulado
- Data e hora automáticas:
   Usar horario fornecido pela rede
- Formato de data (Brasil)
- Horário (Brasil)
- Fuso horário:
   Região: Brasil
   Fuso horário: Cuiabá (GMT-04:00)
- Formato 24 horas automático
  Usar localidade padrão

NOTA: As ferramentas visuais pra fazer requisições como O Insominia ou o PostMan,
não levam em consideração o timezone ao fazer as requisições, sendo portanto necessario,
interpretar essas requisições relacionadas a datas e horas, para + ou para -, conforme
timezone configurado no BD (UTC).
Banco PostGres, comandos uteis.
- SET TIMEZONE TO 'UTC';
- SET TIMEZONE TO 'America/Campo_grande';
- SHOW TIMEZONE;

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
        react.gradle: 'readonly',
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
`adb reverse tcp:8081 tcp:8081`

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

Restarte a app comandos:
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

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Routes />
        </>
    )
}
~~~~

## Navegando entre campos e telas com navigation e useRef
 ~~~
import React, { useRef } from 'react';

export default function SignIn({ navigation }) {
...
const passwordRef = useRef();

 <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={ false }
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                   <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
...

  <SignLink onPress={ () => navigation.navigate('SignUp') }>
    <SignLinkText>Criar conta gratuita</SignLinkText>
  </SignLink>
}
~~~

## instalando libs para manipular state do react (redux redux-saga react-redux)
`yarn add redux redux-saga react-redux`


## instalando lib reactroton no projeto react native, e suas libs de integrações com redux e redux-saga
`yarn add reactotron-react-native reactotron-redux reactotron-redux-saga`

Configurando reactotron no file: src > config > ReactotronConfig

NOTA: O endereço do host no codigo abaixo deve ser alterado toda vez que o servidor de dev for
reiniciado { host: '192.xx.xx.xx '}
~~~
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
if (react.gradle) {
    const tron = Reactotron.configure({ host: '192.xx.xx.xx '})
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

    tron.clear();

    console.tron = tron;
}
~~~

## Copiado a pasta store do projeto web contendo actions, reducer e sagas de auth e user, já configurados
Alterado codigo abaixo no file index.js:
~~~
const sagaMonitor = process.env.NODE_ENV === 'development'
? console.tron.createSagaMonitor()
: null;
~~~
por:
~~~
const sagaMonitor = react.gradle ? console.tron.createSagaMonitor() : null;
~~~

## instalando Redux persit
`yarn add redux-persist`

## instalando immer (produz estados dentro dos reducers)
`yarn add immer`

## Instalando lib para armazenamento de dados no celular
`yarn add @react-native-community/async-storage`
Alterado file persistReducer.js:
~~~
import storage from 'redux-persist/lib/storage'; // local de persistencia dos dados
~~~
por:
~~~
import AsyncStorage from '@react-native-community/async-storage';
~~~
e:
~~~
...
export default reducers => {

       const persistedReducer = persistReducer({
        key: 'belezweb',
        ...
        storage,
        ~~~
        por:
        ~~~
        storage: AsyncStorage,
        ~~~
        ...
~~~
Alterado file createStore.js
~~~
...
  //const enhancer =  process.env.NODE_ENV === 'development'
  // foi alterado para a linha abaixo
    const enhancer = react.gradle
     ? compose(  console.tron.createEnhancer(),
        applyMiddleware(...middlewares)
    )
    : applyMiddleware(...middlewares)
    ...
~~~

## instalando a lib axios para acesso as apis externas
`yarn add axios`
Criado file src > services > api.js com o conteudo:
~~~
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
});
export default api;
~~~

## Alterado files da pasta store
em: src > modules > auth > sagas.js
                  > user > sagas.js

~~~
import { Alert } from 'react-native';
~~~
Por
~~~
import { toast } from 'react-toastify';
~~~

Adicionado no file: src > store > index.js

~~~
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './store';

~~~
...
    return (
        <Provider store={ store }>
            <PersistGate persistor={ persistor }>
...
~~~

~~~

## implementada as rotas SignIn e SignUp

## instalando o react-navigation Versao 4.0
`yarn add react-navigation`

Visite o site sessão Versions: https://reactnavigation.org/docs/getting-started


## Instalando o react-navigation-stack (para navegação em pilha)
`yarn add react-navigation-stack`

Dependencias do react-navigation-stack:
 `yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view.`


## instalando react-navigation-tabs
`yarn add react-navigation-tabs`

Erros apos instalar react-navigation e suas dependencias:
Solução: No AVD do Android Studio, ao abri-lo clicar na seta 'v' do emulador selecionado e selecionar a opção 'Cold Boot Now'

## Acessando a lista de contatos do celular usando react-native-contacts
Site Instalação e Referencias: https://www.npmjs.com/package/react-native-contacts#api

- Instalando:
`yarn add react-native-contacts`




Adionar em `AndroidManifest.xml`
   <uses-permission android:name="android.permission.WRITE_CONTACTS" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />

## Erro ao compilar react-native-contacts
Solução Erro:
https://stackoverflow.com/questions/48249633/errorcannot-fit-requested-classes-in-a-single-dex-file-try-supplying-a-main-dex

Para evitar erro:
Error:Cannot fit requested classes in a single dex file.Try supplying a main-dex list. # methods:
 Necessario foi dicionar em `android/app/build.gradle`
sessão:
dependencies {
    .....
implementation 'com.android.support:multidex:1.0.3'

sessão:
 defaultConfig {
...
multiDexEnabled true
## As imagens do avatar não são carregadas ao selecionar o prestador
Erro ao carregar imagem do avatar com endereços fornecidos pela belezapi

Apos muita pesquisa o que resolveu foi:
Habilitar a integração do reactroton via adb (o ADB precisa estar nas variaveis de hambiente, digitar o terminal)

~~~
adb reverse tcp:9090 tcp:9090
adb reverse tcp:8081 tcp:8081
adb reverse tcp:3333 tcp:3333
~~~
Ver a lista de controle do `adb reverse --list` e reconectar o adb `adb reconnect`


Nota Portas: 9090 reactrotron, 8181 android, 3333 <myapi>`

createError@http://10.0.2.2:8081/index.bundle?platform=android&dev=true&minify=false:149440:26

https://developer.android.com/studio/command-line/adb?hl=pt-br

e pressionar 'd' no terminal de excução do Bundle, e selecionar a opção reload.


## Instalando lib para tratamento de datas
`yarn add date-fns@next`







## exibindo o menu de desenvolvedor para executar o reload na app atraves do adb via linha de cmd
`adb shell input keyevent 82`

## visualizar os dispositivos ativos no adb
`adb devices`



NOTAS:
#desinstalacao do node.js
`cuninst nodejs`

## Erro de versao do gradle, para ver a versao instalada
`gradle -v`

## Mensagem ao executar o AVD do Android
The ADB binary in C:\Users\Local\AppData\Local\Android\Sdk\platform-tools\adb.exe is obsolete and has serious performance issues with the Android emulator. Please update to a newer version to get an application significantly faster / file transfer
Solução:

Double Shift para abrir a caixa de pesquisa
Digite o SDK Manager
Nos resultados mostrados, clique em "Gerenciador do SDK"
Na janela que se abre, clique na segunda guia "SDK Tools". Você deve ver que há uma atualização disponível para o SDK Build Tools na primeira linha
Marque "Mostrar detalhes do pacote" no canto inferior direito
Role até o último item em "SDK Build-Tools" e marque a caixa. (O meu era 28.0.1)
Clique em "Aplicar"
Na caixa de diálogo que aparece, clique em "OK"
Quando o instalador terminar, clique em "Finish"
Desmarque a opção "Mostrar detalhes do pacote" e consulte "Android SDK Build-Tools" (primeira linha). Não deve haver atualização disponível e deve dizer "Instalado"
Clique em "OK" para fechar o Gerenciador do SDK

Ver Site: https://www.it-swarm.dev/pt/android-studio/adb.exe-e-obsoleto-e-tem-serios-problemas-de-desempenho/806456591/

## Configurando variaveis de ambiente no React Native
Site : https://github.com/zetachang/react-native-dotenv
Outros Guia: https://henriquetavares.com/pt-br/using-environment-variable-in-react-native/

Instalando a lib: `yarn add react-native-dotenv`

acresentar no file babel.config.js:
 `'module:react-native-dotenv'` dentro de presets.

Criar o file .env na raiz do projeto e incluir no .gitignore: .env
Criar o file .env.example as variaveis de ambiente se setar seus valores

# Referências:
https://rocketseat.com.br/
https://www.youtube.com/c/RocketSeat/videos
https://github.com/diego3g/gobarber-react-deploy
https://www.tgmarinho.com/gobarber_-_aplicacao_mobile_com_react_native/
https://www.tgmarinho.com/gobarber-aplicacao-backend/
https://www.tgmarinho.com/continuando-api-do-gobarber/
https://github.com/renatomarquesteles/gostack-gobarber-mobile
https://github.com/tgmarinho/gobarber-api
https://github.com/tgmarinho/gobarber-web

## Configurando nome da app, splash screen e icone da aplicação para produção
Itens dentro da pasta android do projeto:

Site para gerar icones grandes e pequenos para android:
https://apetools.webprofusion.com/

Para alterar nome da aplicação dentro da app em:
android > app > src > main > res > values > strings.xml

Na pasta do android, alterar no arquuivo androidManifest.xml da pasta res, o nome do arquivo de icone da app:

~~~
 android:icon="@drawable/icon"
      android:roundIcon="@drawable/icon"
 android:icon="@drawable/icon"
      android:roundIcon="@drawable/icon"
~~~

Configurar o Splah Screen da app:
Na pasta `values` do android criar o arquivo color.xml,

Na pasta `drawable` Criar o arquivo background_splash.xml
com o conteudo:
~~~
<?xml version="1.0" encoding="utf-8" ?>

<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/primary" />

<!-- inserindo centralizado o icone da app-->
  <item android:height="200dp" android:width="200dp" android:drawable="@drawable/icon" android:gravity="center" />
</layer-list>
~~~

Adicionar o item do splash no `arquivo styles.xml` em pasta `value`:
~~~
    <style name="SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="android:windowBackground">@drawable/background_splash</item>
    </style>

~~~


E adicionar no arquivo androidManifest.xml em
`<activity` o item `android:theme="@style/SplashTheme"`

## Configurando o pacote da aplicação
Em android > app > build.gradle

Alterar em: defaultConfig {
    applicationId: "com.empresa.app"
}

## Instalando code-push
Code push permite enviar via nuvem alterações javascript para a aplicação em produção (somente alterações que nao envolvam, alteração de libs e linkagem)

comando para instalar code-push
`yarn add react-native-code-push`
Site do code push:https://github.com/microsoft/react-native-code-push

Linkagem do codigo(funciona somente se projeto foi criado com react-native)  no caso dessa app, nao precisa rodar o comando abaixo,
`react-native link react-native-code-push`

Alterar o arquivo index.js da app em: src > index.js

Adicionar no arquivo:
incluir import:
~~~
import CodePush from "react-native-code-push";
~~~

Alterar cabeçalho do arquivo:
~~~
de: export default function index () {
para:  const index = () => (
~~~

e no final no arquivo:
~~~
export default CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
~~~

Incluir no arquivo em: android > app > build.gradle
~~~
dependencies {
...
  compile project(':react-native-code-push')
...

// no final do arquivo
//apply from: "../../node_modules/react-native/react.gradle"
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"

~~~

Adicionar em android > app > main > res > values no arquivo strings.xml
~~~
 <string moduleConfig="true" name="CodePushDeploymentKey">DeploymentKey</string>
 ~~~

 Adicionar no arquivo setting.gradle
~~~
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
~~~

Referência Site: https://github.com/Microsoft/react-native-code-push/blob/master/docs/setup-android.md#plugin-installation-and-configuration-for-react-native-060-version-and-above-android

## Instalando OneSignal notificações online para aplicação
Mesmo que o usuario estiver com a aplicação fechada o aparelho vai receber a
notificação e enviar para a aplicação Site: https://app.onesignal.com/login
Site: https://documentation.onesignal.com/docs/react-native-sdk-setup

Instalando o OneSinal na app
`yarn add react-native-onesignal`

Adicionar no androidManifest.xml:
~~~
<activity
        android:launchMode="singleTop"
~~~

Adicionar no arquivo android > app > build.gradle
~~~
buildscript {
    repositories {
        maven { url 'https://plugins.gradle.org/m2/' } // Gradle Plugin Portal
    }
    dependencies {
        classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.12.6, 0.99.99]'
    }
}

apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'
~~~

## Criando conta no OneSignal e configurando a App
Site: https://app.onesignal.com/apps/d1df907f-223f-4300-ba30-de2e563a9824/settings

## Integrando o OneSignal com a aplicação
Adicionar em index.js

~~~
import OneSignal from 'react-native-onesignal';
~~~

Alterar a function para:
~~~
class index extends Component {
    constructor(props) {
        super(props);
    // o codigo id app é gerado no site da  OneSignal em: Native App Platforms > editar
        OneSignal.init('d1df907f-223f-4300-ba30-de2e563a9824');
    }

    render() {
        return (
~~~

## Configurando o firebase pra enviar notificações
Site: https://console.firebase.google.com/u/0/?pli=1

- Criar projeto
 > Settings do projeto > Cloudmessaging obter a chave do servidor

## Instalando o appcenter-cli para uso do code-push
`yarn global add appcenter-cli`

Conectando ao appcenter (vai abrir no browse e fornecer um codigo que deve ser copiado e colado no terminal)
`appcenter login`

Listando apps instaladas no aapcenter
`appcenter apps list`


## Configurando ambientes da App
Debug - Desenvolvimento ( criado automaticamente )
Release - Geração do bundle apk da app ( criado automaticamente )
Staging - Teste em produção antes de enviar ao usuario final. (criar manualmente)

Rodar no terminal o comando abaixo para listar as chaves de deploy do codepush.
Mas primeiro logar no appcenter e em: Distribute > CodePush criar o ambiente, e pegar no url appcenter  usuario o nome da aplicação e executar o comando para
listar as chaves do ambiente
`appcenter codepush deployment list -a udineisilva/Belez-Mob -k`

Para permitir o codepush enviar o codigo para produção configurar na app
em android > app > build.gradle adicionar o codigo abaixo no arquivo build.gradle:
~~~
...
 buildTypes {
        debug {
            signingConfig signingConfigs.debug
            buildConfigField "String", "CODEPUSH_KEY", '""'

        }

        releaseStaging {
                buildConfigField "String", "CODEPUSH_KEY", '"5o4E__4cePiM4v9JkYScdLwrlvnz6t_xggBCZ"'
                matchingFallbacks= ['debug','release'] // use debug ou release caso nao encontre aqui a configuração necessaria
        }

        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://facebook.github.io/react-native/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            buildConfigField "String", "CODEPUSH_KEY", '"klNjLaRdO1NsItYqxlVIICjYW8hmk1jBlHArc"'
        }
...
~~~

## Teste de envio das notificações
Apos a configuração o nome do simulador ira aparecer automaticamente no Site: https://app.onesignal.com/apps/

em: Audience > Segments > Subscribed Users > View Users
Para enviar mensagens: Messages > New Push > Message

## Gerando build da aplicação para staging
Testes antes de ir para produção.
Gerando keystore do staging site de instruções:
https://reactnative.dev/docs/0.61/signed-apk-android

## Publicando no google play
https://play.google.com/apps/publish/signup/

## Enviando para produção, alteração de codigo javascript via codePush
Comando para enviar a alteração pra o appcenter
`appcenter codepush release-react -a udineisilva/Belez-Mob`

Esse comando ira gerar o bundle da app na maquina local e depois enviar para o appcenter automaticamente.

## Erro de conexão do REDIS
Error: Redis connection to redis
Solução: No heroku Copiar o valor da nova URL gerada do redis e a nova porta geradas e e prencher as variaveis:

REDIS_URL=(campo host gerado no heroku)
REDIS_PORT=(nova porta gerada)
REDIS_PASSWORD=(nova senha gerada)

## Erro ao tentar usar Intl
ReferenceError: Can't find variable: Intl
Solução site: https://github.com/roadmanfong/luxon/blob/master/docs/install.md#react-native
Alterar em android/app/build.gradle
de: - def jscFlavor = 'org.webkit:android-jsc:+'
para: + def jscFlavor = 'org.webkit:android-jsc-intl:+'


# Arvore da aplicação
![Screenshot](tree_belezmob.png)