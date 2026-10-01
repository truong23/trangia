import { Job, Application } from '../../types';
import { getAuthHeader } from '../auth/auth.service';

const API_BASE_URL = '/api';

export const jobService = {
  async getJobs(): Promise<Job[]> {
    const res = await fetch(`${API_BASE_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return await res.json();
  },

  async getJobById(id: string): Promise<Job> {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!res.ok) throw new Error('Job not found');
    return await res.json();
  },

  async createJob(data: Partial<Job>): Promise<Job> {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create job');
    return await res.json();
  },

  async updateJob(id: string, data: Partial<Job>): Promise<Job> {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update job');
    return await res.json();
  },

  async deleteJob(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Failed to delete job');
    return await res.json();
  },
};

export const applicationService = {
  async getApplications(jobId: string): Promise<Application[]> {
    const res = await fetch(`${API_BASE_URL}/applications?jobId=${jobId}`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Failed to fetch applications');
    return await res.json();
  },

  async createApplication(formData: FormData): Promise<Application> {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      // DO NOT set Content-Type to application/json, browser will auto-set multipart/form-data with boundary
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to submit application');
    return await res.json();
  },

  async updateApplicationStatus(id: string, status: string): Promise<Application> {
    const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update application status');
    return await res.json();
  },

  async updateApplicationNote(id: string, hrNote: string): Promise<Application> {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ hrNote }),
    });
    if (!res.ok) throw new Error('Failed to update application note');
    return await res.json();
  },
};
