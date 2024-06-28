import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Buttons, ContainerHome } from '../../components';
import { Center, Heading, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';

const Response = ({ redirect }) => {

  const { status, message, results } = useSelector(({ system }) => system.response);

  const typeResponse = () => {
    switch (status) {
      case 200:
        return {
          title: "¡Perfecto!",
          icon: {
            name: "check",
            color: "green"
          }
        }

      case 207:
        return {
          title: "¡Advertencia!",
          icon: {
            name: "warning",
            color: "orange"
          }
        }

      default:
        return {
          title: "¡Error!",
          icon: {
            name: "close",
            color: "red"
          }
        }
    }
  }

  return (
    <ContainerHome w={'full'}>
      <Center w={'full'} h={'5/6'}>

        <FontAwesome name={typeResponse().icon.name} size={100} color={typeResponse().icon.color} />
        <Heading fontSize={'4xl'}>{typeResponse().title}</Heading>
        <Text>{message}</Text>
        <Buttons
        w={'4/6'}
          onPress={() => router.navigate(redirect)}
        >
          Continuar
        </Buttons>
        {results > 0 &&
          results.map((items) => (
            <Text>{items}</Text>
          ))
        }
      </Center>
    </ContainerHome>
  )
}

export default Response