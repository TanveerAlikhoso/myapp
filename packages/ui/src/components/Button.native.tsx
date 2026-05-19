import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme/tokens';

interface ButtonProps {
  variant?: 'gloss' | 'outline' | 'ghost';
  children: string;
  onPress?: () => void;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'gloss', 
  children, 
  onPress, 
  style 
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'gloss':
        return [styles.button, styles.gloss, style];
      case 'outline':
        return [styles.button, styles.outline, style];
      case 'ghost':
        return [styles.button, styles.ghost, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'gloss':
        return [styles.text, styles.textGloss];
      case 'outline':
        return [styles.text, styles.textOutline];
      case 'ghost':
        return [styles.text, styles.textGhost];
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={getStyles()}>
      <Text style={getTextStyle()}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: tokens.rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gloss: {
    backgroundColor: '#ff7a00',
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 6,
  },
  outline: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: tokens.fontFamily.body,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  textGloss: {
    color: '#522300', // on-primary-container
  },
  textOutline: {
    color: '#ffffff',
  },
  textGhost: {
    color: tokens.colors.onSurfaceVariant,
  },
});
