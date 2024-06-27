import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Badge, Center, Divider, Flex, HStack, Icon, Text } from 'native-base'
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ATTENDANCE } from '../constants';
import getStyleHeader from '../helpers/getStyleHeader';

const CheckBox = forwardRef(({ item, index, typeRegister }, ref) => {

  const { id, fullname, status } = item;
  const [value, setValue] = useState(false);
  const [data, setData] = useState(null);
  const [attendance, setAttendance] = useState(true);
  const styleCheck = getStyleHeader(typeRegister);
  const styleBadge = getStyleHeader(typeRegister === ATTENDANCE.ASISTENCIA ? ATTENDANCE.EXCUSA : ATTENDANCE.ASISTENCIA);

  const onValueChange = (e) => {
    setValue(e);
    setData({ id, fullname, status: e })
  }

  const bulletPoints = (num) => {
    if (num < 10) {
      return `0${num}.`;
    }
    return `${num}.`;
  }


  useImperativeHandle(ref, () => ({
    getChildState: () => {
      return data;
    }
  }));

  useEffect(() => {
    if (status !== ATTENDANCE.FALSE) {
      if (typeRegister === status) {
        setValue(true);
        setData({ id, fullname, status: true })
      } else {
        setAttendance(false)
      }
    }
  }, [status]);

  return (
    <HStack
      w={"5/6"}
      ml={2}
      py={1}
      bg={index % 2 === 0 ? 'white' : 'muted.100'}
      justifyContent={"space-between"}
    >

      <Flex w={"80%"} flexDirection={'row'} alignItems={'center'}>
        <Text w={'10%'} ml={2} fontSize={'lg'} color={'muted.500'}>{bulletPoints(index + 1)}</Text>
        <Divider orientation={'vertical'} _light={{ bg: "muted.500" }} />
        <Text ml={2} fontSize={'lg'}>{fullname}</Text>
      </Flex>

      <Center w={"40%"}>

        {attendance ?
          <Checkbox
            style={{ width: 25, height: 25, padding: 4, borderRadius: 4, borderWidth: 2, borderColor: "#a3a3a3" }}
            value={value}
            onValueChange={onValueChange}
            color={value ? `${styleCheck.icon.hex}` : undefined}
          />
          :
          <Badge colorScheme={styleBadge.bg.color.split('.')[0]}>
            <Flex direction='row'>
              <Icon as={MaterialCommunityIcons} name={styleBadge.icon.name} color={styleBadge.icon.color} size={'sm'} mr={1} />
              {styleBadge.name}
            </Flex>
          </Badge>
        }

        {/* <Checkbox
          colorScheme={handleColor().color}
          value={`00${index}_${handleColor().text.value}`}
          onChange={onChange}
          size="md"
          aria-label={fullname}
          defaultIsChecked={value}
        /> */}
      </Center>
    </HStack>
  )
})

export default CheckBox

// style={{ width: 25, height: 25 }}