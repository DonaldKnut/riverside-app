import { useEffect, useState } from "react";
import { MeetingType } from "../../utils/Types";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";
import useFetchUsers from "../../hooks/useFetchUsers";
import moment from "moment";
import { FieldErrorType } from "../../utils/Types";
import { UserType } from "../../utils/Types";
import { firebaseDB } from "../../utils/FirebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from "@elastic/eui";
import MeetingNameField from "../FormComponents/MeetingNameField";
import MeetingMaximumUserField from "../FormComponents/MeetingMaximumUserField";
import MeetingUsersField from "../FormComponents/MeetingUsersField";
import MeetingDateField from "../FormComponents/MeetingDateField";
import CreateMeetingButtons from "../../pages/CreateMeetingButtons/CreateMeetingButtons";

const EditFlyout = ({
  closeFlyout,
  meetings,
}: {
  closeFlyout: any;
  meetings: MeetingType;
}) => {
  useAuth();
  const [createToast] = useToast();
  const [users] = useFetchUsers();
  const [meetingName, setMeetingName] = useState(meetings.meetingName);
  const [meetingType] = useState(meetings.meetingDate);
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment(meetings.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: { show: false, message: [] },
    meetingUser: { show: false, message: [] },
  });
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = [];
      meetings.invitedUsers.forEach((user: string) => {
        const findUsers = users.find(
          (tempUser: UserType) => tempUser.uid === user
        );
        if (findUsers) foundUsers.push(findUsers);
      });
      setSelectedUsers(foundUsers);
    }
  }, [meetings, users]);

  const editMeeting = async () => {
    const editedMeeting = {
      ...meetings,
      invitedUsers: selectedUsers.map((user: UserType) => user.uid),
      maxUsers: size,
      meetingName,
      meetingDate: startDate.format("L"),
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, "meetings", meetings.docId!);
    await updateDoc(docRef, editedMeeting);
    createToast({ title: "Meeting updated Successfully.", type: "success" });
    closeFlyout(true);
  };
  return (
    <>
      <EuiFlyout ownFocus onClose={() => closeFlyout}>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>{meetings.meetingName}</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiForm>
            <MeetingNameField
              label="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Meeting Name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
            {meetingType === "anyone-can-join" ? (
              <MeetingMaximumUserField value={size} setValue={setSize} />
            ) : (
              <MeetingUsersField
                label="Invite Users"
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
                onChange={onUserChange}
                selectedOptions={selectedUsers}
                singleSelection={
                  meetingType === "1-on-1" ? { asPlainText: true } : false
                }
                isClearable={false}
                placeholder="Select a User"
                options={users}
              />
            )}
            <MeetingDateField
              selected={startDate}
              setStartDate={setStartDate}
            />
            <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
              <EuiSwitch
                showLabel={false}
                label="Cancel Meeting"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </EuiFormRow>
            <EuiSpacer />
            <CreateMeetingButtons
              createMeeting={editMeeting}
              isEdit
              closeFlyout={closeFlyout}
            />
          </EuiForm>
        </EuiFlyoutBody>
      </EuiFlyout>
    </>
  );
};

export default EditFlyout;
