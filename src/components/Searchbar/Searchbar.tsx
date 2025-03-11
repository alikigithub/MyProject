import React, {useState, useLayoutEffect} from 'react';
import {FlatList, Image, TextInput, View} from 'react-native';
import IMAGES from '../../../Assets/images';
import {Text} from '@react-navigation/elements';
import SearchList from '../SearchList/SearchList';
import {useAppSelector} from '../../cutomHooks/useRedux';
import {UserData} from '../../types/type';
import {styles} from './SearchbarStyle';
import {NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Searchbar?: undefined;
  Home?: undefined;
  Profile?: {userId: string};
};
type SearchbarNavigationProp = NavigationProp<RootStackParamList>;

function Searchbar({navigation}: {navigation: SearchbarNavigationProp}) {
  const [searchdata, setsearchdata] = useState<string>('');
  const [filterdata, setfilterdata] = useState<UserData[]>([]);
  const usersData: UserData[] = useAppSelector(
    state => state.userSlice.searchUser,
  );
  useLayoutEffect(() => {
    setfilterdata(usersData);
  }, [usersData]);

  const closeSearch = () => {
    navigation.goBack();
  };

  const handletext = (text: string) => {
    setsearchdata(text);
    setfilterdata(
      text.trim() === ''
        ? usersData
        : usersData.filter(user =>
            user.UserName.toLowerCase().includes(text.toLowerCase()),
          ),
    );
  };

  return (
    <View style={styles.mainSearch}>
      <View style={styles.searchPrt}>
        <View style={styles.searchDiv}>
          <TextInput
            placeholder="Find New People"
            keyboardType="web-search"
            value={searchdata}
            onChangeText={handletext}
          />
          <Image source={IMAGES.searchIconBlk} style={styles.srchImg} />
          <Text style={styles.cross} onPress={closeSearch}>
            X
          </Text>
        </View>
      </View>
      <View style={styles.searhDetail}>
        <Text style={styles.searchplp}>People</Text>
        <FlatList
          data={filterdata}
          renderItem={items => <SearchList users={items} />}
          keyExtractor={items => items.id}
        />
      </View>
    </View>
  );
}

export default Searchbar;
