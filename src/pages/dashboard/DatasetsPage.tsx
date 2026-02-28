import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/StorageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../../context/AuthContext';
import { datasetService, type Dataset } from '../../services/datasetService';
import { billingService } from '../../services/billingService';

export default function DatasetsPage() {
  const { token } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [unlockedDatasets, setUnlockedDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    // Check for Stripe redirect
    if (searchParams.get('session_id')) {
      setSuccessMessage('Payment successful! Your dataset has been unlocked.');
      // Optional: you could clean up the URL to remove the session_id
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDatasets = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [data, unlockedData] = await Promise.all([
          datasetService.listDatasets(token),
          datasetService.getUnlockedDatasets(token).catch(() => []) // Gracefully fallback 
        ]);
        setDatasets(data);
        setUnlockedDatasets(unlockedData);
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

  const handleDownloadDataset = async (datasetId: string) => {
    if (!token) return;
    setDownloadLoading(datasetId);
    setError(null);
    try {
      // Create an object URL from the blob response
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'https://effortless-products-8enoe.ondigitalocean.app'}/api/v1/datasets/${datasetId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 403 || response.status === 402) {
          throw new Error('You need to unlock this dataset or upgrade your plan to download it.');
        }
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to download dataset.');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Try to get filename from content-disposition header if available
      const disposition = response.headers.get('content-disposition');
      let filename = `dataset-${datasetId}.json`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) { 
            filename = matches[1].replace(/['"]/g, '');
          }
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (err: any) {
      setError(err.message || 'Error downloading dataset.');
    } finally {
      setDownloadLoading(null);
    }
  };

  const handleOpenInfo = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setInfoDialogOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoDialogOpen(false);
    setSelectedDataset(null);
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

      {successMessage && (
        <Alert severity="success" sx={{ mb: 4 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

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
                    <IconButton size="small" sx={{ color: '#6B7280', mt: -0.5, mr: -1 }} onClick={() => handleOpenInfo(dataset)}>
                      <InfoOutlinedIcon />
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
                  {unlockedDatasets.map((d) => d.id).includes(dataset.id) ? (
                    <Button 
                      size="small" 
                      variant="contained" 
                      disableElevation
                      onClick={() => handleDownloadDataset(dataset.id)}
                      disabled={downloadLoading === dataset.id}
                      sx={{ 
                        color: '#fff',
                        bgcolor: '#111827',
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: '#1f2937',
                        }
                      }}
                    >
                      {downloadLoading === dataset.id ? 'Starting...' : 'Download'}
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      variant="contained" 
                      disableElevation
                      onClick={() => handleCheckoutDataset(dataset.id)}
                      disabled={checkoutLoading === dataset.id || downloadLoading === dataset.id}
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
                      {checkoutLoading === dataset.id ? 'Loading...' : 'Unlock'}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
          })}
        </Grid>
      )}

      {/* Dataset Info Dialog */}
      <Dialog open={infoDialogOpen} onClose={handleCloseInfo} maxWidth="sm" fullWidth>
        {selectedDataset && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 2 }}>
              <StorageIcon sx={{ color: '#6B7280' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {selectedDataset.name} Details
              </Typography>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 3 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  ID
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1.5 }}>
                  {selectedDataset.id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  {selectedDataset.description || 'No description available for this dataset.'}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip 
                    label={selectedDataset.status} 
                    size="small" 
                    color={selectedDataset.status === 'active' || selectedDataset.status === 'completed' ? 'success' : 'default'} 
                    variant="outlined" 
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Products
                  </Typography>
                  <Typography variant="body1">
                    {selectedDataset.product_count}
                  </Typography>
                </Grid>
                
                {selectedDataset.snapshot_date && (
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Snapshot Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(selectedDataset.snapshot_date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                )}
                
                {selectedDataset.import_method && (
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Import Method
                    </Typography>
                    <Typography variant="body2">
                      {selectedDataset.import_method}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              {selectedDataset.source_url && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Source URL
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all', color: 'primary.main' }}>
                    <a href={selectedDataset.source_url} target="_blank" rel="noopener noreferrer">
                      {selectedDataset.source_url}
                    </a>
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseInfo} variant="outlined" color="inherit">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
