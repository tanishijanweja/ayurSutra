import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const TherapyCard = ({
  session,
  onUpdate,
  userRole = "patient",
  showActions = true,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "completed":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "requested":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "denied":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "denied":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApprove = () => {
    if (onUpdate) {
      onUpdate(session.id, { status: "upcoming" });
    }
  };

  const handleDeny = () => {
    if (onUpdate) {
      onUpdate(session.id, { status: "denied" });
    }
  };

  const handleReschedule = () => {
    // Mock reschedule functionality
    const newTime = prompt("Enter new time (e.g., 2:00 PM):");
    if (newTime && onUpdate) {
      onUpdate(session.id, { time: newTime });
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-emerald-800">
            {session.therapyType}
          </CardTitle>
          <Badge
            className={`${getStatusColor(
              session.status
            )} flex items-center gap-1 px-3 py-1`}
          >
            {getStatusIcon(session.status)}
            <span className="capitalize font-medium">{session.status}</span>
          </Badge>
        </div>
        {userRole === "practitioner" && (
          <p className="text-emerald-600 font-medium">
            Patient: {session.patientName}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Session Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="text-sm">{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="text-sm">
              {session.time} ({session.duration} min)
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <User className="h-4 w-4 mr-2 text-emerald-600" />
          <span className="text-sm">Dr. {session.practitioner}</span>
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="flex items-start">
              <FileText className="h-4 w-4 mr-2 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-800 mb-1">
                  {session.status === "completed"
                    ? "Post-Therapy Notes:"
                    : "Pre-Therapy Instructions:"}
                </p>
                <p className="text-sm text-emerald-700">{session.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Feedback (for completed sessions) */}
        {session.feedback && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">
                  Patient Feedback:
                </p>
                <p className="text-sm text-amber-700">{session.feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="pt-2 border-t border-gray-100">
            {userRole === "practitioner" && session.status === "requested" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleApprove}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDeny}
                  className="border-red-300 text-red-600 hover:bg-red-50 flex-1"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Deny
                </Button>
              </div>
            )}

            {userRole === "practitioner" && session.status === "upcoming" && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleReschedule}
                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
              >
                <Clock className="h-4 w-4 mr-1" />
                Reschedule
              </Button>
            )}

            {userRole === "patient" &&
              session.status === "completed" &&
              !session.feedback && (
                <Button
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/feedback?session=${session.id}`)
                  }
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Provide Feedback
                </Button>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TherapyCard;
