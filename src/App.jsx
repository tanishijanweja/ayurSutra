// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import { AppProvider } from "@/context/AppContext";
// import Navbar from "@/components/Navbar";
// import Home from "@/pages/Home";
// import Login from "@/pages/Auth/Login";
// import Signup from "@/pages/Auth/Signup";
// import PatientDashboard from "@/pages/Dashboard/PatientDashboard";
// import PractitionerDashboard from "@/pages/Dashboard/PractitionerDashboard";
// import TherapySchedule from "@/pages/TherapySchedule";
// import Feedback from "@/pages/Feedback";
// import { getUserRole } from "@/lib/getUserRole";
// import { Toaster } from "@/components/ui/toaster";
// import "./App.css";

// /* ---------------- Roles Config ---------------- */
// const ROUTE_ROLES = {
//   patientDashboard: ["patient"],
//   practitionerDashboard: ["practitioner"],
//   therapySchedule: ["patient", "practitioner"], // ✅ both can access
//   feedback: ["patient", "practitioner"], // ✅ both can access
// };

// /* ---------------- Protected Route ---------------- */
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { isSignedIn, isLoaded, user } = useUser();

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

//   // Determine role
//   const role = getUserRole(user);
//   const email = user.emailAddresses[0]?.emailAddress;

//   console.log("[ProtectedRoute] user object:", user);
//   // eslint-disable-next-line no-console
//   console.log(
//     "[ProtectedRoute] extracted email:",
//     user?.emailAddresses?.[0]?.emailAddress ||
//       user?.primaryEmailAddress?.emailAddress ||
//       user?.email
//   );
//   // eslint-disable-next-line no-console
//   console.log("[ProtectedRoute] publicMetadata:", user?.publicMetadata);
//   // eslint-disable-next-line no-console
//   console.log(
//     "[ProtectedRoute] computed role:",
//     role,
//     "allowedRoles:",
//     allowedRoles
//   );

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// /* ---------------- Public Route ---------------- */
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

// /* ---------------- Dashboard Router ---------------- */
// const DashboardRouter = () => {
//   const { user } = useUser();
//   if (!user) return <Navigate to="/auth/login" replace />;

//   const role = getUserRole(user);
//   const email = user.emailAddresses[0]?.emailAddress;
//   console.log("[DashboardRouter] role:", role);

//   if (role === "practitioner") {
//     return <Navigate to="/dashboard/practitioner" replace />;
//   }
//   return <Navigate to="/dashboard/patient" replace />;
// };

// /* ---------------- Main App ---------------- */
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

//               {/* Patient Routes */}
//               <Route
//                 path="/dashboard/patient"
//                 element={
//                   <ProtectedRoute allowedRoles={ROUTE_ROLES.patientDashboard}>
//                     <PatientDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Practitioner Routes */}
//               <Route
//                 path="/dashboard/practitioner"
//                 element={
//                   <ProtectedRoute
//                     allowedRoles={ROUTE_ROLES.practitionerDashboard}
//                   >
//                     <PractitionerDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Therapy Schedule (Both) */}
//               <Route
//                 path="/therapy-schedule"
//                 element={
//                   <ProtectedRoute allowedRoles={ROUTE_ROLES.therapySchedule}>
//                     <TherapySchedule />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Feedback (Both) */}
//               <Route
//                 path="/feedback"
//                 element={
//                   <ProtectedRoute allowedRoles={ROUTE_ROLES.feedback}>
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
import { getUserRole } from "@/lib/getUserRole";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

/* ---------------- Roles Config ---------------- */
const ROUTE_ROLES = {
  patientDashboard: ["patient"],
  practitionerDashboard: ["practitioner"],
  therapySchedule: ["patient", "practitioner"],
  feedback: ["patient", "practitioner"],
};

/* ---------------- Protected Route ---------------- */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <p className="text-emerald-700">Loading AyurSutra...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  const role = getUserRole(user);

  console.log("[ProtectedRoute] role:", role, "allowed:", allowedRoles);

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
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <p className="text-emerald-700">Loading AyurSutra...</p>
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

  const role = getUserRole(user);
  console.log("[DashboardRouter] resolved role:", role);

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

              {/* Patient Dashboard */}
              <Route
                path="/dashboard/patient"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.patientDashboard}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Practitioner Dashboard */}
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

              {/* Shared Routes */}
              <Route
                path="/therapy-schedule"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.therapySchedule}>
                    <TherapySchedule />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/feedback"
                element={
                  <ProtectedRoute allowedRoles={ROUTE_ROLES.feedback}>
                    <Feedback />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
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
