/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity } from 'react-native';

const Button = ({
  content,
  onPress,
}: {
  content: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
