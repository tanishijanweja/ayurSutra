import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import TherapyCard from "../../components/TherapyCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Users,
  Calendar,
  ClipboardList,
  TrendingUp,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";

const PractitionerDashboard = () => {
  const {
    sessions,
    users,
    feedback,
    updateSession,
    approveSession,
    denySession,
  } = useApp();

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter sessions and data
  const allSessions = sessions || [];
  const allPatients = users?.patients || [];
  const allFeedback = feedback || [];

  const filteredSessions = allSessions.filter((session) => {
    const matchesSearch =
      session.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.therapyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Statistics
  const todaySessions = allSessions.filter(
    (s) => s.date === new Date().toISOString().split("T")[0]
  );
  const upcomingSessions = allSessions.filter((s) => s.status === "upcoming");
  const pendingRequests = allSessions.filter((s) => s.status === "requested");
  const completedToday = todaySessions.filter((s) => s.status === "completed");

  const handleSessionUpdate = (sessionId, updates) => {
    updateSession(sessionId, updates);
  };

  const handleApprove = (sessionId) => {
    approveSession(sessionId);
  };

  const handleDeny = (sessionId) => {
    denySession(sessionId);
  };

  const getAverageRating = () => {
    if (allFeedback.length === 0) return 0;
    const totalRating = allFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    return (totalRating / allFeedback.length).toFixed(1);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Practitioner Dashboard
                </h1>
                <p className="text-emerald-100 text-lg">
                  Manage your patients and therapy sessions
                </p>
                <div className="flex items-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Total Patients: {allPatients.length}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    <span>Rating: {getAverageRating()}/5</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-emerald-100">Today's Sessions</p>
                  <p className="text-3xl font-bold">{todaySessions.length}</p>
                  <p className="text-sm">
                    {completedToday.length} completed,{" "}
                    {todaySessions.length - completedToday.length} remaining
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {allPatients.length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {upcomingSessions.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {pendingRequests.length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {getAverageRating()}/5
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="sessions"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Patients
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Pending Requests */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-800">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Pending Requests ({pendingRequests.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests
                      .slice(0, 3)
                      .map((session) => (
                        <TherapyCard
                          key={session.id}
                          session={session}
                          userRole="practitioner"
                          onUpdate={handleSessionUpdate}
                        />
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No pending requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Today's Sessions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-800">
                    <Calendar className="h-5 w-5 mr-2" />
                    Today's Sessions ({todaySessions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todaySessions.length > 0 ? (
                    todaySessions
                      .slice(0, 3)
                      .map((session) => (
                        <TherapyCard
                          key={session.id}
                          session={session}
                          userRole="practitioner"
                          onUpdate={handleSessionUpdate}
                          showActions={false}
                        />
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No sessions scheduled for today</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-800">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Recent Patient Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allFeedback.length > 0 ? (
                  allFeedback.slice(0, 3).map((fb) => (
                    <div key={fb.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {fb.patientName}
                        </h4>
                        <div className="flex items-center">
                          {[...Array(fb.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {fb.therapyType} - {fb.date}
                      </p>
                      <p className="text-sm text-gray-700">
                        {fb.overallFeedback}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No feedback available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            {/* Filters */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by patient name or therapy type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="requested">Requested</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="denied">Denied</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sessions List */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  All Sessions ({filteredSessions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <TherapyCard
                      key={session.id}
                      session={session}
                      userRole="practitioner"
                      onUpdate={handleSessionUpdate}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-2">No sessions found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Patient Directory ({allPatients.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allPatients.map((patient) => {
                  const patientSessions = allSessions.filter(
                    (s) => s.patientId === patient.id
                  );
                  const completedSessions = patientSessions.filter(
                    (s) => s.status === "completed"
                  );
                  const upcomingPatientSessions = patientSessions.filter(
                    (s) => s.status === "upcoming"
                  );

                  return (
                    <div key={patient.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {patient.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {patient.email}
                          </p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <span>Age: {patient.age}</span>
                            <span>Dosha: {patient.dosha}</span>
                            <span>Condition: {patient.condition}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex space-x-4 mb-2">
                            <Badge
                              variant="outline"
                              className="text-emerald-600"
                            >
                              {completedSessions.length} completed
                            </Badge>
                            <Badge variant="outline" className="text-blue-600">
                              {upcomingPatientSessions.length} upcoming
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Joined:{" "}
                            {new Date(patient.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Patient Feedback ({allFeedback.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allFeedback.length > 0 ? (
                  allFeedback.map((fb) => (
                    <div
                      key={fb.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {fb.patientName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {fb.therapyType} - {fb.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(fb.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-current"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Symptoms:
                          </p>
                          <p className="text-sm text-gray-600">{fb.symptoms}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Improvements:
                          </p>
                          <p className="text-sm text-gray-600">
                            {fb.improvements}
                          </p>
                        </div>
                      </div>

                      {fb.sideEffects && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">
                            Side Effects:
                          </p>
                          <p className="text-sm text-gray-600">
                            {fb.sideEffects}
                          </p>
                        </div>
                      )}

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">
                          Overall Feedback:
                        </p>
                        <p className="text-sm text-gray-600">
                          {fb.overallFeedback}
                        </p>
                      </div>

                      {fb.practitionerNotes && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
                          <p className="text-sm font-medium text-emerald-800">
                            Practitioner Notes:
                          </p>
                          <p className="text-sm text-emerald-700">
                            {fb.practitionerNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ClipboardList className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-2">No feedback available</p>
                    <p className="text-sm">
                      Patient feedback will appear here after sessions
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PractitionerDashboard;
