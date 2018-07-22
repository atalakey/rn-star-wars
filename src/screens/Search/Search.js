import React, {Component} from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { Header, Item, Input, Icon, Card, CardItem, Text, Body } from 'native-base';

import {startLoginScreen} from '../../../index';
import MainContainer from '../../components/MainContainer/MainContainer';
import MainActivityIndicator from '../../components/MainActivityIndicator/MainActivityIndicator';

export default class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      data: {
        nextUrl: '',
        planets: []
      }
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => { // this is the onPress handler for the buttons
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'sign-out') { // this is the same id field from the static navigatorButtons definition
        this.logoutHandler();
      }
    }
  };

  logoutHandler = () => {
    Keyboard.dismiss();
    this.toggleIsLoading();
    setTimeout(() => startLoginScreen(), 2000);
  }

  searchInputOnChangeTextHandler = (searchStr) => {
    let url = `https://swapi.co/api/planets/?search=${searchStr}`;
    this.toggleIsLoading();
    this.fetchData(url).then((data) => {
      this.updateDataState(data, true);
      this.toggleIsLoading();
    }).catch((error) => {
      console.log('Error:', error)
      this.toggleIsLoading();
    });;
  }

  flatListOnEndReachedHandler = () => {
    if (this.state.data.nextUrl !== '') {
      this.fetchData(this.state.data.nextUrl).then((data) => {
        this.updateDataState(data, false);
      }).catch(error => console.log('Error:', error));
    }
  }

  cardItemOnPressHandler = (item) => {    
    this.props.navigator.push({
      screen: 'star-wars.DetailsScreen',
      title: item.name,
      passProps: {
        item
      }
    });
  }

  fetchData = (url) => { 
    return fetch(url).then(response => {
      return response.json();
    }).then(responseJson => {
      console.log('Response: ', responseJson);
      return responseJson
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

  updateDataState = (data, overwrite) => {
    this.setState(previousState => {
      let nextUrl = data.next;
      let planets = data.results;
      if (overwrite === false) {
        const allPlanets = previousState.data.planets.concat(planets);
        const planetNames = allPlanets.map(planet => planet.name);
        planets = allPlanets.filter((planet, index) => {
          return planetNames.indexOf(planet.name) === index;
        });
      }

      return {
        data: {
          nextUrl: nextUrl ? nextUrl : '',
          planets: planets
        }
      }
    });
  }

  render() {
    console.log('State:', this.state);
    let content = null;

    if (this.state.isLoading) {
      content = (
        <MainActivityIndicator />
      );
    } else {
      content = (
        <FlatList
          data={this.state.data.planets}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Card>
              <CardItem button onPress={() => this.cardItemOnPressHandler(item)}>
                <Body>
                  <Text>
                    {item.name}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={this.flatListOnEndReachedHandler}
        />
      );
    }

    return (
      <MainContainer>
        <Header transparent searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.searchInputOnChangeTextHandler} />
          </Item>
        </Header>
        <View style={this.state.isLoading ? styles.content : styles.flatListContainer}>
          {content}
        </View>
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
  flatListContainer: {
    padding: 20
  }
});
