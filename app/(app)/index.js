import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Center, Text } from 'native-base';
import { InputText, Buttons, InputPassword } from "../../components";
import { login } from '../../store/actions/userThunk';
import { router } from 'expo-router';
import { signOut } from 'aws-amplify/auth';

const LoginUsers = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  return (
    <Center w="100%" h="100%">

      <Text fontSize={"4xl"} bold>DanzaILB</Text>

      <Box w={"100%"} px={10}>
        <InputText
          name={"username"}
          control={control}
          errors={errors.username}
          rules={{
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          }}
          label={"Usuario:"}
          placeholder={""}
        />

        <InputPassword
          name={"password"}
          control={control}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          }}
          label={"Contraseña:"}
          type='password'
          placeholder={""}
        />
        <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
        <Buttons variant={'outline'} onPress={() => router.push('/auth/searchInfo')}>Registrarse</Buttons>
      </Box>

    </Center>
  )
}

export default LoginUsers;