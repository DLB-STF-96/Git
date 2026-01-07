import { useState, FormEvent } from 'react';
import { api } from '../api';
import { CreateApplicationRequest } from '../types';
import './ApplicationForm.css';

interface Props {
  onSubmitted: () => void;
}

function ApplicationForm({ onSubmitted }: Props) {
  const [formData, setFormData] = useState<CreateApplicationRequest>({
    applicantName: '',
    email: '',
    phone: '',
    requestedAmount: 0,
    monthlyIncome: 0,
    employmentYears: 0,
    purpose: 'personal',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await api.createApplication(formData);
      
      const message = response.application.status === 'approved'
        ? `✅ Congratulations! Your application has been approved.\n\nCredit Score: ${response.application.creditScore}\nApproved Amount: $${response.application.approvedAmount?.toLocaleString()}\nInterest Rate: ${response.application.interestRate}%\nTerm: ${response.application.termMonths} months\n\n${response.evaluation.reason}`
        : `❌ Your application was not approved.\n\nCredit Score: ${response.application.creditScore}\nReason: ${response.evaluation.reason}`;

      setResult({ success: response.application.status === 'approved', message });
      
      // Reset form
      setFormData({
        applicantName: '',
        email: '',
        phone: '',
        requestedAmount: 0,
        monthlyIncome: 0,
        employmentYears: 0,
        purpose: 'personal',
      });

      // Notify parent component
      setTimeout(() => {
        onSubmitted();
      }, 3000);
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Apply for Credit</h2>
      <p className="form-description">Fill out the form below to apply for a credit</p>

      {result && (
        <div className={`result-message ${result.success ? 'success' : 'error'}`}>
          <pre>{result.message}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-group">
            <label htmlFor="applicantName">Full Name *</label>
            <input
              type="text"
              id="applicantName"
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Financial Information</h3>
          
          <div className="form-group">
            <label htmlFor="requestedAmount">Requested Amount ($) *</label>
            <input
              type="number"
              id="requestedAmount"
              value={formData.requestedAmount || ''}
              onChange={(e) => setFormData({ ...formData, requestedAmount: Number(e.target.value) })}
              required
              min="1000"
              max="1000000"
              step="1000"
              placeholder="50000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthlyIncome">Monthly Income ($) *</label>
            <input
              type="number"
              id="monthlyIncome"
              value={formData.monthlyIncome || ''}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              required
              min="1000"
              max="1000000"
              step="500"
              placeholder="5000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentYears">Years of Employment *</label>
            <input
              type="number"
              id="employmentYears"
              value={formData.employmentYears || ''}
              onChange={(e) => setFormData({ ...formData, employmentYears: Number(e.target.value) })}
              required
              min="0"
              max="50"
              step="0.5"
              placeholder="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Purpose of Credit *</label>
            <select
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
            >
              <option value="home">Home Purchase/Improvement</option>
              <option value="car">Vehicle Purchase</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
