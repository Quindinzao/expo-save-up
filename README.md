# SAVE UP

- Clone esse projeto e instale os pacotes:

```bash
    npm install
```

- Gere os pacotes nativos:

```bash
    npx expo prebuild --clean
```

- Rode o aplicativo no modo desenvolvedor:

```bash
    npx expo run:android
```

ou

```bash
    npx expo run:ios
```

### Erro

Se você obter um erro abaixo:

```bash
    > Task :app:configureCMakeDebug[arm64-v8a]
```

Siga as instruções abaixo:

1. Delete a pasta _android_:

```bash
    rmdir /s /q android
```

2. Rode _prebuild_ novamente:

```bash
    npx expo prebuild --clean
```

3. Entre na pasta _android_:

```bash
    cd android
```

4. Gere o código manualmente via _Gradlew_:

```bash
    gradlew generateCodegenArtifactsFromSchema
```

5. Volte uma pasta e rode:

```bash
    cd ..
    npx expo run:android
```

### ENV's

- Crie um arquivo .env na raiz do projeto:

```bash
    touch .env
```

- Adicione as seguintes variáveis:

```bash
    EXPO_PUBLIC_SUPABASE_URL_PROD=https://your-project.supabase.co
    EXPO_PUBLIC_SUPABASE_ANON_KEY_PROD=your-anon-key
    EXPO_PUBLIC_SUPABASE_URL_DEV=https://your-project.supabase.co
    EXPO_PUBLIC_SUPABASE_ANON_KEY_DEV=your-anon-key
```

- Para enviar suas variáveis para o EAS Build, use o comando:

```bash
    npx eas secret:create --scope project --name API_URL --value https://api.meusite.com
```

### EAS Build

#### Configuração

- Crie uma conta no EAS através do site (EAS Build)[https://expo.dev/signup]

- Instale o EAS CLI:

```bash
    npm install -g eas-cli
```

- Faça login no EAS:

```bash
    eas login
```

#### Preview

- Gere um build preview (APK):

```bash
    eas build --platform android --profile preview
```

#### Production

- Gere um build production (AAB):

```bash
    eas build --platform android --profile production
```

### APK Nativo

- Gere um APK nativo:

```bash
    cd android
    gradlew assembleRelease
```

- O APK será gerado na pasta _android/app/build/outputs/apk/release/app-release.apk_