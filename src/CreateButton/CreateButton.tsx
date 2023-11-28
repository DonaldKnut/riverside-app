import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const CreateButton = ({ createMeeting }: { createMeeting: () => void }) => {
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
            Create <IoCreate />
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default CreateButton;
