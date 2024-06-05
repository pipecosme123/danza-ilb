import React from 'react'
import { Buttons, Card, ContainerHome } from '../../../../components'
import { Box, Center, Flex, HStack, Heading, Icon, SectionList, Text } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ATTENDANCE } from '../../../../constants';

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
    "title": "asistencia",
    "data": [{
      "id": 1,
      "name": "Aundrea McCurt"
    }, {
      "id": 2,
      "name": "Eugen Venus"
    }, {
      "id": 3,
      "name": "Kirsten Gumey"
    }, {
      "id": 4,
      "name": "Robyn Kornacki"
    }, {
      "id": 5,
      "name": "Denna Blower"
    }, {
      "id": 6,
      "name": "Inez Oxenden"
    }, {
      "id": 7,
      "name": "Xaviera Armatidge"
    }, {
      "id": 8,
      "name": "Trenna Jerosch"
    }, {
      "id": 9,
      "name": "Fernandina Yakushkev"
    }, {
      "id": 10,
      "name": "Jobyna Reubel"
    }, {
      "id": 11,
      "name": "Shanna Antoney"
    }, {
      "id": 12,
      "name": "Ruby O'Fallone"
    }, {
      "id": 13,
      "name": "Erasmus Collumbine"
    }, {
      "id": 14,
      "name": "Brittney Whitehorn"
    }, {
      "id": 15,
      "name": "Domenico Sywell"
    }, {
      "id": 16,
      "name": "Gillan Patria"
    }, {
      "id": 17,
      "name": "Darryl Carcass"
    }, {
      "id": 18,
      "name": "Bink Craigie"
    }, {
      "id": 19,
      "name": "Nero Gobert"
    }, {
      "id": 20,
      "name": "Anneliese Ingley"
    }, {
      "id": 21,
      "name": "Hewie Oxtiby"
    }, {
      "id": 22,
      "name": "Brooke Ephgrave"
    }, {
      "id": 23,
      "name": "Christabel Chismon"
    }, {
      "id": 24,
      "name": "Roby Ankrett"
    }, {
      "id": 25,
      "name": "Conni Kienl"
    }, {
      "id": 26,
      "name": "Othilia Briscam"
    }, {
      "id": 27,
      "name": "Beilul Guisby"
    }, {
      "id": 28,
      "name": "Felike Linch"
    }, {
      "id": 29,
      "name": "Filbert Anyon"
    }, {
      "id": 30,
      "name": "Sheeree Kerr"
    }, {
      "id": 31,
      "name": "Joella Tourne"
    }, {
      "id": 32,
      "name": "Broderic Mardy"
    }, {
      "id": 33,
      "name": "Joelle Whannel"
    }, {
      "id": 34,
      "name": "Kennett Sirmond"
    }, {
      "id": 35,
      "name": "Rubie Edgcombe"
    }, {
      "id": 36,
      "name": "Raddy Shemilt"
    }, {
      "id": 37,
      "name": "Robbie Mangeney"
    }, {
      "id": 38,
      "name": "Valina Kluss"
    }, {
      "id": 39,
      "name": "Haywood Chevins"
    }, {
      "id": 40,
      "name": "Charita Poynor"
    }, {
      "id": 41,
      "name": "Dulsea Treneman"
    }, {
      "id": 42,
      "name": "Mona Glasson"
    }, {
      "id": 43,
      "name": "Gris Shirley"
    }, {
      "id": 44,
      "name": "Lucille Esby"
    }, {
      "id": 45,
      "name": "Titus Phillimore"
    }, {
      "id": 46,
      "name": "Tessie Hainey`"
    }, {
      "id": 47,
      "name": "Dalt Moncrefe"
    }, {
      "id": 48,
      "name": "Nowell Favela"
    }, {
      "id": 49,
      "name": "Aili Attow"
    }, {
      "id": 50,
      "name": "Hiram Castellanos"
    }, {
      "id": 51,
      "name": "Andi Di Franceshci"
    }, {
      "id": 52,
      "name": "Cyrillus McCotter"
    }, {
      "id": 53,
      "name": "Dulsea Peirce"
    }, {
      "id": 54,
      "name": "Dennet Agglio"
    }, {
      "id": 55,
      "name": "Ravi Mayoral"
    }, {
      "id": 56,
      "name": "Tymon Loft"
    }, {
      "id": 57,
      "name": "Alric Wolledge"
    }, {
      "id": 58,
      "name": "Dennet Grabban"
    }, {
      "id": 59,
      "name": "Geralda Badrick"
    }, {
      "id": 60,
      "name": "Aurilia Beckitt"
    }, {
      "id": 61,
      "name": "Neille Teasdale-Markie"
    }, {
      "id": 62,
      "name": "Erasmus Stanaway"
    }, {
      "id": 63,
      "name": "Aimil Sharplin"
    }, {
      "id": 64,
      "name": "Wallas Boultwood"
    }, {
      "id": 65,
      "name": "Ailey Hagger"
    }, {
      "id": 66,
      "name": "Aylmar Filipov"
    }, {
      "id": 67,
      "name": "Daisey Batecok"
    }, {
      "id": 68,
      "name": "Sileas Stranio"
    }, {
      "id": 69,
      "name": "Mabel Sorro"
    }, {
      "id": 70,
      "name": "Katleen Flaune"
    }, {
      "id": 71,
      "name": "Mickie Atlay"
    }, {
      "id": 72,
      "name": "Gerhard McDonough"
    }, {
      "id": 73,
      "name": "Regan Depka"
    }, {
      "id": 74,
      "name": "Frederik Petrelluzzi"
    }, {
      "id": 75,
      "name": "Pippo Salatino"
    }, {
      "id": 76,
      "name": "Odelinda Bockler"
    }, {
      "id": 77,
      "name": "Gretna Yerbury"
    }, {
      "id": 78,
      "name": "Ruddie Janodet"
    }, {
      "id": 79,
      "name": "Hyacinthe Lavallin"
    }, {
      "id": 80,
      "name": "Willyt Sunshine"
    }, {
      "id": 81,
      "name": "Jay Ashbey"
    }, {
      "id": 82,
      "name": "Sibeal Chrstine"
    }, {
      "id": 83,
      "name": "Laurena Scutter"
    }, {
      "id": 84,
      "name": "Toddie Hexam"
    }, {
      "id": 85,
      "name": "Ajay Hindes"
    }, {
      "id": 86,
      "name": "Raphael Seabrook"
    }, {
      "id": 87,
      "name": "Manny Nassie"
    }, {
      "id": 88,
      "name": "Brigitta Franklen"
    }, {
      "id": 89,
      "name": "Rhetta Pimlott"
    }, {
      "id": 90,
      "name": "Timotheus Rearie"
    }]
  }
]

