import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Activity } from 'lucide-react';

const viewsData = [
  { date: 'Jan 23', Daily: 2890, Weekly: 20230, Monthly: 89000 },
  { date: 'Feb 23', Daily: 3200, Weekly: 22400, Monthly: 96000 },
  { date: 'Mar 23', Daily: 3500, Weekly: 24500, Monthly: 105000 },
  { date: 'Apr 23', Daily: 3800, Weekly: 26600, Monthly: 114000 },
  { date: 'May 23', Daily: 4100, Weekly: 28700, Monthly: 123000 },
];

const activityData = [
  { date: 'Mon', 'This Week': 100, 'Last Week': 90, 'This Month': 420, 'Last Month': 380 },
  { date: 'Tue', 'This Week': 120, 'Last Week': 110, 'This Month': 450, 'Last Month': 400 },
  { date: 'Wed', 'This Week': 115, 'Last Week': 105, 'This Month': 430, 'Last Month': 390 },
  { date: 'Thu', 'This Week': 130, 'Last Week': 120, 'This Month': 460, 'Last Month': 420 },
  { date: 'Fri', 'This Week': 125, 'Last Week': 115, 'This Month': 455, 'Last Month': 410 },
  { date: 'Sat', 'This Week': 90, 'Last Week': 80, 'This Month': 400, 'Last Month': 360 },
  { date: 'Sun', 'This Week': 80, 'Last Week': 70, 'This Month': 380, 'Last Month': 340 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
        <p className="font-bold">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} style={{ color: pld.color }}>
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('userViews');
  const [activityView, setActivityView] = useState('daily');

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'userViews' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('userViews')}
        >
          <Users className="inline-block mr-2" size={16} />
          User Views
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'userActivity' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('userActivity')}
        >
          <Activity className="inline-block mr-2" size={16} />
          User Activity
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        {activeTab === 'userViews' ? (
          <>
            <h2 className="text-xl font-semibold mb-4">User Views</h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid vertical={false} stroke="#DDD" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Daily" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDaily)" />
                <Area type="monotone" dataKey="Weekly" stroke="#10b981" fillOpacity={1} fill="url(#colorWeekly)" />
                <Area type="monotone" dataKey="Monthly" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMonthly)" />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">User Activity</h2>
            <div className="mb-4">
              <button
                className={`mr-2 px-4 py-2 rounded ${activityView === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActivityView('daily')}
              >
                Daily Comparison
              </button>
              <button
                className={`px-4 py-2 rounded ${activityView === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActivityView('monthly')}
              >
                Monthly Comparison
              </button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={activityData}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid vertical={false} stroke="#DDD" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={activityView === 'daily' ? 'This Week' : 'This Month'} fill="#3b82f6" />
                <Bar dataKey={activityView === 'daily' ? 'Last Week' : 'Last Month'} fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;