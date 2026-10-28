import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
const categories=["সব","চাল","ডাল","তেল","সবজি","মাছ","মাংস","ডিম-দুধ","মসলা"];
export default function Home() {
 const [search,setSearch]=useState(""); const [category,setCategory]=useState("সব"); const [sort,setSort]=useState("default");
 const filtered=useMemo(()=>{let list=products.filter(p=>(category==="সব"||p.category===category)&&p.name.toLowerCase().includes(search.trim().toLowerCase()));if(sort==="name")list=[...list].sort((a,b)=>a.name.localeCompare(b.name,"bn"));if(sort==="price-low")list=[...list].sort((a,b)=>Number(a.price.replace(/,/g,""))-Number(b.price.replace(/,/g,"")));if(sort==="price-high")list=[...list].sort((a,b)=>Number(b.price.replace(/,/g,""))-Number(a.price.replace(/,/g,"")));return list;},[search,category,sort]);
 const rising=products.filter(p=>p.trend==="up").slice(0,3), falling=products.filter(p=>p.trend==="down").slice(0,3);
 return <main>
  
  
  <section className="hero"><div className="hero-copy">
    <span className="eyebrow"><span className="live-dot">
        </span> বাজারের হিসাব এখন এক জায়গায়</span>
        <h1>আজকের বাজারদর,<br/><span>আপনার হাতেই।</span>
        </h1>
        <p>চাল, ডাল, তেল থেকে শুরু করে মাছ-মাংস—প্রয়োজনীয় পণ্যের দাম সহজে খুঁজুন এবং কেনাকাটার পরিকল্পনা করুন।</p>
  <div className="hero-actions"><a className="button" href="#products">পণ্যের দাম দেখুন <span>↓</span>
  </a><span className="hero-note">✓ সহজ · পরিষ্কার · দ্রুত</span></div></div><div className="hero-art" aria-label="বাজারের ঝুড়ি"><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two">
    </div><img className="hero-image" src="/assets/bazar-hero%202-002.png" alt="বাজারের পণ্য" /><span className="">
    </span><span className=""></span><span className=""></span><span className="">
    </span><div className=""><span>
    </span> স্মার্ট বাজারের সঙ্গী
    </div></div>
  </section>
  <section className="stats-strip"><div><span className="stat-icon">🧺</span><span><b>{products.length}+</b><small>নিত্যপ্রয়োজনীয় পণ্য</small></span></div><div><span className="stat-icon">📊</span><span><b>সহজ তুলনা</b><small>দাম বুঝুন এক নজরে</small></span></div><div><span className="stat-icon">🌿</span><span><b>সচেতন কেনাকাটা</b><small>পরিকল্পিত বাজার করুন</small></span></div></section>
  <section className="section trend-section"><div className="section-heading"><div><span className="section-kicker">আজকের পরিবর্তন</span><h2>দামের ওঠানামা</h2></div><p>যে পণ্যগুলোর দামে পরিবর্তন দেখা যাচ্ছে</p></div><div className="trend-grid"><div className="trend-panel"><div className="trend-panel-title"><span className="trend-symbol red">↗</span><div><b>দাম বেড়েছে</b><small>মূল্য বৃদ্ধির তালিকা</small></div></div>{rising.map(p=><div className="mini-product" key={p.name}><span className="mini-icon">{p.icon}</span><span className="mini-name">{p.name}<small>প্রতি {p.unit}</small></span><b>৳ {p.price}</b><span className="mini-change trend-up">+{p.change}%</span></div>)}</div><div className="trend-panel"><div className="trend-panel-title"><span className="trend-symbol green">↘</span><div><b>দাম কমেছে</b><small>মূল্য হ্রাসের তালিকা</small></div></div>{falling.map(p=><div className="mini-product" key={p.name}><span className="mini-icon">{p.icon}</span><span className="mini-name">{p.name}<small>প্রতি {p.unit}</small></span><b>৳ {p.price}</b><span className="mini-change trend-down">{p.change}%</span></div>)}</div></div></section>
  <section id="products" className="section products-section"><div className="section-heading"><div><span className="section-kicker">পণ্য তালিকা</span><h2>সব পণ্যের দাম</h2><p className="heading-subtitle">আপনার প্রয়োজনীয় পণ্য খুঁজে নিন</p></div><span className="result-count">{filtered.length}টি পণ্য</span></div>
   <div className="filter-toolbar"><label className="search-box"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="পণ্যের নাম লিখে খুঁজুন..." aria-label="পণ্য খুঁজুন"/>{search&&<button onClick={()=>setSearch("")} aria-label="সার্চ মুছুন">×</button>}</label><label className="sort-control"><span>সাজান:</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="name">নাম অনুযায়ী</option><option value="price-low">দাম: কম থেকে বেশি</option><option value="price-high">দাম: বেশি থেকে কম</option></select></label></div>
   <div className="category-chips">{categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
   {filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.name} p={p}/>)}</div>:<div className="empty-state"><span>🔎</span><h3>কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য নামে খুঁজুন অথবা বিভাগ পরিবর্তন করুন।</p><button className="button" onClick={()=>{setSearch("");setCategory("সব");}}>সব পণ্য দেখুন</button></div>}
  </section>
 </main>;
}
