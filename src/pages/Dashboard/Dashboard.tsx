import React from "react";
import { useAppSelector } from "../../app/hooks";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import images from "../../assets/images";
import Header from "../../components/Header/Header";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const username = useAppSelector((riverside) => riverside.auth.userInfo?.name);
  useAuth();
  const navigate = useNavigate();

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
            <FaUserCircle style={{ fontSize: "29px", margin: "6px 5px" }} />
            <EuiTextColor color="#638bb2">Hello, </EuiTextColor>
            <EuiTextColor color="rgb(238 120 51)">{username}</EuiTextColor>
          </h3>
        </EuiText>
      )}
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: "5vh 10vh" }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="4rem" alt="icon" src={images.meetingIcon} />}
            title={`My Meetings`}
            description="View your created Meetings."
            onClick={() => navigate("/my_meetings")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="40%" alt="icon" src={images.createMeet} />}
            title={`Create Meeting`}
            description="Create a meeting and invite people."
            onClick={() => navigate("/create")}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage size="4rem" alt="icon" src={images.my_meetings_icon} />
            }
            title={`Meeting`}
            description="Check meetings that you are invited to."
            onClick={() => navigate("/meetings")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Dashboard;
