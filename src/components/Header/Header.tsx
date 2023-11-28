import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import {
  EuiHeader,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/FirebaseConfig";
import { changeTheme } from "../../app/slices/AuthSlice";
import {
  getCreatedMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../../utils/breadCrumbs";
import { getOneonOneBreadCrumbs } from "../../utils/breadCrumbs";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: "Dashboard" }]);
  const dispatch = useDispatch();
  // const username = useAppSelector((riverside) => riverside.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((riverside) => riverside.auth.isDarkTheme);
  const [isResponsive, setIsresponsive] = useState(false);

  const logout = () => {
    signOut(auth);
  };

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/create") {
      setBreadCrumbs(getCreatedMeetingBreadCrumbs(navigate));
    } else if (pathname === "/create1on1") {
      setBreadCrumbs(getOneonOneBreadCrumbs(navigate));
    } else if (pathname === "/createvideoconference") {
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const section = [
    {
      items: [
        <Link to="/">
          <div style={{ padding: "0 1vh" }}>
            <EuiImage src={images.riverside_logo} alt="logo" size="57px" />
          </div>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="invert-theme-button                                                                                                               -button "
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                //   color=""
                display="fill"
                size="s"
                aria-label="invert-theme-button                                                                                                              -button "
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button                                                                                                               -button "
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <div style={{ padding: "0 3vh" }}>
            <EuiImage src={images.riverside_logo} alt="logo" size="57px" />
          </div>
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) setIsresponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[{ breadcrumbs: breadCrumbs }]}
      />
    </>
  );
};

export default Header;
