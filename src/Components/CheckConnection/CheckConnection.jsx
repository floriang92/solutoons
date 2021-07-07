import React from "react";
import { AuthContext } from "../../Store/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Login from "../../Pages/Login";
import LoadingPage from "../../Pages/LoadingPage";
import axios from "axios";

function CheckConnection() {
  const { authState } = React.useContext(AuthContext);
  const [body, setBody] = React.useState();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/v1/users/profile",
      headers: { Authorization: "Bearer " + authState.token },
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setChecked(true);
        } else {
          console.log("Wrong token");
          setChecked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authState.token]);

  React.useEffect(() => {
    if (checked) {
      setBody(<BrowserRouter><Layout/></BrowserRouter>);

    } else if (checked === false || authState.token === null) {
      setBody(<Login />);
    } else {
      setBody(<LoadingPage/>);

    }
  }, [authState.token, checked]);

  return <div>{body}</div>;
}

export default CheckConnection;
