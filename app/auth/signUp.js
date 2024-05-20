import React, { useEffect, useState } from 'react'
import InputText from '../../components/InputText'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconButtons from '../../components/IconButtons';
import { Box, Center, Divider, Flex, HStack, ScrollView, Select, Text } from 'native-base';
import ListSelect from '../../components/ListSelect';
import RadioButtons from '../../components/RadioButtons';
import Buttons from '../../components/Buttons';
import { client } from '../_layout';
import { createUsers } from '../../src/graphql/mutations';
import { useLocalSearchParams } from 'expo-router';
import Paragraph from '../../components/Paragraph';
import InputDate from '../../components/InputDate';
import { login, signUpUsers } from '../../store/actions/userThunk';

const signUp = () => {

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [info, setInfo] = useState({});

  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log({ data });
    dispatch(signUpUsers(data));
  }

  useEffect(() => {
    const data = JSON.parse(params.info)
    setInfo(data);
    setValue('tipoId', data.tipoId);
    setValue('numId', data.numId);
    setValue('nombres', data.nombres);
    setValue('apellidos', data.apellidos);
    setValue('fechaNacimiento', data.fechaNacimiento);
    setValue('genero', data.genero);
    setValue('telefono', data.telefono);
    setValue('direccion', data.direccion);
  }, []);

  return (
    <ScrollView w="100%" h="100%">
      <Box px={5} pb={15}>
        <Text fontSize={"4xl"} textAlign={'center'} bold>Registrarse</Text>
        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum maiores nam, odio unde quis natus vel id totam qui dignissimos quasi aliquam laborum soluta assumenda architecto veniam nesciunt odit enim autem incidunt praesentium amet!</Paragraph>

        <Box w={"100%"} px={5}>

          <Box w={'full'}>

            <ListSelect
              name={'tipoId'}
              label={'Tipo de documento'}
              control={control}
              errors={errors.tipoId}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              defaultOption={info.tipoId}
              options={[
                {
                  label: "Registro civil de nacimiento",
                  value: 'RC'
                },
                {
                  label: "Tarjeta de identidad",
                  value: 'TI'
                },
                {
                  label: "Cédula de ciudadanía",
                  value: 'CC'
                },
                {
                  label: "Cédula de extranjería",
                  value: 'CE'
                },
                {
                  label: "Pasaporte",
                  value: 'PA'
                }
              ]}
            />

            <InputText
              name={'numId'}
              type={'numeric'}
              control={control}
              errors={errors.numId}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Numero de identificacion:"}
              placeholder={""}
              defaultValue={`${info.numId}`}
            />

            <InputText
              name={'nombres'}
              control={control}
              errors={errors.nombres}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Nombres:"}
              placeholder={""}
              defaultValue={info.nombres}
            />

            <InputText
              name={'apellidos'}
              control={control}
              errors={errors.apellidos}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Apellidos:"}
              placeholder={""}
              defaultValue={info.apellidos}
            />

            {info.fechaNacimiento &&
              <InputDate
                name={'fechaNacimiento'}
                label={"Fecha de nacimiento:"}
                setValue={setValue}
                defaultDate={info.fechaNacimiento}
              />
            }

            {info.genero &&
              <RadioButtons
                name={'genero'}
                label={"Género:"}
                setValue={setValue}
                value={watch('genero')}
                defaultValue={info.genero}
                options={[
                  {
                    label: "Femenino",
                    value: 'F'
                  },
                  {
                    label: "Masculino",
                    value: 'M'
                  }
                ]}
              />
            }

            <InputText
              name={'telefono'}
              type='phone-pad'
              control={control}
              errors={errors.telefono}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                maxLength: {
                  value: 10,
                  message: "El número de celular debe tener máximo 10 dígitos"
                }
              }}
              label={"Celular:"}
              placeholder={""}
              defaultValue={info.telefono}
              leftElement={<Text fontSize={20} ml={3} color={'muted.400'}>+57</Text>}
            />

            <InputText
              name={'direccion'}
              control={control}
              errors={errors.direccion}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Direccion residencial:"}
              placeholder={""}
              defaultValue={info.direccion}
            />

            <InputText
              name={'correo'}
              control={control}
              errors={errors.correo}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "El correo electrónico no es válido"
                }
              }}
              label={"Correo Electrónico:"}
              placeholder={"ejemplo@dominio.com"}
            />

            <InputText
              name={'username'}
              control={control}
              errors={errors.username}
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido"
                }
              }}
              label={"Nombre de usuario:"}
              placeholder={""}
            />

          </Box>
          <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
          {/* <Buttons onPress={}>Iniciar Sesión</Buttons> */}
        </Box>
      </Box>
    </ScrollView>

  )
}

export default signUp