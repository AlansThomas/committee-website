import React, { useState, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import "./routes.css";
import SimpleLayout from "./Layouts/simple/SimpleLayout";
import Committee from "./Screens/Admin/admincommittee/Committee";
//Components Pages <App />
import DashboardAppPage from "./Screens/Admin/adminhomepage/DashboardAppPage";

//////jwt login
import ResetPassword from "./Screens/LoginScreen/ResetPassword";
import OtpConfirm from "./Screens/LoginScreen/OtpConfirm";
import Login from "./components/Login";
import Newpassword from "./Screens/LoginScreen/Newpassword";
import Pole from "./Screens/committe/Poll/Polls";
import PollList from "./Screens/committe/PollList/PollList";
import ViewPoll from "./Screens/Innovature/components/ListPoll/ViewPoll";
import DashBoardHead from "./Screens/committe/Dashboard/DashBoardHead";
import Glimpses from "./Screens/Admin/Glimpses/Glimpses";

const DetailedView = lazy(() => import("./Screens/Admin/Quaters/DetailedView"));
const GroupMember = lazy(() =>
  import("./Screens/Admin/Groups/AddMember/GroupMember")
);
const Groups = lazy(() => import("./Screens/Admin/Groups/Group/Groups"));
const Page404 = lazy(() => import("./Screens/Admin/Page404"));
const ViewpostAdmin = lazy(() =>
  import("./Screens/Admin/Adminfeed/ViewPost/ViewpostAdmin")
);
const EventsMain = lazy(() => import("./Screens/Admin/AllEvents/EventsMain"));
const PointList = lazy(() =>
  import("./Screens/Admin/Points/PointList/PointsList")
);
const GroupPoints = lazy(() =>
  import("./Screens/Admin/Points/GroupPoints/Grouppoints")
);
const Home = lazy(() => import("./Screens/Innovature/pages/home/Home"));
const Feed = lazy(() => import("./Screens/Innovature/components/feed/Feed"));
const EventInno = lazy(() =>
  import("./Screens/Innovature/pages/EvntsList/EventList")
);
const Share = lazy(() =>
  import("./Screens/Innovature/components/SharedPage/SharedPage")
);
const EventHistory = lazy(() =>
  import("./Screens/Admin/AllEvents/EventHisory/EventHistory")
);
const Event = lazy(() => import("./Screens/committe/Event/Event"));
const ListPoint = lazy(() =>
  import("./Screens/committe/Ponit/EventPoint/ListPoint")
);
const Games = lazy(() => import("./Screens/committe/Game/Games"));
const ListGames = lazy(() => import("./Screens/committe/GameList/ListGames"));
const HomeCommitte = lazy(() =>
  import("./Screens/committe/Home/feed/Feed.jsx")
);
const Adminfeed = lazy(() =>
  import("./Screens/Admin/Adminfeed/AdminFeed/adminfeed")
);
const Profile = lazy(() =>
  import("./Screens/Innovature/components/profile/profile")
);
const EventList = lazy(() => import("./Screens/committe/EventList/EventList"));
const PointTableLive = lazy(() =>
  import("./Screens/Innovature/components/InnoPointTable/pointTableLive")
);
const Shares = lazy(() =>
  import("./Screens/committe/Home/SharedPage/SharedPage")
);
const RepotedPost = lazy(() =>
  import("./Screens/Admin/ReportedPost/ReportedPost")
);
const NotifiedPost = lazy(() =>
  import("./Screens/Innovature/components/NotificationPost/NotificatifiedPost")
);
const CommitteeNotifiedPost = lazy(() =>
  import("./Screens/committe/NotifiedPost/NotifiedPost")
);
const ProfileTagged = lazy(() =>
  import("./Screens/Admin/TagedUserProfiles/ProfileTaged")
);
const TaggedUserProfile = lazy(() =>
  import("./Screens/committe/TagedUsersProfile/TagedUserProfile")
);
const TaggedProfile = lazy(() =>
  import("./Screens/Innovature/components/TagedProfile/TagedProfile")
);
const PendingList = lazy(() =>
  import("./Screens/Admin/Points/PendingAndReported/PendingList")
);
const ExpiredOrActivePolls = lazy(() =>
  import("./Screens/Innovature/components/poll/expiredOrActivePolls")
);
const Quaters = lazy(() => import("./Screens/Admin/Quaters/Quaters"));
const Dashboard = lazy(() => import("./Screens/Admin/DashBoard/Dashboard"));
const Employee = lazy(() => import("./Screens/Admin/Adminusers/Employee"));

// ----------------------------------------------------------------------

export default function Routes() {
  const [refreshnav, setrefreshnav] = useState();
  const refreshnavbar = (data) => {
    setrefreshnav(data);
  };

  return (
    <Suspense fallback={<div id="loader" />}>
      {useRoutes([
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: "app", element: <DashboardAppPage /> },
            {
              path: "Groups",
              children: [
                { path: "", element: <Groups /> },
                { path: "groupMember", element: <GroupMember /> },
              ],
            },
            {
              path: "quaters",
              children: [
                { path: "", element: <Quaters /> },
                { path: "detailedView", element: <DetailedView /> },
              ],
            },
            { path: "Committee", element: <Committee /> },
            { path: "employees", element: <Employee /> },
            { path: "events", element: <EventsMain /> },
            { path: "eventHistory", element: <EventHistory /> },
            { path: "pointlist", element: <PointList /> },
            { path: "grouppoints", element: <GroupPoints /> },
            { path: "adminfeed", element: <Adminfeed /> },
            { path: "viewpostAdmin", element: <ViewpostAdmin /> },
            { path: ":variable", element: <ProfileTagged /> },
            {
              path: "RepotedPost/:variable/ReportedPost",
              element: <RepotedPost />,
            },
            {
              path: "RepotedPost/:variable/:variable",
              element: <ProfileTagged />,
            },
            { path: "PendingList", element: <PendingList /> },
            { path: "Glimpses", element: <Glimpses /> },
          ],
        },
        {
          path: "/dashboardInno",
          element: <Home refreshnavInHome={refreshnav} />,
          children: [
            { element: <Navigate to="/dashboardInno/feed" />, index: true },
            { path: "eventPoints", element: <PointTableLive /> },
            { path: "eventPoints/gropStandings", element: <PointTableLive /> },
            { path: "Events", element: <EventInno /> },
            { path: "feed", element: <Feed /> },
            { path: "feed/:variable", element: <Feed /> },
            { path: "profile", element: <Profile re={refreshnavbar} /> },
            { path: "Share/:variable/postShare", element: <Share /> },
            {
              path: "feed/NotifiedPost/:variable/NotifiedPost",
              element: <NotifiedPost />,
            },
            { path: "profile/Share/:variable", element: <Share /> },
            { path: "viewPoll/:variable", element: <ViewPoll /> },
            { path: ":variable", element: <TaggedProfile /> },
            {
              path: "feed/NotifiedPost/:variable/:variable",
              element: <TaggedProfile />,
            },
            { path: "Share/:variable/:variable", element: <TaggedProfile /> },
            { path: "polls", element: <ExpiredOrActivePolls /> },
          ],
        },
        {
          path: "/dashboardCommitte",
          element: <DashBoardHead />,
          children: [
            { element: <Navigate to="/dashboardCommitte/Home" />, index: true },
            { path: "Event", element: <Event /> },
            { path: "Games", element: <Games /> },
            { path: "ListGames", element: <ListGames /> },
            { path: "Home", element: <HomeCommitte /> },
            { path: "EventList", element: <EventList /> },
            { path: "EventPoint", element: <ListPoint /> },
            { path: "Home/Share/:variable/postShare", element: <Shares /> },
            {
              path: "Home/NotifiedPost/:variable/NotifiedPost",
              element: <CommitteeNotifiedPost />,
            },
            { path: "pole", element: <Pole /> },
            { path: "pollList", element: <PollList /> },
            { path: ":variable", element: <TaggedUserProfile /> },
            {
              path: "Home/NotifiedPost/:variable/:variable/",
              element: <TaggedUserProfile />,
            },
            { path: ":variable/Share/:variable", element: <Shares /> },
            {
              path: "Home/Share/:variable/:variable",
              element: <TaggedUserProfile />,
            },
          ],
        },
        {
          path: "/ResetPassword",
          element: <ResetPassword></ResetPassword>,
          index: true,
        },
        {
          path: "/NewPassword",
          element: <Newpassword></Newpassword>,
          index: true,
        },

        { path: "/", element: <Login></Login>, index: true },
        {
          path: "/OtpConfirm",
          element: <OtpConfirm></OtpConfirm>,
          index: true,
        },
        {
          element: <SimpleLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: "404", element: <Page404 /> },
            { path: "*", element: <Navigate to="/404" /> },
          ],
        },

        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ])}
    </Suspense>
  );
}
