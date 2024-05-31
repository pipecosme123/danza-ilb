import { Box } from "native-base"

const ContainerHome = ({ children }) => {
  return (
    <Box height={'full'} pb={5} px={1}>
      {children}
    </Box>
  )
}

export default ContainerHome;