// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import { AppProvider } from "./context/AppContext";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
// import PatientDashboard from "./pages/Dashboard/PatientDashboard";
// import PractitionerDashboard from "./pages/Dashboard/PractitionerDashboard";
// import TherapySchedule from "./pages/TherapySchedule";
// import Feedback from "./pages/Feedback";
// import { Toaster } from "./components/ui/toaster";
// import "./App.css";

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isSignedIn, isLoaded } = useUser();

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
//           <p className="mt-4 text-emerald-700 font-medium">
//             Loading AyurSutra...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!isSignedIn) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   return children;
// };

// // Public Route Component (redirect if already signed in)
// const PublicRoute = ({ children }) => {
//   const { isSignedIn, isLoaded } = useUser();

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
//           <p className="mt-4 text-emerald-700 font-medium">
//             Loading AyurSutra...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isSignedIn) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// // Dashboard Router Component
// const DashboardRouter = () => {
//   const { user } = useUser();

//   if (!user) return <Navigate to="/auth/login" replace />;

//   const email = user.emailAddresses[0]?.emailAddress;
//   const isPractitioner =
//     email?.includes("@ayursutra.com") ||
//     user.publicMetadata?.role === "practitioner";

//   if (isPractitioner) {
//     return <Navigate to="/dashboard/practitioner" replace />;
//   } else {
//     return <Navigate to="/dashboard/patient" replace />;
//   }
// };

// function App() {
//   return (
//     <AppProvider>
//       <BrowserRouter>
//         <div className="App min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
//           <Navbar />
//           <main className="pb-6">
//             <Routes>
//               {/* Public Routes */}
//               <Route
//                 path="/"
//                 element={
//                   <PublicRoute>
//                     <Home />
//                   </PublicRoute>
//                 }
//               />
//               <Route
//                 path="/auth/login"
//                 element={
//                   <PublicRoute>
//                     <Login />
//                   </PublicRoute>
//                 }
//               />
//               <Route
//                 path="/auth/signup"
//                 element={
//                   <PublicRoute>
//                     <Signup />
//                   </PublicRoute>
//                 }
//               />

//               {/* Dashboard Redirect */}
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <DashboardRouter />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Protected Routes */}
//               <Route
//                 path="/dashboard/patient"
//                 element={
//                   <ProtectedRoute>
//                     <PatientDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard/practitioner"
//                 element={
//                   <ProtectedRoute>
//                     <PractitionerDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/therapy-schedule"
//                 element={
//                   <ProtectedRoute>
//                     <TherapySchedule />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/feedback"
//                 element={
//                   <ProtectedRoute>
//                     <Feedback />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Catch all route */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </main>
//           <Toaster />
//         </div>
//       </BrowserRouter>
//     </AppProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import PatientDashboard from "@/pages/Dashboard/PatientDashboard";
import PractitionerDashboard from "@/pages/Dashboard/PractitionerDashboard";
import TherapySchedule from "@/pages/TherapySchedule";
import Feedback from "@/pages/Feedback";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

/* ---------------- Roles Config ---------------- */
const ROUTE_ROLES = {
  patientDashboard: ["patient"],
  practitionerDashboard: ["practitioner"],
  therapySchedule: ["patient", "practitioner"], // ✅ both can access
  feedback: ["patient", "practitioner"], // ✅ both can access
};

/* ---------------- Protected Route ---------------- */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">
            Loading AyurSutra...
          </p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  // Determine role
  const email = user.emailAddresses[0]?.emailAddress;
  const role = email?.includes("@ayursutra.com")
    ? "practitioner"
    : "patient" || user.publicMetadata?.role;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ---------------- Public Route ---------------- */
const PublicRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">
            Loading AyurSutra...
          </p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* ---------------- Dashboard Router ---------------- */
const DashboardRouter = () => {
  const { user } = useUser();
  if (!user) return <Navigate to="/auth/login" replace />;

  const email = user.emailAddresses[0]?.emailAddress;
  const role = email?.includes("@ayursutra.com")
    ? "practitioner"
    : "patient" || user.publicMetadata?.role;

  if (role === "practitioner") {
    return <Navigate to="/dashboard/practitioner" replace />;
  }
  return <Navigate to="/dashboard/patient" replace />;
};

/* ---------------- Main App ---------------- */
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
          <Navbar />
          <main className="pb-6">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />

              {/* Dashboard Redirect */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />

              {/* Patient Routes */}
              <Route
                path="/dashboard/patient"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.patientDashboard}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Practitioner Routes */}
              <Route
                path="/dashboard/practitioner"
                element={
                  <ProtectedRoute
                    allowedRoles={ROUTE_ROLES.practitionerDashboard}
                  >
                    <PractitionerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Therapy Schedule (Both) */}
              <Route
                path="/therapy-schedule"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.therapySchedule}>
                    <TherapySchedule />
                  </ProtectedRoute>
                }
              />

              {/* Feedback (Both) */}
              <Route
                path="/feedback"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.feedback}>
                    <Feedback />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
