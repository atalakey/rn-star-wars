import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

import backgroundImage from '../../assets/background.jpg';

class LoginScreen extends Component {
  static navigatorStyle = {
    backgroundColor: 'transparent'
  };

  render() {
    return (
      <Container>
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
            <View style={styles.buttonContainer}>
              <Button transparent light onPress={() => alert('Sign In')}>
                <Text>Sign In</Text>
              </Button>
            </View>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default LoginScreen;
