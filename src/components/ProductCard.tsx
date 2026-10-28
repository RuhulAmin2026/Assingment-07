import { Link } from "react-router-dom";
export type Product = {name:string;icon:string;price:string;trend:string;change:string;category:string;unit:string};
export default function ProductCard({p}:{p:Product}) {
  const trendClass=p.trend==="up"?"trend-up":p.trend==="down"?"trend-down":"trend-flat";
  const arrow=p.trend==="up"?"↗":p.trend==="down"?"↘":"→";
  const trendLabel=p.trend==="up"?"দাম বেড়েছে":p.trend==="down"?"দাম কমেছে":"দাম অপরিবর্তিত";
  return <Link to={`/product/${encodeURIComponent(p.name)}`} className="product-card product-card-link">
    <div className="product-top"><span className="product-icon">{p.icon}</span><span className={`trend-pill ${trendClass}`}>{arrow} {p.change}%</span></div>
    <div className="product-name">{p.name}</div><div className="product-unit">প্রতি {p.unit}</div>
    <div className="price-row"><div><small>আজকের দাম</small><div className="product-price"><span className="currency">৳</span> {p.price}</div></div><span className={`trend-caption ${trendClass}`}>{trendLabel}</span></div>
  </Link>;
}
