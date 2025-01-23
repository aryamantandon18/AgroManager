import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("not logged");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      {userDetails ? (
        <>
          <h1>{userDetails.firstName}</h1>
          <h1>{userDetails.lastName}</h1>
          <h1>{userDetails.email}</h1>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </Box>
  );
}
