import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

const SPLASH_DURATION_MS = 2500;

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      router.replace('/login');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, { opacity, transform: [{ scale }] }]}>
        <Image
          source={require('../assets/images/my-english-builder-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoWrapper: {
    width: 290,
    height: 190,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
