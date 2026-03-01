import { Container, Box, Typography, Paper, Divider } from '@mui/material';

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
        Datenschutzerklärung
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Stand: März 2026. Erstellt auf Basis eines Musters der DGD Deutsche Gesellschaft für Datenschutz GmbH, angepasst für Effortless.
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Effortless. Eine Nutzung der Internetseiten der Effortless ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den für die Effortless geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Die Effortless hat als für die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu übermitteln.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Section 1 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            1. Begriffsbestimmungen
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die Datenschutzerklärung der Effortless beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:</Typography>
          
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3 }}>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>a) personenbezogene Daten:</strong> Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person") beziehen.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>b) betroffene Person:</strong> Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>c) Verarbeitung:</strong> Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>d) Einschränkung der Verarbeitung:</strong> Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>e) Profiling:</strong> Jede Art der automatisierten Verarbeitung personenbezogener Daten zur Bewertung persönlicher Aspekte.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>f) Pseudonymisierung:</strong> Verarbeitung in einer Weise, dass Daten ohne Zusatzinfos nicht mehr zugeordnet werden können.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>g) Verantwortlicher:</strong> Natürliche oder juristische Person, die über Zwecke und Mittel der Verarbeitung entscheidet.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>h) Auftragsverarbeiter:</strong> Person oder Stelle, die Daten im Auftrag des Verantwortlichen verarbeitet.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>i) Empfänger:</strong> Stelle, der Daten offengelegt werden.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>j) Dritter:</strong> Stelle außer der betroffenen Person, dem Verantwortlichen und dem Auftragsverarbeiter.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>k) Einwilligung:</strong> Freiwillige Willensbekundung der betroffenen Person.</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 2 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            2. Name und Anschrift des für die Verarbeitung Verantwortlichen
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist die:
            <br /><br />
            Effortless<br />
            Weberstr 4a<br />
            44789 Bochum<br />
            Deutschland<br />
            Tel.: +4917669876309<br />
            E-Mail: sebastianorth-admin@sebastianorth.info<br />
            Website: https://effort-less.de
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 3 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            3. Cookies
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die Internetseiten der Effortless verwenden Cookies. Cookies sind Textdateien, welche über einen Internetbrowser auf einem Computersystem abgelegt und gespeichert werden.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Durch den Einsatz von Cookies kann die Effortless den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht möglich wären (z.B. Warenkorbfunktion, Login-Status).
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Ferner können bereits gesetzte Cookies jederzeit über einen Internetbrowser gelöscht werden. Deaktiviert die betroffene Person die Setzung von Cookies, sind unter Umständen nicht alle Funktionen unserer Internetseite vollumfänglich nutzbar.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 4 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            4. Erfassung von allgemeinen Daten und Informationen (Logfiles)
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die Internetseite der Effortless erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Erfasst werden können: (1) verwendeten Browsertypen und Versionen, (2) das Betriebssystem, (3) Referrer URL, (4) Unterwebseiten, (5) Datum und Uhrzeit, (6) IP-Adresse, (7) Internet-Service-Provider und (8) sonstige ähnliche Daten zur Gefahrenabwehr.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Diese Daten werden benötigt, um die Inhalte unserer Internetseite korrekt auszuliefern, die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme zu gewährleisten sowie um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Die Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 5 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            5. Registrierung auf unserer Internetseite
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Die betroffene Person hat die Möglichkeit, sich auf der Internetseite des für die Verarbeitung Verantwortlichen unter Angabe von personenbezogenen Daten zu registrieren. Welche personenbezogenen Daten dabei an den für die Verarbeitung Verantwortlichen übermittelt werden, ergibt sich aus der jeweiligen Eingabemaske, die für die Registrierung verwendet wird. Die eingegebenen Daten werden ausschließlich für die interne Verwendung erhoben und gespeichert.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Durch eine Registrierung werden zudem die IP-Adresse, das Datum sowie die Uhrzeit der Registrierung gespeichert. Dies dient der Absicherung und der Aufklärung von Straftaten.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 6 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            6. Kontaktmöglichkeit über die Internetseite
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis übermittelten personenbezogenen Daten werden für Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 7 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            7. Hosting und Backend-Infrastruktur
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>DigitalOcean</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir hosten unsere Systeme und Datenbanken bei dem Anbieter DigitalOcean, LLC, 101 Avenue of the Americas, 10th Floor, New York, NY 10013, USA.
            Zum Zweck der Bereitstellung und Auslieferung der Website werden Verbindungsdaten verarbeitet. Die Daten werden dabei auf Servern in Europa (vorzugsweise Frankfurt, Deutschland) gespeichert, können jedoch technisch bedingt auch von der US-Muttergesellschaft verarbeitet werden.
            Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DS-GVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unseres Onlineangebotes).
            Weitere Informationen entnehmen Sie der Datenschutzerklärung von DigitalOcean: https://www.digitalocean.com/legal/privacy/
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary', mt: 2 }}>Supabase</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Zur Verwaltung unserer Datenbanken und zur Authentifizierung von Nutzern verwenden wir Supabase, bereitgestellt von Supabase, Inc., 970 Toa Payoh North #07-04, Singapur 318992.
            Supabase verarbeitet in unserem Auftrag Nutzerdaten (z.B. E-Mail-Adressen für Login, Datenbankinhalte).
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung) sowie unser berechtigtes Interesse an einer modernen und sicheren Datenbankinfrastruktur gemäß Art. 6 Abs. 1 lit. f DS-GVO.
            Datenschutzerklärung von Supabase: https://supabase.com/privacy
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 8 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            8. Zahlungsabwicklung
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Stripe</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Auf dieser Website haben wir Komponenten von Stripe integriert. Stripe ist ein Online-Zahlungsdienstleister. Betreibergesellschaft für Europa ist die Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.
            Wählt die betroffene Person während des Bestellvorgangs eine Zahlungsart aus, werden automatisiert Daten der betroffenen Person an Stripe übermittelt. Mit der Auswahl dieser Zahlungsoption willigt die betroffene Person in die zur Zahlungsabwicklung erforderliche Übermittlung personenbezogener Daten ein.
            Bei den an Stripe übermittelten personenbezogenen Daten handelt es sich in der Regel um Kaufbetrag, Währung, Vorname, Nachname, Adresse, E-Mail-Adresse, IP-Adresse, Kreditkartennummer, Ablaufdatum und CVC-Code oder andere Daten, die zur Zahlungsabwicklung notwendig sind.
            Die Übermittlung der Daten bezweckt die Zahlungsabwicklung und die Betrugsprävention. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung).
            Stripe übermittelt personenbezogene Daten unter Umständen an die Stripe, Inc. in den USA.
            Datenschutzerklärung von Stripe: https://stripe.com/de/privacy
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 9 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            9. Einsatz von Künstlicher Intelligenz (KI)
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Innerhalb unserer Anwendung kommen Technologien zur Textgenerierung und -analyse (Künstliche Intelligenz) zum Einsatz. Wenn Sie entsprechende Funktionen nutzen, werden Ihre Eingabe-Daten (Prompts) an die jeweiligen Anbieter übermittelt.
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Google Gemini</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir nutzen die API des Dienstes "Gemini" von Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland bzw. Google LLC, USA).
            Ihre Eingaben werden an Google zur Verarbeitung gesendet, um die Antwort zu generieren. Wir haben Konfigurationen vorgenommen, um die Speicherung Ihrer Daten durch Google auf das Notwendigste zu beschränken. Dennoch kann nicht ausgeschlossen werden, dass Daten in die USA übertragen werden.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung, sofern die KI Kernbestandteil der Leistung ist) bzw. Ihre Einwilligung durch Nutzung der Funktion.
            Weitere Informationen: https://policies.google.com/privacy
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary', mt: 2 }}>Anthropic (Claude)</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir nutzen die API des Dienstes "Claude" von Anthropic, PBC, 548 Market Street, PMB 90375, San Francisco, CA 94104, USA.
            Zur Erbringung der Dienstleistung werden Ihre Texteingaben an Server von Anthropic in die USA übermittelt. Anthropic verwendet diese Daten gemäß den geltenden Datenschutzbestimmungen zur Bereitstellung der Antwort.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DS-GVO (Vertragserfüllung zur Bereitstellung der KI-Funktion).
            Datenschutzerklärung von Anthropic: https://www.anthropic.com/privacy
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 10 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            10. Authentifizierung und Entwicklung
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>GitHub</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir nutzen Dienste der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
            Sofern Sie sich über "GitHub Login" authentifizieren oder wir GitHub zur Code-Verwaltung und dem Deployment unserer Website nutzen, können Daten (wie IP-Adresse oder Nutzername) an GitHub übertragen werden.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DS-GVO (Sicherheit und Stabilität der Technik) bzw. Art. 6 Abs. 1 lit. b DS-GVO (Authentifizierung).
            Datenschutzerklärung von GitHub: https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 11 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            11. Rechte der betroffenen Person
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Jede betroffene Person hat gemäß der DS-GVO folgende Rechte:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3 }}>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>a) Recht auf Bestätigung und Auskunft (Art. 15 DS-GVO):</strong> Sie können jederzeit Auskunft darüber verlangen, ob und welche Daten wir von Ihnen verarbeiten.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>b) Recht auf Berichtigung (Art. 16 DS-GVO):</strong> Sie können die sofortige Berichtigung falscher Daten verlangen.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>c) Recht auf Löschung (Art. 17 DS-GVO):</strong> Sie können die Löschung Ihrer Daten verlangen ("Recht auf Vergessenwerden"), sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>d) Recht auf Einschränkung der Verarbeitung (Art. 18 DS-GVO).</strong></Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>e) Recht auf Datenübertragbarkeit (Art. 20 DS-GVO):</strong> Erhalt der Daten in einem strukturierten Format.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>f) Recht auf Widerspruch (Art. 21 DS-GVO):</strong> Sie können jederzeit gegen die Verarbeitung Widerspruch einlegen, sofern diese auf Art. 6 Abs. 1 lit. e oder f DS-GVO beruht.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>g) Automatisierte Entscheidung im Einzelfall:</strong> Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung beruhenden Entscheidung unterworfen zu werden.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>h) Recht auf Widerruf einer Einwilligung:</strong> Sie können eine erteilte Einwilligung jederzeit widerrufen.</Typography></li>
          </Box>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 2 }}>
            Möchte eine betroffene Person eines dieser Rechte in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden (Kontaktdaten siehe oben).
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Section 12 & 13 & 14 & 15 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            12. Routinemäßige Löschung und Sperrung von personenbezogenen Daten
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wir verarbeiten und speichern personenbezogene Daten nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies gesetzlich vorgeschrieben wurde. Entfällt der Speicherungszweck oder läuft eine Speicherfrist ab, werden die Daten routinemäßig gesperrt oder gelöscht.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            13. Rechtsgrundlage der Verarbeitung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>Soweit nicht im Einzelfall anders angegeben:</Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 3 }}>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>Art. 6 I lit. a DS-GVO</strong> dient als Rechtsgrundlage für Vorgänge, bei denen wir eine Einwilligung einholen.</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>Art. 6 I lit. b DS-GVO</strong> dient als Rechtsgrundlage für die Vertragserfüllung (z.B. Lieferung, Servicebereitstellung).</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>Art. 6 I lit. c DS-GVO</strong> bei rechtlichen Verpflichtungen (z.B. Steuern).</Typography></li>
            <li><Typography variant="body2" sx={{ mb: 1 }}><strong>Art. 6 I lit. f DS-GVO</strong> bei Wahrung berechtigter Interessen (z.B. Sicherheit der Website, Geschäftstätigkeit).</Typography></li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            14. Dauer der Speicherung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Das Kriterium für die Dauer der Speicherung ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung erforderlich sind.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            15. Bestehen einer automatisierten Entscheidungsfindung
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling, welches Ihnen gegenüber rechtliche Wirkung entfaltet.
          </Typography>
        </Box>

      </Paper>
    </Container>
  );
}
