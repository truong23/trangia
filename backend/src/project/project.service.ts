import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

const INITIAL_PROJECTS = [
  {
    id: 'the-watson-hotel',
    title: 'Dự án The Watson Hotel Hạ Long',
    location: 'Bãi Cháy, TP. Hạ Long, Tỉnh Quảng Ninh',
    scope: 'Thi công hệ thống Trần thạch cao, Vách ngăn & Sơn bả hoàn thiện các tầng khách sạn',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nghỉ dưỡng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 16,
    year: '2023 - 2024',
    description: 'Khách sạn nghỉ dưỡng cao cấp đạt tiêu chuẩn quốc tế tại bờ vịnh Hạ Long.',
    sortOrder: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'the-yacht-hotel',
    title: 'Dự án The Yacht Hotel',
    location: 'Bãi Cháy, TP. Hạ Long, Tỉnh Quảng Ninh',
    scope: 'Thi công trần trang trí sảnh, phòng nghỉ và hoàn thiện sơn bả cao cấp',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nghỉ dưỡng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 17,
    year: '2023',
    description: 'Khách sạn boutique sang trọng kết hợp phong cách du thuyền hiện đại.',
    sortOrder: 2,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'jinyu-tay-ninh',
    title: 'Dự án Nhà xưởng Tập đoàn JINYU Tây Ninh',
    client: 'CTY TNHH COGNIPLUS INTERIORS',
    location: 'Lô 9 KCN Phước Đông, Trảng Bàng, Tây Ninh',
    scope: 'Hạng mục FIT - OUT (Showroom & Multifunction Area)',
    category: 'industrial',
    categoryLabel: 'Nhà xưởng & Công nghiệp',
    region: 'south',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 18,
    year: '2022 - 2023',
    description: 'Tổ hợp nhà máy sản xuất lốp xe công nghệ cao Jinyu Tire tại KCN Phước Đông.',
    sortOrder: 3,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'vinfast-showrooms',
    title: 'Dự án Chuỗi Showroom VINFAST QS 3 Phía Nam',
    client: 'TẬP ĐOÀN VINGROUP / VINFAST',
    location: 'Các tỉnh thành khu vực Phía Nam',
    scope: 'Thi công trần thạch cao tiêu âm, trần phẳng sơn bả sắc nét & hoàn thiện nội thất chuẩn nhận diện VinFast quốc tế',
    category: 'commercial',
    categoryLabel: 'Thương mại & Showroom',
    region: 'south',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 19,
    year: '2022 - 2024',
    description: 'Hệ thống showroom ô tô điện và trung tâm dịch vụ khách hàng VinFast chuẩn quốc tế. Hạng mục thi công trần thạch cao cho tập đoàn lớn đòi hỏi tiến độ nhanh, bề mặt siêu phẳng mịn và kiểm soát ánh sáng khắt khe.',
    sortOrder: 4,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'vinhomes-grand-park',
    title: 'Dự án Đại đô thị Vinhomes Grand Park',
    client: 'TẬP ĐOÀN VINGROUP',
    location: 'Đường Phước Thiện, Long Mỹ, TP. Thủ Đức (Q9), TP. Hồ Chí Minh',
    scope: 'Thi công hệ thống trần thạch cao chìm giật cấp, vách ngăn chống cháy căn hộ & khu tiện ích công cộng',
    category: 'residential',
    categoryLabel: 'Đô thị & Chung cư cao tầng',
    region: 'south',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 20,
    year: '2021 - 2023',
    description: 'Đại đô thị thông minh đẳng cấp quốc tế của Tập đoàn VinGroup quy mô hàng chục ngàn căn hộ. Trần Gia trực tiếp thi công trần vách thạch cao khối căn hộ và sảnh đón tiêu chuẩn cao.',
    sortOrder: 5,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'nam-hoi-an-5star',
    title: 'Dự án Khách sạn 5 sao Nam Hội An',
    client: 'TẬP ĐOÀN VINGROUP / ĐỐI TÁC LIÊN DANH',
    location: 'Nam Hội An, Tỉnh Quảng Nam',
    scope: 'Thi công hệ trần vách thạch cao cách âm, trang trí sảnh hội nghị và biệt thự biển chuẩn 5 sao',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nghỉ dưỡng',
    region: 'central',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 21,
    year: '2021 - 2022',
    description: 'Quần thể khách sạn nghỉ dưỡng 5 sao sang trọng ven biển miền Trung thuộc hệ sinh thái VinGroup. Đòi hỏi kỹ thuật thi công trần thạch cao giật cấp nghệ thuật kết hợp cách âm tiêu âm cao cấp.',
    sortOrder: 6,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'charm-group-dian',
    title: 'Dự án Tòa nhà ở cao tầng Charm Group',
    client: 'TẬP ĐOÀN CHARM GROUP',
    location: 'Ngã tư 550, Dĩ An, Tỉnh Bình Dương',
    scope: 'Thi công trần thạch cao, vách ngăn chống cháy các tầng căn hộ và shophouse thương mại',
    category: 'residential',
    categoryLabel: 'Đô thị & Chung cư cao tầng',
    region: 'south',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 22,
    year: '2021',
    description: 'Tổ hợp căn hộ chung cư cao cấp tại trung tâm TP. Dĩ An do Charm Group làm chủ đầu tư.',
    sortOrder: 7,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'vincom-dian',
    title: 'Dự án Trung Tâm Thương Mại Vincom Dĩ An',
    client: 'TẬP ĐOÀN VINGROUP / VINCOM RETAIL',
    location: 'TP. Dĩ An, Tỉnh Bình Dương',
    scope: 'Thi công hoàn thiện trần thạch cao thương mại sảnh thông tầng, khu ẩm thực và vách ngăn kỹ thuật',
    category: 'commercial',
    categoryLabel: 'Thương mại & TTTM',
    region: 'south',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 23,
    year: '2020 - 2021',
    description: 'Trung tâm thương mại quy mô lớn của Vincom Retail tại Bình Dương với lưu lượng mua sắm sầm uất.',
    sortOrder: 8,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'ruby-ha-long',
    title: 'Dự án Khu chung cư & Khách sạn Ruby Hạ Long',
    location: 'Cao Xanh, TP. Hạ Long, Tỉnh Quảng Ninh',
    scope: 'Thi công hoàn thiện trần thạch cao, bả matit & sơn nước khối căn hộ nghỉ dưỡng',
    category: 'residential',
    categoryLabel: 'Đô thị & Chung cư cao tầng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 26,
    year: '2020',
    description: 'Tòa tháp đôi chung cư cao cấp và khách sạn view trọn vẹn vịnh Hạ Long.',
    sortOrder: 9,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'flc-sam-son',
    title: 'Dự án Quần thể Nghỉ dưỡng FLC Sầm Sơn',
    location: 'TP. Sầm Sơn, Tỉnh Thanh Hóa',
    scope: 'Thi công trần vách thạch cao giật cấp nghệ thuật, sảnh lễ tân và khu biệt thự nghỉ dưỡng',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nghỉ dưỡng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 27,
    year: '2019 - 2020',
    description: 'Đại quần thể du lịch nghỉ dưỡng 5 sao sinh thái FLC Samson Beach & Golf Resort.',
    sortOrder: 10,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'dong-gia-5star-hotel',
    title: 'Dự án Khách sạn 5 sao Đồng Gia (Viettel Construction)',
    client: 'TỔNG CÔNG TY CÔNG TRÌNH VIETTEL (VIETTEL CONSTRUCTION)',
    location: 'TP. Hà Nội',
    scope: 'Thi công trần thạch cao phòng khánh tiết, vách tiêu âm cao cấp và hoàn thiện sơn bả nội thất 5 sao',
    category: 'hotel',
    categoryLabel: 'Khách sạn & Nghỉ dưỡng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 28,
    year: '2023 - 2024',
    description: 'Công trình khách sạn cao cấp tiêu chuẩn 5 sao do Tổng công ty CP Công trình Viettel (Viettel Construction) làm tổng thầu hoàn thiện.',
    sortOrder: 11,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'masteri-hung-yen',
    title: 'Dự án Căn Hộ Cao Cấp Masteri Hưng Yên',
    client: 'TẬP ĐOÀN MASTERISE HOMES',
    location: 'Văn Giang, Tỉnh Hưng Yên',
    scope: 'Thi công trần thạch cao chìm căn hộ mẫu, sảnh cư dân hạng sang & hành lang công cộng',
    category: 'residential',
    categoryLabel: 'Đô thị & Chung cư cao tầng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 29,
    year: '2023 - 2024',
    description: 'Dự án chung cư hàng hiệu Masterise Homes với tiêu chuẩn hoàn thiện trần thạch cao, sơn bả bề mặt cực kỳ khắt khe.',
    sortOrder: 12,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'sentosa-sky-park',
    title: 'Dự án Tổ Hợp Chung Cư Sentosa Sky Park Hải Phòng',
    client: 'TẬP ĐOÀN DELTA (TỔNG THẦU DELTA GROUP)',
    location: 'Bùi Viện, Phường Vĩnh Niệm, Lê Chân, Hải Phòng',
    scope: 'Thi công trần thạch cao chống ẩm khối căn hộ tiêu chuẩn Singapore, vách ngăn chống cháy tầng hầm & tiện ích Sky Park',
    category: 'residential',
    categoryLabel: 'Đô thị & Chung cư cao tầng',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 30,
    year: '2023 - 2025',
    description: 'Dự án tổ hợp chung cư cao cấp phong cách chuẩn Singapore tại Hải Phòng do Tổng thầu Delta thi công.',
    sortOrder: 13,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'viettel-office-building',
    title: 'Dự án Tòa Nhà Văn Phòng Điều Hành Viettel',
    client: 'VIETTEL GROUP',
    location: 'TP. Hà Nội',
    scope: 'Thi công trần nhôm clip-in kết hợp trần thạch cao tiêu âm phòng họp trực tuyến và trung tâm dữ liệu',
    category: 'commercial',
    categoryLabel: 'Văn phòng & Thương mại',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 31,
    year: '2022 - 2023',
    description: 'Tòa nhà văn phòng điều hành công nghệ cao Viettel đòi hỏi kỹ thuật trần tiêu âm và an toàn cháy nổ cao cấp.',
    sortOrder: 14,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'vincom-mega-mall-ocean-park',
    title: 'Dự án TTTM Vincom Mega Mall Ocean Park',
    client: 'TẬP ĐOÀN VINGROUP',
    location: 'Vinhomes Ocean Park, Gia Lâm, Hà Nội',
    scope: 'Thi công trần thạch cao uốn lượn giếng trời thông tầng, khu rạp chiếu phim và hệ trần tiêu âm ẩm',
    category: 'commercial',
    categoryLabel: 'Thương mại & TTTM',
    region: 'north',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
    pageInPdf: 32,
    year: '2020 - 2021',
    description: 'Đại trung tâm thương mại Vincom Mega Mall bên bờ biển hồ nhân tạo Ocean Park.',
    sortOrder: 15,
    isActive: true,
    isFeatured: true,
  },
];

