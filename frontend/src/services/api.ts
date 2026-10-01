import { articleService } from './article/article.service';
import { categoryService } from './category/category.service';
import { authService } from './auth/auth.service';
import { settingsService } from './settings/settings.service';
import { userService } from './user/user.service';

export * from './article/article.service';
export * from './category/category.service';
export * from './auth/auth.service';
export * from './settings/settings.service';
export * from './user/user.service';
export * from './recruitment/recruitment.service';

import { jobService, applicationService } from './recruitment/recruitment.service';

// Hợp nhất export api đối tượng tiện lợi cho các component
export const api = {
  // Settings Service
  getSettings: settingsService.getSettings.bind(settingsService),
  updateSettings: settingsService.updateSettings.bind(settingsService),

  // Upload Image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Get token
    let token = '';
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      const authData = JSON.parse(stored);
      if (authData?.access_token) {
        token = authData.access_token;
      }
    }

    const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  },

  // Category Service
  getCategories: categoryService.getCategories.bind(categoryService),
  createCategory: categoryService.createCategory.bind(categoryService),
  updateCategory: categoryService.updateCategory.bind(categoryService),
  deleteCategory: categoryService.deleteCategory.bind(categoryService),

  // Article Service
  getArticles: articleService.getArticles.bind(articleService),
  getRecentArticles: articleService.getRecentArticles.bind(articleService),
  getArticleBySlug: articleService.getArticleBySlug.bind(articleService),
  createArticle: articleService.createArticle.bind(articleService),
  updateArticle: articleService.updateArticle.bind(articleService),
  deleteArticle: articleService.deleteArticle.bind(articleService),

  // Auth Service
  login: authService.login.bind(authService),
  logout: authService.logout.bind(authService),
  getCurrentUser: authService.getCurrentUser.bind(authService),
  forgotPassword: authService.forgotPassword.bind(authService),
  resetPassword: authService.resetPassword.bind(authService),
  changePassword: authService.changePassword.bind(authService),

  // User Management Service
  getUsers: userService.getUsers.bind(userService),
  createUser: userService.createUser.bind(userService),
  updateUser: userService.updateUser.bind(userService),
  deleteUser: userService.deleteUser.bind(userService),

  // Recruitment Service
  getJobs: jobService.getJobs.bind(jobService),
  getJobById: jobService.getJobById.bind(jobService),
  createJob: jobService.createJob.bind(jobService),
  updateJob: jobService.updateJob.bind(jobService),
  deleteJob: jobService.deleteJob.bind(jobService),
  
  getApplications: applicationService.getApplications.bind(applicationService),
  createApplication: applicationService.createApplication.bind(applicationService),
  updateApplicationStatus: applicationService.updateApplicationStatus.bind(applicationService),
  updateApplicationNote: applicationService.updateApplicationNote.bind(applicationService),
};

export default api;

