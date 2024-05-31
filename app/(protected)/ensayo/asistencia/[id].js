import React from 'react'
import { Buttons, ContainerHome } from '../../../../components'
import { Box, Center, Flex, HStack, Heading, Icon, SectionList, Text } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// const data = [
//   {
//     "id": 1,
//     "name": "Juan Pérez"
//   },
//   {
//     "id": 2,
//     "name": "María García"
//   },
//   {
//     "id": 3,
//     "name": "Carlos López"
//   },
//   {
//     "id": 4,
//     "name": "Ana Martínez"
//   },
//   {
//     "id": 5,
//     "name": "Luis Fernández"
//   },
//   {
//     "id": 6,
//     "name": "Laura Sánchez"
//   },
//   {
//     "id": 7,
//     "name": "Miguel Torres"
//   },
//   {
//     "id": 8,
//     "name": "Lucía Gómez"
//   },
//   {
//     "id": 9,
//     "name": "Pedro Ramírez"
//   },
//   {
//     "id": 10,
//     "name": "Elena Díaz"
//   }
// ]

const data = [
  {
    "title": "excusa",
    "data": [
      {
        "id": 1,
        "name": "Juan Pérez"
      },
      {
        "id": 2,
        "name": "María García"
      }
    ]
  },
  {
    "title": "inasistentes",
    "data": [
      {
        "id": 3,
        "name": "Carlos López"
      },
      {
        "id": 4,
        "name": "Ana Martínez"
      }
    ]
  },
  {
    "title": "asistentes",
    "data": [
      {
        "id": 5,
        "name": "Luis Fernández"
      },
      {
        "id": 6,
        "name": "Laura Sánchez"
      },
      {
        "id": 7,
        "name": "Miguel Torres"
      },
      {
        "id": 8,
        "name": "Lucía Gómez"
      },
      {
        "id": 9,
        "name": "Pedro Ramírez"
      },
      {
        "id": 10,
        "name": "Elena Díaz"
      },
      {
        "id": 53,
        "name": "Luis Fernández"
      },
      {
        "id": 46,
        "name": "Laura Sánchez"
      },
      {
        "id": 47,
        "name": "Miguel Torres"
      },
      {
        "id": 84,
        "name": "Lucía Gómez"
      },
      {
        "id": 94,
        "name": "Pedro Ramírez"
      },
      {
        "id": 130,
        "name": "Elena Díaz"
      }
    ]
  }
]

const attendance = () => {
  return (
    <ContainerHome>
      <Box>
        <SectionList w="full" mb="4" sections={data} keyExtractor={(item, index) => item.id + index}
          ListHeaderComponent={() => (
            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

              <Box w={'3/5'}>
                <Heading>Ultimo ensayo</Heading>
                <Text>Dom, 5 de Junio del 2024</Text>
              </Box>

              <HStack space={1} w={'2/5'} justifyContent={'flex-end'}>

                <Buttons size={"sm"} variant={'outline'} leftIcon={<Icon as={MaterialCommunityIcons} name="file-edit" />}
                  onPress={() => console.log("editar")}
                >
                  Editar
                </Buttons>
              </HStack>
            </Flex>
          )}
          renderItem={({ item }) => (
            <HStack py="4">
              <Box>{item.name}</Box>
              <Box><Icon as={MaterialCommunityIcons} name="file-edit" /></Box>
            </HStack>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Center>
              <Heading fontSize="xl" mt="8" pb="4">
                {title}
              </Heading>
            </Center>
          )} />
      </Box>
    </ContainerHome>
  )
}

export default attendance