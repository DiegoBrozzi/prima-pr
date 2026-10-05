// Copia Sveltia CMS (installato da npm, versione bloccata in package-lock) nella cartella pubblica /admin/.
// Così il pannello non carica script da CDN esterne.
import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('public/admin', { recursive: true });
copyFileSync('node_modules/@sveltia/cms/dist/sveltia-cms.js', 'public/admin/sveltia-cms.js');
console.log('Sveltia CMS copiato in public/admin/');
