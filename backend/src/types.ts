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
  createdAt: Date;
  updatedAt: Date;
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

export interface EvaluationResult {
  approved: boolean;
  creditScore: number;
  approvedAmount: number;
  interestRate: number;
  termMonths: number;
  reason: string;
}
