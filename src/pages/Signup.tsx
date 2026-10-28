import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup(){
 const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [message,setMessage]=useState(""); const navigate=useNavigate();
 function submit(e:FormEvent){e.preventDefault();if(password!==confirm){setMessage("দুটি পাসওয়ার্ড মিলছে না।");return;}if(password.length<8){setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");return;}localStorage.setItem("bazardor-user",JSON.stringify({name,email:email.trim().toLowerCase(),password}));localStorage.setItem("bazardor-session",JSON.stringify({name,email:email.trim().toLowerCase()}));navigate("/profile");}
 return <main className="pdf-auth-page"><section className="pdf-auth-intro"><h1>অ্যাকাউন্ট তৈরি করুন</h1><p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p></section><div className="pdf-auth-card"><form onSubmit={submit}>
 <label>নাম<input autoComplete="name" required value={name} onChange={e=>setName(e.target.value)} placeholder="যেমন: রহিম উদ্দিন"/></label>
 <label>ইমেইল<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
 <label>পাসওয়ার্ড<input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর"/></label>
 <label>পাসওয়ার্ড নিশ্চিত করুন<input type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="আবার লিখুন"/></label>
 {message&&<p className="form-message" role="alert">{message}</p>}<button className="pdf-auth-submit" type="submit">অ্যাকাউন্ট তৈরি করুন</button>
 </form><div className="pdf-auth-divider"><span>অথবা</span></div><div className="pdf-social-row"><button type="button" onClick={()=>setMessage("Google সাইন-ইন চালু করতে OAuth সেটআপ প্রয়োজন।")}>🌐 Google দিয়ে চালিয়ে যান</button><button type="button" onClick={()=>setMessage("GitHub সাইন-ইন চালু করতে OAuth সেটআপ প্রয়োজন।")}>◉ GitHub দিয়ে চালিয়ে যান</button></div><p className="pdf-auth-switch">অ্যাকাউন্ট আছে? <Link to="/login">সাইন ইন করুন</Link></p></div><Link className="pdf-auth-back" to="/">← হোম পেজে ফিরে যান</Link></main>;
}
