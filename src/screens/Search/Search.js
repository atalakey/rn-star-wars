import React, {Component} from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import backgroundImage from '../../assets/background.jpg';

class SearchScreen extends Component {
  static navigatorStyle = {
    backgroundColor: 'transparent'
  };

  render() {
    return (
      <Container>
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
          <Content>

          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%'
  }
});

export default SearchScreen;
