import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Center, Flex, HStack, Heading, Icon, Pressable, SectionList, Text } from 'native-base'
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';

import { Buttons, Card, ContainerHome } from '../../../../components'
import { ATTENDANCE } from '../../../../constants';
import { dateFormat } from '../../../../helpers/dateFormat';
import getStyleHeader from '../../../../helpers/getStyleHeader';
import getDataUsersEnsayos from '../../../../store/actions/ensayos/getDataUsersEnsayos';


const initialState = [
  {
    title: ATTENDANCE.ASISTENCIA,
    data: []
  },
  {
    title: ATTENDANCE.EXCUSA,
    data: []
  },
  {
    title: ATTENDANCE.INASISTENCIA,
    data: []
  }
];

const ListHeaderComponent = ({ date, showDatePicker, handleSubmit }) => {

  return (
    <Box mb={3}>
      <Box w={'full'} mb={3}>
        <Heading size={'2xl'}>Nuevo ensayo</Heading>
        <Box>
          <Text>Fecha:</Text>
          <Heading>{dateFormat(date)}</Heading>
        </Box>
      </Box>

      <HStack w={'full'} space={1} justifyContent={'center'} alignItems={"center"}>

        {/* <Pressable
          m={0}
          onPress={showDatePicker}
          bg={"white"}
        // height={'container'}
        >
          {/* <Card height={'container'}> */}

          {/* </Card> 
        </Pressable> */}


          <Buttons
            size={"sm"}
            variant={'outline'}
            colorScheme="success"
            leftIcon={
              <Icon as={MaterialIcons} name="check" />
            }
            onPress={showDatePicker}
          >
            Añadir asistentes
          </Buttons>

          <Buttons
            size={"sm"}
            variant={'outline'}
            colorScheme="warning"
            leftIcon={
              <Icon as={MaterialCommunityIcons} name="file-edit-outline" />
            }
            onPress={showDatePicker}
            disabled={true}
          >
            Añadir Excusas
          </Buttons>

      </HStack>

    </Box >
  )
}

const DashboardRegistrosEnsayos = () => {

  const { listAsistentes } = useSelector(({ ensayos }) => ensayos);

  const [data, setData] = useState(initialState);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();


  const showDatePicker = () => {
    setShow(true);
  }

  const onChangeDate = (date) => {
    const { nativeEvent: { timestamp }, type } = date;
    setShow(false);
    if (type === 'set') {
      setDate(new Date(timestamp));
    }
  }

  const handleSubmit = () => {
    console.log({ data });
  }

  useEffect(() => {
    if (listAsistentes.length === 0) {
      dispatch(getDataUsersEnsayos())
    }
  }, []);

  useEffect(() => {
    // setData(listAsistentes);
  }, [listAsistentes]);

  return (
    <ContainerHome>
      <SectionList
        px={1}
        w="full"
        // h={'full'}
        // bg={'amber.400'}
        sections={data}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={() => (
          <ListHeaderComponent
            date={date}
            handleSubmit={handleSubmit}
            showDatePicker={showDatePicker}
          />
        )}

        renderSectionHeader={({ section: { title, data } }) => {
          const { bg, icon } = getStyleHeader(title);

          return (
            <Box
              mt={3}
              mx={1}
              p={2}
              borderRadius={'sm'}
              background={bg.color}>
              <Flex
                py={3}
                direction='row'
                alignItems={'center'}
                justifyContent={'space-between'}
                bg={bg.color}
              >
                <Flex direction='row' alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={icon.name} color={bg.icon} size={'xl'} mr={2} />
                  <Heading fontSize="xl">{title.toUpperCase()}</Heading>
                </Flex>

                <Heading fontSize="2xl" fontWeight={'black'} mr={5} color={bg.icon}>{data.length}</Heading>
              </Flex>
            </Box>
          )
        }}

        renderItem={({ item, index, section: { title } }) => {
          const { bg, icon } = getStyleHeader(title);

          return (
            <HStack py="1" borderBottomWidth={1} borderBottomColor={"muted.300"} bg={index % 2 === 0 ? "muted.100" : null}>
              <Center w={'1/6'}>
                <Icon as={MaterialCommunityIcons} name={icon.name} color={icon.color} size={'lg'} />
              </Center>
              <Box>
                <Text fontSize={'lg'}>{item.name}</Text>
              </Box>
            </HStack>
          )
        }}

        ListFooterComponent={() => (
          <Box>
            <Text>FIN</Text>
          </Box>
        )}
      />

      {show &&
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      }
    </ContainerHome>
  )
}


export default DashboardRegistrosEnsayos;