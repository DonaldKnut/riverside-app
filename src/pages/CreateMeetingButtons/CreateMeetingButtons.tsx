import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const CreateMeetingButtons = ({
  createMeeting,
}: {
  createMeeting: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton
            color="danger"
            fill
            onClick={() => navigate("/dashboard")}
            style={{ fontFamily: "inherit" }}
          >
            Cancel <MdCancel />
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            style={{
              backgroundColor: "#e84872",
              fontFamily: "inherit",
              color: "#fff",
            }}
            fill
            onClick={createMeeting}
          >
            Submit <RiSendPlane2Fill />
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default CreateMeetingButtons;
