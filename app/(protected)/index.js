import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Heading, IconButton, HStack, Pressable } from 'native-base'
import { AntDesign } from "@expo/vector-icons";
import capitalizeEachWord from '../../helpers/capitalizeEachWord';
import { Buttons, Card, ContainerHome } from '../../components';
import { Link, router } from 'expo-router';

const Home = () => {

  const { name } = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  return (
    <ContainerHome>

      <Heading size={'2xl'}>Hola, {capitalizeEachWord(name)}</Heading>

      <Pressable
        onPress={() => router.push('/ensayo')}
      >
        <Card width='full'>
          <Heading>Asistencia a Ensayos</Heading>
          <Card background={"#f1f1f1"} height={32}>
            <Text>AQUI VA UNA GRÁFICA</Text>
          </Card>
          <HStack w={'full'} space={3} justifyContent="space-between">
            <Box w={'3/5'}>
              <Text>Lorem ipsum dolor sit amet</Text>
            </Box>
            {/* <Box w={'2/5'}> */}
            <IconButton
              size={'sm'}
              variant="outline"
              _icon={{
                as: AntDesign,
                name: 'search1'
              }}
              onPress={() => console.log("Buscar")}
            />
            {/* </Box> */}

          </HStack>

        </Card>
      </Pressable>


      <Buttons
        onPress={() => router.push('/response')}
      >Response</Buttons>
      <Card>
        <Heading>Ministros</Heading>
      </Card>

      <Card>
        <Heading>Asistencia a ministrar</Heading>
      </Card>

      <Card>
        <Heading>Asistencia a servicios</Heading>
      </Card>
    </ContainerHome>
  )
}

export default Home