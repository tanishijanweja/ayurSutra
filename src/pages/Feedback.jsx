import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Heart,
} from "lucide-react";

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const { currentPatient, sessions, addFeedback, getUserFeedback } = useApp();

  const { toast } = useToast();
  const sessionId = searchParams.get("session");

  const [formData, setFormData] = useState({
    rating: 0,
    symptoms: "",
    improvements: "",
    sideEffects: "",
    overallFeedback: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const completedSessions = sessions.filter(
    (s) => s.patientId === currentPatient?.id && s.status === "completed"
  );

  const existingFeedback = getUserFeedback();
  const sessionWithoutFeedback = completedSessions.filter(
    (s) => !existingFeedback.find((fb) => fb.sessionId === s.id)
  );

  const targetSession = sessionId
    ? sessions.find((s) => s.id === sessionId)
    : sessionWithoutFeedback[0];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!targetSession) {
      toast({
        title: "Error",
        description: "No session selected for feedback",
        variant: "destructive",
      });
      return;
    }

    if (formData.rating === 0) {
      toast({
        title: "Error",
        description: "Please provide a rating",
        variant: "destructive",
      });
      return;
    }

    if (!formData.overallFeedback.trim()) {
      toast({
        title: "Error",
        description: "Please provide overall feedback",
        variant: "destructive",
      });
      return;
    }

    const feedbackData = {
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      sessionId: targetSession.id,
      therapyType: targetSession.therapyType,
      ...formData,
    };

    addFeedback(feedbackData);

    toast({
      title: "Feedback Submitted",
      description:
        "Thank you for your feedback! It helps us improve your care.",
    });

    // Reset form
    setFormData({
      rating: 0,
      symptoms: "",
      improvements: "",
      sideEffects: "",
      overallFeedback: "",
    });
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate your experience";
    }
  };

  if (!currentPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
            <p className="text-emerald-100 text-lg">
              Your feedback helps us provide better care and improve our
              services
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-800">
                <MessageSquare className="h-5 w-5 mr-2" />
                {targetSession
                  ? `Feedback for ${targetSession.therapyType}`
                  : "Session Feedback"}
              </CardTitle>
              {targetSession && (
                <p className="text-gray-600">
                  Session on {targetSession.date} with{" "}
                  {targetSession.practitioner}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {targetSession ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Overall Rating *
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoveredRating || formData.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-4 text-lg font-medium text-gray-700">
                        {getRatingText(hoveredRating || formData.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Symptoms or Issues Addressed
                    </label>
                    <Textarea
                      value={formData.symptoms}
                      onChange={(e) =>
                        handleInputChange("symptoms", e.target.value)
                      }
                      placeholder="What symptoms or health issues were you experiencing before the session?"
                      rows="3"
                    />
                  </div>

                  {/* Improvements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Improvements Experienced
                    </label>
                    <Textarea
                      value={formData.improvements}
                      onChange={(e) =>
                        handleInputChange("improvements", e.target.value)
                      }
                      placeholder="What improvements or positive changes have you noticed?"
                      rows="3"
                    />
                  </div>

                  {/* Side Effects */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Side Effects (if any)
                    </label>
                    <Textarea
                      value={formData.sideEffects}
                      onChange={(e) =>
                        handleInputChange("sideEffects", e.target.value)
                      }
                      placeholder="Did you experience any side effects or discomfort? (Leave blank if none)"
                      rows="2"
                    />
                  </div>

                  {/* Overall Feedback */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Feedback *
                    </label>
                    <Textarea
                      value={formData.overallFeedback}
                      onChange={(e) =>
                        handleInputChange("overallFeedback", e.target.value)
                      }
                      placeholder="Please share your overall experience with this therapy session..."
                      rows="4"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                    disabled={
                      formData.rating === 0 || !formData.overallFeedback.trim()
                    }
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Sessions Available for Feedback
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Complete a therapy session to provide feedback
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/therapy-schedule")}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Schedule a Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Available Sessions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800 text-lg">
                  Sessions Awaiting Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessionWithoutFeedback.length > 0 ? (
                  <div className="space-y-3">
                    {sessionWithoutFeedback.map((session) => (
                      <button
                        key={session.id}
                        onClick={() =>
                          (window.location.href = `/feedback?session=${session.id}`)
                        }
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          session.id === targetSession?.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                        }`}
                      >
                        <h4 className="font-medium text-gray-900">
                          {session.therapyType}
                        </h4>
                        <p className="text-sm text-gray-600">{session.date}</p>
                        <p className="text-xs text-gray-500">
                          {session.practitioner}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No sessions awaiting feedback</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previous Feedback */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800 text-lg">
                  Your Previous Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {existingFeedback.length > 0 ? (
                  <div className="space-y-3">
                    {existingFeedback.slice(0, 3).map((feedback) => (
                      <div
                        key={feedback.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {feedback.therapyType}
                          </h4>
                          <div className="flex items-center">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 text-yellow-500 fill-current"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{feedback.date}</p>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {feedback.overallFeedback}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No previous feedback</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-amber-50 border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-amber-800 text-lg flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Feedback Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Be specific about improvements you noticed
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Mention any discomfort or concerns
                  </p>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Your honest feedback helps improve care
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
