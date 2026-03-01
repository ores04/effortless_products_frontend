import { Container, Box, Typography, Paper, Divider } from '@mui/material';

export default function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
        Terms of Service (AGB)
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Last updated: {new Date().toLocaleDateString('de-DE')}
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 400, color: 'primary.main', mb: 3 }}>
          § [X] Datennutzung, Zwischenspeicherung (Caching) und Verbot der Replikation
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            1. Zweck der API-Nutzung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die über die API bereitgestellten Produktdaten und Preise dienen der direkten Integration in die Endkundenanwendungen (z. B. Apps, Webseiten) des Kunden. Eine Nutzung der API zur systematischen Massenabfrage oder zum Aufbau einer eigenen, unabhängigen Datenbank ist in den Standard-Tarifen (Startup, Growth) strengstens untersagt.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            2. Erlaubtes Caching (Temporäre Zwischenspeicherung)
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Um die Performance der Kundenanwendungen zu verbessern und unnötige API-Aufrufe zu vermeiden, ist eine temporäre Zwischenspeicherung (Caching) der abgerufenen Daten ausdrücklich erlaubt. Die Speicherdauer darf jedoch maximal 7 Tage betragen. Nach Ablauf dieses Zeitraums müssen die Daten gelöscht oder über einen erneuten API-Aufruf aktualisiert werden.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            3. Verbot der Datenbank-Replikation und des Scrapings
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Es ist dem Kunden untersagt, die API so zu nutzen, dass die Datenbank des Anbieters ganz oder in wesentlichen Teilen nachgebildet wird ("Database Cloning" oder "Scraping"). Insbesondere das systematische, automatisierte Abfragen sämtlicher Postleitzahlen, Filialen oder Produktkategorien mit dem Ziel, den Datensatz lokal zu spiegeln, stellt einen Verstoß gegen diese Nutzungsbedingungen dar. Für Kunden, die einen vollständigen Datenexport benötigen, bieten wir separate Enterprise-Lizenzen (Data-Dumps) an.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            4. Weitergabe und kommerzielle Weiterverwertung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Der Kunde darf die über die API bezogenen Rohdaten nicht an Dritte weiterverkaufen, unterlizenzieren oder in Form einer eigenen API oder eines Daten-Feeds (Reselling) kommerziell anbieten. Die Daten dürfen ausschließlich als Teil des im Kunden-Account angemeldeten Endprodukts sichtbar gemacht werden.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            5. Überwachung und Maßnahmen bei Verstößen
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir behalten uns das Recht vor, das Abfrageverhalten (Request-Muster, Volumen) automatisiert zu analysieren. Stellen wir fest, dass die API systematisch zum Zweck der Datenbank-Replikation genutzt wird, behalten wir uns das Recht vor, den API-Zugang (API-Key) des Kunden nach vorheriger Warnung temporär zu sperren oder ein verpflichtendes Upgrade in einen Enterprise-Tarif zu fordern.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
