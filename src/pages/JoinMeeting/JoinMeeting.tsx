import { onAuthStateChanged } from "firebase/auth";
import { auth, meetingsRef } from "../../utils/FirebaseConfig";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { generateMeetingId } from "../../utils/generateMeetingId";

const JoinMeeting = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [createToast] = useToast();
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
    setUserLoaded(true);
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        if (params.id && userLoaded) {
          const firestoreQuery = query(
            meetingsRef,
            where("meetingId", "==", params.id)
          );
          const fetchedMeetings = await getDocs(firestoreQuery);
          if (fetchedMeetings.docs.length) {
            const meeting = fetchedMeetings.docs[0].data();
            const isCreator = meeting.createdBy === user?.id;
            if (meeting.meetingType === "1-on-1") {
              if (meeting.invitedUsers[0] === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has Ended.", type: "danger" });
                navigate(user ? "/dashboard" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/dashboard" : "/login");
              } else {
                navigate(user ? "/dashboard" : "/login");
              }
            } else if (meeting.meetingType === "video-conference") {
              const index = meeting.invitedUsers.findIndex(
                (invitedUser: string) => invitedUser === user?.id
              );
              if (index !== -1 || isCreator) {
                if (meeting.meetingDate === moment().format("L")) {
                  setIsAllowed(true);
                } else if (
                  moment(meeting.meetingDate).isBefore(moment().format("L"))
                ) {
                  createToast({
                    title: `Meeting has Ended.`,
                    type: "danger",
                  });
                  navigate(user ? "/dashboard" : "/login");
                } else if (moment(meeting.meetingDate).isAfter()) {
                  createToast({
                    title: `Meeting is on ${meeting.meetingDate}`,
                    type: "warning",
                  });
                } else {
                  createToast({
                    title: `You are not invited to this meeting`,
                    type: "danger",
                  });
                  navigate(user ? "/" : "/login");
                }
              }
            } else {
              setIsAllowed(true);
            }
          } else {
            navigate("/create");
          }
        }
      }
    };
    getMeetingData();
  }, [userLoaded]);

  const appId = 1555844265;
  const serverSecret = "b3cf502b83e1ec351ea647020139faef";

  const liveStreaming = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id as string,
      user.uid ? user.uid : generateMeetingId(),
      user.displayName ? user.displayName : generateMeetingId()
    );
    // console.log(kitToken);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal Link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };

  return (
    <div>
      {isAllowed && (
        <div
          className="myCallContainer"
          ref={liveStreaming}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      )}
    </div>
  );
};

export default JoinMeeting;
