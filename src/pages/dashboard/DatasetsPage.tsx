import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress, 
  Alert,
  Chip,
  IconButton,
  Paper
} from '@mui/material';
import StorageIcon from '@mui/icons-material/StorageOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../../context/AuthContext';
import { datasetService, type Dataset } from '../../services/datasetService';
import { billingService } from '../../services/billingService';

export default function DatasetsPage() {
  const { token } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await datasetService.listDatasets(token);
        setDatasets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load datasets');
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, [token]);

  const handleCheckoutDataset = async (datasetId: string) => {
    if (!token) return;
    setCheckoutLoading(datasetId);
    setError(null);
    try {
      const { checkout_url } = await billingService.createDatasetCheckout(datasetId, token);
      window.location.href = checkout_url;
    } catch (err: any) {
      setError(err.message || 'Failed to initiate purchase for this dataset.');
      setCheckoutLoading(null);
    }
  };

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 300 }}>
          Datasets
        </Typography>

      </Box>

      {datasets.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
          <Typography>No datasets found.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {datasets.map((dataset) => {
             // Generate a consistent pastel color based on dataset ID
             const pastelColors = [
               '#E3F2FD', // Light Blue
               '#F3E5F5', // Light Purple
               '#E8F5E9', // Light Green
               '#FFF3E0', // Light Orange
               '#FFEBEE', // Light Red
               '#E0F7FA', // Light Cyan
               '#FCE4EC', // Light Pink
               '#F4F4F5', // Light Gray
             ];
             const hash = dataset.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
             const bgColor = pastelColors[hash % pastelColors.length];

             return (
             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dataset.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 4, 
                  border: '1px solid', 
                  borderColor: 'rgba(0,0,0,0.04)',
                  bgcolor: bgColor,
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                       <Box sx={{ 
                           mt: 0.5,
                           color: '#000', // Black icon requested
                           display: 'flex',
                       }}>
                         <StorageIcon fontSize="small" />
                       </Box>
                       <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                         {dataset.name}
                       </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: '#6B7280', mt: -0.5, mr: -1 }}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#6B7280', mb: 3, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    ID: {dataset.id}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={dataset.status} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.6)', 
                        color: '#374151',
                        fontWeight: 500,
                        border: '1px solid rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(4px)'
                      }}
                    />
                    <Chip 
                      label={`${dataset.product_count} Products`} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.6)', 
                        color: '#374151',
                        fontWeight: 500,
                        border: '1px solid rgba(0,0,0,0.05)',
                        backdropFilter: 'blur(4px)'
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2, pt: 0, gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="contained" 
                    disableElevation
                    onClick={() => handleCheckoutDataset(dataset.id)}
                    disabled={checkoutLoading === dataset.id}
                    sx={{ 
                      bgcolor: '#fff', 
                      color: '#111827',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#f9fafb'
                      }
                    }}
                  >
                    {checkoutLoading === dataset.id ? 'Loading...' : 'Unlock Dataset'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
          })}
        </Grid>
      )}
    </Box>
  );
}
