import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import TherapyCard from "../../components/TherapyCard";
import NotificationCard from "../../components/NotificationCard";
import ProgressChart from "../../components/ProgressChart";
import { useNavigate } from "react-router-dom";

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
import {
  Calendar,
  TrendingUp,
  Bell,
  MessageSquare,
  User,
  Heart,
  Activity,
  Clock,
} from "lucide-react";

const PatientDashboard = () => {
  const {
    currentPatient,
    getUserSessions,
    getUserNotifications,
    getUserProgress,
    markNotificationRead,
  } = useApp();

  const [activeTab, setActiveTab] = useState("overview");

  const sessions = getUserSessions();
  const notifications = getUserNotifications();
  const progressData = getUserProgress();
  const navigate = useNavigate();

  const upcomingSessions = sessions
    .filter((s) => s.status === "upcoming")
    .slice(0, 3);
  const recentSessions = sessions
    .filter((s) => s.status === "completed")
    .slice(0, 3);
  const unreadNotifications = notifications.filter((n) => !n.read).slice(0, 5);

  const handleNotificationClick = (notificationId) => {
    markNotificationRead(notificationId);
  };

  if (!currentPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {currentPatient.name}!
                </h1>
                <p className="text-emerald-100 text-lg">
                  Your wellness journey continues today
                </p>
                <div className="flex items-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span>Dosha: {currentPatient.dosha}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    <span>Age: {currentPatient.age}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-emerald-100">Next Session</p>
                  {upcomingSessions.length > 0 ? (
                    <>
                      <p className="text-xl font-semibold">
                        {upcomingSessions[0].therapyType}
                      </p>
                      <p className="text-sm">
                        {upcomingSessions[0].date} at {upcomingSessions[0].time}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg">No upcoming sessions</p>
                  )}
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
                  <p className="text-sm text-gray-600">Upcoming Sessions</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {upcomingSessions.length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Sessions</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {recentSessions.length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread Notifications</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {unreadNotifications.length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Progress</p>
                  <p className="text-2xl font-bold text-purple-700">85%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
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
              value="progress"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-800">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => (
                      <TherapyCard
                        key={session.id}
                        session={session}
                        showActions={false}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No upcoming sessions scheduled</p>
                      {/* <Button
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() =>
                          (window.location.href = "/therapy-schedule")
                        }
                      >
                        Schedule a Session
                      </Button> */}
                      <Button
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => navigate("/therapy-schedule")}
                      >
                        Schedule a Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-800">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No new notifications</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* <Button
                    className="bg-emerald-600 hover:bg-emerald-700 h-16"
                    onClick={() => (window.location.href = "/therapy-schedule")}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Session
                  </Button> */}
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 h-16"
                    onClick={() => navigate("/therapy-schedule")}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Session
                  </Button>

                  <Button
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 h-16"
                    onClick={() => (window.location.href = "/feedback")}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Provide Feedback
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 h-16"
                    onClick={() => setActiveTab("progress")}
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-emerald-800">
                    All Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <TherapyCard key={session.id} session={session} />
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg mb-4">No sessions found</p>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() =>
                          (window.location.href = "/therapy-schedule")
                        }
                      >
                        Schedule Your First Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <ProgressChart data={progressData} />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  All Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onClick={() => handleNotificationClick(notification.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>No notifications</p>
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

export default PatientDashboard;
