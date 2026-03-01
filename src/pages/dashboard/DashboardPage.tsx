import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Alert,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { usageService, type UsageSummary, type UsageByKeyResponse } from '../../services/usageService';
import { apiKeyService, type ApiKey } from '../../services/apiKeyService';
import { authService, type UserProfile } from '../../services/authService';

export default function DashboardPage() {
  const { token } = useAuth();
  const theme = useTheme();
  
  const [summary, setSummary] = useState<UsageSummary | null>(null);
  const [keysUsage, setKeysUsage] = useState<UsageByKeyResponse | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [summaryData, keysData, apiKeysData, profileData] = await Promise.all([
          usageService.getSummary(token),
          usageService.getKeysUsage(token),
          apiKeyService.listKeys(token),
          authService.getProfile(token)
        ]);
        setSummary(summaryData);
        setKeysUsage(keysData);
        setApiKeys(apiKeysData);
        setProfile(profileData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Prepare Data for Charts

  // 1. Daily Requests
  const dailyDataMap = new Map<string, number>();
  Object.values(keysUsage || {}).forEach(records => {
    records.forEach(r => {
      const dateKey = r.date || new Date().toISOString().split('T')[0];
      dailyDataMap.set(dateKey, (dailyDataMap.get(dateKey) || 0) + r.call_count);
    });
  });

  const dailyChartData = Array.from(dailyDataMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date)); // Sort chronologically

  // 2. Usage by Key (Stacked Bar Chart by Endpoint)
  const allEndpoints = new Set<string>();
  
  // Map API key IDs to Key Names
  const keyNameMap = new Map<string, string>();
  apiKeys.forEach(k => keyNameMap.set(k.id, k.name || k.id.substring(0, 8)));

  const chartData = Object.entries(keysUsage || {}).map(([keyId, records]) => {
     const displayName = keyNameMap.get(keyId) || keyId.substring(0, 8) + '...';
     const dataEntry: any = { name: displayName };
     records.forEach(r => {
        dataEntry[r.endpoint] = (dataEntry[r.endpoint] || 0) + r.call_count;
        allEndpoints.add(r.endpoint);
     });
     return dataEntry;
  });

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.warning.main];



  return (
    <Box>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 300,
          color: 'text.primary',
          mb: 2,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          lineHeight: 1.2
        }}
      >
        Usage Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Total Requests</Typography>
                <Typography variant="h3" sx={{ fontWeight: 300 }}>
                {summary?.daily_requests || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Error Rate</Typography>
                <Typography variant="h3" sx={{ fontWeight: 300 }}>
                {(summary?.error_rate || 0 * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card 
            elevation={0} 
            sx={{ 
              bgcolor: 'background.paper', 
              color: 'text.primary', 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>Subscription Tier</Typography>
               <Typography variant="h3" sx={{ fontWeight: 300, textTransform: 'capitalize' }}>
                {profile?.status || 'Free'}
               </Typography>
               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {profile?.email}
               </Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
      
      <Grid container spacing={4}>
        {/* Chart 1: Daily Requests */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Typography variant="h6" gutterBottom>Daily Request Volume</Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 8, 
                      border: 'none', 
                      boxShadow: theme.shadows[3],
                      backgroundColor: theme.palette.background.paper
                    }} 
                  />
                  <Line type="monotone" dataKey="count" name="Requests" stroke={theme.palette.primary.main} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Chart 2: Usage by Key */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
             <Typography variant="h6" gutterBottom>Usage by API Key</Typography>
             <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: 8, 
                      border: 'none', 
                      boxShadow: theme.shadows[3],
                      backgroundColor: theme.palette.background.paper
                    }} 
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  {Array.from(allEndpoints).map((endpoint, index) => (
                    <Bar 
                      key={endpoint} 
                      dataKey={endpoint} 
                      stackId="a" 
                      fill={COLORS[index % COLORS.length]} 
                      radius={index === allEndpoints.size - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
             </Box>
          </Paper>
        </Grid>


      </Grid>
    </Box>
  );
}
