import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Divider, Flex, HStack, Text } from 'native-base'

const CheckBox = ({ item, index, onValueChange }) => {

  const { fullName, status } = item;
  const [value, setValue] = useState(false);

  const onChange = (e) => {
    setValue(e);
    onValueChange(e, index)
  }

  const bulletPoints = (num) => {
    if (num < 10) {
      return `0${num}.`;
    }
    return `${num}.`;
  }

  useEffect(() => {
    if (status === true) {
      setValue(status);
    }
  }, []);

  return (
    <HStack
      py={2}
      bg={index % 2 === 0 ? 'white' : 'muted.100'}
    >

      <Flex w={'5/6'} flexDirection={'row'} alignItems={'center'}>
        <Text w={'10%'} ml={2} fontSize={'lg'} color={'muted.500'}>{bulletPoints(index + 1)}</Text>
        <Divider orientation={'vertical'} _light={{ bg: "muted.500" }} />
        <Text w={'4/6'} ml={2} fontSize={'lg'}>{fullName.trim()}</Text>
      </Flex>

      <Flex w={'1/6'} flexDirection={'row'} alignItems={'center'}>
        <Checkbox value={value} onValueChange={onChange} style={{ width: 25, height: 25 }} />
      </Flex>

    </HStack>
  )
}

export default CheckBox