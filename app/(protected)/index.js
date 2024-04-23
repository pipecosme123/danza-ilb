import React from 'react'
import { Link, route } from 'expo-router';
import { Box, Text, Button } from 'native-base'
import { useSelector } from 'react-redux';

const home = () => {

  const user = useSelector(({ user }) => user);
  return (
    <Box>
      <Text>home</Text>
      <Text>
        {user.toString()}
      </Text>
      <Link href={'/ensayo/registrar/fecha'} asChild>
        <Button colorScheme="primary">
          Primary
        </Button>

      </Link>
    </Box>
  )
}

export default home