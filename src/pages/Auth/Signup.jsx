import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Leaf } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-emerald-600 to-amber-600 p-3 rounded-xl shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-amber-700 bg-clip-text text-transparent">
                AyurSutra
              </h1>
              <p className="text-sm text-emerald-600 -mt-1">Panchakarma Care</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Begin Your Journey
          </h2>
          <p className="text-gray-600">
            Create your account and start your path to wellness
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp
            routing="path"
            path="/auth/signup"
            signInUrl="/auth/login"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300",
                card: "shadow-xl border-0 bg-white/90 backdrop-blur-sm",
                headerTitle: "text-emerald-800",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton:
                  "border-emerald-200 hover:bg-emerald-50 text-emerald-700",
                formFieldInput:
                  "border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500",
                footerActionLink: "text-emerald-600 hover:text-amber-600",
              },
            }}
          />
        </div>

        {/* Role Information */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <h3 className="font-semibold text-amber-800 mb-2">Account Types</h3>
          <div className="text-sm text-amber-700 space-y-1">
            <p>
              <strong>Patient:</strong> Book sessions, track progress, provide
              feedback
            </p>
            <p>
              <strong>Practitioner:</strong> Use @ayursutra.com email to access
              practitioner features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
