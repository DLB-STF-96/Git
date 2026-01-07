import { CreditApplication } from './types';

class DataStore {
  private applications: Map<string, CreditApplication> = new Map();

  addApplication(application: CreditApplication): CreditApplication {
    this.applications.set(application.id, application);
    return application;
  }

  getApplication(id: string): CreditApplication | undefined {
    return this.applications.get(id);
  }

  getAllApplications(): CreditApplication[] {
    return Array.from(this.applications.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  updateApplication(id: string, updates: Partial<CreditApplication>): CreditApplication | undefined {
    const application = this.applications.get(id);
    if (!application) return undefined;

    const updated = {
      ...application,
      ...updates,
      updatedAt: new Date()
    };
    this.applications.set(id, updated);
    return updated;
  }

  deleteApplication(id: string): boolean {
    return this.applications.delete(id);
  }

  getStatistics() {
    const apps = Array.from(this.applications.values());
    return {
      total: apps.length,
      pending: apps.filter(a => a.status === 'pending').length,
      approved: apps.filter(a => a.status === 'approved').length,
      rejected: apps.filter(a => a.status === 'rejected').length,
      underReview: apps.filter(a => a.status === 'under_review').length,
      totalApprovedAmount: apps
        .filter(a => a.status === 'approved')
        .reduce((sum, a) => sum + (a.approvedAmount || 0), 0),
      averageCreditScore: apps.length > 0
        ? apps.reduce((sum, a) => sum + (a.creditScore || 0), 0) / apps.length
        : 0
    };
  }
}

export const dataStore = new DataStore();
