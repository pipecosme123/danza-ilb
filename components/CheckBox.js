import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Center, Checkbox, Divider, Flex, HStack, Text } from 'native-base'
import { ATTENDANCE } from '../constants';

const CheckBox = forwardRef(({ item, index, typeRegister }, ref) => {

  const { id, fullName, status } = item;
  const [value, setValue] = useState(false);
  const [data, setData] = useState(null);

  const onChange = (e) => {
    setValue(e);
    setData({ id, fullName, status: e })
  }

  const bulletPoints = (num) => {
    if (num < 10) {
      return `0${num}.`;
    }
    return `${num}.`;
  }

  const handleColor = () => {
    switch (typeRegister) {
      case ATTENDANCE.ASISTENCIA:
        return {
          color: "green",
          text: {
            value: "Asistencia"
          }
        };

      default:
        return {
          color: "orange",
          text: {
            value: "Excusa"
          }
        };

    }
  }

  useImperativeHandle(ref, () => ({
    getChildState: () => {
      return data;
    }
  }));

  useEffect(() => {
    if (status !== ATTENDANCE.FALSE) {
      setValue(true);
      setData({ id, fullName, status: true })
    }
  }, []);

  return (
    <HStack
      w={"5/6"}
      ml={2}
      py={2}
      bg={index % 2 === 0 ? 'white' : 'muted.100'}
      justifyContent={"space-between"}
    >

      <Flex w={"80%"} flexDirection={'row'} alignItems={'center'}>
        <Text w={'10%'} ml={2} fontSize={'lg'} color={'muted.500'}>{bulletPoints(index + 1)}</Text>
        <Divider orientation={'vertical'} _light={{ bg: "muted.500" }} />
        <Text ml={2} fontSize={'lg'}>{fullName}</Text>
      </Flex>

      <Center w={"40%"}>
        <Checkbox
          colorScheme={handleColor().color}
          value={`00${index}_${handleColor().text.value}`}
          onChange={onChange}
          size="md"
          aria-label={fullName}
          defaultIsChecked={value}
        />
      </Center>
    </HStack>
  )
})

export default CheckBox

// style={{ width: 25, height: 25 }}