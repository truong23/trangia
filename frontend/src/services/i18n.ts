export type Language = 'vi' | 'en';

export interface Translations {
  nav: {
    home: string;
    about: string;
    aboutLetter: string;
    aboutOverview: string;
    aboutVision: string;
    aboutPrinciples: string;
    services: string;
    servicesCeiling: string;
    servicesPartition: string;
    servicesPainting: string;
    servicesFitout: string;
    capacity: string;
    capacityOrg: string;
    capacityPersonnel: string;
    capacityEquipment: string;
    projects: string;
    partners: string;
    news: string;
    contact: string;
  };
  header: {
    hotline: string;
    profilePdf: string;
    adminCms: string;
    searchPlaceholder: string;
    downloadProfile: string;
  };
  news: {
    badge: string;
    title: string;
    desc: string;
    allArticles: string;
    searchResult: string;
    clearFilter: string;
    loading: string;
    noArticles: string;
    noArticlesDesc: string;
    viewAll: string;
    readMore: string;
    views: string;
    category: string;
    publishedAt: string;
    author: string;
    share: string;
    copied: string;
    bilingualBadge: string;
    enBadge: string;
    viBadge: string;
  };
  sidebar: {
    recentNews: string;
    categories: string;
    search: string;
    companyInfo: string;
    contactDirect: string;
  };
  contact: {
    badge: string;
    title: string;
    desc: string;
    sendRequest: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
  };
  footer: {
    companyIntro: string;
    fieldsTitle: string;
    newsletterTitle: string;
    newsletterDesc: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  vi: {
    nav: {
      home: 'TRANG CHỦ',
      about: 'GIỚI THIỆU',
      aboutLetter: 'Thư ngỏ Giám đốc',
      aboutOverview: 'Tổng quan doanh nghiệp',
      aboutVision: 'Tầm nhìn & Giá trị cốt lõi',
      aboutPrinciples: 'Nguyên tắc hoạt động',
      services: 'LĨNH VỰC',
      servicesCeiling: 'Thi công Trần thạch cao & Kim loại',
      servicesPartition: 'Thi công Vách ngăn chống cháy',
      servicesPainting: 'Sơn bả hoàn thiện & Phào GFRC',
      servicesFitout: 'Nội thất Fit-out & Cơ điện M&E',
      capacity: 'NĂNG LỰC',
      capacityOrg: 'Sơ đồ tổ chức',
      capacityPersonnel: 'Năng lực nhân sự (50+ CNV)',
      capacityEquipment: 'Năng lực máy móc thiết bị (300+)',
      projects: 'DỰ ÁN',
      partners: 'ĐỐI TÁC',
      news: 'TIN TỨC',
      contact: 'LIÊN HỆ',
    },
    header: {
      hotline: 'Hotline',
      profilePdf: 'Hồ Sơ Năng Lực',
      adminCms: 'Admin CMS',
      searchPlaceholder: 'Tìm kiếm bài viết, dự án...',
      downloadProfile: 'Tải HSNL (PDF)',
    },
    news: {
      badge: 'TRUYỀN THÔNG & TIẾN ĐỘ',
      title: 'TIN TỨC & HOẠT ĐỘNG TRẦN GIA',
      desc: 'Cập nhật tin tức mới nhất về tiến độ các công trình, công nghệ thi công hiện đại và văn hóa doanh nghiệp Trần Gia.',
      allArticles: 'Tất cả tin tức & bài viết',
      searchResult: 'Kết quả tìm kiếm',
      clearFilter: '✕ Xem tất cả tin',
      loading: 'Đang tải danh sách bài viết từ hệ thống...',
      noArticles: 'Không tìm thấy bài viết',
      noArticlesDesc: 'Không có bài viết nào khớp với chuyên mục hoặc từ khóa tìm kiếm.',
      viewAll: 'Xem tất cả bài viết',
      readMore: 'Xem chi tiết',
      views: 'lượt xem',
      category: 'Chuyên mục',
      publishedAt: 'Ngày đăng',
      author: 'Tác giả',
      share: 'Chia sẻ',
      copied: 'Đã sao chép liên kết bài viết!',
      bilingualBadge: 'Song ngữ VI/EN',
      enBadge: 'English',
      viBadge: 'Tiếng Việt',
    },
    sidebar: {
      recentNews: 'Tin mới nhất',
      categories: 'Chuyên mục tin tức',
      search: 'Tìm kiếm tin bài',
      companyInfo: 'Thông tin liên hệ',
      contactDirect: 'Tư vấn thi công trực tiếp',
    },
    contact: {
      badge: 'LIÊN HỆ & TƯ VẤN',
      title: 'YÊU CẦU BÁO GIÁ & HỢP TÁC THI CÔNG',
      desc: 'Hãy để lại thông tin để nhận tư vấn kỹ thuật và giải pháp thi công tối ưu từ Trần Gia.',
      sendRequest: 'Gửi yêu cầu báo giá',
      name: 'Họ và tên của bạn (*)',
      phone: 'Số điện thoại liên hệ (*)',
      email: 'Địa chỉ Email (*)',
      service: 'Hạng mục quan tâm (*)',
      message: 'Nội dung chi tiết yêu cầu hoặc dự án (*)',
      submit: 'GỬI YÊU CẦU BÁO GIÁ NGAY',
      submitting: 'Đang gửi thông tin...',
      success: 'Gửi thông tin thành công! Chúng tôi sẽ liên hệ trong 24h.',
    },
    footer: {
      companyIntro: 'VỀ TRẦN GIA CONSTRUCTION',
      fieldsTitle: 'LĨNH VỰC THI CÔNG',
      newsletterTitle: 'ĐĂNG KÝ BẢN TIN TIẾN ĐỘ',
      newsletterDesc: 'Nhận bản tin cập nhật tiến độ công trình và công nghệ vật liệu mới nhất từ Trần Gia.',
      copyright: 'Bản quyền thuộc về Công ty TNHH Thương Mại Dịch Vụ và Xây Dựng Trần Gia.',
    },
  },
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      aboutLetter: 'Director Open Letter',
      aboutOverview: 'Company Overview',
      aboutVision: 'Vision & Core Values',
      aboutPrinciples: 'Operational Principles',
      services: 'SERVICES',
      servicesCeiling: 'Gypsum & Metal Ceiling Systems',
      servicesPartition: 'Fire-Rated Partition Drywalls',
      servicesPainting: 'Architectural Coating & GFRC',
      servicesFitout: 'Fit-out & MEP Engineering',
      capacity: 'CAPACITY',
      capacityOrg: 'Organization Chart',
      capacityPersonnel: 'Personnel Force (50+ Staff)',
      capacityEquipment: 'Equipment & Machinery (300+)',
      projects: 'PROJECTS',
      partners: 'PARTNERS',
      news: 'NEWS & MEDIA',
      contact: 'CONTACT',
    },
    header: {
      hotline: 'Hotline',
      profilePdf: 'Company Profile',
      adminCms: 'Admin CMS',
      searchPlaceholder: 'Search articles, projects...',
      downloadProfile: 'Download Profile (PDF)',
    },
    news: {
      badge: 'MEDIA & PROGRESS',
      title: 'TRAN GIA NEWS & ACTIVITIES',
      desc: 'Stay updated with site milestones, modern engineering technologies, and corporate culture at Tran Gia Construction.',
      allArticles: 'All News & Articles',
      searchResult: 'Search Results',
      clearFilter: '✕ View All Articles',
      loading: 'Loading articles from system...',
      noArticles: 'No articles found',
      noArticlesDesc: 'No articles matching the selected category or search keyword.',
      viewAll: 'View all articles',
      readMore: 'Read more',
      views: 'views',
      category: 'Category',
      publishedAt: 'Published',
      author: 'Author',
      share: 'Share',
      copied: 'Article link copied to clipboard!',
      bilingualBadge: 'Bilingual VI/EN',
      enBadge: 'English',
      viBadge: 'Vietnamese',
    },
    sidebar: {
      recentNews: 'Latest News',
      categories: 'Categories',
      search: 'Search Articles',
      companyInfo: 'Contact Information',
      contactDirect: 'Direct Consultation',
    },
    contact: {
      badge: 'CONTACT & CONSULTATION',
      title: 'REQUEST A QUOTATION & COOPERATION',
      desc: 'Leave your details to receive technical consultation and optimized construction solutions from Tran Gia.',
      sendRequest: 'Send Quote Request',
      name: 'Full Name (*)',
      phone: 'Phone Number (*)',
      email: 'Email Address (*)',
      service: 'Interested Scope (*)',
      message: 'Project Details & Specific Requirements (*)',
      submit: 'SUBMIT REQUEST NOW',
      submitting: 'Submitting information...',
      success: 'Submitted successfully! We will contact you within 24 hours.',
    },
    footer: {
      companyIntro: 'ABOUT TRAN GIA CONSTRUCTION',
      fieldsTitle: 'CORE CAPABILITIES',
      newsletterTitle: 'SUBSCRIBE TO NEWSLETTER',
      newsletterDesc: 'Get the latest construction milestones and innovative material technologies.',
      copyright: 'Copyright by Tran Gia Trading Service and Construction Co., Ltd. All rights reserved.',
    },
  },
};
