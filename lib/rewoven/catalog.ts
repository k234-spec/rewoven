export type Product = { id:string; name:string; category:string; occasion:string; price:number; original?:number; color:string; hex:string; image:number; fresh:boolean; sizes:string[]; sales?:number; images?:string[]; description?:string; fabric?:string; fit?:string; care?:string; included?:string };
export const products:Product[] = [
{id:'aara-ivory-sherwani',name:'Aara Embroidered Sherwani Set',category:'Sherwani',occasion:'Wedding',price:18990,color:'Ivory',hex:'#e4dac4',image:0,fresh:true,sizes:['S','M','L','XL']},
{id:'mehr-burgundy',name:'Mehr Indo-Western Set',category:'Indo-Western',occasion:'Wedding',price:12990,color:'Burgundy',hex:'#662d37',image:1,fresh:true,sizes:['M','L','XL','XXL']},
{id:'zain-black-jodhpuri',name:'Zain Classic Jodhpuri Suit',category:'Jodhpuri',occasion:'Celebration',price:14990,color:'Black',hex:'#252525',image:2,fresh:false,sizes:['S','M','L','XL']},
{id:'noor-sage',name:'Noor Textured Kurta & Jacket Set',category:'Festive',occasion:'Festive',price:8990,color:'Sage',hex:'#8e9784',image:3,fresh:true,sizes:['S','M','L','XL','XXL']},
{id:'arya-wedding',name:'Arya Heritage Wedding Ensemble',category:'Wedding',occasion:'Wedding',price:21990,color:'Ivory',hex:'#e4dac4',image:0,fresh:false,sizes:['M','L','XL']},
{id:'veer-blazer',name:'Veer Occasion Bandhgala Blazer',category:'Designer Blazers',occasion:'Celebration',price:9990,original:12990,color:'Black',hex:'#252525',image:2,fresh:false,sizes:['S','M','L']},
{id:'raahi-festive',name:'Raahi Festive Jacket Set',category:'Festive',occasion:'Festive',price:7990,color:'Sage',hex:'#8e9784',image:3,fresh:false,sizes:['S','M','L','XL']},
{id:'ishaan-wine',name:'Ishaan Signature Indo-Western',category:'Indo-Western',occasion:'Celebration',price:11990,color:'Burgundy',hex:'#662d37',image:1,fresh:false,sizes:['M','L','XL']}
];
export const categories=['Sherwani','Indo-Western','Designer Blazers','Jodhpuri','Wedding','Festive'];
export const money=(n:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2,minimumFractionDigits:0}).format(n);
export const brand={announcement:'Rooted in tradition. Made for your moments.',email:'',phone:'',whatsapp:'',instagram:'',address:''};
