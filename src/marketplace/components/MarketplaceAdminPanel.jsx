import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Download, 
  Eye, 
  Plus, 
  FileSpreadsheet, 
  ArrowLeft,
  Users,
  Building2
} from 'lucide-react';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplaceAdminPanel({ onBack }) {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'leads'
  
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (key) => {
    setLoading(true);
    try {
      const data = await marketplaceApi.getAdminData(key);
      setProperties(data.properties || []);
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loadData(passkey);
  };

  const handleApprove = async (id) => {
    await marketplaceApi.approveProperty(id);
    loadData(passkey);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await marketplaceApi.deleteProperty(id);
      loadData(passkey);
    }
  };

  // Export Leads to CSV
  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Property ID', 'Property Title', 'City', 'Date & Time'];
    const rows = leads.map(l => [
      l.id || '',
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.property_id || ''}"`,
      `"${(l.property_title || '').replace(/"/g, '""')}"`,
      `"${l.property_city || ''}"`,
      `"${l.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `all_india_warehouse_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="marketplace-container" style={{ padding: '60px 16px' }}>
        <div className="mp-wizard-card" style={{ maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Lock size={22} />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f2744', margin: 0 }}>
              Marketplace Admin Login
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
              Enter administrator passkey to manage listings & leads
            </p>
          </div>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '14px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label className="mp-field-label">Admin Passkey</label>
              <input 
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter admin passkey (e.g. admin123)"
                className="form-control w-full"
                required
              />
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
                Default passkey: <code>admin123</code> or <code>aiw@2026</code>
              </div>
            </div>

            <button type="submit" className="btn btn-red w-full" disabled={loading} style={{ fontWeight: 700 }}>
              {loading ? 'Authenticating...' : 'Access Admin Dashboard'}
            </button>

            {onBack && (
              <button 
                type="button" 
                onClick={onBack}
                className="btn btn-outline w-full"
                style={{ marginTop: '10px', fontSize: '0.85rem' }}
              >
                Back to Site
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-container" style={{ padding: '30px 16px 60px' }}>
      {/* Admin Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="mp-badge-verified">Admin Portal</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Logged in as Operations Manager</span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f2744', margin: '4px 0 0' }}>
            Marketplace Control Center
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {activeTab === 'leads' && (
            <button 
              type="button" 
              className="btn btn-emerald" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#059669', color: '#fff' }}
              onClick={handleExportCsv}
            >
              <FileSpreadsheet size={16} />
              <span>Export Leads to CSV</span>
            </button>
          )}
          {onBack && (
            <button type="button" onClick={onBack} className="btn btn-outline btn-sm">
              <ArrowLeft size={16} /> Back to Website
            </button>
          )}
        </div>
      </div>

      {/* Tabs: Properties Management vs Verified Leads */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px' }}>
        <button 
          type="button"
          className={`btn ${activeTab === 'properties' ? 'btn-red' : 'btn-outline'}`}
          onClick={() => setActiveTab('properties')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '6px 6px 0 0' }}
        >
          <Building2 size={16} />
          <span>Properties ({properties.length})</span>
        </button>
        <button 
          type="button"
          className={`btn ${activeTab === 'leads' ? 'btn-red' : 'btn-outline'}`}
          onClick={() => setActiveTab('leads')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '6px 6px 0 0' }}
        >
          <Users size={16} />
          <span>Customer Leads ({leads.length})</span>
        </button>
      </div>

      {/* TAB 1: PROPERTIES MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="mp-admin-table-wrap">
          <table className="mp-admin-table">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>Type & Purpose</th>
                <th>City / Hub</th>
                <th>Area (Sq.Ft.)</th>
                <th>Rate / Price</th>
                <th>Status</th>
                <th>Owner Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.id || prop._id}>
                  <td>
                    <strong>{prop.title}</strong>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>ID: {prop.id}</div>
                  </td>
                  <td>
                    <span>{prop.type}</span> ({prop.purpose})
                  </td>
                  <td>{prop.locality}, {prop.city}</td>
                  <td>{prop.area_sqft?.toLocaleString('en-IN')}</td>
                  <td>
                    {prop.purpose === 'sale' 
                      ? `₹${prop.price_or_rent_psf}/sqft` 
                      : `₹${prop.price_or_rent_psf}/sqft/mo`}
                  </td>
                  <td>
                    {prop.approved !== false ? (
                      <span className="mp-status-pill approved">Live / Approved</span>
                    ) : (
                      <span className="mp-status-pill pending">Pending Review</span>
                    )}
                  </td>
                  <td>
                    <div>{prop.owner_name || 'N/A'}</div>
                    <small style={{ color: '#004953' }}>{prop.owner_phone}</small>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {prop.approved === false && (
                        <button 
                          type="button" 
                          onClick={() => handleApprove(prop.id)}
                          className="btn btn-sm btn-outline"
                          style={{ borderColor: '#16a34a', color: '#16a34a', padding: '3px 8px', fontSize: '0.76rem' }}
                          title="Approve Listing"
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        type="button" 
                        onClick={() => handleDelete(prop.id)}
                        className="btn btn-sm btn-outline"
                        style={{ borderColor: '#ef4444', color: '#ef4444', padding: '3px 8px' }}
                        title="Delete Property"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: UNLOCKED LEADS */}
      {activeTab === 'leads' && (
        <div className="mp-admin-table-wrap">
          {leads.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              No leads recorded yet. Try unlocking a contact on a property to see real-time lead capture.
            </div>
          ) : (
            <table className="mp-admin-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Property Inquired</th>
                  <th>City</th>
                  <th>Timestamp</th>
                  <th>Notification Sent</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td><strong>{l.name}</strong></td>
                    <td style={{ color: '#004953', fontWeight: 700 }}>{l.phone}</td>
                    <td>
                      <div>{l.property_title || 'General Enquiry'}</div>
                      <small style={{ color: '#64748b' }}>Ref: {l.property_id}</small>
                    </td>
                    <td>{l.property_city || 'India'}</td>
                    <td>{new Date(l.created_at || Date.now()).toLocaleString('en-IN')}</td>
                    <td>
                      <span className="mp-status-pill approved">
                        care@allindiawarehouse.in
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
