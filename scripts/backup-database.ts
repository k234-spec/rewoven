import {loadEnvConfig} from '@next/env';
import {backup} from 'node:sqlite';
import {mkdir,access} from 'node:fs/promises';
import path from 'node:path';
loadEnvConfig(process.cwd());

async function main(){
  const destination=process.argv[2];
  if(!destination||!path.isAbsolute(destination))throw new Error('Pass an absolute backup filename. Existing backups will not be overwritten.');
  try{await access(destination);throw new Error('Backup destination already exists. Choose a new filename.')}
  catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e}
  await mkdir(path.dirname(destination),{recursive:true});
  const {db}=await import('../lib/rewoven/server');
  try{await backup(db(),destination);console.log('Database backed up to '+destination)}
  finally{db().close()}
}
main().catch(e=>{console.error(e instanceof Error?e.message:e);process.exitCode=1});
