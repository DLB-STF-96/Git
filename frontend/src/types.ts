export interface CreditApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  requestedAmount: number;
  monthlyIncome: number;
  employmentYears: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  creditScore?: number;
  approvedAmount?: number;
  interestRate?: number;
  termMonths?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationRequest {
  applicantName: string;
  email: string;
  phone: string;
  requestedAmount: number;
  monthlyIncome: number;
  employmentYears: number;
  purpose: string;
}

export interface ApplicationResponse {
  application: CreditApplication;
  evaluation: {
    reason: string;
  };
}

export interface Statistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  underReview: number;
  totalApprovedAmount: number;
  averageCreditScore: number;
}
