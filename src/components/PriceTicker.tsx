import { products } from "../data/products";
export default function PriceTicker(){
 const items=[...products].slice(0,8);
 return <div className="price-ticker" aria-label="পণ্যের দামের পরিবর্তন"><div className="ticker-label">আজকের বাজারদর</div><div className="ticker-track">{[...items,...items].map((p,i)=><span className="ticker-item" key={`${p.name}-${i}`}>{p.icon} {p.name} <b>৳{p.price}</b> <em className={p.trend==='up'?'trend-up':p.trend==='down'?'trend-down':'trend-flat'}>{p.trend==='up'?'▲':p.trend==='down'?'▼':'—'} {p.change}%</em></span>)}</div></div>
}
