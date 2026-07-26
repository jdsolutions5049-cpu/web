import React, { useState, useMemo } from 'react';
import { buildApiUrl } from './api';

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [data, setData] = useState({ enquiries: [], contacts: [] });
    const [view, setView] = useState('internships');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const flashMsg = (type, title, msg) => {
        if (window && window.__flasherFallback) window.__flasherFallback(type, title, msg);
        else alert(title + ': ' + msg);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                flashMsg('success', 'Welcome', 'Logged in successfully');
            } else {
                flashMsg('error', 'Invalid', 'Invalid Credentials');
            }
        } catch (error) {
            flashMsg('error', 'Server Error', 'Check backend server');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const [enqRes, conRes] = await Promise.all([
                fetch(buildApiUrl("/api/admin/enquiries")),
                fetch(buildApiUrl("/api/admin/contacts"))
            ]);
            setData({
                enquiries: await enqRes.json(),
                contacts: await conRes.json()
            });
        } catch (err) {
            console.error("Fetch failed", err);
            flashMsg('error', 'Error', 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const courseEnquiries = useMemo(() => data.enquiries.filter(e => e.type === 'Course'), [data.enquiries]);
    const internships = useMemo(() => data.enquiries.filter(e => e.type === 'Internship'), [data.enquiries]);
    const corporateTraining = useMemo(() => data.enquiries.filter(e => e.type === 'Corporate Training'), [data.enquiries]);
    const satRegistrations = useMemo(() => data.enquiries.filter(e => e.source === 'JDS-SAT'), [data.enquiries]);

    const currentData = useMemo(() => {
        let list = [];
        if (view === 'courses') list = courseEnquiries;
        else if (view === 'internships') list = internships;
        else if (view === 'corporate-training') list = corporateTraining;
        else if (view === 'sat') list = satRegistrations;
        else list = data.contacts;

        if (!search.trim()) return list;
        const s = search.toLowerCase();
        return list.filter(item => {
            const name = (item.fullName || item.name || '').toLowerCase();
            const email = (item.email || '').toLowerCase();
            const phone = (item.phone || '').toLowerCase();
            const domain = (item.domain || '').toLowerCase();
            const msg = (item.message || '').toLowerCase();
            return name.includes(s) || email.includes(s) || phone.includes(s) || domain.includes(s) || msg.includes(s);
        });
    }, [view, courseEnquiries, internships, corporateTraining, satRegistrations, data.contacts, search]);

    const totalEnquiries = data.enquiries.length;
    const totalSAT = satRegistrations.length;
    const totalInternships = internships.length;
    const totalCourses = courseEnquiries.length;
    const totalCorporateTraining = corporateTraining.length;
    const totalContacts = data.contacts.length;

    if (!isLoggedIn) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0a1a2f 0%, #1a365d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                fontFamily: "'Inter', sans-serif",
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(253,95,0,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,77,179,0.2) 0%, transparent 50%)'
                }}></div>
                <div style={{
                    position: 'relative', zIndex: 2,
                    background: '#fff',
                    borderRadius: '28px',
                    padding: '56px 48px',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '420px',
                    border: '1px solid rgba(10,26,47,0.05)'
                }}>
                    <div style={{
                        width: '80px', height: '80px',
                        background: 'linear-gradient(135deg, #fd5f00, #ff7f33)',
                        borderRadius: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '36px', margin: '0 auto 20px',
                        boxShadow: '0 12px 32px rgba(253,95,0,0.35)'
                    }}>🔐</div>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '28px',
                        color: '#0a1a2f',
                        marginBottom: '6px',
                        fontWeight: 800
                    }}>JD Solutions pvt</h2>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '32px', letterSpacing: '1px' }}>ADMIN PORTAL</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            style={{
                                padding: '15px 20px',
                                borderRadius: '12px',
                                border: '2px solid rgba(10,26,47,0.08)',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#f8f9fa'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#fd5f00'; e.target.style.background = '#fff'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(10,26,47,0.08)'; e.target.style.background = '#f8f9fa'; }}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            style={{
                                padding: '15px 20px',
                                borderRadius: '12px',
                                border: '2px solid rgba(10,26,47,0.08)',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#f8f9fa'
                            }}
                            onFocus={(e) => { e.target.style.borderColor = '#fd5f00'; e.target.style.background = '#fff'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(10,26,47,0.08)'; e.target.style.background = '#f8f9fa'; }}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '8px',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #fd5f00, #ff7f33)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: 700,
                                fontSize: '15px',
                                letterSpacing: '0.5px',
                                boxShadow: '0 10px 28px rgba(253,95,0,0.3)',
                                transition: 'all 0.3s ease',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Signing in...' : 'Login to Dashboard →'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const tabConfigs = [
        { id: 'courses', label: 'Course Enquiries', iconClass: 'bi-book', count: totalCourses, color: '#198754' },
        { id: 'internships', label: 'Internships', iconClass: 'bi-clipboard-check', count: totalInternships, color: '#004db3' },
        { id: 'corporate-training', label: 'Corporate Training', iconClass: 'bi-people', count: totalCorporateTraining, color: '#6f42c1' },
        { id: 'sat', label: 'JDS-SAT Registrations', iconClass: 'bi-mortarboard', count: totalSAT, color: '#fd5f00' },
        { id: 'contacts', label: 'Contact Leads', iconClass: 'bi-envelope', count: totalContacts, color: '#28a745' }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa',
            fontFamily: "'Inter', sans-serif",
            display: 'flex'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'linear-gradient(180deg, #0a1a2f 0%, #061020 100%)',
                color: '#fff',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                height: '100vh',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
                    <div style={{
                        width: '48px', height: '48px',
                        background: 'linear-gradient(135deg, #fd5f00, #ff7f33)',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '22px',
                        boxShadow: '0 6px 18px rgba(253,95,0,0.35)'
                    }}><i className="bi bi-bar-chart-line"></i></div>
                    <div>
                        <div style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '18px', fontWeight: 800, lineHeight: 1.1
                        }}>Jay Dynamic pvt</div>
                        <div style={{ fontSize: '10px', color: '#fd5f00', letterSpacing: '2px', marginTop: '2px', fontWeight: 700 }}>ADMIN</div>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    {tabConfigs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setView(tab.id); setSearch(''); }}
                            style={{
                                padding: '14px 18px',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: view === tab.id ? 'rgba(253,95,0,0.15)' : 'transparent',
                                color: view === tab.id ? '#ff7f33' : 'rgba(255,255,255,0.7)',
                                fontWeight: view === tab.id ? 700 : 500,
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                fontFamily: 'inherit',
                                borderLeft: view === tab.id ? '3px solid #fd5f00' : '3px solid transparent'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '18px' }}><i className={`bi ${tab.iconClass}`}></i></span>
                                {tab.label}
                            </span>
                            <span style={{
                                background: view === tab.id ? 'linear-gradient(135deg, #fd5f00, #ff7f33)' : 'rgba(255,255,255,0.08)',
                                color: '#fff',
                                padding: '3px 10px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                fontWeight: 700
                            }}>{tab.count}</span>
                        </button>
                    ))}

                    <button
                        onClick={fetchStats}
                        style={{
                            marginTop: '20px',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        🔄 Refresh Data
                    </button>
                </nav>

                <button
                    onClick={() => { setIsLoggedIn(false); flashMsg('info', 'Logged Out', 'Session ended'); }}
                    style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'rgba(220,53,69,0.12)',
                        color: '#ff6b7a',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    🚪 Logout
                </button>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: '36px 40px', overflowX: 'hidden' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '32px',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div>
                        <div style={{
                            color: '#fd5f00',
                            fontSize: '12px',
                            fontWeight: 800,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '8px'
                        }}>DASHBOARD / {tabConfigs.find(t => t.id === view)?.label.toUpperCase()}</div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '32px',
                            color: '#0a1a2f',
                            fontWeight: 900,
                            margin: 0
                        }}>{tabConfigs.find(t => t.id === view)?.label}</h1>
                        <p style={{ color: '#6c757d', marginTop: '6px', fontSize: '14.5px' }}>
                            Manage and view all {tabConfigs.find(t => t.id === view)?.label.toLowerCase()} records
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                            position: 'relative'
                        }}>
                            <input
                                type="text"
                                placeholder="🔍  Search records..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    padding: '13px 20px 13px 44px',
                                    borderRadius: '50px',
                                    border: '2px solid rgba(10,26,47,0.08)',
                                    background: '#fff',
                                    fontSize: '14px',
                                    width: '280px',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = '#fd5f00'; e.target.style.boxShadow = '0 0 0 5px rgba(253,95,0,0.08)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'rgba(10,26,47,0.08)'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    marginBottom: '36px'
                }}>
                    {[
                        { label: 'Total Enquiries', value: totalEnquiries, iconClass: 'bi-clipboard-check', color: '#004db3', bgFrom: '#eef4ff', bgTo: '#fff' },
                        { label: 'JDS-SAT Registered', value: totalSAT, iconClass: 'bi-mortarboard', color: '#fd5f00', bgFrom: '#fff5ef', bgTo: '#fff' },
                        { label: 'Internship Forms', value: totalInternships, iconClass: 'bi-briefcase', color: '#6f42c1', bgFrom: '#f5eeff', bgTo: '#fff' },
                        { label: 'Contact Messages', value: totalContacts, iconClass: 'bi-envelope', color: '#28a745', bgFrom: '#edfbf1', bgTo: '#fff' }
                    ].map((s, i) => (
                        <div key={i} style={{
                            background: `linear-gradient(135deg, ${s.bgFrom}, ${s.bgTo})`,
                            borderRadius: '20px',
                            padding: '28px 24px',
                            border: `1px solid ${s.color}15`,
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(10,26,47,0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{
                                position: 'absolute', top: '-20px', right: '-20px',
                                width: '100px', height: '100px',
                                background: s.color,
                                opacity: 0.06,
                                borderRadius: '50%'
                            }}></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{
                                    width: '52px', height: '52px',
                                    background: `linear-gradient(135deg, ${s.color}22, ${s.color}10)`,
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '24px',
                                    border: `1px solid ${s.color}20`
                                }}><i className={`bi ${s.iconClass}`}></i></div>
                            </div>
                            <div style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '36px',
                                fontWeight: 900,
                                color: s.color,
                                lineHeight: 1,
                                marginBottom: '6px'
                            }}>{s.value}</div>
                            <div style={{
                                color: '#6c757d',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '0.5px'
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Current view title + count */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '22px',
                        color: '#0a1a2f',
                        fontWeight: 800,
                        margin: 0
                    }}>
                        {loading ? 'Loading records...' : `${currentData.length} Record${currentData.length !== 1 ? 's' : ''} Found`}
                    </h3>
                </div>

                {/* Table */}
                <div style={{
                    background: '#fff',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(10,26,47,0.08)',
                    overflow: 'hidden',
                    border: '1px solid rgba(10,26,47,0.04)'
                }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            minWidth: view === 'contacts' ? '800px' : '1000px'
                        }}>
                            <thead>
                                <tr style={{
                                    background: 'linear-gradient(90deg, #0a1a2f 0%, #1a365d 100%)',
                                    color: '#fff'
                                }}>
                                    <th style={{
                                        padding: '18px 24px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: 800,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase'
                                    }}>#</th>
                                    <th style={{
                                        padding: '18px 24px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: 800,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase'
                                    }}>Name</th>
                                    <th style={{
                                        padding: '18px 24px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: 800,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase'
                                    }}>Contact</th>
                                    {view !== 'contacts' && (
                                        <>
                                            <th style={{
                                                padding: '18px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: 800,
                                                letterSpacing: '1.5px',
                                                textTransform: 'uppercase'
                                            }}>{view === 'sat' ? 'Registration Details' : 'Domain / College'}</th>
                                            <th style={{
                                                padding: '18px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: 800,
                                                letterSpacing: '1.5px',
                                                textTransform: 'uppercase'
                                            }}>Type</th>
                                            {view === 'sat' && (
                                                <th style={{
                                                    padding: '18px 24px',
                                                    textAlign: 'left',
                                                    fontSize: '12px',
                                                    fontWeight: 800,
                                                    letterSpacing: '1.5px',
                                                    textTransform: 'uppercase'
                                                }}>Source</th>
                                            )}
                                        </>
                                    )}
                                    {view === 'contacts' && (
                                        <th style={{
                                            padding: '18px 24px',
                                            textAlign: 'left',
                                            fontSize: '12px',
                                            fontWeight: 800,
                                            letterSpacing: '1.5px',
                                            textTransform: 'uppercase'
                                        }}>Message</th>
                                    )}
                                    <th style={{
                                        padding: '18px 24px',
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        fontWeight: 800,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase'
                                    }}>Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan={view === 'contacts' ? 5 : view === 'sat' ? 8 : 7} style={{
                                            padding: '80px 24px',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                                            <div style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: '22px',
                                                color: '#0a1a2f',
                                                fontWeight: 700,
                                                marginBottom: '8px'
                                            }}>No Records Found</div>
                                            <div style={{ color: '#6c757d', fontSize: '14.5px' }}>
                                                {search ? 'Try adjusting your search' : 'Records will appear here once submitted'}
                                            </div>
                                        </td>
                                    </tr>
                                ) : currentData.map((item, idx) => (
                                    <tr key={idx} style={{
                                        borderBottom: '1px solid rgba(10,26,47,0.05)',
                                        transition: 'background 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfc'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                                    >
                                        <td style={{
                                            padding: '20px 24px',
                                            color: '#6c757d',
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            width: '60px'
                                        }}>#{idx + 1}</td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{
                                                    width: '44px', height: '44px',
                                                    borderRadius: '50%',
                                                    background: view === 'sat'
                                                        ? 'linear-gradient(135deg, #fd5f00, #ff7f33)'
                                                        : view === 'contacts'
                                                            ? 'linear-gradient(135deg, #28a745, #34ce57)'
                                                            : 'linear-gradient(135deg, #004db3, #1a66cc)',
                                                    color: '#fff',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 800,
                                                    fontSize: '16px',
                                                    flexShrink: 0
                                                }}>
                                                    {(item.fullName || item.name || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        color: '#0a1a2f',
                                                        fontWeight: 700,
                                                        fontSize: '15px',
                                                        lineHeight: 1.3
                                                    }}>{item.fullName || item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ color: '#004db3', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                                                📧 {item.email}
                                            </div>
                                            <div style={{ color: '#6c757d', fontSize: '13px' }}>
                                                📞 {item.phone || '-'}
                                            </div>
                                        </td>
                                        {view !== 'contacts' && (
                                            <>
                                                <td style={{ padding: '20px 24px' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '7px 14px',
                                                        borderRadius: '50px',
                                                        background: 'rgba(0,77,179,0.08)',
                                                        color: '#004db3',
                                                        fontWeight: 700,
                                                        fontSize: '12.5px',
                                                        border: '1px solid rgba(0,77,179,0.15)'
                                                    }}>{view === 'sat' ? (
                                                      <div style={{ display: 'grid', gap: '5px', fontSize: '13px', lineHeight: 1.45, minWidth: '270px' }}>
                                                        <div><strong>College:</strong> {item.college || '-'}</div>
                                                        <div><strong>Course:</strong> {item.course || item.domain || '-'}</div>
                                                        <div><strong>Branch:</strong> {item.branch || '-'}</div>
                                                        <div><strong>Year:</strong> {item.year || '-'}</div>
                                                        <div><strong>City / State:</strong> {[item.city, item.state].filter(Boolean).join(', ') || '-'}</div>
                                                        <div><strong>Resume:</strong> {item.resume ? <a href={item.resume} target="_blank" rel="noreferrer">View resume</a> : '-'}</div>
                                                      </div>
                                                    ) : item.domain}</span>
                                                </td>
                                                <td style={{ padding: '20px 24px' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '7px 14px',
                                                        borderRadius: '50px',
                                                        background: item.type === 'Corporate Training'
                                                            ? 'rgba(108,117,125,0.1)'
                                                            : 'rgba(40,167,69,0.1)',
                                                        color: item.type === 'Corporate Training' ? '#6c757d' : '#28a745',
                                                        fontWeight: 700,
                                                        fontSize: '12.5px',
                                                        border: item.type === 'Corporate Training'
                                                            ? '1px solid rgba(108,117,125,0.18)'
                                                            : '1px solid rgba(40,167,69,0.18)'
                                                    }}>{item.type}</span>
                                                </td>
                                                {view === 'sat' && (
                                                    <td style={{ padding: '20px 24px' }}>
                                                        <span style={{
                                                            display: 'inline-block',
                                                            padding: '7px 14px',
                                                            borderRadius: '50px',
                                                            background: 'rgba(253,95,0,0.1)',
                                                            color: '#fd5f00',
                                                            fontWeight: 800,
                                                            fontSize: '12px',
                                                            letterSpacing: '0.5px',
                                                            border: '1px solid rgba(253,95,0,0.18)'
                                                        }}>🎓 {item.source}</span>
                                                    </td>
                                                )}
                                            </>
                                        )}
                                        {view === 'contacts' && (
                                            <td style={{ padding: '20px 24px', maxWidth: '360px' }}>
                                                <div style={{
                                                    color: '#555',
                                                    fontSize: '14px',
                                                    lineHeight: 1.6,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>{item.message}</div>
                                            </td>
                                        )}
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{
                                                color: '#6c757d',
                                                fontSize: '12.5px',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap'
                                            }}>
                                                📅 {formatDate(item.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {currentData.length > 0 && (
                        <div style={{
                            padding: '18px 28px',
                            background: '#fafbfc',
                            borderTop: '1px solid rgba(10,26,47,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                        }}>
                            <div style={{
                                color: '#6c757d',
                                fontSize: '13px',
                                fontWeight: 600
                            }}>
                                Showing <span style={{ color: '#0a1a2f', fontWeight: 800 }}>{currentData.length}</span> of <span style={{ color: '#0a1a2f', fontWeight: 800 }}>
                                    {view === 'contacts' ? totalContacts : (view === 'sat' ? totalSAT : (view === 'courses' ? totalCourses : (view === 'corporate-training' ? totalCorporateTraining : totalInternships)))}
                                </span> records
                            </div>
                            <div style={{ color: '#6c757d', fontSize: '12.5px' }}>
                                ✨ Last refreshed: {formatDate(new Date().toISOString())}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
