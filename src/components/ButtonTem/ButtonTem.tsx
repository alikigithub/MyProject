import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import IMAGES from '../../../Assets/images';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './buttonTemStyle';
interface ButtonProps {
  buttonType: 'addUser' | 'send' | 'default';
  onPress: () => void;
  titleName?: string;
}

const ButtonTem: React.FC<ButtonProps> = ({buttonType, onPress, titleName}) => {
  if (buttonType === 'addUser') {
    return (
      <TouchableOpacity style={styles.addUserButton} onPress={onPress}>
        <Image source={IMAGES.logoImg} style={styles.icon} />
        {titleName && <Text style={styles.text}>{titleName}</Text>}
      </TouchableOpacity>
    );
  }

  if (buttonType === 'send') {
    return (
      <View style={styles.sendButtonContainer}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="send" size={25} color="#1877F2" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.defaultButtonContainer}>
      <ImageBackground style={styles.loginBg} source={IMAGES.backgroundImg}>
        <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
          {titleName && <Text style={styles.btnClr}>{titleName}</Text>}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ButtonTem;
