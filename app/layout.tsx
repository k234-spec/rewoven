import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { StoreProvider, Header, Footer } from '@/components/rewoven/Store';
import './globals.css';
import './rewoven.css';
const display=Playfair_Display({subsets:['latin'],variable:'--font-display',display:'swap'});
const body=Plus_Jakarta_Sans({subsets:['latin'],variable:'--font-body',display:'swap'});
export const metadata:Metadata={title:'Rewoven | Tradition, Rewoven.',icons:{icon:'/rewoven/favicon.svg'},description:'Indian men’s ethnic and occasionwear for weddings, celebrations, and memorable occasions.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning><body className="rw" suppressHydrationWarning><StoreProvider><Header/><main id="main">{children}</main><Footer/></StoreProvider></body></html>}
