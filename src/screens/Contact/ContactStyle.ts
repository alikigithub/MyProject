import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  topBar: {
    height: '12%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  homeMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
  },
  flatListContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  letterHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#003366',
  },
});
