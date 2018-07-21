import React, {Component} from 'react';
import { Header, Item, Input, Icon } from 'native-base';

import MainContainer from '../../components/MainContainer/MainContainer';

class SearchScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  render() {
    return (
      <MainContainer>
        <Header transparent searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
        </Header>
      </MainContainer>
    );
  }
}

export default SearchScreen;
