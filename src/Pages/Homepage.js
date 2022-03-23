import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'

const Homepage = () => {
  return (
    <div>
        <Container maxW='xl' centerContent>
            <Box 
                d="flex"
                justifyContent="center"
                p={3}
                bg={"white"}
                w="180%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
                >
                <Text fontSize='4xl' fontFamily="work sans" color="purple">Chat-OE</Text>
            </Box>
            <Box bg="white" w="180%" p={4} borderRadius="lg" borderWidth="1px" >
            <Tabs variant='soft-rounded' colorScheme='purple'>
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/*<Login/>*/}
              </TabPanel>
              <TabPanel>
                {/*<Sign Up/>*/}
              </TabPanel>
            </TabPanels>
          </Tabs>
            </Box>
        </Container>
    </div>
  )
}

export default Homepage