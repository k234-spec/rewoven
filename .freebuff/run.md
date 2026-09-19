# Reproduce local artifacts

- Use Node.js 24 and npm. From the thread workspace, run `npm.cmd ci` when dependencies are missing or the lockfile changes. Dependencies are already installed in the current workspace.
- Main checkout: `D:\Madamcutiee`. When using a different worktree, copy any existing `.env` and `.env.local` from the main checkout into that worktree. Copy files; do not symlink them. Do not overwrite existing worktree-specific settings. This thread uses the main checkout itself, so no environment copy is needed.
- Keep secret values out of this document. For a new environment without merchant configuration, use `.env.rewoven.example` as the configuration template; the demonstration storefront works without payment credentials.
- Ensure `public/rewoven` contains the editorial image, `look-0.webp` through `look-3.webp`, and the favicon. If these uncommitted generated assets are absent in a separate worktree, copy `public/rewoven` from the main checkout. The asset prompt and provenance are in `REWOVEN_SETUP.md`.
- Rewoven creates and seeds `.rewoven-data/store.sqlite` automatically. A new demo database does not require the inherited Prisma setup. Use a separate persistent data directory for each worktree; do not share a database through a symlink. Merchant data is optional for preview.

# Run the server

Run from `D:\Madamcutiee`. Use the Next.js development server, not the legacy root HTML files. Prefer port 3000 if free; otherwise choose a free port and replace the port below. Do not run a build while the dev server is using `.next`.

Start detached with the Windows PowerShell recipe, preserving separate stdout/stderr files:

```powershell
(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','--port','3000' -WorkingDirectory 'D:\Madamcutiee' -RedirectStandardOutput 'D:\Madamcutiee\.freebuff\preview-7a45eb73-af5e-448a-a06c-f33f687ea65a.log' -RedirectStandardError 'D:\Madamcutiee\.freebuff\preview-7a45eb73-af5e-448a-a06c-f33f687ea65a.log.err' -WindowStyle Hidden -PassThru).Id
```

After a few seconds, confirm the printed PID survives with `Get-Process -Id <pid>`. Wait for `http://localhost:3000` to return HTTP 200; initial Next.js compilation can take a minute. Inspect both log files if it fails. Register the URL and the printed process ID with `register_preview`, then check rendering and navigation with the Preview tools.

Current preview uses port 3000, which was free at activation. Collection route: `/shop`.
