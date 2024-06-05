import { Box } from "native-base"
import { Dimensions } from "react-native";

const ContainerHome = ({ children }) => {

  const heightScreen = Dimensions.get('screen').height;
  const heightBox = heightScreen - 120;

  return (
    <Box height={`${heightBox}px`}>
      {children}
    </Box>
  )
}

export default ContainerHome;