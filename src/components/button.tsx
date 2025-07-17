/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  content: string;
  onPress: () => void;
} & TouchableOpacityProps;

const Button = ({ content, onPress, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{ opacity: rest.disabled ? 0.5 : 1 }}
      onPress={onPress}
      {...rest}
    >
      <Text
        style={{
          fontSize: 16,
          color: '#222',
          padding: 8,
          marginVertical: 4,
          borderColor: '#222',
          borderWidth: 1,
          borderRadius: 4,
        }}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
