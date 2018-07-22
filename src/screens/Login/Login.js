import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { startSearchScreen } from '../../../index';

import MainContainer from '../../components/MainContainer/MainContainer';
import MainActivityIndicator from '../../components/MainActivityIndicator/MainActivityIndicator';
import backgroundImage from '../../assets/loginBackground.jpg';

export default class LoginScreen extends Component {
  static navigatorStyle = {
    navBarTransparent: true, // make the nav bar transparent, works best with drawUnderNavBar:true
    navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
    drawUnderNavBar: true, // draw the screen content under the nav bar, works best with navBarTranslucent:true
    navBarTextColor: 'white', // change the text color of the title (remembered across pushes)
    navBarTitleTextCentered: true, // default: false. centers the title.
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      controls: {
        username: {
          value: 'Luke Skywalker'
        },
        password: {
          value: '19BBY'
        }
      }
    }
  }

  loginHandler = () => {
    this.authenticate().then(authenticated => {
      this.toggleIsLoading();
      if (authenticated) {
        startSearchScreen();
      } else {
        alert('username or password is invalid');
      }
    }).catch((error) => {
      console.log('Error:', error);
      this.toggleIsLoading();
    });
  }

  authenticate = () => {
    this.toggleIsLoading();
    let authenticated = false;
    let username = this.state.controls.username.value;
    let password = this.state.controls.password.value;
    let url = `https://swapi.co/api/people/?search=${username}`;
    return fetch(url).then(response => {
      return response.json();
    }).then(responseJson => {
      console.log('Response: ', responseJson);
      if (responseJson.results) {
        let name = responseJson.results[0].name;
        let birthYear = responseJson.results[0].birth_year;
        authenticated = username.toLowerCase() === name.toLowerCase() && password.toLowerCase() === birthYear.toLowerCase();
      }
      return authenticated;
    }).catch(error => console.log('Error fetching data:', error));
  }

  toggleIsLoading = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        isLoading: !previousState.isLoading
      }
    });
  }

  updateInputState = (key, value) => {
    this.setState(previousState => {
      return {
        controls: {
          ...previousState.controls,
          [key]: {
            ...previousState.controls[key],
            value: value
          }
        }
      }
    });
  }

  render() {
    let content = null;

    if (this.state.isLoading) {
      content = (
        <MainActivityIndicator />
      );
    } else {
      content = (
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                style={styles.input}
                value={this.state.controls.username.value}
                onChangeText={(text) => this.updateInputState('username', text)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                style={styles.input}
                value={this.state.controls.password.value}
                onChangeText={(text) => this.updateInputState('password', text)}
              />
            </Item>
          </Form>
          <View style={styles.buttonContainer}>
            <Button transparent light onPress={this.loginHandler}>
              <Text>Sign In</Text>
            </Button>
          </View>
        </View>
      );
    }

    return (
      <MainContainer imageBackgroundSource={backgroundImage}>
        <Content contentContainerStyle={styles.content}>
          {content}
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
  input: {
    color : "white"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
