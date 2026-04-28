import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Home from './screens/Home';
import { ThemeProvider } from './contexts/ThemeContext';
import { StyleSheet, View } from 'react-native';
import { Routes } from './routes/Routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
          'Montserrat-ThinItalic': require('./assets/fonts/Montserrat-ThinItalic.ttf'),
          'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
          'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
          'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
          'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
          'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
          'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
          'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
          'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
          'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
          'Montserrat-BlackItalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})