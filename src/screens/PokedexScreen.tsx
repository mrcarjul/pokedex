/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useMemo} from 'react';

// Core
import {
  ActivityIndicator,
  FlatList,
  PixelRatio,
  StyleSheet,
  View,
} from 'react-native';

// Personalized Components
import {PokeHeader, PokeSection} from '../components';

// Hooks
import {useDebouncedCallback} from '../hooks';

// Theme
import {colors, genericStyles, metrics} from '../theme';

// Utils
import {NavigationStackScreenProps} from 'react-navigation-stack';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getPokemonsByOffsetAction,
  getPokemonDetailByIdAction,
} from '../redux/actions/pokemon';
import {RootState} from '../redux/reducers';

const ITEM_HEIGHT = PixelRatio.roundToNearestPixel(metrics.width / 3 - 30);

/**
 * @description Screen to display Pokedex
 */
function PokedexScreen({navigation}: NavigationStackScreenProps) {
  const flatListRef = useRef(null);
  const {fetching, offset, pokemons} = useSelector(
    (state: RootState) => state.pokemon,
  );
  const dispatch = useDispatch();

  const requestPokemons = useCallback(() => {
    dispatch(getPokemonsByOffsetAction(0));
  }, [dispatch]);

  const requestMorePokemons = useCallback(() => {
    dispatch(getPokemonsByOffsetAction(offset + 30));
  }, [dispatch, offset]);

  const [debouncedRequestMore] = useDebouncedCallback(requestMorePokemons, 300);

  useEffect(requestPokemons, []);

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

  const renderItem = useCallback(
    ({item}) => {
      const splitteduri = item.url.split('/');
      const pokemonId = splitteduri[splitteduri.length - 2];
      const onPressSection = async () => {
        const response = await dispatch(getPokemonDetailByIdAction(pokemonId));
        if (response) {
          navigation.navigate('PokemonDetail');
        }
      };

      return (
        <PokeSection
          pokemonId={pokemonId}
          name={item.name}
          onPress={onPressSection}
        />
      );
    },
    [dispatch, navigation],
  );

  const ListFooterComponent = useMemo(
    () => fetching && <ActivityIndicator size="large" />,
    [fetching],
  );

  return (
    <View style={[styles.container, styles.screenContainer]}>
      <PokeHeader centerTxt="Pokedex" />
      <View style={styles.container}>
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          data={pokemons}
          extraData={pokemons}
          getItemLayout={getItemLayout}
          initialNumToRender={54}
          keyExtractor={getKey}
          maxToRenderPerBatch={10}
          renderItem={renderItem}
          ref={flatListRef}
          numColumns={3}
          onEndReached={
            pokemons && pokemons.length !== 0 ? debouncedRequestMore : null
          }
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  screenContainer: {
    backgroundColor: colors.backgroundSecondaryAlt,
  },
});

export default PokedexScreen;
