import {
    createDrawerNavigator,
    DrawerContent,
    DrawerContentComponentProps,
    DrawerScreenProps,
  } from '@react-navigation/drawer';
  import {
    ParamListBase,
    useNavigation,
    useTheme,
  } from '@react-navigation/native';
  import type { StackScreenProps } from '@react-navigation/stack';
  import * as React from 'react';
  import { Dimensions, ScaledSize } from 'react-native';
  import { Appbar } from 'react-native-paper';
  
  import TabOneScreen from '../screens/TabOneScreen';
  import InfoScreen from '../screens/InfoScreen';
  import HostScreen from '../screens/HostScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
  
  type DrawerParams = {
    TabOneScreen: any;
    InfoScreen: any;
    HostScreen: any;
  };
  
  const useIsLargeScreen = () => {
    const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  
    React.useEffect(() => {
      const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
        setDimensions(window);
      };
  
      Dimensions.addEventListener('change', onDimensionsChange);
  
      return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);
  
    return dimensions.width > 414;
  };
  
  const Header = ({
    onGoBack,
    title,
  }: {
    onGoBack: () => void;
    title: string;
  }) => {
    const { colors } = useTheme();
    const isLargeScreen = useIsLargeScreen();
  
    return (
      <Appbar.Header style={{ backgroundColor: colors.card, elevation: 1 }}>
        {isLargeScreen ? null : <Appbar.BackAction onPress={onGoBack} />}
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  };
  
  const ArticleScreen = ({
    navigation,
  }: DrawerScreenProps<DrawerParams, 'Article'>) => {
    return (
      <>
        <Header title="Article" onGoBack={() => navigation.toggleDrawer()} />
        <TabTwoScreen navigation={undefined} />
      </>
    );
  };
  
  const NewsFeedScreen = ({
    navigation,
  }: DrawerScreenProps<DrawerParams, 'NewsFeed'>) => {
    return (
      <>
        <Header title="Feed" onGoBack={() => navigation.toggleDrawer()} />
        <HostScreen />
      </>
    );
  };
  
  const AlbumsScreen = ({
    navigation,
  }: DrawerScreenProps<DrawerParams, 'Albums'>) => {
    return (
      <>
        <Header title="Albums" onGoBack={() => navigation.toggleDrawer()} />
        <HostScreen />
      </>
    );
  };
  
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
  
    return (
      <>
        <Appbar.Header style={{ backgroundColor: colors.card, elevation: 1 }}>
          <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
          <Appbar.Content title="Pages" />
        </Appbar.Header>
        <DrawerContent {...props} />
      </>
    );
  };
  
  const Drawer = createDrawerNavigator<DrawerParams>();
  
  type Props = Partial<React.ComponentProps<typeof Drawer.Navigator>> &
    StackScreenProps<ParamListBase>;
  
  export default function DrawerScreen({ navigation, ...rest }: Props) {
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
        gestureEnabled: true,
      });
    }, [navigation]);
  
    const isLargeScreen = useIsLargeScreen();
  
    return (
      <Drawer.Navigator
        backBehavior="none"
        defaultStatus="open"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: isLargeScreen ? 'permanent' : 'back',
          drawerStyle: isLargeScreen ? null : { width: '100%' },
          drawerContentContainerStyle: { paddingTop: 4 },
          overlayColor: 'transparent',
        }}
        {...rest}
      >
        <Drawer.Screen name="Article" component={ArticleScreen} />
       
        <Drawer.Screen
          name="Albums"
          component={AlbumsScreen}
          options={{ title: 'Albums' }}
        />
      </Drawer.Navigator>
    );
  }
  