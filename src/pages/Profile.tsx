import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type AccountUser = { name: string; email: string };

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AccountUser>({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('bazardor-session') || 'null');
      if (!session?.email) {
        navigate('/login', { replace: true });
        return;
      }
      setUser({ name: session.name || 'ব্যবহারকারী', email: session.email || '' });
    } catch {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  function save(e: FormEvent) {
    e.preventDefault();
    const cleanUser = { name: user.name.trim(), email: user.email.trim().toLowerCase() };
    if (!cleanUser.name || !cleanUser.email) return;
    localStorage.setItem('bazardor-session', JSON.stringify(cleanUser));
    try {
      const saved = JSON.parse(localStorage.getItem('bazardor-user') || 'null');
      if (saved) localStorage.setItem('bazardor-user', JSON.stringify({ ...saved, ...cleanUser }));
    } catch { /* Keep the active session usable even if old local data is malformed. */ }
    setUser(cleanUser);
    setEditing(false);
    setMessage('আপনার অ্যাকাউন্টের তথ্য সফলভাবে আপডেট হয়েছে।');
  }

  function logout() {
    localStorage.removeItem('bazardor-session');
    navigate('/login', { replace: true });
  }

  return (
    <main className="page-wrap profile-page account-page">
      <div className="breadcrumbs"><Link to="/">হোম</Link><span> / </span><span>আমার অ্যাকাউন্ট</span></div>
      <div className="page-title account-page-title">
        <span className="section-kicker">অ্যাকাউন্ট সেন্টার</span>
        <h1>আমার অ্যাকাউন্ট</h1>
        <p>আপনার প্রোফাইলের তথ্য দেখুন, আপডেট করুন এবং বাজারদর ব্রাউজ করুন।</p>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-sidebar-user">
            <div className="profile-avatar"><img src="/assets/Avatar-001.jpg" alt="প্রোফাইল ছবি" /></div>
            <strong>{user.name || 'ব্যবহারকারী'}</strong>
            <span>{user.email}</span>
          </div>
          <nav className="account-side-nav" aria-label="অ্যাকাউন্ট মেনু">
            <a className="is-active" href="#account-details">♙ <span>আমার প্রোফাইল</span></a>
            <Link to="/">▦ <span>বাজারদর দেখুন</span></Link>
            <Link to="/#products">🛒 <span>সব পণ্য</span></Link>
            <button type="button" onClick={logout}>↩ <span>সাইন আউট</span></button>
          </nav>
        </aside>

        <section className="account-main">
          <div className="account-panel" id="account-details">
            <div className="account-panel-heading">
              <div><h2>ব্যক্তিগত তথ্য</h2><p>আপনার অ্যাকাউন্টের সঙ্গে যুক্ত তথ্য।</p></div>
              {!editing && <button className="button button-light" type="button" onClick={() => { setEditing(true); setMessage(''); }}>তথ্য সম্পাদনা করুন</button>}
            </div>
            {message && <p className="success-message" role="status">✓ {message}</p>}
            {editing ? (
              <form className="profile-form account-edit-form" onSubmit={save}>
                <label>পূর্ণ নাম<input autoComplete="name" required value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} placeholder="আপনার নাম" /></label>
                <label>ইমেইল ঠিকানা<input type="email" autoComplete="email" required value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} placeholder="you@example.com" /></label>
                <div className="account-form-actions"><button className="button" type="submit">পরিবর্তন সংরক্ষণ করুন →</button><button className="button button-light" type="button" onClick={() => { setEditing(false); setMessage(''); }}>বাতিল</button></div>
              </form>
            ) : (
              <dl className="account-details-list">
                <div><dt>নাম</dt><dd>{user.name || '—'}</dd></div>
                <div><dt>ইমেইল</dt><dd>{user.email || '—'}</dd></div>
                <div><dt>অ্যাকাউন্টের ধরন</dt><dd><span className="account-status">সক্রিয়</span></dd></div>
              </dl>
            )}
          </div>

          <div className="account-panel account-shortcuts">
            <div className="account-panel-heading"><div><h2>দ্রুত লিংক</h2><p>বাজারদরের গুরুত্বপূর্ণ পেজে যান।</p></div></div>
            <div className="account-shortcut-grid">
              <Link to="/" className="account-shortcut"><span>🏠</span><div><strong>হোম পেজ</strong><small>আজকের বাজারদর এক নজরে</small></div><b>→</b></Link>
              <Link to="/#products" className="account-shortcut"><span>🧺</span><div><strong>সব পণ্য</strong><small>পণ্যের দাম ও পরিবর্তন দেখুন</small></div><b>→</b></Link>
            </div>
          </div>
          <button className="account-logout-link" type="button" onClick={logout}>↩ অ্যাকাউন্ট থেকে সাইন আউট করুন</button>
        </section>
      </div>
    </main>
  );
}
