import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Screens
import PokedexScreen from '../screens/PokedexScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

const AppNavigator = createStackNavigator({
  Pokedex: {
    screen: PokedexScreen,
  },
  PokemonDetail: {
    screen: PokemonDetailScreen,
  },
});

export default createAppContainer(AppNavigator);
