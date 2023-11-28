import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import { setUser } from "../app/slices/AuthSlice";
// import { unsubscribe } from "diagnostics_channel";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (!currentUser) navigate("/login");
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
          })
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
};

export default useAuth;
