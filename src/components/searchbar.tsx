import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, TextInput, View} from 'react-native';
import IMAGES from '../../Assets/images';
import {Text} from '@react-navigation/elements';
import {useDispatch, useSelector} from 'react-redux';
import {chatUsers, search} from '../redux/store/slice/authSlice';
import SearchList from './searchList';
import {filterData} from '../types/type';
import Loader from './Loader';
import auth from '@react-native-firebase/auth';

function Searchbar({setsearch}) {
  const [searchdata, setsearchdata] = useState<string>('');
  const [filterdata, setfilterdata] = useState<filterData>();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(search());
  }, []);

  const usersData: filterData = useSelector(
    state => state.authSlice.searchUser,
  );
  const loading: boolean = useSelector(state => state.authSlice.loading);
  console.log(loading);
  console.log(usersData);
  useLayoutEffect(() => {
    setfilterdata(usersData);
  }, [usersData]);

  const currentUser = auth().currentUser;
  const closeSearch = () => {
    dispatch(chatUsers(currentUser?.uid));
    setsearch(false);
  };
  const handletext = (text: string) => {
    setsearchdata(text);
    if (text.trim() === '') {
      setfilterdata(usersData);
    } else {
      const filtered = usersData?.filter(user =>
        user.UserName.toLowerCase().includes(text.toLowerCase()),
      );
      setfilterdata(filtered);
    }
  };
  return loading ? (
    <Loader />
  ) : (
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
            {' '}
            X
          </Text>
        </View>
      </View>
      <View style={styles.searhDetail}>
        <View>
          <Text style={styles.searchplp}>People</Text>
        </View>
        <FlatList
          data={filterdata}
          renderItem={items => <SearchList users={items} />}
          keyExtractor={items => items.id}
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
  mainSearch: {flex: 1, alignItems: 'center'},
  searchPrt: {height: '15%', justifyContent: 'center', width: '90%'},
  searchDiv: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(232, 238, 238)',
    borderRadius: 15,
    position: 'relative',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  cross: {position: 'absolute', top: '23%', right: 12, fontSize: 20},
  srchImg: {
    position: 'absolute',
    top: '23%',
    left: 12,
  },
});
export default Searchbar;
