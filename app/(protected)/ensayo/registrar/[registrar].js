import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, FlatList, Heading, HStack, Text, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

import { Buttons, CheckBox, ContainerHome } from '../../../../components';
import getDataUsersEnsayos from '../../../../store/actions/ensayos/getDataUsersEnsayos';
import { ATTENDANCE } from '../../../../constants';
import updateListaAsistentes from '../../../../store/actions/ensayos/updateListaAsistentes';


const ListHeaderComponent = ({ typeRegister, navigateHandleDate, handleSubmit }) => {

  const typeView = () => {
    switch (typeRegister) {
      case ATTENDANCE.EXCUSA:
        return {
          title: "Registrar Excusas",
          description: "Selecciona las personas que tienen excusa de inasistencia a este ensayo"
        }

      default:
        return {
          title: "Registrar Asistencia",
          description: "Selecciona las personas que asistieron al ensayo"
        }
    }
  }

  return (
    <Box mb={3}>
      <Heading fontSize={'3xl'}>{typeView().title}</Heading>
      <Text mt={2}>{typeView().description}</Text>
    </Box >
  )
}

const RegistrarNuevoEnsayo = () => {

  const local = useLocalSearchParams();
  const dispatch = useDispatch();

  const { listAsistentes } = useSelector(({ ensayos }) => ensayos);

  const [data, setData] = useState([]);
  const childRefs = useRef({});

  const changeRegister = () => {

    dispatch(updateListaAsistentes({ listAsistentes, childRefs, type: local.registrar }))
    router.back();
    // console.log(newStatusData);
  }

  const addChildRef = (index, ref) => {
    if (ref) {
      childRefs.current[index] = ref;
    }
  };

  useEffect(() => {
    setData(listAsistentes);
  }, []);

  // useEffect(() => {
  //   setData(listAsistentes);
  // }, [listAsistentes]);

  return (
    <ContainerHome px={5} mb={20}>

      <FlatList
        data={listAsistentes}
        keyExtractor={item => item.id}
        px={1}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviewsen={true}
        refreshing={true}
        ItemSeparatorComponent={<Divider />}
        ListHeaderComponent={() =>
          <ListHeaderComponent
            typeRegister={local.registrar}
          />
        }
        renderItem={({ item, index }) => (
          <CheckBox
            ref={ref => addChildRef(index, ref)}
            index={index}
            item={item}
            typeRegister={local.registrar}
          />
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
        <Buttons w={"45%"} variant={"outline"}
          onPress={() => router.back()}
        >
          Cancelar
        </Buttons>

        <Buttons w={"45%"} colorScheme={"primary"}
          onPress={changeRegister}
        >
          Registrar
        </Buttons>
      </HStack>

    </ContainerHome>
  )
}



export default RegistrarNuevoEnsayo