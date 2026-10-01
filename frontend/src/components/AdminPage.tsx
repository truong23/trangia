import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  LayoutDashboard,
  FileText,
  FolderPlus,
  PlusCircle,
  LogOut,
  ExternalLink,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Search,
  Lock,
  TrendingUp,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Settings,
  Users,
  KeyRound,
  Mail,
  UserPlus,
  ShieldAlert,
  Send,
  CheckCircle2,
  Briefcase,
  Globe,
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Eye,
  Phone,
  MessageSquare,
  Clock,
  X,
  HeartHandshake,
  Building2,
  MapPin,
} from 'lucide-react';
import { Article, Category, User, SiteSettings, UploadedFile, ContactRequest, Partner, Project } from '../types';
import { api } from '../services/api';
import { AdminJobsTab } from './AdminJobsTab';
import { TinyEditor } from './TinyEditor';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => api.getCurrentUser());
  const [activeTab, setActiveTab] = useState<
    'overview' | 'articles' | 'editor' | 'categories' | 'media' | 'projects' | 'partners' | 'contacts' | 'jobs' | 'users' | 'security' | 'settings'
  >('overview');

  // Projects states
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectFormId, setProjectFormId] = useState('');
  const [projectFormTitle, setProjectFormTitle] = useState('');
  const [projectFormClient, setProjectFormClient] = useState('');
  const [projectFormLocation, setProjectFormLocation] = useState('');
  const [projectFormScope, setProjectFormScope] = useState('');
  const [projectFormCategory, setProjectFormCategory] = useState<'hotel' | 'commercial' | 'residential' | 'industrial'>('commercial');
  const [projectFormCategoryLabel, setProjectFormCategoryLabel] = useState('Thương mại & Showroom');
  const [projectFormRegion, setProjectFormRegion] = useState<'north' | 'central' | 'south'>('north');
  const [projectFormImage, setProjectFormImage] = useState('');
  const [projectFormYear, setProjectFormYear] = useState('');
  const [projectFormPageInPdf, setProjectFormPageInPdf] = useState<number>(1);
  const [projectFormDescription, setProjectFormDescription] = useState('');
  const [projectFormSortOrder, setProjectFormSortOrder] = useState<number>(0);
  const [projectFormIsActive, setProjectFormIsActive] = useState<boolean>(true);
  const [projectFormIsFeatured, setProjectFormIsFeatured] = useState<boolean>(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isUploadingProjectImg, setIsUploadingProjectImg] = useState(false);
  const projectImgInputRef = useRef<HTMLInputElement>(null);

  // Partners & Clients states
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(false);
  const [partnerSearch, setPartnerSearch] = useState('');
  const [partnerCategoryFilter, setPartnerCategoryFilter] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerFormName, setPartnerFormName] = useState('');
  const [partnerFormRole, setPartnerFormRole] = useState('');
  const [partnerFormCategory, setPartnerFormCategory] = useState<'developer' | 'contractor' | 'manufacturer'>('developer');
  const [partnerFormBadge, setPartnerFormBadge] = useState('');
  const [partnerFormBrandColor, setPartnerFormBrandColor] = useState('#FE7B00');
  const [partnerFormThumbnail, setPartnerFormThumbnail] = useState('');
  const [partnerFormProjects, setPartnerFormProjects] = useState('');
  const [partnerFormDescription, setPartnerFormDescription] = useState('');
  const [partnerFormWebsite, setPartnerFormWebsite] = useState('');
  const [partnerFormSortOrder, setPartnerFormSortOrder] = useState<number>(0);
  const [partnerFormIsActive, setPartnerFormIsActive] = useState<boolean>(true);
  const [isSavingPartner, setIsSavingPartner] = useState(false);
  const [isUploadingPartnerThumb, setIsUploadingPartnerThumb] = useState(false);
  const partnerThumbInputRef = useRef<HTMLInputElement>(null);

  // Contact & Quotations states
  const [contactsList, setContactsList] = useState<ContactRequest[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [contactSearch, setContactSearch] = useState('');
  const [contactStatusFilter, setContactStatusFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalStatus, setContactModalStatus] = useState<ContactRequest['status']>('new');
  const [contactModalNotes, setContactModalNotes] = useState('');
  const [isUpdatingContact, setIsUpdatingContact] = useState(false);

  // Login form state
  const [authMode, setAuthMode] = useState<'login' | 'forgot' | 'reset-otp'>('login');
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('Admin@123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot Password / Reset OTP state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [isSubmittingForgot, setIsSubmittingForgot] = useState(false);

  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Media Library states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const thumbFileInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  // Filter & Search in articles list
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');
  const [articleLangFilter, setArticleLangFilter] = useState('all');

  // Filter in users list
  const [userSearch, setUserSearch] = useState('');

  // Editor Form State (Bilingual & TinyMCE)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editorLangTab, setEditorLangTab] = useState<'vi' | 'en'>('vi');
  const [formTitle, setFormTitle] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formThumbnail, setFormThumbnail] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80',
  );
  const [formSummary, setFormSummary] = useState('');
  const [formSummaryEn, setFormSummaryEn] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formContentEn, setFormContentEn] = useState('');
  const [formLang, setFormLang] = useState<string>('vi');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);

  // Category Form State
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isSavingCat, setIsSavingCat] = useState(false);

  // User Form State (Add or Edit User)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFormFullName, setUserFormFullName] = useState('');
  const [userFormUsername, setUserFormUsername] = useState('');
  const [userFormEmail, setUserFormEmail] = useState('');
  const [userFormRole, setUserFormRole] = useState<'admin' | 'editor' | 'user'>('editor');
  const [userFormStatus, setUserFormStatus] = useState<'active' | 'inactive'>('active');
  const [userFormPassword, setUserFormPassword] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);

  // Change Password Form State (Personal Account)
  const [currentOldPass, setCurrentOldPass] = useState('');
  const [currentNewPass, setCurrentNewPass] = useState('');
  const [currentConfirmPass, setCurrentConfirmPass] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Settings Form State
  const [settingsCompany, setSettingsCompany] = useState({
    name: '',
    shortName: '',
    logo: '',
    whiteLogo: '',
    phone: '',
    hotline: '',
    fax: '',
    email: '',
    address: '',
    website: '',
    slogan: '',
    director: '',
  });
  const [settingsHero, setSettingsHero] = useState({
    title: '',
    subtext: '',
    feedbackEmail: '',
    backgroundImage: '',
      recruitmentBanner: '',
  });
  const [settingsFooter, setSettingsFooter] = useState({
    introHeading: '',
    fieldsHeading: '',
    newsletterHeading: '',
    newsletterText: '',
    copyright: '',
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Toast alert message
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Load all data for Admin
  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [cats, artsRes, cfg, users, media, contacts, partners, projects] = await Promise.all([
        api.getCategories().catch(() => []),
        api.getArticles({ limit: 100 }).catch(() => ({ items: [], pagination: { total: 0, page: 1, limit: 100, totalPages: 1 } })),
        api.getSettings().catch(() => null),
        api.getUsers().catch(() => []),
        api.getUploadedFiles().catch(() => []),
        api.getContacts().catch(() => []),
        api.getAllPartnersAdmin().catch(() => []),
        api.getProjects().catch(() => []),
      ]);
      setCategories(cats);
      setArticles(artsRes.items);
      setUsersList(users);
      setUploadedFiles(media);
      setContactsList(contacts);
      setPartnersList(partners);
      setProjectsList(projects);
      if (cats.length > 0 && !formCategoryId) {
        setFormCategoryId(cats[0].id);
      }
      if (cfg) {
        setSiteSettings(cfg);
        setSettingsCompany({
          name: cfg.company?.name || '',
          shortName: cfg.company?.shortName || '',
          logo: cfg.company?.logo || '',
          whiteLogo: cfg.company?.whiteLogo || '',
          phone: cfg.company?.phone || '',
          hotline: cfg.company?.hotline || '',
          fax: cfg.company?.fax || '',
          email: cfg.company?.email || '',
          address: cfg.company?.address || '',
          website: cfg.company?.website || '',
          slogan: cfg.company?.slogan || '',
          director: cfg.company?.director || '',
        });
        setSettingsHero({
          title: cfg.heroBanner?.title || '',
          subtext: cfg.heroBanner?.subtext || '',
          feedbackEmail: cfg.heroBanner?.feedbackEmail || '',
          backgroundImage: cfg.heroBanner?.backgroundImage || '',
            recruitmentBanner: cfg.heroBanner?.recruitmentBanner || '',
        });
        setSettingsFooter({
          introHeading: cfg.footer?.introHeading || '',
          fieldsHeading: cfg.footer?.fieldsHeading || '',
          newsletterHeading: cfg.footer?.newsletterHeading || '',
          newsletterText: cfg.footer?.newsletterText || '',
          copyright: cfg.footer?.copyright || '',
        });
      }
    } catch (err: any) {
      console.error('Lỗi khi tải dữ liệu admin:', err);
      showToast('error', 'Không thể kết nối đến cơ sở dữ liệu');
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadMediaFiles = async () => {
    setIsLoadingMedia(true);
    try {
      const files = await api.getUploadedFiles();
      setUploadedFiles(files);
    } catch (err) {
      console.error('Lỗi tải media:', err);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  const loadContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const contacts = await api.getContacts();
      setContactsList(contacts);
    } catch (err) {
      console.error('Lỗi tải danh sách liên hệ:', err);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleOpenContactModal = (c: ContactRequest) => {
    setSelectedContact(c);
    setContactModalStatus(c.status || 'new');
    setContactModalNotes(c.notes || '');
    setIsContactModalOpen(true);
  };

  const handleSaveContactModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact?.id) return;
    setIsUpdatingContact(true);
    try {
      const updated = await api.updateContact(selectedContact.id, {
        status: contactModalStatus,
        notes: contactModalNotes,
      });
      setContactsList((prev) => prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)));
      setSelectedContact((prev) => (prev ? { ...prev, ...updated } : null));
      setIsContactModalOpen(false);
      showToast('success', 'Đã cập nhật trạng thái & ghi chú liên hệ thành công!');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi cập nhật liên hệ');
    } finally {
      setIsUpdatingContact(false);
    }
  };

  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa yêu cầu liên hệ của "${name}"?`)) return;
    try {
      await api.deleteContact(id);
      setContactsList((prev) => prev.filter((c) => c.id !== id));
      showToast('success', 'Đã xóa yêu cầu liên hệ');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi xóa yêu cầu liên hệ');
    }
  };

  // Projects handlers
  const loadProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const data = await api.getProjects();
      setProjectsList(data);
    } catch (err) {
      console.error('Lỗi tải danh sách dự án:', err);
      showToast('error', 'Không thể tải danh sách dự án');
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleOpenProjectModal = (p?: Project) => {
    if (p) {
      setSelectedProject(p);
      setProjectFormId(p.id);
      setProjectFormTitle(p.title || '');
      setProjectFormClient(p.client || '');
      setProjectFormLocation(p.location || '');
      setProjectFormScope(p.scope || '');
      setProjectFormCategory((p.category as any) || 'commercial');
      setProjectFormCategoryLabel(p.categoryLabel || 'Thương mại & Showroom');
      setProjectFormRegion((p.region as any) || 'north');
      setProjectFormImage(p.image || '');
      setProjectFormYear(p.year || '');
      setProjectFormPageInPdf(p.pageInPdf ?? 1);
      setProjectFormDescription(p.description || '');
      setProjectFormSortOrder(p.sortOrder ?? 0);
      setProjectFormIsActive(p.isActive !== false);
      setProjectFormIsFeatured(!!p.isFeatured);
    } else {
      setSelectedProject(null);
      const generatedId = `project-${Date.now()}`;
      setProjectFormId(generatedId);
      setProjectFormTitle('');
      setProjectFormClient('');
      setProjectFormLocation('');
      setProjectFormScope('');
      setProjectFormCategory('commercial');
      setProjectFormCategoryLabel('Thương mại & Showroom');
      setProjectFormRegion('north');
      setProjectFormImage('');
      setProjectFormYear(`${new Date().getFullYear()}`);
      setProjectFormPageInPdf(projectsList.length + 1);
      setProjectFormDescription('');
      setProjectFormSortOrder(projectsList.length + 1);
      setProjectFormIsActive(true);
      setProjectFormIsFeatured(false);
    }
    setIsProjectModalOpen(true);
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProjectImg(true);
    try {
      const res = await api.uploadImage(file);
      setProjectFormImage(res.url);
      showToast('success', `Đã tải lên ảnh dự án: ${res.filename}`);
      loadMediaFiles();
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi tải ảnh dự án');
    } finally {
      setIsUploadingProjectImg(false);
      if (projectImgInputRef.current) {
        projectImgInputRef.current.value = '';
      }
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormTitle.trim() || !projectFormLocation.trim() || !projectFormScope.trim()) {
      showToast('error', 'Vui lòng điền đầy đủ Tên dự án, Địa điểm và Hạng mục thi công');
      return;
    }

    setIsSavingProject(true);
    try {
      const catLabels: Record<string, string> = {
        hotel: 'Khách sạn & Nghỉ dưỡng',
        residential: 'Đô thị & Chung cư cao tầng',
        commercial: 'Thương mại & Showroom',
        industrial: 'Nhà xưởng & Công nghiệp',
      };

      const payload = {
        id: projectFormId.trim() || `project-${Date.now()}`,
        title: projectFormTitle.trim(),
        client: projectFormClient.trim() || undefined,
        location: projectFormLocation.trim(),
        scope: projectFormScope.trim(),
        category: projectFormCategory,
        categoryLabel: catLabels[projectFormCategory] || projectFormCategoryLabel,
        region: projectFormRegion,
        image: projectFormImage.trim() || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=800&q=80',
        year: projectFormYear.trim() || undefined,
        pageInPdf: Number(projectFormPageInPdf) || undefined,
        description: projectFormDescription.trim() || undefined,
        sortOrder: Number(projectFormSortOrder) || 0,
        isActive: projectFormIsActive,
        isFeatured: projectFormIsFeatured,
      };

      if (selectedProject) {
        const updated = await api.updateProject(selectedProject.id, payload);
        setProjectsList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        showToast('success', `Đã cập nhật dự án "${updated.title}"`);
      } else {
        const created = await api.createProject(payload);
        setProjectsList((prev) => [...prev, created]);
        showToast('success', `Đã tạo dự án mới "${created.title}"`);
      }
      setIsProjectModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi lưu dự án');
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa dự án "${title}" khỏi cơ sở dữ liệu?`)) return;
    try {
      await api.deleteProject(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      showToast('success', `Đã xóa dự án "${title}"`);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi xóa dự án');
    }
  };

  // Partners & Clients handlers
  const loadPartners = async () => {
    setIsLoadingPartners(true);
    try {
      const partners = await api.getAllPartnersAdmin();
      setPartnersList(partners);
    } catch (err) {
      console.error('Lỗi tải danh sách đối tác:', err);
      showToast('error', 'Không thể tải danh sách đối tác');
    } finally {
      setIsLoadingPartners(false);
    }
  };

  const handleOpenPartnerModal = (p?: Partner) => {
    if (p) {
      setSelectedPartner(p);
      setPartnerFormName(p.name || '');
      setPartnerFormRole(p.role || '');
      setPartnerFormCategory(p.category || 'developer');
      setPartnerFormBadge(p.badge || '');
      setPartnerFormBrandColor(p.brandColor || '#FE7B00');
      setPartnerFormThumbnail(p.thumbnail || '');
      setPartnerFormProjects(Array.isArray(p.projects) ? p.projects.join(', ') : (p.projects || ''));
      setPartnerFormDescription(p.description || '');
      setPartnerFormWebsite(p.website || '');
      setPartnerFormSortOrder(p.sortOrder ?? 0);
      setPartnerFormIsActive(p.isActive !== false);
    } else {
      setSelectedPartner(null);
      setPartnerFormName('');
      setPartnerFormRole('');
      setPartnerFormCategory('developer');
      setPartnerFormBadge('');
      setPartnerFormBrandColor('#FE7B00');
      setPartnerFormThumbnail('');
      setPartnerFormProjects('');
      setPartnerFormDescription('');
      setPartnerFormWebsite('');
      setPartnerFormSortOrder(partnersList.length + 1);
      setPartnerFormIsActive(true);
    }
    setIsPartnerModalOpen(true);
  };

  const handlePartnerThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPartnerThumb(true);
    try {
      const res = await api.uploadImage(file);
      setPartnerFormThumbnail(res.url);
      showToast('success', `Đã tải lên logo / ảnh: ${res.filename}`);
      loadMediaFiles();
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi tải ảnh đối tác');
    } finally {
      setIsUploadingPartnerThumb(false);
      if (partnerThumbInputRef.current) {
        partnerThumbInputRef.current.value = '';
      }
    }
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFormName.trim()) {
      showToast('error', 'Vui lòng nhập tên đối tác / khách hàng');
      return;
    }

    setIsSavingPartner(true);
    try {
      const projectsArr = partnerFormProjects
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: partnerFormName.trim(),
        role: partnerFormRole.trim(),
        category: partnerFormCategory,
        badge: partnerFormBadge.trim() || undefined,
        brandColor: partnerFormBrandColor.trim() || undefined,
        thumbnail: partnerFormThumbnail.trim() || undefined,
        projects: projectsArr,
        description: partnerFormDescription.trim() || undefined,
        website: partnerFormWebsite.trim() || undefined,
        sortOrder: Number(partnerFormSortOrder) || 0,
        isActive: partnerFormIsActive,
      };

      if (selectedPartner) {
        const updated = await api.updatePartner(selectedPartner.id, payload);
        setPartnersList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        showToast('success', `Đã cập nhật đối tác "${updated.name}"`);
      } else {
        const created = await api.createPartner(payload);
        setPartnersList((prev) => [...prev, created]);
        showToast('success', `Đã thêm đối tác mới "${created.name}"`);
      }
      setIsPartnerModalOpen(false);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi lưu thông tin đối tác');
    } finally {
      setIsSavingPartner(false);
    }
  };

  const handleDeletePartner = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa đối tác "${name}" khỏi cơ sở dữ liệu?`)) return;
    try {
      await api.deletePartner(id);
      setPartnersList((prev) => prev.filter((p) => p.id !== id));
      showToast('success', `Đã xóa đối tác "${name}"`);
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi xóa đối tác');
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAdminData();
    }
  }, [currentUser]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await api.login({ username: loginUsername, password: loginPassword });
      setCurrentUser(res.user);
      showToast('success', `Đăng nhập thành công! Chào mừng ${res.user.fullName || res.user.username}`);
    } catch (err: any) {
      setLoginError(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setAuthMode('login');
    showToast('success', 'Đã đăng xuất khỏi phiên làm việc');
  };

  // Request OTP for forgot password
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('error', 'Vui lòng nhập địa chỉ email hoặc tên đăng nhập');
      return;
    }
    setIsSubmittingForgot(true);
    try {
      const res = await api.forgotPassword(forgotEmail.trim());
      setOtpSentMessage(res.message);
      if (res.otp) {
        setForgotOtp(res.otp);
      }
      setAuthMode('reset-otp');
      showToast('success', 'Mã xác nhận OTP đã được gửi đến email!');
    } catch (err: any) {
      showToast('error', err.message || 'Không tìm thấy tài khoản với email này');
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  // Reset Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp.trim()) {
      showToast('error', 'Vui lòng nhập mã OTP xác nhận');
      return;
    }
    if (newResetPassword.length < 6) {
      showToast('error', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newResetPassword !== confirmResetPassword) {
      showToast('error', 'Mật khẩu xác nhận không khớp');
      return;
    }

    setIsSubmittingForgot(true);
    try {
      const res = await api.resetPassword({
        email: forgotEmail.trim(),
        otp: forgotOtp.trim(),
        newPassword: newResetPassword,
      });
      showToast('success', res.message || 'Đặt lại mật khẩu thành công!');
      setAuthMode('login');
      setLoginPassword(newResetPassword);
      setForgotOtp('');
      setNewResetPassword('');
      setConfirmResetPassword('');
    } catch (err: any) {
      showToast('error', err.message || 'Mã OTP không đúng hoặc đã hết hạn');
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  // Change Password for Logged-in User
  const handleChangePersonalPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentNewPass.length < 6) {
      showToast('error', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (currentNewPass !== currentConfirmPass) {
      showToast('error', 'Mật khẩu xác nhận không trùng khớp');
      return;
    }

    setIsChangingPass(true);
    try {
      await api.changePassword({
        oldPassword: currentOldPass,
        newPassword: currentNewPass,
      });
      showToast('success', 'Đổi mật khẩu thành công! Mật khẩu mới đã được lưu.');
      setCurrentOldPass('');
      setCurrentNewPass('');
      setCurrentConfirmPass('');
    } catch (err: any) {
      showToast('error', err.message || 'Mật khẩu hiện tại không chính xác');
    } finally {
      setIsChangingPass(false);
    }
  };

  // Thumbnail Image Upload Handler
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumb(true);
    try {
      const res = await api.uploadImage(file);
      setFormThumbnail(res.url);
      showToast('success', `Đã tải lên ảnh đại diện: ${res.filename}`);
      loadMediaFiles();
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi tải ảnh đại diện');
    } finally {
      setIsUploadingThumb(false);
      if (thumbFileInputRef.current) {
        thumbFileInputRef.current.value = '';
      }
    }
  };

  // Media Library Upload Multiple Handler
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoadingMedia(true);
    try {
      const fileList = Array.from(files);
      await api.uploadMultiple(fileList);
      showToast('success', `Đã tải lên thành công ${fileList.length} hình ảnh!`);
      loadMediaFiles();
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi tải ảnh');
    } finally {
      setIsLoadingMedia(false);
      if (mediaFileInputRef.current) {
        mediaFileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteMedia = async (filename: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ảnh "${filename}"?`)) return;
    try {
      await api.deleteFile(filename);
      showToast('success', 'Đã xóa ảnh thành công');
      setUploadedFiles((prev) => prev.filter((f) => f.filename !== filename));
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi xóa ảnh');
    }
  };

  const handleCopyUrl = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      showToast('success', 'Đã sao chép đường dẫn ảnh vào Clipboard!');
      setTimeout(() => setCopiedUrl(null), 3000);
    }
  };

  // User CRUD handlers
  const handleOpenCreateUser = () => {
    setEditingUserId(null);
    setUserFormFullName('');
    setUserFormUsername('');
    setUserFormEmail('');
    setUserFormRole('editor');
    setUserFormStatus('active');
    setUserFormPassword('');
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (u: User) => {
    setEditingUserId(u.id);
    setUserFormFullName(u.fullName || '');
    setUserFormUsername(u.username);
    setUserFormEmail(u.email);
    setUserFormRole(u.role || 'user');
    setUserFormStatus((u as any).status || 'active');
    setUserFormPassword('');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormUsername || !userFormEmail) {
      showToast('error', 'Vui lòng nhập đầy đủ tên đăng nhập và email');
      return;
    }
    if (!editingUserId && (!userFormPassword || userFormPassword.length < 6)) {
      showToast('error', 'Mật khẩu khởi tạo phải từ 6 ký tự trở lên');
      return;
    }

    setIsSavingUser(true);
    try {
      if (editingUserId) {
        const updatePayload: any = {
          fullName: userFormFullName,
          username: userFormUsername,
          email: userFormEmail,
          role: userFormRole,
          status: userFormStatus,
        };
        if (userFormPassword.trim()) {
          updatePayload.password = userFormPassword.trim();
        }
        await api.updateUser(editingUserId, updatePayload);
        showToast('success', 'Đã cập nhật tài khoản thành công!');
      } else {
        await api.createUser({
          fullName: userFormFullName,
          username: userFormUsername,
          email: userFormEmail,
          role: userFormRole,
          status: userFormStatus,
          password: userFormPassword,
        });
        showToast('success', 'Đã thêm tài khoản người dùng mới thành công!');
      }
      setIsUserModalOpen(false);
      const updatedUsers = await api.getUsers();
      setUsersList(updatedUsers);
    } catch (err: any) {
      showToast('error', err.message || 'Thao tác tài khoản thất bại');
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDeleteUser = async (u: User) => {
    if (u.username === 'admin') {
      showToast('error', 'Không thể xóa tài khoản quản trị viên mặc định (admin)');
      return;
    }
    if (u.id === currentUser?.id) {
      showToast('error', 'Không thể xóa tài khoản đang đăng nhập');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${u.fullName || u.username}" (${u.email})?`)) {
      try {
        await api.deleteUser(u.id);
        showToast('success', 'Đã xóa tài khoản thành công');
        setUsersList((prev) => prev.filter((item) => item.id !== u.id));
      } catch (err: any) {
        showToast('error', err.message || 'Xóa tài khoản thất bại');
      }
    }
  };

  // Article Save handler with Bilingual Support
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      showToast('error', 'Vui lòng nhập tiêu đề và nội dung bài viết (Tiếng Việt)');
      return;
    }
    setIsSavingArticle(true);
    try {
      const articlePayload = {
        title: formTitle,
        titleEn: formTitleEn.trim() || undefined,
        summary: formSummary,
        summaryEn: formSummaryEn.trim() || undefined,
        content: formContent,
        contentEn: formContentEn.trim() || undefined,
        lang: formLang,
        thumbnail: formThumbnail,
        categoryId: formCategoryId || undefined,
        status: formStatus,
        isFeatured: formIsFeatured,
      };

      if (editingArticleId) {
        await api.updateArticle(editingArticleId, articlePayload);
        showToast('success', 'Cập nhật bài viết thành công!');
      } else {
        await api.createArticle(articlePayload);
        showToast('success', 'Tạo bài viết mới thành công!');
      }
      const artsRes = await api.getArticles({ limit: 100 });
      setArticles(artsRes.items);
      setActiveTab('articles');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi lưu bài viết');
    } finally {
      setIsSavingArticle(false);
    }
  };

  // Settings Save handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const updated = await api.updateSettings({
        company: settingsCompany as any,
        heroBanner: settingsHero,
        footer: {
          ...siteSettings?.footer,
          ...settingsFooter,
        } as any,
      });
      setSiteSettings(updated);
      showToast('success', 'Cập nhật thông tin công ty & cấu hình thành công!');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi lưu cấu hình');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // ==========================================================
  // VIEW 1: AUTHENTICATION SCREEN (LOGIN / FORGOT PASSWORD / OTP)
  // ==========================================================
  if (!currentUser) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-box">
              <Shield size={32} color="#FE7B00" />
            </div>
            <h2>TRẦN GIA CMS ADMIN</h2>
            <p className="login-subtitle">
              {authMode === 'login'
                ? 'Hệ thống Quản trị Nội dung & Truyền thông Trần Gia Construction'
                : authMode === 'forgot'
                ? 'Khôi phục & Đặt lại mật khẩu qua Email'
                : 'Nhập mã OTP & Tạo mật khẩu mới'}
            </p>
          </div>

          {loginError && (
            <div className="login-alert error">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          {toastMessage && (
            <div className={`login-alert ${toastMessage.type}`}>
              {toastMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* 1.1 LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Tên đăng nhập / Email</label>
                <input
                  type="text"
                  required
                  placeholder="admin hoặc email..."
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label>Mật khẩu</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setForgotEmail(loginUsername.includes('@') ? loginUsername : 'trangia.kt69@gmail.com');
                      setLoginError('');
                    }}
                    className="forgot-pass-link"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isLoggingIn} className="login-submit-btn">
                {isLoggingIn ? <RefreshCw size={18} className="animate-spin" /> : <Lock size={18} />}
                <span>{isLoggingIn ? 'Đang xác thực...' : 'ĐĂNG NHẬP HỆ THỐNG'}</span>
              </button>

              <div className="login-footer-actions">
                <button type="button" onClick={() => onNavigate('/')} className="back-to-home-link">
                  <ArrowLeft size={15} />
                  <span>Về trang chủ Trần Gia</span>
                </button>
              </div>

              <div className="login-credentials-hint">
                <span>Tài khoản quản trị mặc định:</span>
                <code>admin</code> / <code>Admin@123</code>
              </div>
            </form>
          )}

          {/* 1.2 FORGOT PASSWORD FORM */}
          {authMode === 'forgot' && (
            <form onSubmit={handleRequestOtp} className="login-form">
              <div className="form-group">
                <label>Địa chỉ Email hoặc Tên đăng nhập</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="trangia.kt69@gmail.com..."
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <p className="field-hint">
                  Hệ thống sẽ gửi mã xác thực 6 chữ số (OTP) đến địa chỉ email này để bạn đặt lại mật khẩu mới.
                </p>
              </div>

              <button type="submit" disabled={isSubmittingForgot} className="login-submit-btn">
                {isSubmittingForgot ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmittingForgot ? 'Đang gửi mã...' : 'GỬI MÃ OTP QUA EMAIL'}</span>
              </button>

              <div className="login-footer-actions">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="back-to-home-link"
                >
                  <ArrowLeft size={15} />
                  <span>Quay lại đăng nhập</span>
                </button>
              </div>
            </form>
          )}

          {/* 1.3 RESET PASSWORD FORM */}
          {authMode === 'reset-otp' && (
            <form onSubmit={handleResetPassword} className="login-form">
              {otpSentMessage && (
                <div className="otp-sent-banner">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <p>{otpSentMessage}</p>
                </div>
              )}

              <div className="form-group">
                <label>Mã xác thực OTP (6 số)</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập 6 số OTP..."
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  maxLength={6}
                  style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Ít nhất 6 ký tự..."
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmResetPassword}
                  onChange={(e) => setConfirmResetPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmittingForgot} className="login-submit-btn">
                {isSubmittingForgot ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                <span>{isSubmittingForgot ? 'Đang cập nhật...' : 'XÁC NHẬN & ĐỔI MẬT KHẨU'}</span>
              </button>

              <div className="login-footer-actions">
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="back-to-home-link"
                >
                  <ArrowLeft size={15} />
                  <span>Gửi lại mã OTP khác</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      !articleSearch ||
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      (a.titleEn && a.titleEn.toLowerCase().includes(articleSearch.toLowerCase())) ||
      a.summary.toLowerCase().includes(articleSearch.toLowerCase());
    const matchCat = articleCategoryFilter === 'all' || a.categoryId === articleCategoryFilter;
    const matchLang =
      articleLangFilter === 'all' ||
      (articleLangFilter === 'en' && Boolean(a.titleEn)) ||
      (articleLangFilter === 'bilingual' && Boolean(a.titleEn && a.contentEn)) ||
      (articleLangFilter === 'vi' && !a.titleEn);
    return matchSearch && matchCat && matchLang;
  });

  const filteredUsers = usersList.filter((u) => {
    if (!userSearch) return true;
    const term = userSearch.toLowerCase();
    return (
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.fullName && u.fullName.toLowerCase().includes(term))
    );
  });

  const filteredContacts = contactsList.filter((c) => {
    const matchSearch =
      !contactSearch ||
      c.fullName.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.phone.includes(contactSearch) ||
      (c.email && c.email.toLowerCase().includes(contactSearch.toLowerCase())) ||
      (c.projectLocation && c.projectLocation.toLowerCase().includes(contactSearch.toLowerCase())) ||
      (c.message && c.message.toLowerCase().includes(contactSearch.toLowerCase()));

    const matchStatus = contactStatusFilter === 'all' || c.status === contactStatusFilter;

    return matchSearch && matchStatus;
  });

  const newContactsCount = contactsList.filter((c) => c.status === 'new').length;

  const filteredPartners = partnersList.filter((p) => {
    const matchSearch =
      !partnerSearch ||
      p.name.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      (p.role && p.role.toLowerCase().includes(partnerSearch.toLowerCase())) ||
      (p.badge && p.badge.toLowerCase().includes(partnerSearch.toLowerCase())) ||
      (Array.isArray(p.projects) && p.projects.some((pr) => pr.toLowerCase().includes(partnerSearch.toLowerCase())));

    const matchCategory = partnerCategoryFilter === 'all' || p.category === partnerCategoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div className="admin-portal-wrapper">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`admin-toast-alert ${toastMessage.type}`}>
          {toastMessage.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }} title="Về trang chủ">
          <div style={{ background: '#FFFFFF', padding: '3px 6px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
            <img src="/images/logo-trangia.png" alt="TRẦN GIA" style={{ height: '36px', objectFit: 'contain' }} />
          </div>
          <div className="admin-brand-text">
            <h3>TRẦN GIA CMS</h3>
            <span>Quản trị truyền thông & tin bài</span>
          </div>
        </div>

        <div className="admin-user-badge">
          <div className="user-avatar">
            {(currentUser.fullName || currentUser.username).charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <strong>{currentUser.fullName || currentUser.username}</strong>
            <span className="user-role-tag">{currentUser.role.toUpperCase()}</span>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Tổng quan hệ thống</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`admin-nav-btn ${activeTab === 'articles' ? 'active' : ''}`}
          >
            <FileText size={18} />
            <span>Quản lý bài viết</span>
            <span className="nav-badge-count">{articles.length}</span>
          </button>

          <button
            onClick={() => {
              setEditingArticleId(null);
              setFormTitle('');
              setFormTitleEn('');
              setFormSummary('');
              setFormSummaryEn('');
              setFormContent('');
              setFormContentEn('');
              setEditorLangTab('vi');
              setActiveTab('editor');
            }}
            className={`admin-nav-btn ${activeTab === 'editor' ? 'active' : ''}`}
          >
            <PlusCircle size={18} />
            <span>Viết bài mới</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
          >
            <FolderPlus size={18} />
            <span>Quản lý chuyên mục</span>
            <span className="nav-badge-count">{categories.length}</span>
          </button>

          <button
            onClick={() => {
              loadMediaFiles();
              setActiveTab('media');
            }}
            className={`admin-nav-btn ${activeTab === 'media' ? 'active' : ''}`}
          >
            <ImageIcon size={18} />
            <span>Kho hình ảnh & Media</span>
            <span className="nav-badge-count">{uploadedFiles.length}</span>
          </button>

          <button
            onClick={() => {
              loadProjects();
              setActiveTab('projects');
            }}
            className={`admin-nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
          >
            <Building2 size={18} />
            <span>Dự án thi công</span>
            <span className="nav-badge-count">{projectsList.length}</span>
          </button>

          <button
            onClick={() => {
              loadPartners();
              setActiveTab('partners');
            }}
            className={`admin-nav-btn ${activeTab === 'partners' ? 'active' : ''}`}
          >
            <HeartHandshake size={18} />
            <span>Đối tác & Khách hàng</span>
            <span className="nav-badge-count">{partnersList.length}</span>
          </button>

          <button
            onClick={() => {
              loadContacts();
              setActiveTab('contacts');
            }}
            className={`admin-nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span>Liên hệ & Báo giá</span>
            {newContactsCount > 0 ? (
              <span className="nav-badge-count highlight">{newContactsCount} mới</span>
            ) : (
              <span className="nav-badge-count">{contactsList.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`admin-nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Quản lý Tuyển dụng</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Tài khoản & Phân quyền</span>
            <span className="nav-badge-count">{usersList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`admin-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            <span>Đổi mật khẩu cá nhân</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Cài đặt thông tin công ty</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={() => onNavigate('/')} className="sidebar-action-btn preview-site-btn">
            <ExternalLink size={16} />
            <span>Xem trang chủ</span>
          </button>
          <button onClick={handleLogout} className="sidebar-action-btn logout-btn">
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Admin Main Content Area */}
      <main className="admin-main-content">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="header-breadcrumbs">
            <span>Admin</span> /{' '}
            <strong>
              {activeTab === 'overview'
                ? 'Tổng quan'
                : activeTab === 'articles'
                ? 'Danh sách bài viết'
                : activeTab === 'editor'
                ? editingArticleId
                  ? 'Sửa bài viết (TinyMCE & Đa ngôn ngữ)'
                  : 'Thêm bài mới (TinyMCE & Đa ngôn ngữ)'
                : activeTab === 'categories'
                ? 'Chuyên mục'
                : activeTab === 'media'
                ? 'Quản lý hình ảnh & Tải lên'
                : activeTab === 'projects'
                ? 'Quản lý Dự án Thi công'
                : activeTab === 'partners'
                ? 'Đối tác Chiến lược & Khách hàng'
                : activeTab === 'contacts'
                ? 'Quản lý Liên hệ & Báo giá khách hàng'
                : activeTab === 'jobs'
                ? 'Quản lý Tuyển dụng'
                : activeTab === 'users'
                ? 'Quản lý tài khoản'
                : activeTab === 'security'
                ? 'Đổi mật khẩu cá nhân'
                : 'Cài đặt thông tin công ty'}
            </strong>
          </div>

          <div className="header-right-tools">
            <button onClick={loadAdminData} disabled={isLoadingData} className="admin-btn-refresh">
              <RefreshCw size={15} className={isLoadingData ? 'animate-spin' : ''} />
              <span>Đồng bộ dữ liệu</span>
            </button>
          </div>
        </header>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="admin-tab-pane">
            <div className="overview-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                  <FileText size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{articles.length}</span>
                  <span className="stat-label">Tổng số bài viết</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <FolderPlus size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{categories.length}</span>
                  <span className="stat-label">Chuyên mục hoạt động</span>
                </div>
              </div>

              <div
                className="stat-box"
                onClick={() => {
                  loadPartners();
                  setActiveTab('partners');
                }}
                style={{ cursor: 'pointer' }}
                title="Bấm để xem danh sách đối tác chiến lược & khách hàng"
              >
                <div className="stat-icon-wrap" style={{ background: '#FFF7ED', color: '#EA580C' }}>
                  <HeartHandshake size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{partnersList.length}</span>
                  <span className="stat-label">Đối tác & Khách hàng</span>
                </div>
              </div>

              <div
                className="stat-box"
                onClick={() => {
                  loadContacts();
                  setActiveTab('contacts');
                }}
                style={{ cursor: 'pointer', border: newContactsCount > 0 ? '1px solid #93C5FD' : undefined }}
                title="Bấm để xem danh sách khách hàng liên hệ & báo giá"
              >
                <div className="stat-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <Mail size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{contactsList.length}</span>
                  <span className="stat-label">
                    Khách gửi liên hệ {newContactsCount > 0 && <strong style={{ color: '#EF4444' }}>({newContactsCount} mới)</strong>}
                  </span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                  <ImageIcon size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{uploadedFiles.length}</span>
                  <span className="stat-label">Hình ảnh trong hệ thống</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#F3E8FF', color: '#9333EA' }}>
                  <TrendingUp size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">
                    {articles.reduce((acc, a) => acc + (a.viewCount || 0), 0).toLocaleString()}
                  </span>
                  <span className="stat-label">Tổng lượt xem bài viết</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Users */}
            <div className="overview-grid-2col">
              {/* Recent Contact Inquiries */}
              <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    Yêu cầu Báo giá & Tư vấn thi công gần đây
                    {newContactsCount > 0 && (
                      <span className="contact-status-tag new" style={{ marginLeft: '10px' }}>
                        {newContactsCount} yêu cầu mới
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => {
                      loadContacts();
                      setActiveTab('contacts');
                    }}
                    className="view-all-link-btn"
                  >
                    Quản lý toàn bộ {contactsList.length} yêu cầu liên hệ →
                  </button>
                </div>

                <div className="recent-items-list">
                  {contactsList.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="recent-item-row"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleOpenContactModal(c)}
                      title="Nhấn để xem chi tiết yêu cầu"
                    >
                      <div className="item-info">
                        <strong>
                          {c.fullName} • <span style={{ color: '#0284C7' }}>📞 {c.phone}</span>
                        </strong>
                        <span>
                          {c.service === 'ceiling'
                            ? 'Trần thạch cao & kim loại'
                            : c.service === 'partition'
                            ? 'Vách ngăn chống cháy'
                            : c.service === 'painting'
                            ? 'Sơn bả & Phào GFRC'
                            : c.service === 'fitout'
                            ? 'Fit-out & Cơ điện M&E'
                            : 'Tổng thầu hoàn thiện'}
                          {c.projectLocation ? ` • 📍 ${c.projectLocation}` : ''}
                        </span>
                      </div>
                      <span className={`contact-status-tag ${c.status || 'new'}`}>
                        {c.status === 'new'
                          ? '● Mới tiếp nhận'
                          : c.status === 'contacted'
                          ? '● Đang tư vấn'
                          : c.status === 'quoted'
                          ? '● Đã báo giá'
                          : c.status === 'completed'
                          ? '● Hoàn tất'
                          : '● Đã hủy'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <h3 className="card-title">Tài khoản quản trị mới nhất</h3>
                <div className="recent-items-list">
                  {usersList.slice(0, 5).map((u) => (
                    <div key={u.id} className="recent-item-row">
                      <div className="item-info">
                        <strong>{u.fullName || u.username}</strong>
                        <span>{u.email}</span>
                      </div>
                      <span className={`role-badge ${u.role}`}>{u.role.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('users')} className="view-all-link-btn">
                  Quản lý toàn bộ {usersList.length} tài khoản →
                </button>
              </div>

              <div className="admin-card">
                <h3 className="card-title">Bài viết xuất bản gần đây</h3>
                <div className="recent-items-list">
                  {articles.slice(0, 5).map((a) => (
                    <div key={a.id} className="recent-item-row">
                      <div className="item-info">
                        <strong>{a.title}</strong>
                        <span>
                          {a.category?.name || 'Chưa phân loại'} • {a.viewCount} lượt xem
                          {a.titleEn && <strong className="text-amber"> • [Song ngữ EN]</strong>}
                        </span>
                      </div>
                      <span className={`status-badge ${a.status}`}>
                        {a.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('articles')} className="view-all-link-btn">
                  Xem tất cả bài viết →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm bài viết (Tiếng Việt / English)..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                >
                  <option value="all">Tất cả chuyên mục</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  value={articleLangFilter}
                  onChange={(e) => setArticleLangFilter(e.target.value)}
                >
                  <option value="all">Tất cả ngôn ngữ</option>
                  <option value="bilingual">🌐 Song ngữ (VI + EN)</option>
                  <option value="en">🇬🇧 Có bản dịch Tiếng Anh</option>
                  <option value="vi">🇻🇳 Chỉ Tiếng Việt</option>
                </select>

                <button
                  onClick={() => {
                    setEditingArticleId(null);
                    setFormTitle('');
                    setFormTitleEn('');
                    setFormSummary('');
                    setFormSummaryEn('');
                    setFormContent('');
                    setFormContentEn('');
                    setEditorLangTab('vi');
                    setActiveTab('editor');
                  }}
                  className="btn-primary"
                >
                  <PlusCircle size={16} />
                  <span>Viết bài mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Bài viết</th>
                    <th>Chuyên mục</th>
                    <th>Ngôn ngữ</th>
                    <th>Lượt xem</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((art) => {
                    const hasBilingual = Boolean(art.titleEn && art.contentEn);
                    return (
                      <tr key={art.id}>
                        <td>
                          <div className="article-cell-info">
                            <img src={art.thumbnail} alt="" className="table-thumb" />
                            <div>
                              <strong className="table-article-title">{art.title}</strong>
                              {art.titleEn && (
                                <span className="table-article-slug" style={{ color: '#FE7B00' }}>
                                  EN: {art.titleEn}
                                </span>
                              )}
                              <span className="table-article-slug">slug: {art.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>{art.category?.name || '—'}</td>
                        <td>
                          {hasBilingual ? (
                            <span className="role-badge admin" style={{ fontSize: '11px' }}>
                              🌐 VI + EN
                            </span>
                          ) : art.titleEn ? (
                            <span className="role-badge editor" style={{ fontSize: '11px' }}>
                              🇬🇧 EN
                            </span>
                          ) : (
                            <span className="role-badge user" style={{ fontSize: '11px' }}>
                              🇻🇳 VI
                            </span>
                          )}
                        </td>
                        <td>{art.viewCount}</td>
                        <td>
                          <span className={`status-badge ${art.status}`}>
                            {art.status === 'published' ? 'Xuất bản' : 'Bản nháp'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => window.open(`/bai-viet/${art.slug}`, '_blank')}
                              className="btn-icon view"
                              title="Xem chi tiết bài viết trên trang web"
                            >
                              <ExternalLink size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingArticleId(art.id);
                                setFormTitle(art.title || '');
                                setFormTitleEn(art.titleEn || '');
                                setFormSummary(art.summary || '');
                                setFormSummaryEn(art.summaryEn || '');
                                setFormContent(art.content || '');
                                setFormContentEn(art.contentEn || '');
                                setFormThumbnail(art.thumbnail || '');
                                setFormCategoryId(art.categoryId || '');
                                setFormStatus((art.status as any) || 'published');
                                setFormIsFeatured(art.isFeatured);
                                setFormLang(art.lang || 'vi');
                                setEditorLangTab('vi');
                                setActiveTab('editor');
                              }}
                              className="btn-icon edit"
                              title="Chỉnh sửa bài viết với TinyMCE"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={async () => {
                                if (window.confirm(`Xóa bài viết "${art.title}"?`)) {
                                  await api.deleteArticle(art.id);
                                  showToast('success', 'Đã xóa bài viết');
                                  setArticles((prev) => prev.filter((a) => a.id !== art.id));
                                }
                              }}
                              className="btn-icon delete"
                              title="Xóa"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: ARTICLE EDITOR (WITH TINYMCE & MULTILINGUAL TABS) */}
        {activeTab === 'editor' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="card-title" style={{ margin: 0 }}>
                  {editingArticleId ? 'Chỉnh sửa bài viết (TinyMCE Rich-Text)' : 'Soạn thảo bài viết mới (TinyMCE Rich-Text)'}
                </h3>

                {/* Multilingual Switcher Tabs in Editor */}
                <div className="editor-lang-tabs" style={{ margin: 0, border: 'none' }}>
                  <button
                    type="button"
                    onClick={() => setEditorLangTab('vi')}
                    className={`editor-lang-tab-btn ${editorLangTab === 'vi' ? 'active' : ''}`}
                  >
                    <span>🇻🇳 Nội dung Tiếng Việt</span>
                    {formTitle && <Check size={14} className="text-emerald-500" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorLangTab('en')}
                    className={`editor-lang-tab-btn ${editorLangTab === 'en' ? 'active' : ''}`}
                  >
                    <span>🇬🇧 English Content</span>
                    {formTitleEn && <Check size={14} className="text-emerald-500" />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveArticle} className="editor-form">
                {/* Meta Settings Row: Category, Status, Featured */}
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Chuyên mục bài viết *</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Trạng thái xuất bản</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                    >
                      <option value="published">Xuất bản ngay (Published)</option>
                      <option value="draft">Lưu bản nháp (Draft)</option>
                    </select>
                  </div>
                </div>

                {/* Thumbnail Image Uploader Box */}
                <div className="form-group">
                  <label>Ảnh đại diện bài viết (Thumbnail Image)</label>
                  <div className="thumb-uploader-box">
                    <div className="thumb-preview-wrap">
                      {formThumbnail ? (
                        <img src={formThumbnail} alt="Thumbnail preview" className="thumb-preview-img" />
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94A3B8' }}>Chưa có ảnh</span>
                      )}
                    </div>

                    <div className="thumb-actions-content">
                      <div className="thumb-actions-row">
                        <button
                          type="button"
                          onClick={() => thumbFileInputRef.current?.click()}
                          disabled={isUploadingThumb}
                          className="btn-upload-thumb"
                        >
                          <Upload size={14} />
                          <span>{isUploadingThumb ? 'Đang tải lên...' : 'Tải ảnh từ máy tính'}</span>
                        </button>
                        <input
                          ref={thumbFileInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleThumbnailUpload}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            loadMediaFiles();
                            setIsMediaPickerOpen(true);
                          }}
                          className="btn-media-browse"
                        >
                          <ImageIcon size={14} />
                          <span>Chọn từ kho ảnh máy chủ</span>
                        </button>
                      </div>

                      <input
                        type="url"
                        placeholder="Hoặc dán trực tiếp đường dẫn URL ảnh (https://...)"
                        value={formThumbnail}
                        onChange={(e) => setFormThumbnail(e.target.value)}
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 1. VIETNAMESE TAB CONTENT */}
                {editorLangTab === 'vi' && (
                  <div className="lang-tab-content-panel">
                    <div className="form-group">
                      <label>Tiêu đề bài viết (Tiếng Việt) *</label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Trần Gia hoàn thành xuất sắc hạng mục trần thạch cao..."
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Tóm tắt ngắn (Excerpt - Tiếng Việt)</label>
                      <textarea
                        rows={2}
                        placeholder="Đoạn văn ngắn giới thiệu nội dung hiển thị trên thẻ tin..."
                        value={formSummary}
                        onChange={(e) => setFormSummary(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Nội dung bài viết chi tiết (Tiếng Việt - Soạn thảo TinyMCE) *</label>
                      <TinyEditor
                        value={formContent}
                        onChange={(newVal) => setFormContent(newVal)}
                        placeholder="Soạn thảo nội dung bài viết tiếng Việt tại đây..."
                        height={460}
                      />
                    </div>
                  </div>
                )}

                {/* 2. ENGLISH TAB CONTENT */}
                {editorLangTab === 'en' && (
                  <div className="lang-tab-content-panel">
                    <div className="form-group">
                      <label>Article Title (English)</label>
                      <input
                        type="text"
                        placeholder="Ex: Tran Gia successfully delivers Gypsum Ceiling package..."
                        value={formTitleEn}
                        onChange={(e) => setFormTitleEn(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Short Summary (English Excerpt)</label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary displayed on cards when English is selected..."
                        value={formSummaryEn}
                        onChange={(e) => setFormSummaryEn(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Full Content (English - TinyMCE Editor)</label>
                      <TinyEditor
                        value={formContentEn}
                        onChange={(newVal) => setFormContentEn(newVal)}
                        placeholder="Type English article content with rich formatting, photos, tables..."
                        height={460}
                      />
                    </div>
                  </div>
                )}

                <div className="editor-actions mt-4">
                  <button type="submit" disabled={isSavingArticle} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{isSavingArticle ? 'Đang lưu bài viết...' : 'Lưu & Xuất bản bài viết'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('articles')}
                    className="btn-secondary"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: MEDIA GALLERY & UPLOADS (KHO HÌNH ẢNH MÁY CHỦ) */}
        {activeTab === 'media' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 className="card-title" style={{ margin: 0 }}>
                    Kho hình ảnh & Quản lý tệp tin tải lên ({uploadedFiles.length})
                  </h3>
                  <p className="card-sub" style={{ margin: '4px 0 0' }}>
                    Tất cả hình ảnh được lưu trữ an toàn tại máy chủ NestJS và phục vụ tĩnh tại <code>/uploads</code>.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => mediaFileInputRef.current?.click()}
                    disabled={isLoadingMedia}
                    className="btn-primary"
                  >
                    <Upload size={16} />
                    <span>{isLoadingMedia ? 'Đang tải lên...' : 'Tải thêm ảnh từ máy tính'}</span>
                  </button>
                  <input
                    ref={mediaFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleMediaUpload}
                  />
                </div>
              </div>

              {/* Drag-and-drop / Click Upload Zone */}
              <div
                className="media-upload-dropzone"
                onClick={() => mediaFileInputRef.current?.click()}
              >
                <Upload size={32} color="#FE7B00" style={{ margin: '0 auto 8px' }} />
                <h4>Nhấn vào đây hoặc kéo thả ảnh vào khu vực này để tải lên</h4>
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                  Hỗ trợ định dạng JPG, PNG, WEBP, GIF, SVG (Tối đa 15MB/ảnh)
                </p>
              </div>

              {/* Media Grid */}
              {uploadedFiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                  <ImageIcon size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                  <p>Chưa có hình ảnh nào được tải lên máy chủ.</p>
                </div>
              ) : (
                <div className="media-grid-view">
                  {uploadedFiles.map((file) => (
                    <div key={file.filename} className="media-card-item">
                      <div className="media-card-thumb-wrap">
                        <img src={file.url} alt={file.originalname} loading="lazy" />
                      </div>
                      <div className="media-card-details">
                        <div className="media-card-filename" title={file.filename}>
                          {file.originalname || file.filename}
                        </div>
                        <div className="media-card-meta">
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                        <div className="media-card-actions">
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(file.url)}
                            className="btn-copy-url"
                            title="Sao chép URL ảnh để chèn vào bài viết"
                          >
                            {copiedUrl === file.url ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                            <span>{copiedUrl === file.url ? 'Đã chép' : 'Sao chép URL'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMedia(file.filename)}
                            className="btn-delete-media"
                            title="Xóa tệp tin"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <h3 className="card-title">Danh sách chuyên mục tin tức Trần Gia</h3>
              <div className="categories-manage-grid">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newCatName) return;
                    setIsSavingCat(true);
                    try {
                      if (editingCatId) {
                        await api.updateCategory(editingCatId, {
                          name: newCatName,
                          description: newCatDesc,
                        });
                        showToast('success', 'Đã cập nhật chuyên mục');
                      } else {
                        await api.createCategory({
                          name: newCatName,
                          description: newCatDesc,
                        });
                        showToast('success', 'Đã thêm chuyên mục mới');
                      }
                      setNewCatName('');
                      setNewCatDesc('');
                      setEditingCatId(null);
                      const cats = await api.getCategories();
                      setCategories(cats);
                    } catch (err: any) {
                      showToast('error', err.message || 'Lỗi lưu chuyên mục');
                    } finally {
                      setIsSavingCat(false);
                    }
                  }}
                  className="cat-create-form"
                >
                  <h4>{editingCatId ? 'Sửa chuyên mục' : 'Thêm chuyên mục mới'}</h4>
                  <div className="form-group">
                    <label>Tên chuyên mục *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Tiến độ công trình..."
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả ngắn</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả danh mục..."
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                    />
                  </div>
                  <button type="submit" disabled={isSavingCat} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{editingCatId ? 'Cập nhật' : 'Thêm mới'}</span>
                  </button>
                  {editingCatId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(null);
                        setNewCatName('');
                        setNewCatDesc('');
                      }}
                      className="btn-secondary ml-2"
                    >
                      Hủy
                    </button>
                  )}
                </form>

                <div className="categories-list-view">
                  {categories.map((c) => (
                    <div key={c.id} className="cat-item-card">
                      <div className="cat-item-info">
                        <strong>{c.name}</strong>
                        <span className="cat-slug-text">{c.slug}</span>
                        {c.description && <p>{c.description}</p>}
                      </div>
                      <div className="cat-item-actions">
                        <button
                          onClick={() => {
                            setEditingCatId(c.id);
                            setNewCatName(c.name);
                            setNewCatDesc(c.description || '');
                          }}
                          className="btn-icon edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Xóa chuyên mục "${c.name}"?`)) {
                              await api.deleteCategory(c.id);
                              showToast('success', 'Đã xóa chuyên mục');
                              setCategories((prev) => prev.filter((cat) => cat.id !== c.id));
                            }
                          }}
                          className="btn-icon delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Jobs: RECRUITMENT MANAGEMENT */}
        {activeTab === 'jobs' && <AdminJobsTab />}

        {/* Tab: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm dự án theo tên, chủ đầu tư, địa điểm..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <div className="status-filter-pills">
                  {[
                    { key: 'all', label: 'Tất cả dự án', count: projectsList.length },
                    { key: 'hotel', label: 'Khách sạn 5 sao', count: projectsList.filter((p) => p.category === 'hotel').length },
                    { key: 'commercial', label: 'Showroom & TTTM', count: projectsList.filter((p) => p.category === 'commercial').length },
                    { key: 'residential', label: 'Đô thị cao tầng', count: projectsList.filter((p) => p.category === 'residential').length },
                    { key: 'industrial', label: 'Nhà xưởng công nghiệp', count: projectsList.filter((p) => p.category === 'industrial').length },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      onClick={() => setProjectCategoryFilter(pill.key)}
                      className={`pill-btn ${projectCategoryFilter === pill.key ? 'active' : ''}`}
                    >
                      <span>{pill.label}</span>
                      <span className="pill-badge">{pill.count}</span>
                    </button>
                  ))}
                </div>

                <button onClick={loadProjects} disabled={isLoadingProjects} className="btn-secondary">
                  <RefreshCw size={15} className={isLoadingProjects ? 'animate-spin' : ''} />
                  <span>Làm mới</span>
                </button>

                <button onClick={() => handleOpenProjectModal()} className="btn-primary">
                  <PlusCircle size={16} />
                  <span>Thêm dự án mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Hình ảnh</th>
                    <th>Tên dự án & Chủ đầu tư</th>
                    <th>Địa điểm & Năm</th>
                    <th>Phân loại & Vùng</th>
                    <th>Hạng mục thi công</th>
                    <th style={{ textAlign: 'center', width: '90px' }}>Nổi bật</th>
                    <th style={{ textAlign: 'right', width: '100px' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsList.filter((p) => {
                    const matchCat = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
                    const matchSearch =
                      !projectSearch.trim() ||
                      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                      p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
                      (p.client && p.client.toLowerCase().includes(projectSearch.toLowerCase()));
                    return matchCat && matchSearch;
                  }).length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                        <Building2 size={36} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                        <p>Không tìm thấy dự án nào phù hợp</p>
                      </td>
                    </tr>
                  ) : (
                    projectsList
                      .filter((p) => {
                        const matchCat = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
                        const matchSearch =
                          !projectSearch.trim() ||
                          p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          (p.client && p.client.toLowerCase().includes(projectSearch.toLowerCase()));
                        return matchCat && matchSearch;
                      })
                      .map((p) => (
                        <tr key={p.id}>
                          <td>
                            <img
                              src={p.image}
                              alt={p.title}
                              style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                          </td>
                          <td>
                            <strong style={{ display: 'block', color: 'var(--tg-primary)' }}>{p.title}</strong>
                            {p.client && <span style={{ fontSize: '12px', color: '#64748B' }}>{p.client}</span>}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                              <MapPin size={13} color="#00A3E0" />
                              <span>{p.location}</span>
                            </div>
                            {p.year && <span style={{ fontSize: '11px', color: '#94A3B8' }}>Năm: {p.year}</span>}
                          </td>
                          <td>
                            <span className="badge-tag" style={{ background: '#EFF6FF', color: '#1D5A99', padding: '2px 8px', borderRadius: '4px', fontSize: '11.5px', fontWeight: 600 }}>
                              {p.categoryLabel || p.category}
                            </span>
                          </td>
                          <td>
                            <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.scope}
                            </p>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {p.isFeatured ? (
                              <span style={{ background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                                ⭐ Nổi bật
                              </span>
                            ) : (
                              <span style={{ color: '#94A3B8', fontSize: '12px' }}>Thường</span>
                            )}
                          </td>
                          <td>
                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleOpenProjectModal(p)}
                                className="btn-icon edit"
                                title="Chỉnh sửa dự án"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(p.id, p.title)}
                                className="btn-icon delete"
                                title="Xóa dự án"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: PARTNERS & CLIENTS MANAGEMENT */}
        {activeTab === 'partners' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm đối tác theo tên, vai trò, dự án..."
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <div className="status-filter-pills">
                  {[
                    { key: 'all', label: 'Tất cả đối tác', count: partnersList.length },
                    { key: 'developer', label: 'Chủ đầu tư & Tập đoàn', count: partnersList.filter((p) => p.category === 'developer').length },
                    { key: 'contractor', label: 'Tổng thầu xây dựng', count: partnersList.filter((p) => p.category === 'contractor').length },
                    { key: 'manufacturer', label: 'Nhà sản xuất vật tư', count: partnersList.filter((p) => p.category === 'manufacturer').length },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      onClick={() => setPartnerCategoryFilter(pill.key)}
                      className={`pill-btn ${partnerCategoryFilter === pill.key ? 'active' : ''}`}
                    >
                      <span>{pill.label}</span>
                      <span className="pill-badge">{pill.count}</span>
                    </button>
                  ))}
                </div>

                <button onClick={loadPartners} disabled={isLoadingPartners} className="btn-secondary">
                  <RefreshCw size={15} className={isLoadingPartners ? 'animate-spin' : ''} />
                  <span>Làm mới</span>
                </button>

                <button onClick={() => handleOpenPartnerModal()} className="btn-primary">
                  <PlusCircle size={16} />
                  <span>Thêm đối tác mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Thumbnail</th>
                    <th>Tên đối tác & Vai trò</th>
                    <th>Phân nhóm</th>
                    <th>Huy hiệu & Màu sắc</th>
                    <th>Dự án tiêu biểu</th>
                    <th style={{ textAlign: 'center', width: '80px' }}>Thứ tự</th>
                    <th style={{ textAlign: 'center', width: '100px' }}>Trạng thái</th>
                    <th style={{ textAlign: 'right', width: '100px' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                        <HeartHandshake size={36} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                        <p>Không tìm thấy đối tác nào phù hợp</p>
                      </td>
                    </tr>
                  ) : (
                    filteredPartners.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div
                            style={{
                              width: '64px',
                              height: '44px',
                              borderRadius: '6px',
                              background: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                            }}
                          >
                            {p.thumbnail ? (
                              <img
                                src={p.thumbnail}
                                alt={p.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <HeartHandshake size={20} color="#94A3B8" />
                            )}
                          </div>
                        </td>
                        <td>
                          <div>
                            <strong style={{ fontSize: '14px', color: '#0F172A', display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '12px', color: '#64748B' }}>{p.role}</span>
                            {p.website && (
                              <a
                                href={p.website}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#2563EB', marginLeft: '6px' }}
                              >
                                <ExternalLink size={11} /> Web
                              </a>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className="service-tag"
                            style={{
                              background:
                                p.category === 'developer' ? '#EFF6FF' : p.category === 'contractor' ? '#FEF3C7' : '#F0FDF4',
                              color:
                                p.category === 'developer' ? '#1D4ED8' : p.category === 'contractor' ? '#B45309' : '#15803D',
                              border:
                                p.category === 'developer'
                                  ? '1px solid #BFDBFE'
                                  : p.category === 'contractor'
                                  ? '1px solid #FDE68A'
                                  : '1px solid #BBF7D0',
                            }}
                          >
                            {p.category === 'developer'
                              ? 'Chủ đầu tư & BĐS'
                              : p.category === 'contractor'
                              ? 'Tổng thầu thi công'
                              : 'Nhà sản xuất vật tư'}
                          </span>
                        </td>
                        <td>
                          {p.badge ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: 600,
                                background: p.brandColor ? `${p.brandColor}15` : '#FFF7ED',
                                color: p.brandColor || '#EA580C',
                                border: `1px solid ${p.brandColor || '#FDBA74'}`,
                              }}
                            >
                              <span
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: p.brandColor || '#FE7B00',
                                }}
                              />
                              {p.badge}
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#94A3B8' }}>—</span>
                          )}
                        </td>
                        <td>
                          {Array.isArray(p.projects) && p.projects.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '240px' }}>
                              {p.projects.slice(0, 2).map((proj, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    fontSize: '11px',
                                    background: '#F1F5F9',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    color: '#475569',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {proj}
                                </span>
                              ))}
                              {p.projects.length > 2 && (
                                <span style={{ fontSize: '10px', color: '#64748B', alignSelf: 'center' }}>
                                  +{p.projects.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Chưa có dự án</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: 600, color: '#64748B' }}>
                          {p.sortOrder ?? 0}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-badge ${p.isActive !== false ? 'active' : 'inactive'}`}>
                            {p.isActive !== false ? 'Hiển thị' : 'Tạm ẩn'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleOpenPartnerModal(p)}
                              className="btn-icon edit"
                              title="Chỉnh sửa đối tác"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeletePartner(p.id, p.name)}
                              className="btn-icon delete"
                              title="Xóa đối tác"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: CONTACTS & QUOTATIONS MANAGEMENT */}
        {activeTab === 'contacts' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm theo tên khách hàng, SĐT, công trình..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <div className="status-filter-pills">
                  {[
                    { key: 'all', label: 'Tất cả', count: contactsList.length },
                    { key: 'new', label: 'Mới tiếp nhận', count: contactsList.filter((c) => c.status === 'new').length },
                    { key: 'contacted', label: 'Đang tư vấn', count: contactsList.filter((c) => c.status === 'contacted').length },
                    { key: 'quoted', label: 'Đã báo giá', count: contactsList.filter((c) => c.status === 'quoted').length },
                    { key: 'completed', label: 'Hoàn tất', count: contactsList.filter((c) => c.status === 'completed').length },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      onClick={() => setContactStatusFilter(pill.key)}
                      className={`pill-btn ${contactStatusFilter === pill.key ? 'active' : ''}`}
                    >
                      <span>{pill.label}</span>
                      <span className="pill-badge">{pill.count}</span>
                    </button>
                  ))}
                </div>

                <button onClick={loadContacts} disabled={isLoadingContacts} className="btn-secondary">
                  <RefreshCw size={15} className={isLoadingContacts ? 'animate-spin' : ''} />
                  <span>Làm mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '130px' }}>Thời gian</th>
                    <th>Khách hàng & Liên hệ</th>
                    <th>Hạng mục quan tâm</th>
                    <th>Công trình / Dự án</th>
                    <th style={{ width: '140px' }}>Trạng thái</th>
                    <th style={{ width: '120px', textAlign: 'center' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                        Không có yêu cầu liên hệ hoặc báo giá nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontSize: '12px', color: '#64748B' }}>
                          <div>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('vi-VN') : '—'}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                            {c.createdAt ? new Date(c.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '13.5px' }}>{c.fullName}</div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '3px' }}>
                            <a href={`tel:${c.phone}`} style={{ color: '#0284C7', fontSize: '12.5px', fontWeight: '600' }} title="Bấm để gọi điện">
                              📞 {c.phone}
                            </a>
                            {c.email && (
                              <a href={`mailto:${c.email}`} style={{ color: '#64748B', fontSize: '12px' }} title="Gửi email">
                                ✉️ {c.email}
                              </a>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="service-tag">
                            {c.service === 'ceiling'
                              ? 'Trần thạch cao & kim loại'
                              : c.service === 'partition'
                              ? 'Vách ngăn chống cháy'
                              : c.service === 'painting'
                              ? 'Sơn bả & Phào GFRC'
                              : c.service === 'fitout'
                              ? 'Fit-out & Cơ điện M&E'
                              : 'Tổng thầu hoàn thiện'}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '12.5px', color: '#334155' }}>
                            {c.projectLocation || 'Chưa ghi rõ địa điểm'}
                          </span>
                        </td>
                        <td>
                          <span className={`contact-status-tag ${c.status || 'new'}`}>
                            {c.status === 'new'
                              ? '● Mới tiếp nhận'
                              : c.status === 'contacted'
                              ? '● Đang tư vấn'
                              : c.status === 'quoted'
                              ? '● Đã báo giá'
                              : c.status === 'completed'
                              ? '● Đã chốt HĐ'
                              : '● Đã hủy'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions" style={{ justifyContent: 'center' }}>
                            <button
                              onClick={() => handleOpenContactModal(c)}
                              className="btn-icon edit"
                              title="Xem chi tiết & Xử lý báo giá"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(c.id!, c.fullName)}
                              className="btn-icon delete"
                              title="Xóa yêu cầu liên hệ"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: USERS & ACCOUNTS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm tài khoản theo tên, email, username..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <button onClick={handleOpenCreateUser} className="btn-primary">
                  <UserPlus size={16} />
                  <span>Thêm tài khoản mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Họ và tên & Username</th>
                    <th>Email</th>
                    <th>Vai trò (Role)</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const isSelf = u.id === currentUser?.id;
                    const isDefaultAdmin = u.username === 'admin';
                    return (
                      <tr key={u.id}>
                        <td>
                          <div className="user-table-cell">
                            <div className="user-avatar-sm">
                              {(u.fullName || u.username).charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <strong>{u.fullName || u.username}</strong>
                              <span className="username-sub">@{u.username}</span>
                            </div>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>{u.role.toUpperCase()}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${(u as any).status || 'active'}`}>
                            {(u as any).status === 'inactive' ? 'Đã khóa' : 'Hoạt động'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => handleOpenEditUser(u)}
                              className="btn-icon edit"
                              title="Chỉnh sửa tài khoản"
                            >
                              <Edit size={16} />
                            </button>
                            {!isDefaultAdmin && !isSelf && (
                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="btn-icon delete"
                                title="Xóa tài khoản"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: SECURITY / CHANGE PASSWORD */}
        {activeTab === 'security' && (
          <div className="admin-tab-pane">
            <div className="admin-card" style={{ maxWidth: '600px' }}>
              <div className="card-header-with-icon">
                <KeyRound size={24} className="text-amber" />
                <div>
                  <h3 className="card-title">Đổi mật khẩu tài khoản cá nhân</h3>
                  <p className="card-sub">
                    Tài khoản: <strong>{currentUser.username}</strong> ({currentUser.email})
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePersonalPassword} className="editor-form mt-4">
                <div className="form-group">
                  <label>Mật khẩu hiện tại *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu hiện tại..."
                    value={currentOldPass}
                    onChange={(e) => setCurrentOldPass(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Mật khẩu mới (Tối thiểu 6 ký tự) *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu mới..."
                    value={currentNewPass}
                    onChange={(e) => setCurrentNewPass(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu mới *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập lại mật khẩu mới..."
                    value={currentConfirmPass}
                    onChange={(e) => setCurrentConfirmPass(e.target.value)}
                  />
                </div>

                <div className="security-notice-box">
                  <ShieldAlert size={18} className="text-amber flex-shrink-0" />
                  <span>
                    Sau khi đổi mật khẩu, bạn sẽ sử dụng mật khẩu mới này cho các lần đăng nhập tiếp theo.
                  </span>
                </div>

                <button type="submit" disabled={isChangingPass} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isChangingPass ? 'Đang cập nhật...' : 'Cập nhật mật khẩu mới'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 8: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <h3 className="card-title">Cấu hình thông tin Công ty Trần Gia</h3>
              <form onSubmit={handleSaveSettings} className="editor-form">
                <h4 className="form-section-title">1. Thông tin doanh nghiệp</h4>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Tên đầy đủ công ty</label>
                    <input
                      type="text"
                      value={settingsCompany.name}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên viết tắt / Thương hiệu</label>
                    <input
                      type="text"
                      value={settingsCompany.shortName}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, shortName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Giám đốc đại diện</label>
                    <input
                      type="text"
                      value={settingsCompany.director}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, director: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phương châm / Slogan</label>
                    <input
                      type="text"
                      value={settingsCompany.slogan}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, slogan: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Hotline / Điện thoại</label>
                    <input
                      type="text"
                      value={settingsCompany.hotline}
                      onChange={(e) =>
                        setSettingsCompany({
                          ...settingsCompany,
                          hotline: e.target.value,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Hộp thư điện tử (Email)</label>
                    <input
                      type="email"
                      value={settingsCompany.email}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ trụ sở chính</label>
                  <input
                    type="text"
                    value={settingsCompany.address}
                    onChange={(e) => setSettingsCompany({ ...settingsCompany, address: e.target.value })}
                  />
                </div>




                <div className="editor-actions mt-4">
                  <button type="submit" disabled={isSavingSettings} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{isSavingSettings ? 'Đang lưu...' : 'Lưu cấu hình hệ thống'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: CHỌN ẢNH TỪ KHO MÁY CHỦ (MEDIA PICKER) */}
      {isMediaPickerOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsMediaPickerOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
            <div className="modal-header">
              <h3>Chọn hình ảnh từ kho máy chủ</h3>
              <button onClick={() => setIsMediaPickerOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {uploadedFiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                  Chưa có ảnh nào trên máy chủ. Hãy tải ảnh lên từ máy tính trước.
                </div>
              ) : (
                <div className="media-grid-view">
                  {uploadedFiles.map((f) => (
                    <div
                      key={f.filename}
                      className="media-card-item"
                      style={{ cursor: 'pointer', border: formThumbnail === f.url ? '2px solid #FE7B00' : undefined }}
                      onClick={() => {
                        setFormThumbnail(f.url);
                        setIsMediaPickerOpen(false);
                        showToast('success', 'Đã chọn ảnh đại diện!');
                      }}
                    >
                      <div className="media-card-thumb-wrap">
                        <img src={f.url} alt="" />
                      </div>
                      <div className="media-card-details">
                        <div className="media-card-filename">{f.originalname || f.filename}</div>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ width: '100%', fontSize: '12px', padding: '4px' }}
                        >
                          Chọn ảnh này
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: THÊM / SỬA TÀI KHOẢN NGƯỜI DÙNG */}
      {isUserModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsUserModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUserId ? 'Chỉnh sửa tài khoản người dùng' : 'Thêm tài khoản quản trị mới'}</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="modal-body">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Trần Xuân Anh"
                  value={userFormFullName}
                  onChange={(e) => setUserFormFullName(e.target.value)}
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Tên đăng nhập (Username) *</label>
                  <input
                    type="text"
                    required
                    placeholder="vd: trangia_admin"
                    value={userFormUsername}
                    onChange={(e) => setUserFormUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vd: staff@trangia.vn"
                    value={userFormEmail}
                    onChange={(e) => setUserFormEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Vai trò (Phân quyền)</label>
                  <select
                    value={userFormRole}
                    onChange={(e) => setUserFormRole(e.target.value as any)}
                  >
                    <option value="admin">Quản trị viên toàn quyền (Admin)</option>
                    <option value="editor">Biên tập viên nội dung (Editor)</option>
                    <option value="user">Người dùng thông thường (User)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={userFormStatus}
                    onChange={(e) => setUserFormStatus(e.target.value as any)}
                  >
                    <option value="active">Hoạt động (Active)</option>
                    <option value="inactive">Khóa tài khoản (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {editingUserId
                    ? 'Mật khẩu mới (Để trống nếu không đổi)'
                    : 'Mật khẩu khởi tạo * (Từ 6 ký tự)'}
                </label>
                <input
                  type="password"
                  placeholder={editingUserId ? '•••••••• (để trống nếu giữ nguyên)' : 'Nhập mật khẩu...'}
                  value={userFormPassword}
                  onChange={(e) => setUserFormPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" disabled={isSavingUser} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isSavingUser ? 'Đang lưu...' : editingUserId ? 'Cập nhật' : 'Tạo tài khoản'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="btn-secondary"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: XỬ LÝ & CHI TIẾT YÊU CẦU LIÊN HỆ BÁO GIÁ */}
      {isContactModalOpen && selectedContact && (
        <div className="admin-modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <div className="admin-modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết Yêu cầu Báo giá & Tư vấn</h3>
              <button onClick={() => setIsContactModalOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveContactModal} className="modal-body">
              <div className="contact-detail-grid">
                <div className="detail-field">
                  <span className="field-lbl">Khách hàng:</span>
                  <strong className="field-val">{selectedContact.fullName}</strong>
                </div>
                <div className="detail-field">
                  <span className="field-lbl">Số điện thoại:</span>
                  <a href={`tel:${selectedContact.phone}`} className="phone-badge-link" title="Bấm để gọi điện trực tiếp">
                    <Phone size={14} />
                    <strong>{selectedContact.phone} (Bấm gọi)</strong>
                  </a>
                </div>
                <div className="detail-field">
                  <span className="field-lbl">Email:</span>
                  <strong className="field-val">
                    {selectedContact.email ? (
                      <a href={`mailto:${selectedContact.email}`} style={{ color: '#0284C7' }}>
                        {selectedContact.email}
                      </a>
                    ) : (
                      'Chưa cung cấp'
                    )}
                  </strong>
                </div>
                <div className="detail-field">
                  <span className="field-lbl">Hạng mục quan tâm:</span>
                  <strong className="field-val text-amber">
                    {selectedContact.service === 'ceiling'
                      ? 'Thi công Trần thạch cao & Kim loại'
                      : selectedContact.service === 'partition'
                      ? 'Thi công Vách ngăn chống cháy'
                      : selectedContact.service === 'painting'
                      ? 'Sơn bả hoàn thiện & Phào GFRC'
                      : selectedContact.service === 'fitout'
                      ? 'Fit-out nội thất & Cơ điện M&E'
                      : 'Tổng thầu hoàn thiện xây dựng'}
                  </strong>
                </div>
                <div className="detail-field full-width">
                  <span className="field-lbl">Địa điểm công trình / Dự án:</span>
                  <strong className="field-val">{selectedContact.projectLocation || 'Chưa cung cấp địa điểm'}</strong>
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Nội dung chi tiết từ khách hàng:</label>
                <div className="customer-msg-box">
                  {selectedContact.message || 'Khách hàng không để lại ghi chú thêm.'}
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Tiến độ & Trạng thái xử lý:</label>
                <select
                  value={contactModalStatus}
                  onChange={(e) => setContactModalStatus(e.target.value as any)}
                >
                  <option value="new">🔵 Mới tiếp nhận (Chưa liên hệ)</option>
                  <option value="contacted">🟡 Đang liên hệ tư vấn</option>
                  <option value="quoted">🟣 Đã gửi bảng báo giá</option>
                  <option value="completed">🟢 Ký kết hợp đồng / Hoàn tất</option>
                  <option value="cancelled">⚪ Hủy yêu cầu</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ghi chú nội bộ cho kỹ sư & kế toán:</label>
                <textarea
                  rows={3}
                  placeholder="Ghi lại tiến độ trao đổi, hẹn lịch khảo sát, giá trị báo giá dự kiến..."
                  value={contactModalNotes}
                  onChange={(e) => setContactModalNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="submit" disabled={isUpdatingContact} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isUpdatingContact ? 'Đang lưu...' : 'Lưu cập nhật'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="btn-secondary"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: THÊM / CHỈNH SỬA ĐỐI TÁC & KHÁCH HÀNG (CÓ THUMBNAIL) */}
      {isPartnerModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsPartnerModalOpen(false)}>
          <div className="admin-modal-dialog" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedPartner ? 'Chỉnh sửa Đối tác & Khách hàng' : 'Thêm Đối tác Chiến lược Mới'}</h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="modal-body">
              <div className="modal-form-grid">
                <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
                  <label>Tên đối tác / Doanh nghiệp *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Tập Đoàn Vingroup, Coteccons..."
                    value={partnerFormName}
                    onChange={(e) => setPartnerFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phân nhóm chính *</label>
                  <select
                    value={partnerFormCategory}
                    onChange={(e) => setPartnerFormCategory(e.target.value as any)}
                  >
                    <option value="developer">Chủ đầu tư & Tập đoàn BĐS</option>
                    <option value="contractor">Tổng thầu xây dựng</option>
                    <option value="manufacturer">Nhà sản xuất & Cung ứng vật tư</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vai trò / Phân loại chi tiết *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Tập đoàn Bất động sản số 1 Việt Nam"
                    value={partnerFormRole}
                    onChange={(e) => setPartnerFormRole(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Huy hiệu nổi bật (Badge)</label>
                  <input
                    type="text"
                    placeholder="VD: Top 1 BĐS, Tổng thầu #1, Đối tác chiến lược"
                    value={partnerFormBadge}
                    onChange={(e) => setPartnerFormBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Màu sắc thương hiệu (Brand Color)</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={partnerFormBrandColor}
                      onChange={(e) => setPartnerFormBrandColor(e.target.value)}
                      style={{ width: '42px', height: '38px', padding: '2px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    />
                    <input
                      type="text"
                      placeholder="#FE7B00"
                      value={partnerFormBrandColor}
                      onChange={(e) => setPartnerFormBrandColor(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                {/* Thumbnail input & upload */}
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Thumbnail / Logo đối tác</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="https://... hoặc bấm tải ảnh từ máy tính"
                      value={partnerFormThumbnail}
                      onChange={(e) => setPartnerFormThumbnail(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => partnerThumbInputRef.current?.click()}
                      disabled={isUploadingPartnerThumb}
                      className="btn-secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Upload size={15} />
                      <span>{isUploadingPartnerThumb ? 'Đang tải...' : 'Tải ảnh lên'}</span>
                    </button>
                    <input
                      ref={partnerThumbInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handlePartnerThumbnailUpload}
                    />
                  </div>

                  {partnerFormThumbnail && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        background: '#F8FAFC',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      <img
                        src={partnerFormThumbnail}
                        alt="Preview"
                        style={{ height: '48px', maxWidth: '120px', objectFit: 'contain', background: '#FFF', padding: '4px', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 600, display: 'block' }}>
                          ✓ Đã nạp thumbnail / logo đối tác
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B', wordBreak: 'break-all' }}>
                          {partnerFormThumbnail}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPartnerFormThumbnail('')}
                        className="btn-icon delete"
                        title="Xóa ảnh"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Dự án tiêu biểu đã hợp tác (cách nhau bằng dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="VD: Vinhomes Ocean Park 1, 2, 3, Vinhomes Grand Park, Vincom Mega Mall..."
                    value={partnerFormProjects}
                    onChange={(e) => setPartnerFormProjects(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Website đối tác (tùy chọn)</label>
                  <input
                    type="url"
                    placeholder="https://vingroup.net"
                    value={partnerFormWebsite}
                    onChange={(e) => setPartnerFormWebsite(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Thứ tự hiển thị (Sort Order)</label>
                  <input
                    type="number"
                    value={partnerFormSortOrder}
                    onChange={(e) => setPartnerFormSortOrder(Number(e.target.value))}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Mô tả đối tác & Hợp tác (tùy chọn)</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả quan hệ đối tác, quy mô công trình..."
                    value={partnerFormDescription}
                    onChange={(e) => setPartnerFormDescription(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={partnerFormIsActive}
                      onChange={(e) => setPartnerFormIsActive(e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '13.5px' }}>Hiển thị công khai trên website</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '16px' }}>
                <button type="submit" disabled={isSavingPartner} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isSavingPartner ? 'Đang lưu đối tác...' : 'Lưu đối tác'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="btn-secondary"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL 5: THÊM / CHỈNH SỬA DỰ ÁN THI CÔNG */}
      {isProjectModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="admin-modal-dialog" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProject ? 'Chỉnh sửa Dự án Thi công' : 'Thêm Dự án Thi công Mới'}</h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="modal-body">
              <div className="modal-form-grid">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Tên dự án công trình *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Vinhomes Ocean Park 2 - The Empire"
                    value={projectFormTitle}
                    onChange={(e) => setProjectFormTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Chủ đầu tư / Khách hàng *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Tập đoàn Vingroup"
                    value={projectFormClient}
                    onChange={(e) => setProjectFormClient(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Địa điểm thi công *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Hưng Yên / Hà Nội..."
                    value={projectFormLocation}
                    onChange={(e) => setProjectFormLocation(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Hạng mục / Quy mô thi công *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 55.000 m² trần vách thạch cao & hoàn thiện"
                    value={projectFormScope}
                    onChange={(e) => setProjectFormScope(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phân loại công trình *</label>
                  <select
                    value={projectFormCategory}
                    onChange={(e) => setProjectFormCategory(e.target.value as any)}
                  >
                    <option value="residential">Khu đô thị & Căn hộ cao cấp</option>
                    <option value="commercial">Trung tâm Thương mại & Văn phòng</option>
                    <option value="hotel">Khách sạn & Nghỉ dưỡng Resort</option>
                    <option value="industrial">Công nghiệp & Hạ tầng</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Khu vực địa lý *</label>
                  <select
                    value={projectFormRegion}
                    onChange={(e) => setProjectFormRegion(e.target.value as any)}
                  >
                    <option value="north">Miền Bắc</option>
                    <option value="central">Miền Trung</option>
                    <option value="south">Miền Nam</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Năm thực hiện</label>
                  <input
                    type="text"
                    placeholder="VD: 2022 - 2023"
                    value={projectFormYear}
                    onChange={(e) => setProjectFormYear(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Thứ tự sắp xếp</label>
                  <input
                    type="number"
                    value={projectFormSortOrder}
                    onChange={(e) => setProjectFormSortOrder(parseInt(e.target.value) || 0)}
                  />
                </div>

                {/* THUMBNAIL ẢNH DỰ ÁN */}
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Hình ảnh dự án / Thumbnail</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="https://... hoặc tải ảnh lên bên cạnh"
                      value={projectFormImage}
                      onChange={(e) => setProjectFormImage(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={projectImgInputRef}
                      onChange={handleProjectImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      disabled={isUploadingProjectImg}
                      onClick={() => projectImgInputRef.current?.click()}
                      className="btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                    >
                      <Upload size={15} />
                      <span>{isUploadingProjectImg ? 'Đang tải...' : 'Tải ảnh lên'}</span>
                    </button>
                  </div>

                  {projectFormImage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', background: '#F8FAFC', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                      <img
                        src={projectFormImage}
                        alt="Preview"
                        style={{ width: '80px', height: '56px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <span style={{ fontSize: '12px', color: '#64748B', wordBreak: 'break-all' }}>{projectFormImage}</span>
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Mô tả chi tiết dự án</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả các hạng mục trần thạch cao, tiêu chuẩn kỹ thuật áp dụng..."
                    value={projectFormDescription}
                    onChange={(e) => setProjectFormDescription(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', gap: '24px' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={projectFormIsFeatured}
                      onChange={(e) => setProjectFormIsFeatured(e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '13.5px' }}>Dự án tiêu biểu (Nổi bật)</span>
                  </label>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={projectFormIsActive}
                      onChange={(e) => setProjectFormIsActive(e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontWeight: 600, fontSize: '13.5px' }}>Hiển thị công khai</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '16px' }}>
                <button type="submit" disabled={isSavingProject} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isSavingProject ? 'Đang lưu dự án...' : 'Lưu dự án'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="btn-secondary"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
