import React, {useContext} from "react";
import Navbar from "../NavigationBar/Navbar";
import { userContext, IUser, IUserDetails } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
function Help() {
  const { user, setUser} = useContext(userContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user.email) console.log("no user");
  }, [])

  function handleLogout() {
    const logOut : IUserDetails = {
      username: "",
      email: ""
    }
    setUser(logOut)
    navigate("/")
  }
  
  return (
    <div>
      <Navbar />
      {!user.email && <Navigate to="/login" />}
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <Button
            m="20px"
            onClick={() => handleLogout()}
            padding="5px"
            border="2px solid gray"
            borderRadius="5px"
            bgColor="white"
            textColor="black"
            disabled={false}>
              Logout
      </Button>
      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default Help;
