import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  mockUsers,
  mockTherapySessions,
  mockNotifications,
  mockFeedback,
  getPatientSessions,
  getPatientNotifications,
  getPatientFeedback,
  getPatientProgress,
} from "../services/mockData";

const AppContext = createContext();

// Action types
const ActionTypes = {
  SET_USER_ROLE: "SET_USER_ROLE",
  SET_CURRENT_PATIENT: "SET_CURRENT_PATIENT",
  UPDATE_SESSION: "UPDATE_SESSION",
  ADD_FEEDBACK: "ADD_FEEDBACK",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  REQUEST_SESSION: "REQUEST_SESSION",
  APPROVE_SESSION: "APPROVE_SESSION",
  DENY_SESSION: "DENY_SESSION",
};

// Initial state
const initialState = {
  userRole: null, // 'patient' or 'practitioner'
  currentPatient: null,
  sessions: mockTherapySessions,
  notifications: mockNotifications,
  feedback: mockFeedback,
  users: mockUsers,
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload.role,
        currentPatient: action.payload.patient,
      };

    case ActionTypes.SET_CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };

    case ActionTypes.UPDATE_SESSION:
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.payload.id
            ? { ...session, ...action.payload.updates }
            : session
        ),
      };

    case ActionTypes.ADD_FEEDBACK:
      return {
        ...state,
        feedback: [...state.feedback, action.payload],
      };

    case ActionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
      };

    case ActionTypes.REQUEST_SESSION:
      const newSession = {
        ...action.payload,
        id: `session_${Date.now()}`,
        status: "requested",
      };
      return {
        ...state,
        sessions: [...state.sessions, newSession],
      };

    case ActionTypes.APPROVE_SESSION:
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.payload
            ? { ...session, status: "upcoming" }
            : session
        ),
      };

    case ActionTypes.DENY_SESSION:
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.payload
            ? { ...session, status: "denied" }
            : session
        ),
      };

    default:
      return state;
  }
};

// Context Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, isLoaded } = useUser();

  // Determine user role based on email domain or metadata
  useEffect(() => {
    if (isLoaded && user) {
      const email = user.emailAddresses[0]?.emailAddress;

      // Check if practitioner (domain-based or metadata)
      const isPractitioner =
        email?.includes("@ayursutra.com") ||
        user.publicMetadata?.role === "practitioner";

      if (isPractitioner) {
        dispatch({
          type: ActionTypes.SET_USER_ROLE,
          payload: { role: "practitioner", patient: null },
        });
      } else {
        // Find patient by email
        const patient = mockUsers.patients.find((p) => p.email === email);
        dispatch({
          type: ActionTypes.SET_USER_ROLE,
          payload: {
            role: "patient",
            patient: patient || {
              id: user.id,
              name: user.fullName || "Patient",
              email: email,
              age: 0,
              dosha: "Not assessed",
              condition: "General wellness",
            },
          },
        });
      }
    }
  }, [user, isLoaded]);

  // Helper functions
  const getUserSessions = (userId = null) => {
    const targetId = userId || state.currentPatient?.id;
    if (!targetId) return [];
    return getPatientSessions(targetId);
  };

  const getUserNotifications = (userId = null) => {
    const targetId = userId || state.currentPatient?.id;
    if (!targetId) return [];
    return getPatientNotifications(targetId);
  };

  const getUserFeedback = (userId = null) => {
    const targetId = userId || state.currentPatient?.id;
    if (!targetId) return [];
    return getPatientFeedback(targetId);
  };

  const getUserProgress = (userId = null) => {
    const targetId = userId || state.currentPatient?.id;
    if (!targetId) return null;
    return getPatientProgress(targetId);
  };

  const updateSession = (sessionId, updates) => {
    dispatch({
      type: ActionTypes.UPDATE_SESSION,
      payload: { id: sessionId, updates },
    });
  };

  const addFeedback = (feedbackData) => {
    const feedback = {
      ...feedbackData,
      id: `fb_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    dispatch({
      type: ActionTypes.ADD_FEEDBACK,
      payload: feedback,
    });
  };

  const markNotificationRead = (notificationId) => {
    dispatch({
      type: ActionTypes.MARK_NOTIFICATION_READ,
      payload: notificationId,
    });
  };

  const requestSession = (sessionData) => {
    dispatch({
      type: ActionTypes.REQUEST_SESSION,
      payload: sessionData,
    });
  };

  const approveSession = (sessionId) => {
    dispatch({
      type: ActionTypes.APPROVE_SESSION,
      payload: sessionId,
    });
  };

  const denySession = (sessionId) => {
    dispatch({
      type: ActionTypes.DENY_SESSION,
      payload: sessionId,
    });
  };

  const contextValue = {
    ...state,
    getUserSessions,
    getUserNotifications,
    getUserFeedback,
    getUserProgress,
    updateSession,
    addFeedback,
    markNotificationRead,
    requestSession,
    approveSession,
    denySession,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
