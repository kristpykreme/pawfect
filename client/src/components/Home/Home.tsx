import React, { useContext, useEffect, useState } from "react";
import Navbar from "../NavigationBar/Navbar";
import { Box, Image, Heading, Text, Grid, Input, Button, Center, OrderedList, ListItem, HStack, defineStyleConfig, extendTheme, Table, Thead, Tbody, Tr, Th, Td, Tabs, TabList, TabPanels, Tab, TabPanel, UnorderedList, GridItem} from '@chakra-ui/react'
import styles from "../styles/styles.module.css"
import { userContext, IUser, IUserDetails } from "../../UserContext";
import { Chart } from "react-google-charts";
function Home() {

  const { user, setUser} = useContext(userContext);
  const [data, setData] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [adminSettings, setAdminSettings] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  // Hired Jobs
  // retrieve data from flask
  useEffect(() => {
    fetch("/hiredJobs").then(
      res => res.json()).then(
        data => {
          setData(data)
        })
  }, [])
  // map the jobs data and create a list of job items
  const jobItems = data.map((job) => (
    <Tr key={job['id']}>
      <Td>{job['id']}</Td>
      <Td>{job['sitter']}</Td>
      <Td>{job['sitterEmail']}</Td>
      <Td>{job['jobStatus']}</Td>
      <Td>
        <HStack spacing='10px'>
        <Button
          fontSize={"13px"}
          padding={"5px"}
          m={0.5}
          isDisabled={job['jobStatus']==="Completed"}
          onClick={() => {
            fetch(`/jobs/complete/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(data => console.log(data))
            refresh();
          }}>
          Complete
        </Button>
        <Button
          fontSize={"13px"}
          padding={"5px"}
          m={0.5}
          isDisabled={job['jobStatus']==="Cancelled"}
          onClick={() => {
            fetch(`/jobs/cancel/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(data => console.log(data))
            refresh();
          }}>
          Cancel
        </Button>
        <Button
          fontSize={"13px"}
          padding={"5px"}
          m={0.5}
          isDisabled={job['jobStatus']==="In Progress"}
          onClick={() => {
            fetch(`/jobs/inProgress/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(data => console.log(data))
            refresh();
          }}>
          In Progress
        </Button>
        </HStack>
      </Td>
    </Tr>
  ));
  // My Jobs
  useEffect(() => {
    fetch("/myJobs").then(
      res => res.json()).then(
        myJobs => {
          setMyJobs(myJobs)
        })
  }, [])
  
  function refresh() {
      fetch("/hiredJobs").then(
        res => res.json()).then(
          data => {
            setData(data)
          })

      fetch("/myJobs").then(
        res => res.json()).then(
          myJobs => {
            setMyJobs(myJobs)
          })
          fetch("/adminSettings", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            res => res.json()).then(
              adminSettings => {
                setAdminSettings(adminSettings)
              })
      fetch("/dashboard").then(
        res => res.json()).then(
          adminData => {
            setAdminData(adminData)
          })
  }
  // map the jobs data and create a list of job items
  const myJobItems = myJobs.map((job) => (
    <Tr key={job['id']}>
      <Td>{job['id']}</Td>
      <Td>{job['hirer']}</Td>
      <Td>{job['hirerEmail']}</Td>
      <Td>{job['jobStatus']}</Td>
      <Td>
        <HStack spacing='10px'>
        <Button
          m={0.5}
          fontSize={"13px"}
          padding={"5px"}
          isDisabled={job['jobStatus']==="Completed"}
          onClick={() => {
            fetch(`/jobs/complete/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(myJobs=> console.log(myJobs))
            refresh();
          }}>
          Complete
        </Button>
        <Button 
          fontSize={"13px"}
            padding={"5px"}
          m={0.5}
          isDisabled={job['jobStatus']==="Cancelled"}
          onClick={() => {
            fetch(`/jobs/cancel/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(myJobs => console.log(myJobs))
            refresh();
          }}>
          Cancel
        </Button>
        <Button
          fontSize={"13px"}
          padding={"5px"}
          m={0.5}
          isDisabled={job['jobStatus']==="In Progress"}
          onClick={() => {
            fetch(`/jobs/inProgress/${job['id']}`, {
              method: 'POST',
            })
            .then(res => res.json())
            .then(data => console.log(data))
            refresh();
          }}>
          In Progress
        </Button>
        </HStack>
      </Td>
    </Tr>
  ));

  //dashboard
  useEffect(() => {
    fetch("/dashboard").then(
      res => res.json()).then(
        adminData => {
          setAdminData(adminData)
        })
  }, [])
  

  const adminItems = adminData.map((deet) => (
      <div>
        <HStack m={'10px'} spacing={"20px"}>
        <Box w={"30%"} border={"1px"} rounded={"md"}>
        <Text padding={"2px"} m={"5px"} fontSize={"20px"}  >
          Total Users
        </Text>
        <Text padding={"2px"} fontSize={"30px"} >
          {deet['totalUsers']}
        </Text>
        </Box>
        <Box w={"30%"} border={"1px"} rounded={"md"}>
        <Text padding={"2px"} m={"5px"} fontSize={"20px"}  >
          Total Petsitters
        </Text>
        <Text padding={"2px"} m={"5px"} fontSize={"30px"} >
          {deet['totalPetsitters']}
        </Text>
        </Box>
        </HStack>
        <HStack m={'10px'} spacing={"20px"}>
        <Box w={"30%"} border={"1px"} rounded={"md"}>
        <Text padding={"2px"} m={"5px"} fontSize={"20px"}  >
        Number of Users who have not made any Bookings with Petsitters
        </Text>
        <Text padding={"2px"} m={"5px"} fontSize={"30px"} >
          {deet['numUsersWoBooking']}
        </Text>
        </Box>
        <Box w={"30%"} border={"1px"} rounded={"md"}>
        <Text padding={"2px"} m={"5px"} fontSize={"20px"}  >
        Average Price Rate of PetSitters who have Completed Jobs
        </Text>
        <Text padding={"2px"} m={"5px"} fontSize={"30px"} >
        ${deet['avgPriceRateComp']}
        </Text>
        </Box>
        </HStack>
        <Chart
          chartType="PieChart"
          data={[["Users", "Percentage"],["Petsitters", Number(deet['percentageSitters'])], ["Pet Owners", 100-Number(deet['percentageSitters'])]]}
          width={"100%"}
          height={"400px"}
        />
        <Grid templateColumns='repeat(4, 1fr)'>
          <GridItem>
        <Box m={"20px"} w={"fit-content"} border={"1px"} rounded={"md"}>
          <Center>
          <Text m={"2px"} as="b">Top 5 Most Expensive PetSitters who Offer Petboarding Services:</Text>
          </Center>
          <Center>
          <OrderedList spacing={"3px"}>
            <ListItem m={"2px"}>{deet['top5ExpSitters'][0]['username']}, ${deet['top5ExpSitters'][0]['price']}/hour</ListItem>
            <ListItem m={"2px"}>{deet['top5ExpSitters'][1]['username']}, ${deet['top5ExpSitters'][1]['price']}/hour</ListItem>
            <ListItem m={"2px"}>{deet['top5ExpSitters'][2]['username']}, ${deet['top5ExpSitters'][2]['price']}/hour</ListItem>
            <ListItem m={"2px"}>{deet['top5ExpSitters'][3]['username']}, ${deet['top5ExpSitters'][3]['price']}/hour</ListItem>
            <ListItem m={"2px"}>{deet['top5ExpSitters'][4]['username']}, ${deet['top5ExpSitters'][4]['price']}/hour</ListItem>
          </OrderedList>
          </Center>
        </Box>
        </GridItem>
        <GridItem>
        <Box m={"20px"} w={"fit-content"} border={"1px"} rounded={"md"}>
          <Center>
          <Text m={"2px"} as="b">Top 3 Most Popular Services Offered By PetSitters:</Text>
          </Center>
          <Center>
          <OrderedList spacing={"3px"}>
            <ListItem m={"2px"}>{deet['top3Services'][0]['service']}, {deet['top3Services'][0]['count']} services</ListItem>
            <ListItem m={"2px"}>{deet['top3Services'][1]['service']}, {deet['top3Services'][1]['count']} services</ListItem>
            <ListItem m={"2px"}>{deet['top3Services'][2]['service']}, {deet['top3Services'][2]['count']} services</ListItem>
          </OrderedList>
          </Center>
        </Box>
        </GridItem>
        </Grid>
      </div>
  ));

    //admin view users
    useEffect(() => {
      fetch("/adminSettings", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.json()).then(
          adminSettings => {
            setAdminSettings(adminSettings)
          })
    }, [])
    
    const adminView = adminSettings.map((adminDeet,index) => (
      <Tr key={index}>
        <Td>{index+1}</Td>
        <Td>{adminDeet['username']}</Td>
        <Td>{adminDeet['email']}</Td>
        <Td>
          <Button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this user?')) {
                fetch(`/adminSettings/deleteUser/${adminDeet['username']}`, {
                  method: 'POST',
                })
                .then(res => res.json())
                .then(adminSettings => console.log(adminSettings))
                refresh();
              }
            }}>
            Delete User
          </Button>
        </Td>
      </Tr>
    ));
  
  return (
    <div>
      <Navbar />
      <Heading mt="20px" textAlign={'center'}>Hello {user.username}</Heading>
      <Box
      id={styles.mainContainer}
      display="flex"
      borderRadius="10px"
      width="90%"
      height="1000px"
      margin="auto"
      marginTop="20 px"
      >
        <Box w="100%" h="50%" id={styles.subContainer}>
          <Image
            objectFit="cover"
            object-position= "-20% 0"
            w="100%"
            h="50%"
            id={styles.img}
            src="https://api.time.com/wp-content/uploads/2015/04/dog-child.jpg"
            alt="loginImage"
            borderRadius="10px"
            mt="20px"
          />
          <Tabs index={selectedTab} onChange={setSelectedTab}>
            <TabList>
              <Tab>Hired Sitters</Tab>
              <Tab>My Jobs</Tab>
              {user.username == "admin" && <Tab>Admin Dashboard</Tab>}
              {user.username == "admin" && <Tab>Admin User Settings</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
                {user.username !== "" ? (
                <div>
                  <h3>Hired Sitters</h3>
                  <Table variant="simple">
                    <Thead>
                      <Tr style={{ backgroundColor: "#ECECEC", textAlign: "left", padding: "10px" }}>
                        <Th style={{ width: "10%" }}>ID</Th>
                        <Th style={{ width: "20%" }}>Sitter</Th>
                        <Th style={{ width: "40%" }}>Sitter Email</Th>
                        <Th style={{ width: "20%" }}>Job Status</Th>
                        <Th style={{ width: "20%" }}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {jobItems}
                    </Tbody>
                  </Table>
                </div>
                ) : (
                  <p>Please log in to view jobs</p>
                )}
              </TabPanel>
              <TabPanel>
                {user.username !== "" ? (
                <div>
                  <h3>My Jobs</h3>
                  <Table variant="simple">
                    <Thead>
                      <Tr style={{ backgroundColor: "#ECECEC", textAlign: "left", padding: "10px" }}>
                        <Th style={{ width: "10%" }}>ID</Th>
                        <Th style={{ width: "20%" }}>Hirer</Th>
                        <Th style={{ width: "40%" }}>Hirer Email</Th>
                        <Th style={{ width: "20%" }}>Job Status</Th>
                        <Th style={{ width: "20%" }}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {myJobItems}
                    </Tbody>
                  </Table>
                </div>
                ) : (
                  <p>Please log in to view jobs</p>
                )}
              </TabPanel>
              {user.username == "admin" && (
                <TabPanel>
                  <div>
                    {adminItems}
                  </div>
                </TabPanel>
              )}
              {user.username == "admin" && (
                <TabPanel>
                  <h3>Admin User Settings</h3>
                  <Table variant="simple">
                    <Thead>
                      <Tr style={{ backgroundColor: "#ECECEC", textAlign: "left", padding: "10px" }}>
                        <Th style={{ width: "10%" }}>ID</Th>
                        <Th style={{ width: "10%" }}>Username</Th>
                        <Th style={{ width: "20%" }}>Email</Th>
                        <Th style={{ width: "20%" }}>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {adminView}
                    </Tbody>
                  </Table>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}

export default Home;