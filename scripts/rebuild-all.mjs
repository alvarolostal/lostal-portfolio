#!/usr/bin/env node
// scripts/rebuild-all.mjs
// Safe-ish helper to remove generated artifacts, reinstall deps, rebuild scripts and site, and preview.
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

function run(cmd, args, opts = {}) {
  console.log('> ', cmd, args ? args.join(' ') : '');
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: true, ...opts });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args ? args.join(' ') : ''}`);
  }
}

function killBuildWatchers() {
  try {
    if (process.platform === 'win32') {
      // Try PowerShell first (more reliable on some systems)
      try {
        const ps = spawnSync('powershell', ['-NoProfile', '-Command', 'Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match "build-scripts.mjs" } | Select-Object -ExpandProperty ProcessId'], { encoding: 'utf8', shell: true });
        const outPs = ps.stdout || '';
        const pidsPs = Array.from(outPs.matchAll(/(\d+)/g)).map(m => m[1]).filter(Boolean).map(Number).filter(n => n > 0);
        for (const pid of pidsPs) {
          try { console.log('Killing watcher pid (powershell)', pid); spawnSync('taskkill', ['/PID', String(pid), '/F'], { stdio: 'inherit', shell: true }); } catch (e) { console.warn('Failed to kill', pid, e); }
        }
      } catch {
        // fallback to wmic
        const wmic = spawnSync('wmic', ['process', 'where', 'CommandLine like "%build-scripts.mjs%"', 'get', 'ProcessId'], { encoding: 'utf8', shell: true });
        const out = wmic.stdout || '';
        const pids = Array.from(out.matchAll(/(\d+)/g)).map(m => m[1]).filter(Boolean).map(Number).filter(n => n > 0);
        for (const pid of pids) {
          try {
            console.log('Killing watcher pid', pid);
            spawnSync('taskkill', ['/PID', String(pid), '/F'], { stdio: 'inherit', shell: true });
          } catch (e) { console.warn('Failed to kill', pid, e); }
        }
      }
    } else {
      // Unix-like: pgrep -f
      const p = spawnSync('pgrep', ['-f', 'build-scripts.mjs'], { encoding: 'utf8' });
      if (p.status === 0 && p.stdout) {
        const pids = p.stdout.split(/\s+/).map(s => s.trim()).filter(Boolean);
        for (const pid of pids) {
          try { spawnSync('kill', ['-9', pid], { stdio: 'inherit' }); } catch (e) { console.warn('Failed to kill', pid, e); }
        }
      }
    }
  } catch (err) {
    console.warn('Could not reliably kill watchers automatically:', err.message || err);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const doPreview = args.includes('--preview');
  const root = path.resolve('.');
  const toRemove = [
    path.join(root, 'node_modules'),
    path.join(root, 'dist'),
    path.join(root, '.astro'),
    path.join(root, 'public', 'scripts'),
    path.join(root, '.netlify')
  ];

  console.log('Stopping build watchers (if any)...');
  killBuildWatchers();

  console.log('Removing generated folders (if present)...');
  for (const p of toRemove) {
    try {
      if (fs.existsSync(p)) {
        console.log('Removing', p);
        fs.rmSync(p, { recursive: true, force: true });
      }
    } catch (err) {
      console.warn('Could not remove', p, err.message || err);
    }
  }

  try {
    console.log('Cleaning npm cache...');
    run('npm', ['cache', 'clean', '--force']);

    console.log('Installing dependencies...');
    run('npm', ['install']);

    console.log('Building scripts (src -> public)...');
    run('node', ['./scripts/build-scripts.mjs']);

    console.log('Building site (astro build)...');
    run('npm', ['run', 'build']);

    if (doPreview) {
      console.log('Launching preview...');
      run('npm', ['run', 'preview']);
    } else {
      console.log('Rebuild complete. Preview step skipped.');
    }
  } catch (err) {
    console.error('Error during rebuild sequence:', err);
    process.exit(1);
  }
}

main();
