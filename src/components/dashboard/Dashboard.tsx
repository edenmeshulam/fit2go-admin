import { AttachMoney, CalendarToday, Facebook, Group, LinkedIn, Person, Speed, TrendingDown, TrendingUp, Twitter } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { useGetList } from "react-admin";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const StatCard = ({ title, value, trend, trendValue, icon, color }: any) => {
  const theme = useTheme();
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: color }}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {title}
            </Typography>
          </Box>
          {icon}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TrendIcon sx={{ color: trendColor, mr: 1, fontSize: "1rem" }} />
          <Typography variant="body2" sx={{ color: trendColor }}>
            {trendValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SocialCard = ({ platform, stats, icon, color }: any) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>{React.cloneElement(icon, { sx: { fontSize: 40, color } })}</Box>
      <Grid container spacing={2}>
        {Object.entries(stats).map(([key, value]: [string, any]) => (
          <Grid item xs={6} key={key}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

const TrafficStats = ({ data }: any) => (
  <Paper sx={{ p: 2, mt: 2 }}>
    <Typography variant="h6" gutterBottom>
      Traffic & Sales
    </Typography>
    <Grid container spacing={3}>
      {data.map((item: any) => (
        <Grid item xs={3} key={item.label}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: item.color }}>
            {item.value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export const Dashboard = () => {
  const theme = useTheme();

  // Fetch some real data
  const { data: users } = useGetList("users", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  const { data: bookings } = useGetList("bookings", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "DESC" },
  });

  const statsData = [
    {
      title: "Users",
      value: "26K",
      trend: "down",
      trendValue: "-12.4%",
      icon: <Person sx={{ color: theme.palette.primary.main, fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: "Income",
      value: "$6,200",
      trend: "up",
      trendValue: "+40.9%",
      icon: <AttachMoney sx={{ color: theme.palette.info.main, fontSize: 40 }} />,
      color: theme.palette.info.main,
    },
    {
      title: "Conversion Rate",
      value: "2.49",
      trend: "up",
      trendValue: "+84.7%",
      icon: <Speed sx={{ color: theme.palette.warning.main, fontSize: 40 }} />,
      color: theme.palette.warning.main,
    },
    {
      title: "Sessions",
      value: "44K",
      trend: "down",
      trendValue: "-23.6%",
      icon: <Group sx={{ color: theme.palette.error.main, fontSize: 40 }} />,
      color: theme.palette.error.main,
    },
  ];

  const socialData = [
    {
      platform: "Facebook",
      stats: { FRIENDS: "89K", FEEDS: "459" },
      icon: <Facebook />,
      color: "#4267B2",
    },
    {
      platform: "Twitter",
      stats: { FOLLOWERS: "973k", TWEETS: "1,792" },
      icon: <Twitter />,
      color: "#1DA1F2",
    },
    {
      platform: "LinkedIn",
      stats: { CONTACTS: "500", FEEDS: "1,292" },
      icon: <LinkedIn />,
      color: "#0077B5",
    },
    {
      platform: "Calendar",
      stats: { EVENTS: "12+", MEETINGS: "4" },
      icon: <CalendarToday />,
      color: "#FFC107",
    },
  ];

  const trafficData = [
    { label: "New Clients", value: "9,123", color: theme.palette.primary.main },
    { label: "Recurring Clients", value: "22,643", color: theme.palette.error.main },
    { label: "Pageviews", value: "78,623", color: theme.palette.warning.main },
    { label: "Organic", value: "49,123", color: theme.palette.success.main },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Social Media Cards */}
        {socialData.map((social, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <SocialCard {...social} />
          </Grid>
        ))}

        {/* Traffic Stats */}
        <Grid item xs={12}>
          <TrafficStats data={trafficData} />
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: "Jan", users: 4000, income: 2400 },
                    { name: "Feb", users: 3000, income: 1398 },
                    { name: "Mar", users: 2000, income: 9800 },
                    { name: "Apr", users: 2780, income: 3908 },
                    { name: "May", users: 1890, income: 4800 },
                    { name: "Jun", users: 2390, income: 3800 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke={theme.palette.primary.main} />
                  <Line type="monotone" dataKey="income" stroke={theme.palette.secondary.main} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
