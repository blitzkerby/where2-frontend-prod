import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "./../../../../hooks/useAuth";
import PostsBarChart from "./../../../reusable/dashboardComponents/BarChart";
import CustomedPieChart from "./../../../reusable/dashboardComponents/CustomedPieChart";
import config from "./../../../../config";


const generateDummyData = (type, month, year) => {
  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  switch (type) {
    case "weekly":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        name: day,
        views: Math.floor(Math.random() * 1000),
      }));
    case "monthly":
      const daysInMonth = getDaysInMonth(month, year);
      return Array.from({ length: daysInMonth }, (_, i) => ({
        name: `${i + 1}`,
        views: Math.floor(Math.random() * 5000),
      }));
    case "yearly":
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].map((month) => ({
        name: month,
        views: Math.floor(Math.random() * 50000),
      }));
    default:
      return [];
  }
};

const ViewsChart = ({ data, timeFrame }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="views"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

const TopPostsChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="views" fill="#E2F1E7" />
    </BarChart>
  </ResponsiveContainer>
);

const DeviceDistributionChart = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const SummaryStatistics = ({ data }) => {
  const totalViews = data.reduce((sum, item) => sum + item.views, 0);
  const avgViews = Math.round(totalViews / data.length);
  const maxViews = Math.max(...data.map((item) => item.views));
  const minViews = Math.min(...data.map((item) => item.views));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded">
        <h3 className="text-lg font-semibold">Total Views</h3>
        <p className="text-2xl font-bold">{totalViews}</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <h3 className="text-lg font-semibold">Average Views</h3>
        <p className="text-2xl font-bold">{avgViews}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded">
        <h3 className="text-lg font-semibold">Highest Views</h3>
        <p className="text-2xl font-bold">{maxViews}</p>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <h3 className="text-lg font-semibold">Lowest Views</h3>
        <p className="text-2xl font-bold">{minViews}</p>
      </div>
    </div>
  );
};

const PostViewsDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [deviceDistribution, setDeviceDistribution] = useState([]);
  const { username, entity } = useAuth();

  useEffect(() => {
    setData(generateDummyData(timeFrame, selectedMonth + 1, selectedYear));
    setTopPosts([
      { name: "Phnom Penh", views: 1500 },
      { name: "Kondal", views: 1200 },
      { name: "Takeov", views: 1000 },
      { name: "Siem Reap", views: 800 },
      { name: "BattamBong", views: 600 },
    ]);
    setDeviceDistribution([
      { name: "Desktop", value: 4500 },
      { name: "Mobile", value: 3500 },
      { name: "Tablet", value: 1000 },
    ]);
  }, [timeFrame, selectedMonth, selectedYear]);

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-right pb-[10.5px] tracking-tight">
        Welcome to Dashboard, {username ? username : entity}
      </h1>

      <div className="mb-6 flex flex-wrap items-center">
        {/* ... (keep the existing time frame and date selection buttons/dropdowns) */}
      </div>

      <SummaryStatistics data={data} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Views Over Time</h2>
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Post View Dashboard</h1>
            <div className="mb-4 flex flex-wrap items-center">
              <button
                onClick={() => handleTimeFrameChange("weekly")}
                className={`mr-2 mb-2 px-4 py-2 ${
                  timeFrame === "weekly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                Weekly
              </button>
              <button
                onClick={() => handleTimeFrameChange("monthly")}
                className={`mr-2 mb-2 px-4 py-2 ${
                  timeFrame === "monthly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleTimeFrameChange("yearly")}
                className={`mr-2 mb-2 px-4 py-2 ${
                  timeFrame === "yearly"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                Yearly
              </button>

              {timeFrame !== "weekly" && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="mr-2 mb-2 px-4 py-2 bg-white border border-gray-300 rounded"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}

              {timeFrame === "monthly" && (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="mb-2 px-4 py-2 bg-white border border-gray-300 rounded"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <ViewsChart data={data} timeFrame={timeFrame} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
          <TopPostsChart data={topPosts} />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Real-time Updates</h2>
        <p className="text-lg">
          Currently active users: <span className="font-bold">237</span>
        </p>
        <p className="text-lg">
          Views in the last hour: <span className="font-bold">1,892</span>
        </p>
      </div>


      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Device Distribution</h2>
          <CustomedPieChart fetchUrl={config.dashboard.getDeviceDistribution} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Number of Posts</h2>
        <PostsBarChart 
        fetchUrl={config.dashboard.getDiscussionsPerDay}
        title="Post(s) created per day"
      />
      </div>
    </div>
  );
};

export default PostViewsDashboard;
