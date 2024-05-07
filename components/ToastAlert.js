import React from 'react'
import { Alert, Center, HStack, Text, VStack } from 'native-base'

const ToastAlert = ({ status = "info", message }) => {
  return (
    <Center>
      <Alert w="90%" variant={'left-accent'} colorScheme={status} status={status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack w={'90%'} space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text w={'full'}>
                {message}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </Center>
  )
}

export default ToastAlert