import React, { useState } from "react";
import useAuth from "./../../../../hooks/useAuth";
import PostsBarChart from "./../../../reusable/dashboardComponents/BarChart";
import CustomedPieChart from "./../../../reusable/dashboardComponents/CustomedPieChart";
import UsersStatusComponent from "./../../../reusable/dashboardComponents/UsersStatus";
import TopPostsChart from "./../../../reusable/dashboardComponents/TopPostsChart";
import config from "./../../../../config";

const PostViewsDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [viewsToday, setViewsToday] = useState([]);
  const { username, entity } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-4 mt-[64px]">
      <h1 className="text-3xl font-bold mb-6 text-right pb-[10.5px] tracking-tight">
        Welcome to Dashboard, {username ? username : entity}
      </h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">
          User counts based on City
        </h2>
        <TopPostsChart fetchUrl={config.dashboard.getUserCounts} />
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">User Status</h2>
        <UsersStatusComponent
          activeUsers={activeUsers}
          viewsToday={viewsToday}
        />
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Device Distribution</h2>
        <CustomedPieChart fetchUrl={config.dashboard.getDeviceDistribution} />
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">
          Verification Status Distribution
        </h2>
        <PostsBarChart fetchUrl={config.dashboard.getVerificationData} />
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">
          Verified vs. Unverified Users
        </h2>
        <PostsBarChart
          fetchUrl={config.dashboard.getVerificationData} // Fetch URL for posts
          title="Verified vs. Unverified Users"
          isDataArray={false}
        />
      </div>
      <div className="p-6">
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">Number of Posts</h2>
          <PostsBarChart
            fetchUrl={config.dashboard.getDiscussionsPerDay} // Fetch URL for posts
            title="Post(s) created per day"
            isDataArray={false}
          />
        </div>

        <div className="my-6">
          <h2 className="text-xl font-semibold mb-4">Number of Comment(s)</h2>
          <PostsBarChart
            fetchUrl={config.dashboard.getCommentsPerDay} // Fetch URL for comments
            title="Comment(s) created per day"
            barColor="#82ca9d"
            isDataArray={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PostViewsDashboard;
