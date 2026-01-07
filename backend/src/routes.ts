import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dataStore } from './dataStore';
import { CreditEvaluator } from './creditEvaluator';
import { CreateApplicationRequest, CreditApplication } from './types';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all applications
router.get('/applications', (req: Request, res: Response) => {
  try {
    const applications = dataStore.getAllApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get single application
router.get('/applications/:id', (req: Request, res: Response) => {
  try {
    const application = dataStore.getApplication(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Create new application
router.post('/applications', (req: Request, res: Response) => {
  try {
    const request: CreateApplicationRequest = req.body;

    // Validate required fields
    if (!request.applicantName || !request.email || !request.phone ||
        !request.requestedAmount || !request.monthlyIncome ||
        request.employmentYears === undefined || !request.purpose) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate numeric values
    if (request.requestedAmount <= 0 || request.monthlyIncome <= 0 || request.employmentYears < 0) {
      return res.status(400).json({ error: 'Invalid numeric values' });
    }

    // Evaluate the application
    const evaluation = CreditEvaluator.evaluate(request);

    // Create application object
    const application: CreditApplication = {
      id: uuidv4(),
      applicantName: request.applicantName,
      email: request.email,
      phone: request.phone,
      requestedAmount: request.requestedAmount,
      monthlyIncome: request.monthlyIncome,
      employmentYears: request.employmentYears,
      purpose: request.purpose,
      status: evaluation.approved ? 'approved' : 'rejected',
      creditScore: evaluation.creditScore,
      approvedAmount: evaluation.approvedAmount,
      interestRate: evaluation.interestRate,
      termMonths: evaluation.termMonths,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store the application
    const saved = dataStore.addApplication(application);

    res.status(201).json({
      application: saved,
      evaluation: {
        reason: evaluation.reason
      }
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Update application status
router.patch('/applications/:id', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'approved', 'rejected', 'under_review'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = dataStore.updateApplication(req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Delete application
router.delete('/applications/:id', (req: Request, res: Response) => {
  try {
    const deleted = dataStore.deleteApplication(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// Get statistics
router.get('/statistics', (req: Request, res: Response) => {
  try {
    const stats = dataStore.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
