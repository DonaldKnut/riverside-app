import { useEffect, useState } from "react";
import { query, where, getDocs } from "firebase/firestore";
import { useAppSelector } from "../app/hooks";
import { userRef } from "../utils/FirebaseConfig";
import { UserType } from "../utils/Types";

const useFetchUsers = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((riverside) => riverside.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUsers = async () => {
        const firestoreQuery = query(userRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);

        const firebaseUsers: Array<UserType> = [];
        data.forEach((user) => {
          const userData = user.data() as UserType;
          firebaseUsers.push({ ...userData, label: userData.name });
        });
        setUsers(firebaseUsers);
      };
      getUsers();
    }
  }, [uid]);
  return [users];
};

export default useFetchUsers;