const getIcon = (type) => {
  switch (type) {
    case ATTENDANCE.ASISTENCIA:
      return { icon: "check", color: "success.700" }

    case ATTENDANCE.EXCUSA:
      return { icon: "file-document-edit-outline", color: "warning.700" }

    default:
      return { icon: "close", color: "error.700" }
  }
}

const getBackground = (type) => {
  switch (type) {
    case ATTENDANCE.ASISTENCIA:
      return { color: "success.200", icon: "success.700" }

    case ATTENDANCE.EXCUSA:
      return { color: "warning.200", icon: "warning.700" }

    default:
      return { color: "error.200", icon: "error.700" }
  }
}

const Attendance = () => {
  return (
    <ContainerHome>
      <SectionList px={1} w="full" sections={data} keyExtractor={(item, index) => item.id + index}
        ListHeaderComponent={() => (
          <Box px={2}>
            <Flex mb={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

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
            <Text color={'light.600'}>Modificado por: {"Daniel Felipe Cosme"} - {"hace 2 min"}</Text>
          </Box>
        )}

        renderSectionHeader={({ section: { title, data } }) => (
          <Card
            mx={1}
            background={getBackground(title).color}>
            <Flex
              py={3}
              direction='row'
              alignItems={'center'}
              justifyContent={'space-between'}
              bg={getBackground(title).color}
            >
              <Flex direction='row' alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={getIcon(title).icon} color={getBackground(title).icon} size={'xl'} mr={2} />
                <Heading fontSize="xl">{title.toUpperCase()}</Heading>
              </Flex>

              <Heading fontSize="2xl" fontWeight={'black'} mr={5}>{data.length}</Heading>
            </Flex>
          </Card>
        )}


        renderItem={({ item, index, section: { title } }) => (
          <HStack mx={3} py="1" borderBottomWidth={1} borderBottomColor={"muted.300"} bg={index % 2 === 0 ? "muted.100" : null}>
            <Center w={'1/6'}>
              <Icon as={MaterialCommunityIcons} name={getIcon(title).icon} color={getIcon(title).color} size={'lg'} />
            </Center>
            <Box>
              <Text fontSize={'lg'}>{item.name}</Text>
            </Box>
          </HStack>
        )}

        ListFooterComponent={() => (
          <Box>
            <Text>FIN</Text>
          </Box>
        )}
      />
    </ContainerHome>
  )
}

export default Attendance