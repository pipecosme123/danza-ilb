import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Center, Flex, HStack, Heading, Icon, IconButton, Pressable, SectionList, Text, VStack } from 'native-base'
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';

import { Buttons, Card, ContainerHome } from '../../../../components'
import { ALERT, ATTENDANCE } from '../../../../constants';
import { AWSdate, dateFormat } from '../../../../helpers/dateFormat';
import getStyleHeader from '../../../../helpers/getStyleHeader';
import getDataUsersEnsayos from '../../../../store/actions/ensayos/getDataUsersEnsayos';
import { showAlertThunk } from '../../../../store/actions/systemThunk';
import registrarEnsayo from '../../../../store/actions/ensayos/registrarEnsayo';
import { cambiarFecha } from '../../../../store/reducer/ensayos';


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

const ListHeaderComponent = ({ date, showDatePicker, disableExcusa }) => {

  return (
    <Box mb={3}>
      <Box w={'full'} mb={3}>
        <Heading size={'2xl'}>Nuevo ensayo</Heading>

        <Card mx={1} mt={3}>
          <HStack space="3" alignItems="center" justifyContent={"space-between"}>
            <Box>
              <Text>Fecha:</Text>
              <Heading>{dateFormat(date)}</Heading>
            </Box>
            <IconButton
              variant="solid"
              icon={<Icon size="md" as={MaterialIcons} name="edit-calendar" color="white" />}
              onPress={showDatePicker}

            />
          </HStack>
        </Card>

      </Box>

      <HStack w={'full'} space={1} justifyContent={'center'} alignItems={"center"}>

        <Buttons
          size={"sm"}
          variant={'outline'}
          colorScheme="warning"
          leftIcon={
            <Icon as={MaterialCommunityIcons} name="file-edit-outline" />
          }
          onPress={() => router.push({
            pathname: `./${ATTENDANCE.EXCUSA}`
          })}
          disabled={disableExcusa}
        >
          Añadir Excusas
        </Buttons>

        <Buttons
          size={"sm"}
          variant={'outline'}
          colorScheme="success"
          leftIcon={
            <Icon as={MaterialIcons} name="check" />
          }
          onPress={() => router.push({
            pathname: `./${ATTENDANCE.ASISTENCIA}`
          })}
        >
          Añadir Asistentes
        </Buttons>

      </HStack>

    </Box >
  )
}

const DashboardRegistrosEnsayos = () => {

  const { listAsistentes, fecha } = useSelector(({ ensayos }) => ensayos);
  const { id, name } = useSelector(({ users }) => users);

  const { tipo } = useLocalSearchParams();

  const [data, setData] = useState(initialState);
  const [disableExcusa, setDisableExcusa] = useState(true);
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
      const newDate = new Date(timestamp);
      setDate(newDate);
      dispatch(cambiarFecha({ fecha: newDate.toString() }))

      if (newDate.getDay() !== 0) {
        dispatch(showAlertThunk({
          status: ALERT.WARNING,
          message: "El día seleccionado no es un día domingo"
        }));
      }
    }
  }

  const handleSubmit = () => {
    const info = {
      listAsistentes,
      fecha: date.toISOString().split('T')[0],
      tipo,
      registrador: {
        id,
        name
      }
    }

    console.log(info);
    dispatch(registrarEnsayo(info))
  }

  useEffect(() => {
    setDate(new Date(fecha));
    if (listAsistentes.length === 0) {
      dispatch(getDataUsersEnsayos())
    }
  }, []);

  useEffect(() => {
    if (listAsistentes.filter((item) => item.status === ATTENDANCE.ASISTENCIA).length > 0) {
      const info = [
        {
          title: ATTENDANCE.ASISTENCIA,
          data: listAsistentes.filter((item) => item.status === ATTENDANCE.ASISTENCIA)
        },
        {
          title: ATTENDANCE.EXCUSA,
          data: listAsistentes.filter((item) => item.status === ATTENDANCE.EXCUSA)
        },
        {
          title: ATTENDANCE.INASISTENCIA,
          data: listAsistentes.filter((item) => item.status === ATTENDANCE.FALSE)
        }
      ]
      setDisableExcusa(false)
      // console.log(info);
      setData(info);
    }
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
            disableExcusa={disableExcusa}
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
                <Text fontSize={'lg'}>{item.fullname}</Text>
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


      <HStack
        w={"full"}
        pt={3}
        space={2}
        justifyContent={"center"}
        borderTopWidth={1}
        borderTopColor={"muted.200"}
      >
        <Buttons w={"45%"} variant={"outline"}>
          Cancelar
        </Buttons>

        <Buttons w={"45%"} colorScheme={"success"}
          onPress={handleSubmit}
        >
          Guardar registro
        </Buttons>
      </HStack>

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