@Injectable()
export class ProjectService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.projectRepository.count();
      if (count === 0) {
        this.logger.log('Khởi tạo 15 dự án tiêu biểu Trần Gia vào MySQL Database...');
        for (const p of INITIAL_PROJECTS) {
          const item = this.projectRepository.create(p);
          await this.projectRepository.save(item);
        }
        this.logger.log('✅ Đã nạp thành công 15 dự án vào database');
      }
    } catch (e) {
      this.logger.error('Lỗi khi nạp dữ liệu dự án mẫu:', e);
    }
  }

  async findAll(filter?: { category?: string; region?: string; search?: string }): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project');

    if (filter?.category && filter.category !== 'all') {
      query.andWhere('project.category = :category', { category: filter.category });
    }

    if (filter?.region && filter.region !== 'all') {
      query.andWhere('project.region = :region', { region: filter.region });
    }

    if (filter?.search) {
      query.andWhere(
        '(LOWER(project.title) LIKE :search OR LOWER(project.client) LIKE :search OR LOWER(project.location) LIKE :search OR LOWER(project.scope) LIKE :search)',
        { search: `%${filter.search.toLowerCase()}%` },
      );
    }

    query.orderBy('project.sortOrder', 'ASC').addOrderBy('project.createdAt', 'DESC');

    return query.getMany();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(dto);
    return this.projectRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, dto);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Project with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
