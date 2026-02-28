import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAuth } from '../../context/AuthContext';
import { endpoints, defaultHeaders } from '../../services/api';

export default function VideoUploadPage() {
  const { user, token, supabase } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [storeId, setStoreId] = useState('');
  const [stores, setStores] = useState<any[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [serverStatus, setServerStatus] = useState<{main: boolean | null, sidecar: boolean | null}>({
    main: null,
    sidecar: null
  });
  const [tasks, setTasks] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Check server statuses
  const checkServers = async () => {
    setServerStatus({ main: null, sidecar: null });
    try {
      const mainUrl = import.meta.env.VITE_SERVER_URL || import.meta.env.VITE_API_URL;
      if (mainUrl) {
        const res = await fetch(`${mainUrl}/health`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }).catch(() => fetch(mainUrl, { headers: { 'ngrok-skip-browser-warning': 'true' } }));
        setServerStatus(s => ({ ...s, main: res ? res.ok : false }));
      }
    } catch (e) {
      setServerStatus(s => ({ ...s, main: false }));
    }
    
    try {
      const sidecarUrl = import.meta.env.VITE_SIDECAR_URL;
      if (sidecarUrl) {
        const res = await fetch(`${sidecarUrl}/health`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }).catch(() => fetch(sidecarUrl, { headers: { 'ngrok-skip-browser-warning': 'true' } }));
        setServerStatus(s => ({ ...s, sidecar: res ? res.ok : false }));
      }
    } catch (e) {
      setServerStatus(s => ({ ...s, sidecar: false }));
    }
  };

  useEffect(() => {
    checkServers();
  }, []);

  // Fetch stores (mocked, as the API is currently unused)
  useEffect(() => {
    // Provide a default mock store to avoid validation errors
    const mockStoreId = '11111111-0000-0000-0000-000000000001';
    setStores([{ id: mockStoreId, name: 'Default Store (Unused)' }]);
    setStoreId(mockStoreId);
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    if (!supabase || !user) return;
    
    setLoadingTasks(true);
    try {
      const { data, error } = await supabase
        .from('video_processing_tasks')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setTasks(data);
      }
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [supabase, user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(null);
      // Auto-fill dataset name if empty
      if (!datasetName) {
        setDatasetName(e.target.files[0].name.split('.')[0]);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !datasetName || !storeId || !user || !supabase || !token) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setUploading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // 1. Upload to Supabase S3 bucket "videos"
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('video_processing')
        .upload(fileName, file);
        
      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      // Create a signed URL since the bucket is not public
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('video_processing')
        .createSignedUrl(fileName, 3600); // 1 hour expiry
        
      if (signedUrlError || !signedUrlData) {
        throw new Error(`Failed to generate video URL: ${signedUrlError?.message || 'Unknown error'}`);
      }
      
      const publicUrl = signedUrlData.signedUrl;
      
      // 2. Call our backend to start processing
      const response = await fetch(endpoints.processVideo, {
        method: 'POST',
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          video_s3_url: publicUrl,
          owner_id: user.id,
          store_id: storeId,
          dataset_name: datasetName,
          description: description
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to start processing');
      }
      
      setSuccess('Video uploaded and processing started successfully!');
      setFile(null);
      setDatasetName('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'success';
      case 'failed': return 'error';
      case 'processing': 
      case 'processing_started': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
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
          Video Processing Pipeline
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip 
            icon={serverStatus.main ? <CheckCircleIcon /> : (serverStatus.main === false ? <CancelIcon /> : <CircularProgress size={16} />)} 
            label="Main Server" 
            color={serverStatus.main === null ? 'default' : serverStatus.main ? 'success' : 'error'} 
            variant="outlined"
          />
          <Chip 
            icon={serverStatus.sidecar ? <CheckCircleIcon /> : (serverStatus.sidecar === false ? <CancelIcon /> : <CircularProgress size={16} />)} 
            label="Sidecar Server" 
            color={serverStatus.sidecar === null ? 'default' : serverStatus.sidecar ? 'success' : 'error'} 
            variant="outlined"
          />
          <Tooltip title="Reload server status">
            <IconButton 
              size="small" 
              onClick={checkServers} 
              disabled={serverStatus.main === null || serverStatus.sidecar === null}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, 
          gap: 4 
        }}
      >
        <Box>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Typography variant="h6" gutterBottom>Upload New Video</Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
            {(!serverStatus.main || !serverStatus.sidecar) && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                Both servers must be online to start video processing. Please check server status and try again.
              </Alert>
            )}

            <FormControl fullWidth sx={{ mb: 3 }} size="small">
              <InputLabel>Target Store</InputLabel>
              <Select
                value={storeId}
                label="Target Store"
                onChange={(e) => setStoreId(e.target.value)}
              >
                {stores.length === 0 && <MenuItem value="" disabled>Loading stores...</MenuItem>}
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.id}>{store.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Dataset Name"
              size="small"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Description (Optional)"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
              sx={{ mb: 3 }}
            />

            <Box 
              sx={{ 
                border: '2px dashed', 
                borderColor: 'divider', 
                borderRadius: 2, 
                p: 4, 
                textAlign: 'center',
                bgcolor: 'background.default',
                mb: 3
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" gutterBottom>
                {file ? file.name : 'Select a video file to upload'}
              </Typography>

              <Button variant="outlined" component="label" disabled={uploading} size="small" sx={{ mt: 1 }}>
                Browse Files
                <input type="file" hidden accept="video/*" onChange={handleFileChange} />
              </Button>
            </Box>

            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              onClick={handleUpload} 
              disabled={!file || !datasetName || !storeId || uploading || !serverStatus.main || !serverStatus.sidecar}
              startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{ py: 1.5 }}
            >
              {uploading ? 'Processing & Uploading...' : 'Start Pipeline'}
            </Button>
          </Paper>
        </Box>

        <Box>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Processing Tasks</Typography>
              <Tooltip title="Refresh tasks">
                <IconButton size="small" onClick={fetchTasks} disabled={loadingTasks}>
                  {loadingTasks ? <CircularProgress size={20} /> : <RefreshIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Dataset</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                        No processing tasks found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell sx={{ fontWeight: 500 }}>{task.dataset_name}</TableCell>
                        <TableCell>
                          <Chip 
                            label={String(task.status).replace('_', ' ')} 
                            size="small"
                            color={getStatusColor(task.status) as any}
                          />
                        </TableCell>
                        <TableCell>
                          {task.progress != null ? `${task.progress}%` : 'N/A'}
                          {task.error_message && (
                            <Typography variant="caption" color="error" display="block">
                              {task.error_message}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>
                          {new Date(task.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
