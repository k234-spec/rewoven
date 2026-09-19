import {catalog} from '@/lib/rewoven/server';
export const dynamic='force-dynamic';
import {notFound} from 'next/navigation';
import Link from 'next/link';

import {ProductDetails,ProductCard} from '@/components/rewoven/Store';
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const all=catalog();const p=all.find(p=>p.id===slug);if(!p)notFound();return <div className="page-wrap"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/shop">Occasionwear</Link> / {p.name}</div><ProductDetails product={p}/><div className="section-title"><h2>A few more favourites.</h2></div><div className="product-grid dense">{all.filter(x=>x.id!==p.id).slice(0,3).map(x=><ProductCard key={x.id} product={x}/>)}</div></div>}
