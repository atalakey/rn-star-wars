import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { startSearchScreen } from '../../../index';

import MainContainer from '../../components/MainContainer/MainContainer';
import backgroundImage from '../../assets/loginBackground.jpg';

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
      <MainContainer imageBackgroundSource={backgroundImage}>
        <Content contentContainerStyle={styles.content}>
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
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default LoginScreen;
