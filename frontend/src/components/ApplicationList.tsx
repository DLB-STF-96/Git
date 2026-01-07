import { useState, useEffect } from 'react';
import { api } from '../api';
import { CreditApplication } from '../types';
import './ApplicationList.css';

function ApplicationList() {
  const [applications, setApplications] = useState<CreditApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<CreditApplication | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await api.getAllApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'badge-approved';
      case 'rejected': return 'badge-rejected';
      case 'pending': return 'badge-pending';
      case 'under_review': return 'badge-review';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No applications yet</p>
        <p className="empty-subtitle">Submit your first credit application to get started</p>
      </div>
    );
  }

  return (
    <div className="application-list-container">
      <div className="list-header">
        <h2>Credit Applications</h2>
        <button onClick={loadApplications} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      <div className="applications-grid">
        {applications.map((app) => (
          <div key={app.id} className="application-card" onClick={() => setSelectedApp(app)}>
            <div className="card-header">
              <h3>{app.applicantName}</h3>
              <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                {app.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="card-body">
              <div className="info-row">
                <span className="label">Requested:</span>
                <span className="value">{formatCurrency(app.requestedAmount)}</span>
              </div>
              
              {app.status === 'approved' && (
                <>
                  <div className="info-row">
                    <span className="label">Approved:</span>
                    <span className="value">{formatCurrency(app.approvedAmount || 0)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Interest Rate:</span>
                    <span className="value">{app.interestRate}%</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Term:</span>
                    <span className="value">{app.termMonths} months</span>
                  </div>
                </>
              )}
              
              <div className="info-row">
                <span className="label">Credit Score:</span>
                <span className="value">{app.creditScore}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Purpose:</span>
                <span className="value">{app.purpose}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Created:</span>
                <span className="value small">{formatDate(app.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details</h2>
              <button className="close-button" onClick={() => setSelectedApp(null)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>Applicant Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span>{selectedApp.applicantName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span>{selectedApp.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span>{selectedApp.phone}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Financial Details</h3>
                <div className="detail-row">
                  <span className="detail-label">Monthly Income:</span>
                  <span>{formatCurrency(selectedApp.monthlyIncome)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Employment Years:</span>
                  <span>{selectedApp.employmentYears}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Requested Amount:</span>
                  <span>{formatCurrency(selectedApp.requestedAmount)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Purpose:</span>
                  <span>{selectedApp.purpose}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Evaluation Results</h3>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${getStatusBadgeClass(selectedApp.status)}`}>
                    {selectedApp.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Credit Score:</span>
                  <span>{selectedApp.creditScore}</span>
                </div>
                {selectedApp.status === 'approved' && (
                  <>
                    <div className="detail-row">
                      <span className="detail-label">Approved Amount:</span>
                      <span>{formatCurrency(selectedApp.approvedAmount || 0)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Interest Rate:</span>
                      <span>{selectedApp.interestRate}%</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Term:</span>
                      <span>{selectedApp.termMonths} months</span>
                    </div>
                  </>
                )}
              </div>

              <div className="detail-section">
                <h3>Timestamps</h3>
                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span>{formatDate(selectedApp.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Updated:</span>
                  <span>{formatDate(selectedApp.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;
