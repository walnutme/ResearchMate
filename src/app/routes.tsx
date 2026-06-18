import { createBrowserRouter, Navigate } from "react-router";
import Landing from "../pages/Landing";
import Onboarding from "../pages/Onboarding";
import ProjectSetup from "../pages/ProjectSetup";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AppShell from "../components/layout/AppShell";
import Dashboard from "../pages/Dashboard";
import DailyPlan from "../pages/DailyPlan";
import MissionWorkspace from "../pages/MissionWorkspace";
import Sources from "../pages/Sources";
import ArgumentBuilder from "../pages/ArgumentBuilder";
import DraftWriter from "../pages/DraftWriter";
import Community from "../pages/Community";
import PeerReview from "../pages/PeerReview";
import FinalCheck from "../pages/FinalCheck";
import Profile from "../pages/Profile";
import { ProtectedRoute, PublicRoute } from "../components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/setup",
    element: (
      <ProtectedRoute>
        <ProjectSetup />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/home",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/plan",
        element: <DailyPlan />,
      },
      {
        path: "/plan/:missionId",
        element: <MissionWorkspace />,
      },
      {
        path: "/sources",
        element: <Sources />,
      },
      {
        path: "/arguments",
        element: <ArgumentBuilder />,
      },
      {
        path: "/draft",
        element: <DraftWriter />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/peer-review",
        element: <PeerReview />,
      },
      {
        path: "/final-check",
        element: <FinalCheck />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
