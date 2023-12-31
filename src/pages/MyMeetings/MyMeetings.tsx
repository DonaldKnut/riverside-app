import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { MeetingType } from "../../utils/Types";
import { meetingsRef } from "../../utils/FirebaseConfig";
import { useAppSelector } from "../../app/hooks";
import { getDocs } from "firebase/firestore";
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
import EditFlyout from "../../components/EditFlyout/EditFlyout";

const MyMeetings = () => {
  useAuth();
  const [meetings, setMeetings] = useState<any>([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType>();
  const userInfo = useAppSelector((riverside) => riverside.auth.userInfo);
  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };
  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };
  const getMyMeetings = async () => {
    const fetchedMeetings = await getDocs(meetingsRef);
    if (fetchedMeetings.docs.length) {
      const myMeetings = fetchedMeetings.docs.map((meeting) => ({
        docId: meeting.id,
        ...(meeting.data() as MeetingType),
      }));
      setMeetings(myMeetings);
      console.log({ meetings: myMeetings });
    }
  };
  useEffect(() => {
    getMyMeetings();
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
      field: "",
      name: "Edit",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              !meeting.status ||
              moment(meeting.meetingDate).isBefore(moment().format("L"))
            }
            onClick={() => {
              openEditFlyout(meeting);
            }}
          />
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
      {showEditFlyout && (
        <EditFlyout closeFlyout={closeEditFlyout} meetings={editMeeting!} />
      )}
    </div>
  );
};

export default MyMeetings;
