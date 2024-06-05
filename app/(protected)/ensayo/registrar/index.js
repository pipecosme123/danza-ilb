import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, FlatList, Heading, HStack, Text, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

import { dateFormat } from '../../../../helpers/dateFormat';
import { Buttons, CheckBox, Card, ContainerHome } from '../../../../components';
import getDataUsersEnsayos from '../../../../store/actions/ensayos/getDataUsersEnsayos';

const ListHeaderComponent = (date, navigateHandleDate) => {
  return (
    <Box mb={5}>
      <Card width={'full'} height={'container'}>
        <Text>Fecha</Text>
        <Heading>{dateFormat(date)}</Heading>
      </Card>

      <HStack w={'full'} space={1} justifyContent={'center'}>
        <Buttons w={'49%'} size={"sm"} variant={'outline'} leftIcon={<Icon as={MaterialIcons} name="edit-calendar" />}
          onPress={() => navigateHandleDate()}
        >
          Editar fecha
        </Buttons>

        <Buttons w={'49%'} size={"sm"} variant={'solid'} colorScheme="success" leftIcon={<Icon as={MaterialIcons} name="save" />}
          onPress={() => console.log("regitrar")}
        >
          Guardar registro
        </Buttons>
      </HStack>

    </Box>
  )
}

const RegistrarNuevoEnsayo = () => {

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  const local = useLocalSearchParams();
  const dispatch = useDispatch();
  const { listAsistentes } = useSelector(({ ensayos }) => ensayos);

  const onChangeChaeck = (newStatus, index) => {
    data[index].status = newStatus;
  }

  const navigateHandleDate = () => {
    router.push({
      pathname: '/ensayo/registrar/fecha',
      params: {
        date: local.date
      }
    });
  }

  useEffect(() => {

    setDate(new Date(parseInt(local.date)));

    if (listAsistentes.length === 0) {
      dispatch(getDataUsersEnsayos())
    }
  }, []);

  useEffect(() => {
    setData(listAsistentes);
  }, [listAsistentes]);

  return (
    <ContainerHome px={5} mb={20}>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        px={1}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviewsen={true}
        refreshing={true}
        ItemSeparatorComponent={<Divider />}
        ListHeaderComponent={() => ListHeaderComponent(date, navigateHandleDate)}
        renderItem={({ item, index }) => (
          <CheckBox item={item} index={index} onValueChange={onChangeChaeck} />
        )}
      />

    </ContainerHome>
  )
}



export default RegistrarNuevoEnsayo