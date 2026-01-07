import { CreditApplication, CreateApplicationRequest, ApplicationResponse, Statistics } from './types';

const API_BASE_URL = '/api';

export const api = {
  async createApplication(data: CreateApplicationRequest): Promise<ApplicationResponse> {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create application');
    }

    return response.json();
  },

  async getAllApplications(): Promise<CreditApplication[]> {
    const response = await fetch(`${API_BASE_URL}/applications`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    return response.json();
  },

  async getApplication(id: string): Promise<CreditApplication> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch application');
    }

    return response.json();
  },

  async updateApplicationStatus(id: string, status: string): Promise<CreditApplication> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update application');
    }

    return response.json();
  },

  async deleteApplication(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
  },

  async getStatistics(): Promise<Statistics> {
    const response = await fetch(`${API_BASE_URL}/statistics`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    return response.json();
  },
};
