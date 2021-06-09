import React, {useCallback, useState} from 'react';
import {FlatList, Image, useWindowDimensions, View} from 'react-native';
import styles from './styles';

interface ImageCarouselProps {
  images: string[];
}
const ImageCarousel = ({images}: ImageCarouselProps) => {
  const windowWidth = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = useState(0);

  const onFlatListUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        onViewableItemsChanged={onFlatListUpdate}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
      <View style={styles.dotContainer}>
        {images.map((item, index) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c2c2c2' : '#fff',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
