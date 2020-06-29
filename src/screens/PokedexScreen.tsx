/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';

// Core
import {FlatList, PixelRatio, StyleSheet, Text, View} from 'react-native';

// Personalized Components
import {PokeHeader, PokeSection, PokeButton} from '../components';

// Hooks
import {useDebouncedCallback} from '../hooks';

// Theme
import {colors, genericStyles, metrics} from '../theme';

// Utils
import {NavigationStackScreenProps} from 'react-navigation-stack';

// Service
import API from '../services/api';

const ITEM_HEIGHT = PixelRatio.roundToNearestPixel(metrics.width / 3 - 20);

/**
 * @description Screen to display Pokedex
 */
function PokedexScreen({navigation}: NavigationStackScreenProps) {
  const flatListRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  const updateOffset = useCallback(() => {
    setOffset(offset + 54);
  }, [offset]);

  const getPokemons = async () => {
    const response = await API.getPokemons(offset);
    if (response && response.data) {
      const {results} = response.data;
      setPokemons(results);
      updateOffset();
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  /**
   * @description default items layout calculations
   */
  const getItemLayout = useCallback((data, index) => {
    return {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index};
  }, []);

  /**
   * @description builds the item key for FlatList
   */
  const getKey = useCallback(({name}) => `Pokemon-${name}`, []);

  const renderItem = useCallback(({item}) => {
    const splitteduri = item.url.split('/');
    const pokemonId = splitteduri[splitteduri.length - 2];
    return <PokeSection pokemonId={pokemonId} name={item.name} />;
  }, []);

  return (
    <View style={styles.container}>
      <PokeHeader centerTxt="Pokedex" />
      <View style={styles.container}>
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          data={pokemons}
          extraData={pokemons}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          keyExtractor={getKey}
          maxToRenderPerBatch={10}
          renderItem={renderItem}
          ref={flatListRef}
          windowSize={5}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
});

export default PokedexScreen;
