import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import SmallActionButton from './SmallActionButton';

const windowHeight = Dimensions.get('window').height;

interface Props {
  title: string;
  noBack?: boolean;
  customBack?: () => void;
  style?: object;
  noAlbum?: boolean;
  onGoBack?: () => void | null;
  onChangeImages?: () => void | null;
  onStarSelected?: boolean;
}

const Header: React.FC<Props> = ({
  title,
  noBack,
  customBack,
  style,
  noAlbum,
  onGoBack,
  onChangeImages,
  onStarSelected
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      {!noBack && (
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <SmallActionButton
            icon={require("../assets/left-arrow.png")}
            action={onGoBack}
            style={{backgroundColor: "transparent"}}
          />
        </TouchableOpacity>
      )}
      <View style={{flex: .6}}>
      <Text
        style={styles.title}>
        {title}
      </Text>
      </View>

      {!noAlbum && (
        <TouchableOpacity onPress={onChangeImages} style={styles.startButton}>
          <SmallActionButton
            icon={require("../assets/star.png")}
            iconStyle={{tintColor: onStarSelected ? 'yellow' : 'black' }}
            action={onChangeImages}
            style={{backgroundColor: "transparent"}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: windowHeight > 700 ? 40 : 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  backButton: {
    left: 0,
    flex: .2,
    alignItems: "flex-end",
  },
  startButton: {
    left: 0,
    flex: .2
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
});

export default Header;