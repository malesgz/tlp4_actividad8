import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';

export default function HomeScreen() {
  // Estados y referencias para las animaciones
  const slideAnim = useRef(new Animated.Value(-100)).current; // Deslizamiento.
  const fadeAnim = useRef(new Animated.Value(1)).current; // Desvanecimiento título.
  const backgroundColorAnim = useRef(new Animated.Value(0)).current; // Animación background.

  useEffect(() => {
    // Animación para que cuando la pantalla cargue se inicie la animación de deslizamiento del título.
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = () => {
    // Animación para que el titulo desaparezca con la animación de desvanecimiento.
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animación para que cambie el color de fondo.
    Animated.timing(backgroundColorAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // Obtiene el color de fondo para cambiarlo.
  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#F8BBD0', '#E91E63'], // Color claro a oscuro.
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.titleContainer, { transform: [{ translateY: slideAnim }] }]}>
        {/* Animación de deslizamiento y desvanecimiento del título */}
        <Animated.Text style={[styles.textNoBackground, { opacity: fadeAnim }]}>
          Trabajo Práctico N° 8 👋
        </Animated.Text>
      </Animated.View>

      {/* Botón en la parte inferior */}
      <TouchableOpacity style={styles.startButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textNoBackground: {
    backgroundColor: 'transparent', 
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#FF4081', 
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});