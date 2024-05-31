import React from 'react'
import { Flex, IconButton, Pressable } from 'native-base'
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { logoutUser } from '../store/actions/users';

const Header = ({ children }) => {

  const dispatch = useDispatch();

  return (
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
      {children}
    </Flex>
  )
}

export const HeaderBack = () => {
  return (
    <Header>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} style={{ paddingRight: 8 }} color={'#475569'} />
      </Pressable>
    </Header>
  )
};

export const HeaderHome = () => {
  return (
    <Header>

    </Header>
  )
};

{/* <Pressable onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} style={{ paddingRight: 8 }} color={'#475569'} />
      </Pressable>
      <IconButton
        size={'lg'}
        variant="solid"
        _icon={{
          as: MaterialIcons,
          name: 'edit-calendar'
        }}
        onPress={() => dispatch(logoutUser())}
      /> */}