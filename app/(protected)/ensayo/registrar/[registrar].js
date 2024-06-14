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

      <HStack w={'full'} space={1} justifyContent={'center'}>

        <Buttons
          w={'49%'}
          size={"sm"}
          variant={'outline'}
          colorScheme="primary"
          leftIcon={
            <Icon as={MaterialIcons} name="edit-calendar" />
          }
          onPress={navigateHandleDate}
        >
          Cambiar Fecha
        </Buttons>

        <Buttons
          w={'49%'}
          size={"sm"}
          variant={'solid'}
          colorScheme="success"
          leftIcon={
            <Icon as={MaterialIcons} name="save" />
          }
          onPress={handleSubmit}
        >
          Guardar registro
        </Buttons>
      </HStack>

      <Text mt={2}>{typeView().description}</Text>

    </Box >
  )
}

const RegistrarNuevoEnsayo = () => {

  const local = useLocalSearchParams();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const childRefs = useRef({});
  const { listAsistentes } = useSelector(({ ensayos }) => ensayos);

  const navigateHandleDate = () => {
    router.push({
      pathname: '/ensayo/registrar/fecha',
      params: {
        date: local.date
      }
    });
  }

  const handleSubmit = () => {
    console.log({ data });
  }

  const changeRegister = () => {

    dispatch(updateListaAsistentes({ listAsistentes, childRefs, type: local.type }))
    // dispatch(startLoading());
    // const newStatusData = [].concat(listAsistentes).map((item, index) => {
    //   const childState = childRefs.current[index]?.getChildState();
    //   if (childState) {
    //     if (childState.status === true && item.status === false) {
    //       return { ...item, status: local.type };
    //     }

    //     if (childState.status === false && item.status === local.type) {
    //       return { ...item, status: ATTENDANCE.FALSE };
    //     }
    //   }
    //   return item;
    // });



    console.log(newStatusData);
    // setData(prevData => {
    //   return prevData.map((item, index) => {
    //     const childState = childRefs.current[index]?.getChildState();
    //     if (childState) {
    //       if (childState.status === true && item.status === false) {
    //         return { ...item, status: local.type };
    //       }

    //       if (childState.status === false && item.status === local.type) {
    //         return { ...item, status: ATTENDANCE.FALSE };
    //       }
    //     }
    //     return item;
    //   });
    // });

  }

  const addChildRef = (index, ref) => {
    if (ref) {
      childRefs.current[index] = ref;
    }
  };

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
        keyExtractor={item => item.id}
        px={1}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviewsen={true}
        refreshing={true}
        ItemSeparatorComponent={<Divider />}
        ListHeaderComponent={() =>
          <ListHeaderComponent
            date={date}
            typeRegister={local.type}
            navigateHandleDate={changeRegister}
            handleSubmit={handleSubmit} />
        }
        renderItem={({ item, index }) => (
          <CheckBox
            ref={ref => addChildRef(index, ref)}
            index={index}
            item={item}
            typeRegister={local.type}
          />
        )}
      />

    </ContainerHome>
  )
}



export default RegistrarNuevoEnsayo