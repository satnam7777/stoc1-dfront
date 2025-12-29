"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowUpRight, ArrowDownRight, ChevronRight, MoreHorizontal} from "lucide-react";
import PortfolioCarousel from "@/app/components/PortfolioCarousel";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  BarChart,
  Bar,
  Line,
  LineChart,
} from "recharts";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

interface StockCard {
  name: string;
  value: number;
  change: number;
  shares?: number;
  icon?: string;
}

interface ChartData {
  date: string;
  value: number;
}

interface DashboardStats {
  investedValue: number;
  totalReturns: number;
  returnsPercentage: number;
  valuePercentage: number;
}

interface TopChannel {
  source: string;
  icon: string;
  revenue: string;
  sales: string;
  conversion: string;
}

interface FeaturedCampaign {
  title: string;
  status: string;
  conversion: string;
  color: string;
}

export default function DashboardPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    investedValue: 1279.95,
    totalReturns: 22543.87,
    returnsPercentage: 10.14,
    valuePercentage: 1.22,
  });

  /* =========================
     CHART DATA
  ========================= */
  const chartData: ChartData[] = [
    { date: "Jun '25", value: 31 },
    { date: "Jul '25", value: 33 },
    { date: "Aug '25", value: 34 },
    { date: "Sep '25", value: 32 },
    { date: "Oct '25", value: 31 },
    { date: "Nov '25", value: 30 },
    { date: "Dec '25", value: 33 },
    { date: "Jan '26", value: 32 },
    { date: "Feb '26", value: 34 },
    { date: "Mar '26", value: 35 },
    { date: "Apr '26", value: 38 },
  ];

  const barChartData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 85 },
    { name: "Apr", value: 92 },
    { name: "May", value: 88 },
    { name: "Jun", value: 95 },
  ];

  const lineChartData = [
    { name: "Mon", FacebookAds: 65, GoogleAds: 45 },
    { name: "Tue", FacebookAds: 78, GoogleAds: 50 },
    { name: "Wed", FacebookAds: 85, GoogleAds: 60 },
    { name: "Thu", FacebookAds: 92, GoogleAds: 70 },
    { name: "Fri", FacebookAds: 88, GoogleAds: 65 },
    { name: "Sat", FacebookAds: 95, GoogleAds: 75 },
    { name: "Sun", FacebookAds: 90, GoogleAds: 68 },
  ];

  /* =========================
     STOCKS DATA
  ========================= */
  const topCards: StockCard[] = [
    { name: "Apple", value: 410.5, change: -1.1 },
    { name: "Meta", value: 157.36, change: -0.1 },
    { name: "Google", value: 743.76, change: 0.95 },
    { name: "Tesla", value: 234.09, change: -1.1 },
  ];

  const myStocks: (StockCard & { shares: number })[] = [
    { name: "Apple", value: 410.5, change: -1.1, shares: 25 },
    { name: "Meta", value: 157.36, change: -0.1, shares: 30 },
    { name: "Google", value: 743.76, change: 0.95, shares: 15 },
    { name: "Tesla", value: 234.09, change: -1.1, shares: 40 },
    { name: "Microsoft", value: 389.21, change: 1.25, shares: 35 },
    { name: "Amazon", value: 182.45, change: 0.85, shares: 20 },
  ];

  const topChannels: TopChannel[] = [
    { source: "Facebook", icon: "/facebook-icon.png", revenue: "$2,450", sales: "342", conversion: "4.35%" },
    { source: "Google", icon: "/google-icon.png", revenue: "$1,890", sales: "256", conversion: "3.85%" },
    { source: "Instagram", icon: "/instagram-icon.png", revenue: "$1,520", sales: "198", conversion: "4.15%" },
    { source: "Twitter", icon: "/twitter-icon.png", revenue: "$980", sales: "124", conversion: "2.95%" },
    { source: "LinkedIn", icon: "/linkedin-icon.png", revenue: "$760", sales: "98", conversion: "2.45%" },
  ];

  const featuredCampaigns: FeaturedCampaign[] = [
    { title: "Summer Sale 2024", status: "Active", conversion: "4.35%", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { title: "Product Launch", status: "Pending", conversion: "3.85%", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    { title: "Holiday Campaign", status: "Completed", conversion: "4.15%", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { title: "Email Newsletter", status: "Active", conversion: "2.95%", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { title: "Social Media Ads", status: "Paused", conversion: "2.45%", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-9 dark:bg-gray-900 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold dark:text-white">
          Investment Portfolio Overview
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          SORT BY:{" "}
          <span className="font-medium text-black dark:text-white">
            Current Week
          </span>
        </div>
      </div>

      {/* Stats Cards Slider */}
      {/* <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {topCards.map((item, i) => (
            <div
              key={i}
              className="min-w-[240px] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm shrink-0"
            >
              <div>
                <h3 className="text-lg font-semibold dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                  Total Share
                </p>
                <p className="text-xl font-bold dark:text-white">
                  ${item.value}
                </p>
                <div
                  className={`inline-flex items-center mt-2 px-2 py-1 rounded text-xs font-medium ${
                    item.change > 0
                      ? "text-green-500 bg-green-50 dark:bg-green-900/20"
                      : "text-red-500 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  {item.change > 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={scrollRight}
          size="icon"
          variant="outline"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div> */}


<PortfolioCarousel topCards={topCards} />









      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Total Investment
            </h3>
            <select className="text-sm bg-gray-100 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          {/* Investment Stats */}
          <div className="flex gap-16 mb-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Invested Value
              </p>
              <p className="text-xl font-bold dark:text-white">
                ${dashboardStats.investedValue.toLocaleString()}{" "}
                <span className="text-green-500 text-sm ml-2">
                  ▲ {dashboardStats.valuePercentage}%
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Total Returns
              </p>
              <p className="text-xl font-bold dark:text-white">
                ${dashboardStats.totalReturns.toLocaleString()}{" "}
                <span className="text-green-500 text-sm ml-2">
                  ▲ {dashboardStats.returnsPercentage}%
                </span>
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: -10, right: 10 }}>
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 8"
                  vertical={false}
                  stroke="#e5e7eb"
                  opacity={0.6}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  // tailLine={false}
                />

                <YAxis hide domain={[28, 40]} />

                <Tooltip
                  cursor={{ stroke: "#e5e7eb", strokeDasharray: "3 6" }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "0.375rem",
                    color: "white",
                  }}
                  labelStyle={{ color: "white" }}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fill="url(#chartFill)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Stocks Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              My Stocks
            </h3>
            <select className="text-sm bg-gray-100 dark:bg-gray-700 dark:text-white px-3 py-2 rounded-md">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="space-y-6">
            {myStocks.map((stock, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center font-semibold text-indigo-600 dark:text-indigo-300">
                    {stock.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {stock.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {stock.shares} Shares
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    ${stock.value}
                  </p>
                  <div
                    className={`inline-flex items-center justify-end text-sm ${
                      stock.change > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.change > 0 ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(stock.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart for Campaign Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Campaign Performance</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
            <YAxis tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.375rem",
                color: "white",
              }}
              labelStyle={{ color: "white" }}
            />
            <Line type="monotone" dataKey="FacebookAds" stroke="#6366f1" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="GoogleAds" stroke="#8b5cf6" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Investment Growth</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
              <YAxis allowDecimals={false} domain={[0, 'dataMax + 50']} tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  color: "white",
                }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Channels Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold dark:text-white mb-4">Top Investment Channels</h2>
          <div className="space-y-4">
            {topChannels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {channel.source.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{channel.source}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">{channel.revenue}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{channel.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Featured Investments</h2>
        <div className="space-y-4">
          {featuredCampaigns.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <span className="font-medium text-gray-800 dark:text-gray-200">{item.title}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                {item.status}
              </span>
              <span className="font-semibold text-gray-800 dark:text-white">{item.conversion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}