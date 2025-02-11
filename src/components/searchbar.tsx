import React, {useState, useLayoutEffect} from 'react';
import {FlatList, Image, StyleSheet, TextInput, View} from 'react-native';
import IMAGES from '../../Assets/images';
import {Text} from '@react-navigation/elements';
import SearchList from './SearchList';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';
import {userdata} from '../types/type';
import {chatUsers, search} from '../redux/store/slice/authSlice';

function Searchbar({navigation}: any) {
  const [searchdata, setsearchdata] = useState<string>('');
  const [filterdata, setfilterdata] = useState<userdata[]>([]);

  const usersData: userdata[] = useAppSelector(
    state => state.authSlice.searchUser,
  );
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    setfilterdata(usersData);
  }, [usersData]);

  const closeSearch = () => {
    dispatch(chatUsers());
    dispatch(search());
    navigation.goBack();
  };

  const handletext = (text: string) => {
    setsearchdata(text);
    setfilterdata(
      text.trim() === ''
        ? usersData
        : usersData.filter((user: any) =>
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
          renderItem={(items: any) => <SearchList users={items} />}
          keyExtractor={(items: any) => items.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchplp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searhDetail: {
    width: '90%',
  },
  mainSearch: {
    flex: 1,
    alignItems: 'center',
  },
  searchPrt: {
    height: '15%',
    justifyContent: 'center',
    width: '90%',
  },
  searchDiv: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(232, 238, 238)',
    borderRadius: 15,
    position: 'relative',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  cross: {
    position: 'absolute',
    top: '23%',
    right: 12,
    fontSize: 20,
  },
  srchImg: {
    position: 'absolute',
    top: '23%',
    left: 12,
  },
});

export default Searchbar;
