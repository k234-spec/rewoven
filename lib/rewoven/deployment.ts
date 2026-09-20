import path from 'node:path';
import {tmpdir} from 'node:os';

export function dataDirectory(env: NodeJS.ProcessEnv = process.env) {
  const configured = env.REWOVEN_DATA_DIR;
  const production = env.NODE_ENV === 'production' && env.NEXT_PHASE !== 'phase-production-build';
  if (production) {
    if (env.VERCEL) throw new Error('This SQLite deployment requires a persistent server. Vercel requires migration to a managed database.');
    if (!configured || !path.isAbsolute(configured)) throw new Error('Set REWOVEN_DATA_DIR to an absolute persistent directory before starting production.');
    const target = path.resolve(configured);
    for (const temporary of [tmpdir(), '/tmp', '/var/tmp']) {
      const relative = path.relative(path.resolve(temporary), target);
      if (relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))) {
        throw new Error('Production database storage cannot be a temporary directory.');
      }
    }
  }
  return configured || path.join(process.cwd(), '.rewoven-data');
}

