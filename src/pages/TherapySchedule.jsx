import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { therapyTypes } from "../services/mockData";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Plus,
  Info,
} from "lucide-react";

const TherapySchedule = () => {
  const { userRole, currentPatient, sessions, requestSession, updateSession } =
    useApp();

  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    therapyType: "",
    time: "",
    duration: 60,
    notes: "",
    practitioner: "Dr. Anjali Nair",
  });

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const practitioners = ["Dr. Anjali Nair", "Dr. Vikram Singh"];

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getDateSessions = (date) => {
    const dateStr = formatDate(date);
    return sessions.filter((session) => session.date === dateStr);
  };

  const isTimeSlotAvailable = (date, time) => {
    const dateSessions = getDateSessions(date);
    return !dateSessions.some((session) => session.time === time);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!formData.therapyType || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const sessionData = {
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      therapyType: formData.therapyType,
      date: formatDate(selectedDate),
      time: formData.time,
      duration: formData.duration,
      practitioner: formData.practitioner,
      notes:
        formData.notes ||
        `Pre-procedure instructions for ${formData.therapyType}`,
    };

    requestSession(sessionData);

    toast({
      title: "Session Requested",
      description:
        "Your therapy session request has been submitted for approval",
    });

    // Reset form
    setFormData({
      therapyType: "",
      time: "",
      duration: 60,
      notes: "",
      practitioner: "Dr. Anjali Nair",
    });
    setShowBookingForm(false);
  };

  const handleSessionUpdate = (sessionId, updates) => {
    updateSession(sessionId, updates);
    toast({
      title: "Session Updated",
      description: "Session has been updated successfully",
    });
  };

  const selectedDateSessions = getDateSessions(selectedDate);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <h1 className="text-3xl font-bold mb-2">
              {userRole === "patient" ? "Schedule Therapy" : "Manage Sessions"}
            </h1>
            <p className="text-emerald-100 text-lg">
              {userRole === "patient"
                ? "Book your Panchakarma therapy sessions"
                : "Manage and approve therapy sessions"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-800">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date(new Date().toDateString())}
                className="rounded-md border border-emerald-200"
              />

              {userRole === "patient" && (
                <div className="mt-6">
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={showBookingForm}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sessions for Selected Date */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Sessions for {selectedDate.toDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateSessions.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateSessions.map((session) => (
                    <div
                      key={session.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {session.therapyType}
                          </h4>
                          {userRole === "practitioner" && (
                            <p className="text-sm text-gray-600">
                              Patient: {session.patientName}
                            </p>
                          )}
                        </div>
                        <Badge
                          className={
                            session.status === "upcoming"
                              ? "bg-emerald-100 text-emerald-800"
                              : session.status === "requested"
                              ? "bg-blue-100 text-blue-800"
                              : session.status === "completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {session.time} ({session.duration} min)
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {session.practitioner}
                        </div>
                      </div>

                      {session.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-700">
                            {session.notes}
                          </p>
                        </div>
                      )}

                      {userRole === "practitioner" &&
                        session.status === "requested" && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleSessionUpdate(session.id, {
                                  status: "upcoming",
                                })
                              }
                              className="bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleSessionUpdate(session.id, {
                                  status: "denied",
                                })
                              }
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Deny
                            </Button>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">No sessions scheduled</p>
                  <p className="text-sm">
                    {userRole === "patient"
                      ? 'Click "Book Session" to schedule a therapy session'
                      : "No sessions scheduled for this date"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && userRole === "patient" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <Card className="w-full max-w-2xl bg-white shadow-2xl my-8">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Book Therapy Session
                </CardTitle>
                <p className="text-gray-600">
                  Schedule for {selectedDate.toDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Therapy Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Therapy Type *
                    </label>
                    <Select
                      value={formData.therapyType}
                      onValueChange={(value) =>
                        handleInputChange("therapyType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapy type" />
                      </SelectTrigger>
                      <SelectContent>
                        {therapyTypes.map((therapy) => (
                          <SelectItem key={therapy.name} value={therapy.name}>
                            <div>
                              <p className="font-medium">{therapy.name}</p>
                              <p className="text-xs text-gray-500">
                                {therapy.duration}
                              </p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isAvailable = isTimeSlotAvailable(
                          selectedDate,
                          time
                        );
                        return (
                          <Button
                            key={time}
                            type="button"
                            variant={
                              formData.time === time ? "default" : "outline"
                            }
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => handleInputChange("time", time)}
                            className={`${
                              formData.time === time
                                ? "bg-emerald-600 text-white"
                                : isAvailable
                                ? "hover:bg-emerald-50 hover:border-emerald-300"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {time}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practitioner */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Practitioner
                    </label>
                    <Select
                      value={formData.practitioner}
                      onValueChange={(value) =>
                        handleInputChange("practitioner", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {practitioners.map((practitioner) => (
                          <SelectItem key={practitioner} value={practitioner}>
                            {practitioner}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", parseInt(e.target.value))
                      }
                      min="30"
                      max="120"
                      step="15"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Notes (Optional)
                    </label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      placeholder="Any special requirements or notes for the practitioner..."
                      rows="3"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Booking Information</p>
                        <ul className="text-xs space-y-1">
                          <li>
                            • Your session request will be sent to the
                            practitioner for approval
                          </li>
                          <li>• You'll receive a notification once approved</li>
                          <li>
                            • Please arrive 10 minutes before your scheduled
                            time
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Request Session
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Therapy Types Information */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-800">
              Available Therapies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapyTypes.map((therapy) => (
                <div key={therapy.name} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {therapy.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {therapy.description}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      <strong>Duration:</strong> {therapy.duration}
                    </p>
                    <p>
                      <strong>Benefits:</strong> {therapy.benefits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapySchedule;
