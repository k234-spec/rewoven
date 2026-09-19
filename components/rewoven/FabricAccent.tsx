'use client';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
const Fabric=dynamic(()=>import('./Fabric'),{ssr:false,loading:()=>null});
export default function FabricAccent(){const[ready,setReady]=useState(false);useEffect(()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const id=setTimeout(()=>setReady(true),1500);return()=>clearTimeout(id)}},[]);return <div className="fabric-accent">{ready&&<Fabric/>}</div>}
