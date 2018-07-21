import React, {Component} from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Container, Header, Item, Input, Icon } from 'native-base';

import backgroundImage from '../../assets/background.jpg';

class SearchScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  render() {
    return (
      <Container>
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
          <Header transparent searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
          </Header>
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
