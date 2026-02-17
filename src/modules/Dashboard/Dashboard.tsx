"use client";
import { useGetMediaStats } from "@teliphotos/services/stats/useGetMediaStats";
import { Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export const Dashboard = () => {
  const { data: stats, isLoading, error } = useGetMediaStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Error loading statistics
      </div>
    );
  }

  const pieData = [
    { name: "Photos", value: stats.breakdown.photos },
    { name: "Videos", value: stats.breakdown.videos },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Photos</p>
            <p className="text-2xl font-bold text-foreground">{stats.breakdown.photos}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <VideoIcon className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Videos</p>
            <p className="text-2xl font-bold text-foreground">{stats.breakdown.videos}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart: Last 7 Days Activity */}
        <div className="lg:col-span-2 bg-card p-8 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-foreground">Upload Activity</h3>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">Last 7 Days</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.activity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                />
                <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                    }}
                />
                <Bar 
                    dataKey="count" 
                    fill="#3b82f6" 
                    radius={[6, 6, 0, 0]} 
                    barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Distribution */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-8">Media Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="42%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-2">
              {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-sm font-bold text-foreground">{entry.name}</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{entry.value}</span>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
