import { Box, Center, Flex, Heading, Pressable, StatusBar } from 'native-base'
import React from 'react'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { statusBarHeight } from '../constants';

const Header = () => {

  return (
    <>
      <StatusBar backgroundColor={'#000000'} />
      <Flex
        h={'70px'}
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
        // shadow={1}
        >
        {/* <Box
          // w={'95%'}
          h={'full'}
          mb={2}
          mt={statusBarHeight}
          pr={5}
          // py={2}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          bg={'white'}
          borderBottomWidth={1}
          borderBottomColor={'blue.400'}
          borderBottomRadius={20}
          shadow={3}
        > */}
        {/* <Pressable
          w={'40%'}
          pl={2}
          h={'full'}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
        >
        </Pressable> */}
          <AntDesign name="arrowleft" size={24} style={{ paddingRight: 8 }} color={'#475569'} />
          {/* <Heading bg={"amber.100"} m={0} color={'gray.800'}>Header</Heading> */}
        {/* <Entypo name="dots-three-vertical" size={24} color="black" /> */}
        {/* </Box> */}
      </Flex>
    </>
  )
}

export default Header;