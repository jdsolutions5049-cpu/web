import React, { useState } from 'react';
import { buildApiUrl } from './api';

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [data, setData] = useState({ enquiries: [], contacts: [] });
    const [view, setView] = useState('enquiries');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(buildApiUrl("/api/admin/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });
            const result = await response.text();
            if (result.includes("Successful")) {
                setIsLoggedIn(true);
                fetchStats();
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            alert("Check if Spring Boot is running on port 8080");
        }
    };

    const fetchStats = async () => {
        try {
            const enqRes = await fetch(buildApiUrl("/api/admin/enquiries"));
            const conRes = await fetch(buildApiUrl("/api/admin/contacts"));
            setData({
                enquiries: await enqRes.json(),
                contacts: await conRes.json()
            });
        } catch (err) { console.error("Fetch failed", err); }
    };

    if (!isLoggedIn) {
        return (
            <div style={styles.loginOverlay}>
                <div style={styles.loginCard}>
                    <div style={{ color: '#0059B2', fontSize: '40px', marginBottom: '10px' }}>🔐</div>
                    <h2 style={{ color: '#333', marginBottom: '5px' }}>JD Solutions</h2>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Admin Portal</p>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Username" style={styles.input} 
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})} required />
                        <input type="password" placeholder="Password" style={styles.input} 
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})} required />
                        <button type="submit" style={styles.primaryBtn}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.dashboardLayout}>
            <div style={styles.sidebar}>
                <h3 style={styles.sidebarTitle}>Jay Dynamic Admin</h3>
                <button onClick={() => setView('enquiries')} style={view === 'enquiries' ? styles.activeTab : styles.tab}>📋 Internships</button>
                <button onClick={() => setView('contacts')} style={view === 'contacts' ? styles.activeTab : styles.tab}>📧 Contact Leads</button>
                <button onClick={() => setIsLoggedIn(false)} style={styles.logoutBtn}>🚪 Logout</button>
            </div>

            <div style={styles.mainContent}>
                <header style={styles.contentHeader}>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold'}}>{view === 'enquiries' ? 'Internship Applications' : 'Website Leads'}</h2>
                    <span style={styles.badge}>{view === 'enquiries' ? data.enquiries.length : data.contacts.length} Total</span>
                </header>

                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHead}>
                                {view === 'enquiries' ? (
                                    <><th style={styles.th}>Name</th><th style={styles.th}>Email</th><th style={styles.th}>Phone</th><th style={styles.th}>Domain</th></>
                                ) : (
                                    <><th style={styles.th}>Name</th><th style={styles.th}>Email</th><th style={styles.th}>Message</th></>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {(view === 'enquiries' ? data.enquiries : data.contacts).map((item, idx) => (
                                <tr key={idx} style={styles.tableRow}>
                                    {view === 'enquiries' ? (
                                        <><td style={styles.td}>{item.fullName}</td><td style={styles.td}>{item.email}</td><td style={styles.td}>{item.phone}</td><td style={styles.td}>{item.domain}</td></>
                                    ) : (
                                        <><td style={styles.td}>{item.name}</td><td style={styles.td}>{item.email}</td><td style={styles.td}>{item.message}</td></>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    loginOverlay: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5', fontFamily: 'sans-serif' },
    loginCard: { background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '350px' },
    input: { width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' },
    primaryBtn: { width: '100%', padding: '12px', background: '#0059B2', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    dashboardLayout: { display: 'flex', minHeight: '100vh', background: '#f8f9fa', fontFamily: 'sans-serif' },
    sidebar: { width: '250px', background: '#fff', borderRight: '1px solid #e0e0e0', padding: '20px', display: 'flex', flexDirection: 'column' },
    sidebarTitle: { color: '#0059B2', marginBottom: '30px', fontSize: '22px', fontWeight: 'bold' },
    tab: { padding: '15px', border: 'none', background: 'none', cursor: 'pointer', color: '#555', borderRadius: '8px', textAlign: 'left', marginBottom: '5px' },
    activeTab: { padding: '15px', border: 'none', background: '#eef4ff', color: '#0059B2', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold', textAlign: 'left', marginBottom: '5px' },
    logoutBtn: { padding: '15px', border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545', borderRadius: '8px', marginTop: 'auto', textAlign: 'left' },
    mainContent: { flex: 1, padding: '40px' },
    contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    badge: { background: '#0059B2', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
    tableContainer: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHead: { background: '#f4f7f9', textAlign: 'left' },
    th: { padding: '15px', color: '#333', borderBottom: '2px solid #eee' },
    td: { padding: '15px', color: '#555', borderBottom: '1px solid #f0f0f0' },
};

export default AdminDashboard;
