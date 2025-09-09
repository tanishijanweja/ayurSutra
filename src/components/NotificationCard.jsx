import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Calendar,
  Heart,
  Clock,
} from "lucide-react";

const NotificationCard = ({ notification, onClick }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "pre-therapy":
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case "post-therapy":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "appointment":
        return <Calendar className="h-4 w-4 text-amber-600" />;
      case "dietary":
        return <Heart className="h-4 w-4 text-orange-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "pre-therapy":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "post-therapy":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "appointment":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "dietary":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(date + "T" + time);
    return dateObj.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTimeAgo = (date, time) => {
    const notificationDate = new Date(date + "T" + time);
    const now = new Date();
    const diffInHours = Math.floor((now - notificationDate) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-md border-l-4 ${
        notification.read
          ? "bg-white/60 border-l-gray-300"
          : "bg-white/90 border-l-emerald-500 shadow-sm"
      }`}
      onClick={() => onClick && onClick(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              {getTypeIcon(notification.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4
                  className={`font-medium ${
                    notification.read ? "text-gray-700" : "text-gray-900"
                  }`}
                >
                  {notification.title}
                </h4>
                <Badge
                  className={`${getTypeColor(
                    notification.type
                  )} text-xs px-2 py-1`}
                >
                  {notification.type.replace("-", " ")}
                </Badge>
              </div>

              <p
                className={`text-sm ${
                  notification.read ? "text-gray-500" : "text-gray-700"
                } mb-3`}
              >
                {notification.message}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>
                    {formatDateTime(notification.date, notification.time)}
                  </span>
                </div>
                <span>{getTimeAgo(notification.date, notification.time)}</span>
              </div>
            </div>
          </div>

          {!notification.read && (
            <div className="flex-shrink-0 ml-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
