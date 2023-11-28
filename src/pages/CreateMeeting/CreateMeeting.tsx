import React from "react";
import Header from "../../components/Header/Header";
import useAuth from "../../hooks/useAuth";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  const navigate = useNavigate();
  useAuth();
  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vh" }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage size="6rem" alt="icon" src={images.oneOne} />}
              title={`Create 1 on 1 meeting`}
              description="Create a personal single person meeting."
              onClick={() => navigate("/create1on1")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={
                <EuiImage size="6rem" alt="icon" src={images.conferenceImage} />
              }
              title={`Create Video Conference`}
              description="Invite multiple persons to a meeting."
              onClick={() => navigate("/createvideoconference")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default CreateMeeting;
