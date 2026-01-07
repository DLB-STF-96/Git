import { useState, useEffect } from 'react';
import { api } from '../api';
import { Statistics as StatsType } from '../types';
import './Statistics.css';

function Statistics() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await api.getStatistics();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!stats) {
    return <div className="error">No statistics available</div>;
  }

  const approvalRate = stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : '0.0';

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h2>Credit Application Statistics</h2>
        <button onClick={loadStatistics} className="refresh-button">
          🔄 Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card approved">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Approved</h3>
            <div className="stat-value">{stats.approved}</div>
            <div className="stat-subtitle">{approvalRate}% approval rate</div>
          </div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>Rejected</h3>
            <div className="stat-value">{stats.rejected}</div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <div className="stat-value">{stats.pending}</div>
          </div>
        </div>

        <div className="stat-card review">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <h3>Under Review</h3>
            <div className="stat-value">{stats.underReview}</div>
          </div>
        </div>

        <div className="stat-card amount">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Approved Amount</h3>
            <div className="stat-value">${stats.totalApprovedAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card score">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Average Credit Score</h3>
            <div className="stat-value">{stats.averageCreditScore.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="stats-chart">
        <h3>Application Status Distribution</h3>
        <div className="chart-bar">
          <div 
            className="chart-segment approved-segment" 
            style={{ width: `${stats.total > 0 ? (stats.approved / stats.total) * 100 : 0}%` }}
          >
            {stats.approved > 0 && <span>{stats.approved}</span>}
          </div>
          <div 
            className="chart-segment rejected-segment" 
            style={{ width: `${stats.total > 0 ? (stats.rejected / stats.total) * 100 : 0}%` }}
          >
            {stats.rejected > 0 && <span>{stats.rejected}</span>}
          </div>
          <div 
            className="chart-segment pending-segment" 
            style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
          >
            {stats.pending > 0 && <span>{stats.pending}</span>}
          </div>
          <div 
            className="chart-segment review-segment" 
            style={{ width: `${stats.total > 0 ? (stats.underReview / stats.total) * 100 : 0}%` }}
          >
            {stats.underReview > 0 && <span>{stats.underReview}</span>}
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color approved-color"></span>
            <span>Approved</span>
          </div>
          <div className="legend-item">
            <span className="legend-color rejected-color"></span>
            <span>Rejected</span>
          </div>
          <div className="legend-item">
            <span className="legend-color pending-color"></span>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <span className="legend-color review-color"></span>
            <span>Under Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
