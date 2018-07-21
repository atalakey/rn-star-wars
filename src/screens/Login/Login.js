import React, {Component} from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { startSearchScreen } from '../../../index';

import backgroundImage from '../../assets/background.jpg';

class LoginScreen extends Component {
  static navigatorStyle = {
    navBarTransparent: true, // make the nav bar transparent, works best with drawUnderNavBar:true
    navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
    drawUnderNavBar: true, // draw the screen content under the nav bar, works best with navBarTranslucent:true
    navBarTextColor: 'white' // change the text color of the title (remembered across pushes)
  };

  loginHandler = () => {
    startSearchScreen();
  };

  render() {
    return (
      <Container>
        <ImageBackground style={styles.backgroundImage} source={backgroundImage}>
          <Content contentContainerStyle={styles.container}>
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
              <Button transparent light onPress={this.loginHandler}>
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
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
