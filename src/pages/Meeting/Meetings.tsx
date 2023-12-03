import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MeetingType } from "../../utils/Types";
import { meetingsRef } from "../../utils/FirebaseConfig";
import { useAppSelector } from "../../app/hooks";
import { getDocs, query } from "firebase/firestore";
import Header from "../../components/Header/Header";
import { IoEnterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { MdMissedVideoCall } from "react-icons/md";
import { HiPhoneIncoming } from "react-icons/hi";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiBasicTable,
  EuiCopy,
  EuiButtonIcon,
  EuiBadge,
} from "@elastic/eui";
import moment from "moment";

const Meetings = () => {
  useAuth();
  const [meetings, setMeetings] = useState<any>([]);
  const userInfo = useAppSelector((riverside) => riverside.auth.userInfo);

  useEffect(() => {
    const getUserMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === userInfo?.uid) {
            myMeetings.push(data);
          } else if (data.meetingType === "anyone-can-join") {
            myMeetings.push(data);
          } else {
            const index = data.invitedUsers.findIndex(
              (user) => user === userInfo?.uid
            );
            if (index !== -1) {
              myMeetings.push(data);
            }
          }
        });
        setMeetings(myMeetings);
        console.log({ meetings: myMeetings });
      }
    };
    getUserMeetings();
  }, [userInfo]);

  const columns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="#7bda3b">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                    alignItems: "center",
                    padding: "5px 6px",
                  }}
                >
                  Join Now <IoEnterSharp />
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return (
              <EuiBadge
                color="default"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "7px",
                  alignItems: "center",
                  padding: "5px 9px",
                }}
              >
                Ended{" "}
                <MdMissedVideoCall style={{ fontSize: "18px", color: "red" }} />
              </EuiBadge>
            );
          } else {
            return (
              <EuiBadge
                color="primary"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  alignItems: "center",
                  padding: "5px 6px",
                }}
              >
                Upcoming
                <HiPhoneIncoming style={{ fontSize: "14px", color: "white" }} />
              </EuiBadge>
            );
          }
        } else
          return (
            <EuiBadge
              color="danger"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                alignItems: "center",
                padding: "5px 6px",
              }}
            >
              Cancelled <MdCancel />
            </EuiBadge>
          );
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Meetings;
