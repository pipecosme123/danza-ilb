import React, { PureComponent } from 'react'
import { Box, Center, HStack, Radio, Stack, Text, View } from 'native-base';

export class ItemListEnsayo extends PureComponent {

  constructor(props) {
    super(props)
  }

  
  render() {
    console.log(this.props);
    return (
      <Box key={this.props.index} h={70} borderBottomWidth={.5} borderBottomColor={"gray.300"}>
        <HStack display={"flex"} justifyContent={"space-between"}>
          <View w={"100%"}>
            <Text fontSize={25} color={"muted.600"} bold italic>{this.props.item.fullName}</Text>
            <Text fontSize={20} color={"muted.500"} italic>Cosme Vásquez</Text>
          </View>

          <View w={"40%"}>
            <Radio.Group defaultValue="1" name="exampleGroup" accessibilityLabel="pick a choice">
              <Center w={"100%"} h={"100%"}>
                <Stack direction={{ base: 'row' }} space={4} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Radio colorScheme="green" value="1" my={1} accessibilityLabel="This is a dummy checkbox" />
                  <Radio colorScheme="yellow" value="2" my={1} accessibilityLabel="This is a dummy checkbox" />
                  <Radio colorScheme="red" value="3" my={1} accessibilityLabel="This is a dummy checkbox" />
                </Stack>
              </Center>
            </Radio.Group>
          </View>
        </HStack>
      </Box>
    )
  }
}

export default ItemListEnsayo;