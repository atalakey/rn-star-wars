import React, {Component} from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { Header, Item, Input, Icon, Card, CardItem, Text, Body } from 'native-base';

import {startLoginScreen} from '../../../index';
import MainContainer from '../../components/MainContainer/MainContainer';
import MainActivityIndicator from '../../components/MainActivityIndicator/MainActivityIndicator';
import alert from '../../utilities/alert';

export default class SearchScreen extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      username: props.username,
      isLoading: false,
      search: {
        disableSrearchBar: false,
        searchesPerMinute: 0
      },
      data: {
        nextUrl: '',
        planets: []
      },
      minPopulation: 0,
      maxPopulation: 0
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('Interval: updating state');
      const srearchBarWasDisabled = this.state.search.disableSrearchBar;
      this.updateDisableSrearchBarState(true, () => {
        if (srearchBarWasDisabled) {
          const title = 'Search has been enabled :-)';
          const message = 'You can make 15 consecutive searches in a minute.';
          alert(title, message);
        }
      });
    }, 60000); // 1 minute
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
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
    this.toggleIsLoadingState();
    this.updateDisableSrearchBarState(false, () => {});
    setTimeout(() => startLoginScreen(true), 1500);
  }

  searchInputOnChangeTextHandler = (searchStr) => {
    if (searchStr !== '') {
      if (this.state.username !== ('Luke Skywalker').toLowerCase()) {
        this.updateDisableSrearchBarState(false, () => {
          if (this.state.search.disableSrearchBar) {
            const title = 'Search limit exceeded!!!';
            const message = 'You have made 15 searches in less than a minute, search will be enabled soon.';
            alert(title, message);
          }
        });
      }
      let url = `https://swapi.co/api/planets/?search=${searchStr}`;
      this.toggleIsLoadingState();
      this.fetchData(url).then((data) => {
        this.updateDataState(data, true);
        this.toggleIsLoadingState();
      }).catch((error) => {
        console.log('Error:', error)
        this.toggleIsLoadingState();
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

  toggleIsLoadingState = () => {
    this.setState(previousState => {
      return {
        isLoading: !previousState.isLoading
      }
    });
  }

  updateDisableSrearchBarState = (overwrite, callback) => {
    this.setState(previousState => {
      return {
        search: {
          disableSrearchBar: overwrite === false && previousState.search.searchesPerMinute + 1 === 15 ? true : false,
          searchesPerMinute: overwrite === false ? previousState.search.searchesPerMinute + 1 : 0
        }
      }
    }, () => callback());
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
        minPopulation: planetPopulations.length != 0 ? Math.min(...planetPopulations): 0,
        maxPopulation: planetPopulations.length != 0 ? Math.max(...planetPopulations): 0
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
            <Input
              placeholder="Search" onChangeText={this.searchInputOnChangeTextHandler}
              autoCapitalize='none'
              autoCorrect={false}
              disabled={this.state.search.disableSrearchBar}
            />
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
