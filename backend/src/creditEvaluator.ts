import { CreateApplicationRequest, EvaluationResult } from './types';

export class CreditEvaluator {
  /**
   * Evaluate a credit application and determine approval, amount, rate, and terms
   */
  static evaluate(request: CreateApplicationRequest): EvaluationResult {
    // Calculate credit score (simplified algorithm)
    const creditScore = this.calculateCreditScore(request);

    // Determine approval based on credit score and debt-to-income ratio
    const debtToIncomeRatio = request.requestedAmount / (request.monthlyIncome * 12);
    const approved = creditScore >= 600 && debtToIncomeRatio <= 0.4;

    let approvedAmount = 0;
    let interestRate = 0;
    let termMonths = 0;
    let reason = '';

    if (approved) {
      // Calculate approved amount (may be less than requested)
      approvedAmount = this.calculateApprovedAmount(request, creditScore);
      
      // Calculate interest rate based on credit score
      interestRate = this.calculateInterestRate(creditScore);
      
      // Calculate term based on amount and purpose
      termMonths = this.calculateTerm(approvedAmount, request.purpose);
      
      reason = 'Application approved based on credit score and financial profile';
    } else {
      if (creditScore < 600) {
        reason = 'Credit score below minimum threshold (600)';
      } else if (debtToIncomeRatio > 0.4) {
        reason = 'Debt-to-income ratio exceeds maximum (40%)';
      } else {
        reason = 'Application does not meet approval criteria';
      }
    }

    return {
      approved,
      creditScore,
      approvedAmount,
      interestRate,
      termMonths,
      reason
    };
  }

  private static calculateCreditScore(request: CreateApplicationRequest): number {
    let score = 500; // Base score

    // Income factor (0-200 points)
    const incomeScore = Math.min(200, (request.monthlyIncome / 10000) * 100);
    score += incomeScore;

    // Employment stability (0-100 points)
    const employmentScore = Math.min(100, request.employmentYears * 15);
    score += employmentScore;

    // Requested amount vs income ratio (0-100 points)
    const requestRatio = request.requestedAmount / (request.monthlyIncome * 12);
    const ratioScore = requestRatio <= 0.2 ? 100 : requestRatio <= 0.3 ? 70 : requestRatio <= 0.4 ? 40 : 0;
    score += ratioScore;

    // Purpose factor (0-50 points)
    const purposeScores: { [key: string]: number } = {
      'home': 50,
      'education': 45,
      'business': 40,
      'car': 35,
      'personal': 20,
      'other': 10
    };
    score += purposeScores[request.purpose.toLowerCase()] || 10;

    // Ensure score is between 300 and 850
    return Math.max(300, Math.min(850, Math.round(score)));
  }

  private static calculateApprovedAmount(request: CreateApplicationRequest, creditScore: number): number {
    const maxMultiplier = creditScore >= 750 ? 1.0 :
                         creditScore >= 700 ? 0.9 :
                         creditScore >= 650 ? 0.8 :
                         0.7;

    const maxBasedOnIncome = request.monthlyIncome * 12 * 0.4; // Max 40% of annual income
    const approvedAmount = Math.min(
      request.requestedAmount * maxMultiplier,
      maxBasedOnIncome
    );

    return Math.round(approvedAmount);
  }

  private static calculateInterestRate(creditScore: number): number {
    if (creditScore >= 750) return 4.5;
    if (creditScore >= 700) return 6.5;
    if (creditScore >= 650) return 8.5;
    if (creditScore >= 600) return 11.5;
    return 15.0;
  }

  private static calculateTerm(amount: number, purpose: string): number {
    const termMap: { [key: string]: number } = {
      'home': 360, // 30 years
      'education': 120, // 10 years
      'business': 84, // 7 years
      'car': 60, // 5 years
      'personal': 36, // 3 years
      'other': 24 // 2 years
    };

    let baseTerm = termMap[purpose.toLowerCase()] || 36;

    // Adjust term based on amount
    if (amount < 10000) {
      baseTerm = Math.min(baseTerm, 36);
    } else if (amount > 100000) {
      baseTerm = Math.max(baseTerm, 120);
    }

    return baseTerm;
  }
}
