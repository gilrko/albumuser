import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface SmallActionButtonProps {
  containerStyle?: ViewStyle;
  isLoading?: boolean;
  style?: ViewStyle;
  action?: () => void;
  icon?: any; // Cambia el tipo 'any' al tipo correcto si conoces el tipo de datos de la imagen
  iconStyle?: ImageStyle;
  label?: string;
  labelStyle?: TextStyle;
}

const SmallActionButton: React.FC<SmallActionButtonProps> = ({
  containerStyle,
  style,
  action,
  icon,
  iconStyle,
  label,
  labelStyle
}) => {
  return (
    <View
      style={[styles.containerStyle, containerStyle]}
    >
      <TouchableOpacity
        style={[
          styles.wrapper,
          style,
        ]}
        onPress={() => {
          action ? action() : null
        }}>
        {icon && (
          <Image
            source={icon}
            style={[
              { width: 20, height: 20, resizeMode: 'contain' },
              iconStyle,
            ]}
          />
        )}
      </TouchableOpacity>
      {label && (
        <Text
          maxFontSizeMultiplier={1}
          style={[styles.labelStyle, labelStyle]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    width: 55,
    marginHorizontal: 20,
  },
  wrapper: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F9F9F9',
    borderWidth: 1,
  },
  labelStyle: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SmallActionButton;
