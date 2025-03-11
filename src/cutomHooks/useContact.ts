import {useMemo} from 'react';
import {useAppSelector} from '../cutomHooks/useRedux';
import {createSelector} from 'reselect';
import {UserContact, UserDataa} from '../types/type';

const groupUsersByLetter = (users: UserContact[]) => {
  return users.reduce<Record<string, UserContact[]>>((groups, user) => {
    const firstLetter = user.UserName[0]?.toUpperCase() || '#';
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(user);
    return groups;
  }, {});
};

const selectUsers = (state: UserDataa) => state.chatSlice.addUsers;
const memoizedSelectUsers = createSelector([selectUsers], users =>
  users.map(user => ({
    id: user.id,
    UserName: user.UserName,
    profile: user.profilePic,
    profilePic: user.profile,
  })),
);

const useContacts = () => {
  const listOfUsers = useAppSelector(memoizedSelectUsers);
  const contactLoader = useAppSelector(
    state => state.userSlice.chatUsersloader,
  );

  const groupedUsers = useMemo(
    () => groupUsersByLetter(listOfUsers),
    [listOfUsers],
  );

  const sections = useMemo(
    () => Object.keys(groupedUsers).sort(),
    [groupedUsers],
  );

  return {
    groupedUsers,
    sections,
    contactLoader,
  };
};

export default useContacts;
