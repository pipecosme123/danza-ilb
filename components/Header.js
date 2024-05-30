import React from 'react'
import { Flex, IconButton, Pressable } from 'native-base'
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/userThunk';
import { router } from 'expo-router';

const Header = () => {

  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <Flex
        h={'60px'}
        w={'full'}
        m={0}
        px={5}
        py={0}
        bg={'light.100'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
        borderBottomColor={'muted.200'}
      >
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} style={{ paddingRight: 8 }} color={'#475569'} />
        </Pressable>
        {/* <IconButton
          size={'lg'}
          variant="solid"
          _icon={{
            as: MaterialIcons,
            name: 'edit-calendar'
          }}
          onPress={() => logout()}
        /> */}
      </Flex>
    </>
  )
}

export default Header;