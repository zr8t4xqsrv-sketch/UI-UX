import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// ─── Konfiguration ────────────────────────────────────────────────────────────
// Stimme: Daniel (Deutsch, männlich, multilingual)
// Alle verfügbaren Stimmen: https://api.elevenlabs.io/v1/voices
const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9'; // Daniel – Deutsch

const VIDEOS = [
  {
    outFile: join('public', 'ghkcu-voice.mp3'),
    text:
      'Warum sprechen plötzlich alle über GHK-Cu? ' +
      'Es handelt sich um ein Kupfer-Peptid, das aktuell intensiv in der Forschung untersucht wird. ' +
      'Der Fokus liegt vor allem auf Haut und Regeneration. ' +
      'Vienna Peptides. Research only.',
  },
  {
    outFile: join('public', 'retatrutide-voice.mp3'),
    text:
      'Warum haben manche plötzlich weniger Hunger? ' +
      'Retatrutide wird aktuell intensiv erforscht, vor allem im Zusammenhang mit Appetit und Stoffwechsel. ' +
      'Das Interesse daran wächst schnell. ' +
      'Vienna Peptides. Research only.',
  },
  {
    outFile: join('public', 'vienna-voice.mp3'),
    text:
      'Neue Entwicklungen in der Peptidforschung. ' +
      'Immer mehr Aufmerksamkeit liegt auf hochwertigen Peptiden. ' +
      'Vienna Peptides steht für Qualität und Fokus auf Forschung. ' +
      'Entdecke mehr auf viennapeptides.com.',
  },
];

// ─── Generierung ──────────────────────────────────────────────────────────────
async function generate() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error('Fehler: ELEVENLABS_API_KEY ist nicht gesetzt.');
    console.error('Setze die Variable z.B. so:');
    console.error('  $env:ELEVENLABS_API_KEY="dein-key" (PowerShell)');
    console.error('  export ELEVENLABS_API_KEY="dein-key" (bash)');
    process.exit(1);
  }

  // Sicherstellen dass public/ existiert
  mkdirSync('public', { recursive: true });

  for (const video of VIDEOS) {
    process.stdout.write(`Generiere ${video.outFile} ... `);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: video.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.55,
            similarity_boost: 0.75,
            style: 0.25,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`ElevenLabs Fehler ${response.status}: ${body}`);
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(video.outFile, audioBuffer);
    console.log('✓');
  }

  console.log('\nVoiceover fertig. Starte jetzt: npm run dev');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
