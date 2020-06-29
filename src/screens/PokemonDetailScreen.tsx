import React from 'react';

// Core
import {ScrollView, StyleSheet, Text, View} from 'react-native';

// Personalized Components
import {PokeHeader, PokeSection} from '../components';
// Theme
import {colors, genericStyles} from '../theme';

// Utils
import {NavigationStackScreenProps} from 'react-navigation-stack';

// Redux
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';

interface baseProps {
  name: string;
}

interface abilityProps {
  ability: baseProps;
}

interface gameProps {
  version: baseProps;
}

/**
 * @description Screen to display Pokemon detailed info
 */
function PokemonDetailScreen({navigation}: NavigationStackScreenProps) {
  const {pokemon} = useSelector((state: RootState) => state.pokemon);
  const {abilities, base_experience, forms, game_indices, id, name} = pokemon;

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <PokeHeader goBack={goBack} centerTxt="Pokemon Detail" />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.centerContents}>
            <PokeSection pokemonId={id} name={name} />
          </View>
          <View style={styles.headerSection}>
            <Text style={styles.headerText}>Abilities</Text>
          </View>
          <View style={styles.contentSection}>
            {abilities.map(({ability}: abilityProps) => (
              <Text style={styles.contentText}>{ability.name}</Text>
            ))}
          </View>
          <View style={styles.headerSection}>
            <Text style={styles.headerText}>Experiencia Base</Text>
          </View>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{base_experience}</Text>
          </View>
          <View style={styles.headerSection}>
            <Text style={styles.contentText}>Evoluciones</Text>
          </View>
          <View style={styles.contentSection}>
            {forms.map((form: baseProps) => (
              <Text style={styles.contentText}>{form.name}</Text>
            ))}
          </View>
          <View style={styles.headerSection}>
            <Text>Presente en estos Juegos</Text>
          </View>
          <View style={styles.contentSection}>
            {game_indices.map((game: gameProps) => (
              <Text style={styles.contentText}>{game.version.name}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...genericStyles,
  contentSection: {
    backgroundColor: colors.backgroundSecondaryAlt,
    justifyContent: 'center',
    padding: 15,
  },
  contentText: {
    fontSize: 18,
    paddingVertical: 5,
  },
  headerSection: {
    backgroundColor: colors.background,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PokemonDetailScreen;
