import React from 'react'
import { Buttons, Card, ContainerHome } from '../../../components'
import { Box, Fab, Flex, HStack, Heading, Icon, IconButton, Text } from 'native-base'
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ATTENDANCE, TIPOENSAYO } from '../../../constants';

const ListaEnsayos = () => {
  return (
    <ContainerHome>
      <Heading size={'2xl'}>Asistencia a ensayos</Heading>

      <Card width='full'>

        <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

          <Box>
            <Heading>Ultimo ensayo</Heading>
            <Text>Dom, 5 de Junio del 2024</Text>
          </Box>

          <IconButton
            size={'lg'}
            variant="ghost"
            _icon={{
              as: MaterialIcons,
              name: 'keyboard-arrow-up'
            }}
            onPress={() => console.log("Arriba")}
          />

        </Flex>

        <Card background={"#f1f1f1"} height={32}>
          <Text>AQUI VA UNA GRÁFICA</Text>
        </Card>

        <HStack w={'full'} space={3} justifyContent="space-between">
          <Box>
            <Buttons size={"sm"} variant={'subtle'} leftIcon={<Icon as={FontAwesome} name="group" />}
              onPress={() => router.push('/ensayo/asistencia/aaaa')}
            >
              Ver asistencia
            </Buttons>
          </Box>
        </HStack>

      </Card>

      <Fab
        renderInPortal={false}
        shadow={2}
        size="lg"
        icon={
          <Icon color="white" as={AntDesign} name="plus" size="lg" />
        }
        label={
          <Text fontWeight={'black'} color={'white'} fontSize={'lg'}>Añadir ensayo</Text>
        }
        onPress={() => router.push({
          pathname: '/ensayo/registrar/',
          params: {
            tipo: TIPOENSAYO.ACTIVOS
          }
        })}
      />
    </ContainerHome>
  )
}

export default ListaEnsayos