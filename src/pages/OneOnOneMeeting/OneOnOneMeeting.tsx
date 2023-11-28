import React, { useState } from "react";
import Header from "../../components/Header/Header";
import {
  EuiFlexGroup,
  EuiForm,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { useAppSelector } from "../../app/hooks";
import MeetingNameField from "../../components/FormComponents/MeetingNameField";
import { FaUserCircle } from "react-icons/fa";
import "./OneOnOneMeeting.css";
import MeetingUsersField from "../../components/FormComponents/MeetingUsersField";
import useAuth from "../../hooks/useAuth";
import useFetchUsers from "../../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../CreateMeetingButtons/CreateMeetingButtons";
import { FieldErrorType, UserType } from "../../utils/Types";
import { addDoc } from "firebase/firestore";
import { meetingsRef } from "../../utils/FirebaseConfig";
import { generateMeetingId } from "../../utils/generateMeetingId";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

const OneOnOneMeeting = () => {
  const username = useAppSelector((riverside) => riverside.auth.userInfo?.name);
  const uid = useAppSelector((riverside) => riverside.auth.userInfo?.name);
  const [meetingName, setMeetingName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [createToast] = useToast();
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: { show: false, message: [] },
    meetingUser: { show: false, message: [] },
  });
  const navigate = useNavigate();

  useAuth();
  const [users] = useFetchUsers();

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingId();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: "One on One Meeting Created Successfully",
        type: "success",
      });
      navigate("/dashboard");
    }
  };

  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = { ...showErrors };
    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true;
      clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      clonedShowErrors.meetingName.show = false;
      clonedShowErrors.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ["Please Select a User"];
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      {username && (
        <EuiText style={{ margin: "13px auto" }}>
          <h3
            style={{
              display: "flex",
              margin: "auto",
              width: "80%",
            }}
          >
            <FaUserCircle
              className="user_circle_icon"
              style={{ fontSize: "29px", margin: "6px 5px" }}
            />
            <EuiTextColor color="#638bb2">Hello, </EuiTextColor>
            <EuiTextColor color="rgb(238 120 51)">{username}</EuiTextColor>
          </h3>
        </EuiText>
      )}
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <label htmlFor="">Meeting Name</label>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default OneOnOneMeeting;
