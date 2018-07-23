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
      isLoggingOut: false,
      data: {
        nextUrl: '',
        planets: []
      },
      minPopulation: 0,
      maxPopulation: 0
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount = () => {
    this._interval = setInterval(() => {
      // Your code
    }, 5000);
  }
  
  componentWillUnmount() {
    clearInterval(this._interval);
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
    this.props.navigator.setButtons({rightButtons:[]})
    this.toggleIsLoading(true);
    setTimeout(() => startLoginScreen(), 1500);
  }

  searchInputOnChangeTextHandler = (searchStr) => {
    if (searchStr !== '') {
      let url = `https://swapi.co/api/planets/?search=${searchStr}`;
      this.toggleIsLoading();
      this.fetchData(url).then((data) => {
        this.updateDataState(data, true);
        this.toggleIsLoading();
      }).catch((error) => {
        console.log('Error:', error)
        this.toggleIsLoading();
      });
    } else {
      this.updateDataState({next: '', results: []}, true);
    }
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

  toggleIsLoading = (disableSrearchBar) => {
    this.setState(previousState => {
      return {
        ...previousState,
        isLoading: !previousState.isLoading,
        isLoggingOut: disableSrearchBar ? disableSrearchBar : false
      }
    });
  }

  updateDataState = (data, overwrite) => {
    this.setState(previousState => {
      const nextUrl = data.next;
      const planets = this.getFilteredPlanetsArray(previousState.data.planets , data.results, overwrite);
      const planetPopulations = this.getPopulationNumbersArray(planets);
      return {
        data: {
          nextUrl: nextUrl ? nextUrl : '',
          planets: planets
        },
        minPopulation: Math.min(...planetPopulations),
        maxPopulation: Math.max(...planetPopulations)
      }
    });
  }

  getFilteredPlanetsArray = (previousStatePlanetsData, planetsData, overwrite) => {
    let planets = planetsData;
    if (overwrite === false) {
      const allPlanets = previousStatePlanetsData.concat(planetsData);
      const planetNames = allPlanets.map(planet => planet.name);
      planets = allPlanets.filter((planet, index) => {
        return planetNames.indexOf(planet.name) === index;
      });
    }
    return planets;
  }

  getPopulationNumbersArray = (planets) => {
    return planets.map(planet => planet.population)
      .filter((stringPopulation) => stringPopulation !== 'unknown')
      .map((stringPopulation) => parseInt(stringPopulation));
  }

  getTextFontSize = (population) => {
    const minFontSize = 16;
    const maxFontSize = 40;
    let textFontSize = minFontSize;    
    if(typeof population !== 'unknown')
    {
      const numerator = (parseInt(population) - this.state.minPopulation) * (maxFontSize - minFontSize);
      const denominator = this.state.maxPopulation - this.state.minPopulation;
      textFontSize = Math.round(minFontSize + numerator / denominator);
    }
    return textFontSize;
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
                  <Text style={{fontSize: this.getTextFontSize(item.population)}}>
                    {item.name}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={this.flatListOnEndReachedHandler}
        />
      );
    }

    return (
      <MainContainer>
        <Header transparent searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input disabled={this.state.isLoggingOut} placeholder="Search" onChangeText={this.searchInputOnChangeTextHandler} />
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
