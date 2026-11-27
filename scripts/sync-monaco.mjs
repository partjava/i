import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const targetDir = path.join(projectRoot, 'public', 'monaco', 'vs');
const versionMarker = path.join(targetDir, '.monaco-version');

function findMonacoPackageDir(startDir) {
  let current = startDir;
  while (true) {
    const candidate = path.join(current, 'node_modules', 'monaco-editor');
    if (fs.existsSync(path.join(candidate, 'package.json'))) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

const monacoPkgDir = findMonacoPackageDir(projectRoot);
if (!monacoPkgDir) {
  console.warn('[sync-monaco] monaco-editor not installed yet, skipping.');
  process.exit(0);
}

const monacoPkg = JSON.parse(
  fs.readFileSync(path.join(monacoPkgDir, 'package.json'), 'utf8')
);
const sourceDir = path.join(monacoPkgDir, 'min', 'vs');

if (!fs.existsSync(sourceDir)) {
  console.error(`[sync-monaco] Missing source directory: ${sourceDir}`);
  process.exit(1);
}

const expectedVersion = String(monacoPkg.version || 'unknown');
const currentVersion = fs.existsSync(versionMarker)
  ? fs.readFileSync(versionMarker, 'utf8').trim()
  : '';

if (
  currentVersion === expectedVersion &&
  fs.existsSync(path.join(targetDir, 'loader.js')) &&
  fs.existsSync(path.join(targetDir, 'editor', 'editor.main.js'))
) {
  process.exit(0);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });
fs.writeFileSync(versionMarker, `${expectedVersion}\n`, 'utf8');

console.log(`[sync-monaco] Synced monaco-editor@${expectedVersion} assets to public/monaco/vs`);
