import React from 'react'
import { Box, Center, HStack, Text } from 'native-base'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText'
import IconButtons from '../../components/IconButtons'
import Buttons from '../../components/Buttons'
import { userNumId } from '../../src/graphql/queries'
import { client } from '../_layout'
import { useDispatch } from 'react-redux'
import { getDataToSignUp } from '../../store/actions/userThunk'

const searchInfo = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(getDataToSignUp(data));
  }

  return (
    <Center w="100%" h="100%">
      <Text fontSize={"4xl"} bold>Registrarse</Text>

      <Box w={"100%"} px={10}>
        <HStack space="3" alignItems="center">
          <Box w={'5/6'}>
            <InputText
              name={"identificacion"}
              control={control}
              errors={errors.user}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              // label={"Usuario:"}
              placeholder={"Número de identificación"}
            />
          </Box>

          <Box w={'1/6'}>
            <IconButtons icon='search' />
          </Box>
        </HStack>

        <Buttons onPress={handleSubmit(onSubmit)} >Iniciar Sesión</Buttons>

      </Box>
    </Center>
  )
}

export default searchInfo