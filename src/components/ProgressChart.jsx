import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Brain,
  Moon,
  Zap,
} from "lucide-react";

const ProgressChart = ({ data }) => {
  if (!data || !data.weeklyData || data.weeklyData.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-800">Therapy Progress</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No progress data available yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Complete a few sessions to see your progress
          </p>
        </CardContent>
      </Card>
    );
  }

  const weeklyData = data.weeklyData;
  const latestWeek = weeklyData[weeklyData.length - 1];
  const previousWeek =
    weeklyData.length > 1 ? weeklyData[weeklyData.length - 2] : null;

  const metrics = [
    {
      key: "stress",
      label: "Stress Level",
      icon: Brain,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-200",
      inverted: true, // Lower is better
    },
    {
      key: "energy",
      label: "Energy Level",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-200",
      inverted: false, // Higher is better
    },
    {
      key: "sleep",
      label: "Sleep Quality",
      icon: Moon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      inverted: false,
    },
    {
      key: "pain",
      label: "Pain Level",
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      inverted: true,
    },
  ];

  const getTrendIcon = (current, previous, inverted = false) => {
    if (!previous) return <Minus className="h-4 w-4 text-gray-400" />;

    const isImproving = inverted ? current < previous : current > previous;

    if (isImproving) {
      return <TrendingUp className="h-4 w-4 text-emerald-600" />;
    } else if (current === previous) {
      return <Minus className="h-4 w-4 text-gray-400" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getTrendText = (current, previous, inverted = false) => {
    if (!previous) return "No change";

    const diff = Math.abs(current - previous);
    const isImproving = inverted ? current < previous : current > previous;

    if (diff === 0) return "No change";

    return isImproving ? `+${diff} improvement` : `-${diff} decline`;
  };

  const getProgressValue = (value, inverted = false) => {
    return inverted ? (10 - value) * 10 : value * 10;
  };

  const getProgressColor = (value, inverted = false) => {
    const progressValue = getProgressValue(value, inverted);

    if (progressValue >= 70) return "bg-emerald-500";
    if (progressValue >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Summary */}
      <Card className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Therapy Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => {
              const currentValue = latestWeek[metric.key];
              const previousValue = previousWeek
                ? previousWeek[metric.key]
                : null;

              return (
                <div
                  key={metric.key}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center"
                >
                  <metric.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                  <p className="text-sm opacity-90">{metric.label}</p>
                  <p className="text-2xl font-bold">{currentValue}/10</p>
                  <div className="flex items-center justify-center mt-1">
                    {getTrendIcon(currentValue, previousValue, metric.inverted)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Progress Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const currentValue = latestWeek[metric.key];
          const previousValue = previousWeek ? previousWeek[metric.key] : null;

          return (
            <Card
              key={metric.key}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className={`flex items-center ${metric.color}`}>
                  <metric.icon className="h-5 w-5 mr-2" />
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Value */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Current Level</span>
                  <Badge
                    className={`${metric.bgColor} ${metric.color} ${metric.borderColor} text-lg px-3 py-1`}
                  >
                    {currentValue}/10
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{metric.inverted ? "High" : "Low"}</span>
                    <span>{metric.inverted ? "Low" : "High"}</span>
                  </div>
                  <Progress
                    value={getProgressValue(currentValue, metric.inverted)}
                    className="h-3"
                    indicatorClassName={getProgressColor(
                      currentValue,
                      metric.inverted
                    )}
                  />
                </div>

                {/* Trend */}
                {previousValue && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-600">Trend</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(
                        currentValue,
                        previousValue,
                        metric.inverted
                      )}
                      <span className="text-sm font-medium">
                        {getTrendText(
                          currentValue,
                          previousValue,
                          metric.inverted
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Weekly History */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Weekly History
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {weeklyData.map((week, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs text-gray-500 mb-1">
                          {week.week}
                        </p>
                        <div
                          className={`${metric.bgColor} ${metric.borderColor} border rounded p-2`}
                        >
                          <p
                            className={`text-sm font-semibold ${metric.color}`}
                          >
                            {week[metric.key]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-800">Progress Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {metrics.map((metric) => {
            const currentValue = latestWeek[metric.key];
            const previousValue = previousWeek
              ? previousWeek[metric.key]
              : null;

            if (!previousValue) return null;

            const isImproving = metric.inverted
              ? currentValue < previousValue
              : currentValue > previousValue;
            const diff = Math.abs(currentValue - previousValue);

            if (diff === 0) return null;

            return (
              <div
                key={metric.key}
                className={`p-3 rounded-lg ${
                  isImproving
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <metric.icon
                    className={`h-5 w-5 mt-0.5 ${
                      isImproving ? "text-emerald-600" : "text-amber-600"
                    }`}
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        isImproving ? "text-emerald-800" : "text-amber-800"
                      }`}
                    >
                      {metric.label}{" "}
                      {isImproving ? "Improvement" : "Needs Attention"}
                    </p>
                    <p
                      className={`text-sm ${
                        isImproving ? "text-emerald-700" : "text-amber-700"
                      }`}
                    >
                      {isImproving
                        ? `Great progress! Your ${metric.label.toLowerCase()} has improved by ${diff} points.`
                        : `Your ${metric.label.toLowerCase()} has declined by ${diff} points. Consider discussing this with your practitioner.`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressChart;
