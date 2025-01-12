import React from "react";
import UserStories from "./_components/UserStories";
import DashboardHeader from "./_components/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <UserStories />
    </div>
  );
};

export default Dashboard;
