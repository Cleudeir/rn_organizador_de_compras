
# rn_organizador_de_compras                
## project structure
```                    
rn_organizador_de_compras/
    package-lock.json
    README.md
    jest.config.js
    index.js
    tsconfig.json
    package.json
    yarn.lock
    App.tsx
    react-native.config.js
    app.json
    babel.config.js
    metro.config.js
    Gemfile
    src/
        assets/
            Categorizada.png
            Lista.png
            listToCategoria.gif
        services/
            Gemini.ts
        screens/
            TodoScreen.tsx
            CategoryScreen.tsx
    android/
    apk/
        v1-Lista-compras.apk
    ios/
        Podfile
        listadecomprasTests/
            listadecomprasTests.m
            Info.plist
        listadecompras.xcodeproj/
            project.pbxproj
            xcshareddata/
                xcschemes/
                    listadecompras.xcscheme
        listadecompras/
            AppDelegate.mm
            LaunchScreen.storyboard
            main.m
            Info.plist
            AppDelegate.h
            Images.xcassets/
                Contents.json
                AppIcon.appiconset/
                    Contents.json                
                ```
## Sumário do Projeto

**Objetivo:** Criar um aplicativo móvel (Android e iOS) para gerenciamento de listas de compras, permitindo a criação, edição e organização de itens em categorias, possivelmente com integração a um serviço de categorização externa (Gemini).  A persistência de dados é feita via AsyncStorage.

**Dependências:** `@react-native-community/async-storage`, `@react-navigation`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `@babel`, `@react-native`, `eslint`, `jest`, `prettier`, `typescript`.

**Tecnologias:** React Native, TypeScript, Jest (testes), Babel,  npm.

**Arquitetura:** Baseada em componentes React Native, com navegação via React Navigation (stacks e tabs).  Utiliza AsyncStorage para armazenamento local de dados. A lógica de categorização de itens se integra com uma API externa (Gemini).

**Pipeline:**  (Detalhes não fornecidos, mas provavelmente inclui scripts npm para build, testes e potencialmente deploy para lojas de aplicativos.)
                
                