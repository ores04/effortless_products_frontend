import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Alert,
  Snackbar,
  CircularProgress,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../context/AuthContext';
import { apiKeyService, type ApiKey } from '../../services/apiKeyService';
import { billingService } from '../../services/billingService';

export default function ApiKeysPage() {
  const { token } = useAuth();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);

  // Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [newKeyValues, setNewKeyValues] = useState<{ key: string, open: boolean }>({ key: '', open: false });

  // Form States
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [editName, setEditName] = useState('');

  const fetchKeys = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [data, billingData] = await Promise.all([
        apiKeyService.listKeys(token),
        billingService.getBillingInfo(token).catch(() => ({ plan: 'free' })) // Fallback to free on error
      ]);
      setKeys(data);
      setUserPlan(billingData?.plan || 'free');
    } catch (err) {
      setError('Failed to load API keys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, [token]);

  const handleCreate = async () => {
    if (!token) return;
    try {
      const data = await apiKeyService.createKey(token, newKeyName);
      setNewKeyValues({ key: data.key, open: true });
      setCreateOpen(false);
      setNewKeyName('');
      fetchKeys();
      setSuccessMsg(`API Key "${data.data.name}" created successfully`);
    } catch (err) {
      setError('Failed to create API key');
    }
  };

  const handleRename = async () => {
    if (!token || !selectedKey?.id) return;
    try {
      await apiKeyService.renameKey(token, selectedKey.id, editName);
      setRenameOpen(false);
      fetchKeys();
      setSuccessMsg('API Key renamed successfully');
    } catch (err) {
      setError('Failed to rename API key');
    }
  };

  const handleRevoke = async () => {
    if (!token || !selectedKey?.id) return;
    try {
      await apiKeyService.revokeKey(token, selectedKey.id);
      setRevokeOpen(false);
      fetchKeys();
      setSuccessMsg('API Key revoked successfully');
    } catch (err) {
      setError('Failed to revoke API key');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMsg('Copied to clipboard');
  };

  const openRenameDialog = (key: ApiKey) => {
    setSelectedKey(key);
    setEditName(key.name);
    setRenameOpen(true);
  };

  const openRevokeDialog = (key: ApiKey) => {
    setSelectedKey(key);
    setRevokeOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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
          API Keys
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Create New Key
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {userPlan === 'free' && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          API Keys are not active on the Free tier. Please upgrade to a paid plan to use the API.
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Token Prefix</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Used</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
               <TableRow>
                 <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
               </TableRow>
            ) : keys.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} align="center">No API Keys found</TableCell>
               </TableRow>
            ) : (
              keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>
                    <Chip label={key.key_prefix} size="small" sx={{ fontFamily: 'monospace' }} />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={key.is_active ? 'active' : 'revoked'} 
                      color={key.is_active ? 'success' : 'default'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openRenameDialog(key)} title="Rename">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => openRevokeDialog(key)} title="Revoke">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Key Dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>Create New API Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key Name (Optional)"
            fullWidth
            variant="outlined"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Show New Key Dialog */}
      <Dialog open={newKeyValues.open} onClose={() => setNewKeyValues({ ...newKeyValues, open: false })}>
        <DialogTitle>API Key Created</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Please copy your new API key now. You won't be able to see it again!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 2, borderRadius: 1, mt: 1 }}>
            <Typography variant="body1" component="code" sx={{ fontFamily: 'monospace', flexGrow: 1, wordBreak: 'break-all' }}>
              {newKeyValues.key}
            </Typography>
            <IconButton onClick={() => copyToClipboard(newKeyValues.key)}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewKeyValues({ ...newKeyValues, open: false })} variant="contained">Done</Button>
        </DialogActions>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={renameOpen} onClose={() => setRenameOpen(false)}>
        <DialogTitle>Rename API Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameOpen(false)}>Cancel</Button>
          <Button onClick={handleRename} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Revoke Confirmation Dialog */}
      <Dialog open={revokeOpen} onClose={() => setRevokeOpen(false)}>
        <DialogTitle>Revoke API Key</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to revoke the key "{selectedKey?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRevokeOpen(false)}>Cancel</Button>
          <Button onClick={handleRevoke} color="error" variant="contained">Revoke</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!successMsg} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMsg(null)}
        message={successMsg}
      />
    </Box>
  );
}
