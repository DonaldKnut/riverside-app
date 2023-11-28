import React from "react";
import images from "../../assets/images";
import { FaGoogle } from "react-icons/fa";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/AuthSlice";
import "./Login.css";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userRef } from "../../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/dashboard");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(auth, provider);
    // console.log({data});
    if (email) {
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUsers = await getDocs(firestoreQuery);
      if (fetchedUsers.docs.length === 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({ uid, name: displayName, email }));
    navigate("/dashboard");
  };
  return (
    <>
      <EuiProvider colorMode="dark">
        <EuiFlexGroup
          alignItems="center"
          justifyContent="center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <EuiFlexItem grow={false}>
            <EuiPanel paddingSize="xl">
              <EuiFlexGroup justifyContent="center" alignItems="center">
                <EuiFlexItem>
                  <EuiImage src={images.loginImage} alt="logo" size="277px" />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiImage
                    src={images.riverside_logo}
                    alt="chat logo"
                    size="188px"
                  />
                  {/* <EuiImage
                    src={images.riverside}
                    alt="chat logo"
                    size="159px"
                  /> */}
                  <EuiSpacer size="xs" />
                  <EuiText>
                    <h3 style={{ textAlign: "center" }}>
                      <EuiTextColor>One Platform to</EuiTextColor>
                      <EuiTextColor color="#e84872"> Connect</EuiTextColor>
                    </h3>
                  </EuiText>
                  <EuiSpacer size="l" />
                  <EuiButton
                    fill
                    className="button"
                    style={{
                      backgroundColor: "#e84872",
                      color: "#fff",
                      fontFamily: "inherit",
                    }}
                    onClick={login}
                  >
                    <FaGoogle />
                    Login with Google
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiProvider>
    </>
  );
};

export default Login;
