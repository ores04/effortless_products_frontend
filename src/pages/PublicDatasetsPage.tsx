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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Container,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/StorageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { datasetService, type Dataset } from '../services/datasetService';

export default function PublicDatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true);
      try {
        const data = await datasetService.getPublicDatasets();
        setDatasets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load datasets');
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, []);

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

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 8 }}>
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
              Dataset Catalog
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, fontWeight: 300 }}>
              Explore our comprehensive collection of retail datasets. Sign in or purchase a plan to unlock full access.
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {datasets.length === 0 && !error ? (
          <Paper sx={{ p: 8, textAlign: 'center', color: 'text.secondary', borderRadius: 4, bgcolor: 'grey.50', border: '1px dashed', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 300 }}>Check back soon for available datasets.</Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {datasets.map((dataset) => {
              const pastelColors = [
                '#E3F2FD', '#F3E5F5', '#E8F5E9', '#FFF3E0', 
                '#FFEBEE', '#E0F7FA', '#FCE4EC', '#F4F4F5'
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
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                          <Box sx={{ mt: 0.5, color: '#000', display: 'flex' }}>
                            <StorageIcon fontSize="small" />
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 300, color: '#111827', lineHeight: 1.3 }}>
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

                      <Typography color="text.secondary" sx={{ mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {dataset.description || 'No description available.'}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
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
                    
                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button 
                        component={RouterLink}
                        to="/login?redirect=/dashboard/datasets"
                        fullWidth
                        variant="contained" 
                        disableElevation
                        sx={{ 
                          bgcolor: '#111827', 
                          color: '#fff',
                          fontWeight: 600,
                          borderRadius: 2,
                          py: 1,
                          textTransform: 'none',
                          '&:hover': {
                            bgcolor: '#1f2937'
                          }
                        }}
                      >
                        Sign in to Unlock
                      </Button>
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
                <Typography variant="h6" sx={{ fontWeight: 300 }}>
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
      </Container>
    </Box>
  );
}
