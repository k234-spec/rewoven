import {currentUser} from '@/lib/rewoven/server';
import {redirect} from 'next/navigation';
import Admin from '@/components/rewoven/Admin';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export default async function Page(){const user=await currentUser();if(user?.role!=='admin')redirect('/admin/login');return <Admin/>}
