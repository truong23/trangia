import { articleService } from './article/article.service';
import { categoryService } from './category/category.service';
import { authService } from './auth/auth.service';
import { settingsService } from './settings/settings.service';
import { userService } from './user/user.service';
import { uploadService } from './upload/upload.service';

export * from './article/article.service';
export * from './category/category.service';
export * from './auth/auth.service';
export * from './settings/settings.service';
export * from './user/user.service';
export * from './upload/upload.service';

// Hợp nhất export api đối tượng tiện lợi cho các component
export const api = {
  // Settings Service
  getSettings: settingsService.getSettings.bind(settingsService),
  updateSettings: settingsService.updateSettings.bind(settingsService),

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

  // Upload Service
  uploadImage: uploadService.uploadImage.bind(uploadService),
  uploadMultiple: uploadService.uploadMultiple.bind(uploadService),
  getUploadedFiles: uploadService.getUploadedFiles.bind(uploadService),
  deleteFile: uploadService.deleteFile.bind(uploadService),

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
};

export default api;

