import React from 'react'
import { Link, route } from 'expo-router';
import { Box, Text, Button } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/userThunk';

const home = () => {

  // const { name } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  }

  return (
    <Box>
      <Text>home</Text>
      {/* <Text>
        {name}
      </Text>
      <Link href={'/ensayo/registrar/fecha'} asChild>
        <Button colorScheme="primary">
          Primary
        </Button>

        <Button colorScheme="danger" onPress={() => logout()}>
          Cerrar Sesión
        </Button>

      </Link> */}
    </Box>
  )
}

export default home