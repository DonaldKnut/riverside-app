import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MeetingType } from "../../utils/Types";
import { meetingsRef } from "../../utils/FirebaseConfig";
import { useAppSelector } from "../../app/hooks";
import { query, where, getDocs } from "firebase/firestore";

const MyMeetings = () => {
  useAuth();
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const userInfo = useAppSelector((riverside) => riverside.auth.userInfo);
  useEffect(() => {
    if (userInfo) {
      const getMyMeetings = async () => {
        const firestoreQuery = query(
          meetingsRef,
          where("createdBy", "==", userInfo?.uid)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const myMeetings: Array<MeetingType> = [];
          fetchedMeetings.forEach((meeting) => {
            myMeetings.push({
              docId: meeting.id,
              ...(meeting.data() as MeetingType),
            });
          });
          setMeetings(myMeetings);
        }
      };
      console.log({ meetings });
      getMyMeetings();
    }
  }, [userInfo]);

  return <div>MyMeetings</div>;
};

export default MyMeetings;
