import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { CardItem } from "native-base";

const imageCardItem = props => {
  const randomImages = [
    require('../../assets/planets/planet-1.jpg'),
    require('../../assets/planets/planet-2.jpg'),
    require('../../assets/planets/planet-3.jpg'),
    require('../../assets/planets/planet-4.jpg')
  ];

  return (
    <CardItem cardBody>
      <Image
        style={styles.image}
        source={props.imageSource ? props.imageSource : randomImages[Math.floor(Math.random()*randomImages.length)]}
      />
    </CardItem>
  )
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: null
  }
});

export default imageCardItem;
