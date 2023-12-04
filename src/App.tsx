// import React from "react";
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from "@elastic/eui";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting/CreateMeeting";
import Main from "./pages/Main/Main";
import OneOnOneMeeting from "./pages/OneOnOneMeeting/OneOnOneMeeting";
import { setToasts } from "./app/slices/MeetingSlice";
import VideoConference from "./pages/VideoConference/VideoConference";
import MyMeetings from "./pages/MyMeetings/MyMeetings";
import Meetings from "./pages/Meeting/Meetings";
import JoinMeeting from "./pages/JoinMeeting/JoinMeeting";

const App = () => {
  const dispatch = useAppDispatch();

  const isDarkTheme = useAppSelector((riverside) => riverside.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true);
  const toasts = useAppSelector((riverside) => riverside.meetings.toasts);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, [isInitialTheme]);

  useEffect(() => {
    if (isInitialTheme) setIsInitialTheme(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#e84878" },
      DARK: { primary: "#000" },
    },
  };
  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removeToast.id)
      )
    );
  };
  return (
    <>
      <ThemeSelector>
        <EuiProvider colorMode={theme}>
          <EuiThemeProvider modify={overrides}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateMeeting />} />
              <Route path="/create1on1" element={<OneOnOneMeeting />} />
              <Route
                path="/createvideoconference"
                element={<VideoConference />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my_meetings" element={<MyMeetings />} />
              <Route path="/join/:id" element={<JoinMeeting />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/" element={<Main />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <EuiGlobalToastList
              toasts={toasts}
              dismissToast={removeToast}
              toastLifeTimeMs={5000}
            />
          </EuiThemeProvider>
        </EuiProvider>
      </ThemeSelector>
    </>
  );
};

export default App;
