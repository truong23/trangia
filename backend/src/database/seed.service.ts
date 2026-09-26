import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Article, ArticleStatus } from '../article/article.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.seedData();
    } catch (error) {
      this.logger.error('Error during data seeding:', error);
    }
  }

  async seedData() {
    this.logger.log('🌱 Đang đồng bộ và khởi tạo dữ liệu mẫu Trần Gia Construction vào Database...');

    // 1. Seed Admin User
    let adminUser = await this.userRepository.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@123', salt);
      adminUser = this.userRepository.create({
        username: 'admin',
        email: 'trangia.kt69@gmail.com',
        password: hashedPassword,
        fullName: 'Ban Lãnh Đạo Trần Gia',
        role: UserRole.ADMIN,
      });
      adminUser = await this.userRepository.save(adminUser);
      this.logger.log('✅ Đã tạo tài khoản quản trị: admin / Admin@123');
    }

    // 2. Seed Categories
    const categoriesData = [
      {
        name: 'Tin hoạt động Trần Gia',
        slug: 'tin-hoat-dong-tran-gia',
        description: 'Cập nhật tin tức hoạt động, phong trào, sự kiện nội bộ và tiến độ thi công của Trần Gia.',
      },
      {
        name: 'Dự án & Công trình',
        slug: 'du-an-cong-trinh',
        description: 'Tiến độ thi công các dự án khách sạn, trung tâm thương mại, showroom và căn hộ trên toàn quốc.',
      },
      {
        name: 'Công nghệ & Kỹ thuật thi công',
        slug: 'cong-nghe-ky-thuat',
        description: 'Giải pháp thi công trần vách thạch cao tiêu chuẩn ISO, sơn bả ngoài nhà, phào GFRC và Fit-out.',
      },
      {
        name: 'Văn hóa & Đội ngũ',
        slug: 'van-hoa-doi-ngu',
        description: 'Đời sống cán bộ nhân viên, chính sách đào tạo tay nghề, hoạt động thể thao và an toàn lao động.',
      },
      {
        name: 'Đối tác & Khách hàng',
        slug: 'doi-tac-khach-hang',
        description: 'Hợp tác chiến lược cùng các đối tác: Delta Group, Viettel Construction, CDC, Mbland, Vingroup...',
      },
    ];

    const categoryMap = new Map<string, Category>();
    for (const catItem of categoriesData) {
      let cat = await this.categoryRepository.findOne({ where: { slug: catItem.slug } });
      if (!cat) {
        cat = this.categoryRepository.create(catItem);
        cat = await this.categoryRepository.save(cat);
      }
      categoryMap.set(catItem.slug, cat);
    }
    this.logger.log('✅ Đã nạp danh mục tin tức Trần Gia vào database');

    // 3. Seed exact real Tran Gia articles based on PDF profile
    const realTranGiaArticles = [
      {
        title: 'Trần Gia phát động phong trào: Uy tín - Chất lượng - Chính xác trong từng chi tiết công trình',
        slug: 'tran-gia-phat-dong-phong-trao-uy-tin-chat-luong-chinh-xac',
        categorySlug: 'tin-hoat-dong-tran-gia',
        thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-09-15T08:00:00Z'),
        viewCount: 1540,
        isFeatured: true,
        summary:
          'Với phương châm "Uy tín - Chất lượng - Chính xác", Công ty TNHH Dịch vụ Thương mại và Xây dựng Trần Gia luôn tôn trọng và hết lòng phục vụ khách hàng, tạo nên sự khác biệt và tiện nghi bậc nhất.',
        content: `
          <p>Với định hướng phát triển bền vững, <strong>Công ty TNHH Thương Mại Dịch Vụ và Xây Dựng Trần Gia</strong> đã từng bước đi lên và khẳng định mình là một đơn vị hàng đầu trong lĩnh vực thiết kế thi công nội thất, trần, vách, sơn bả hoàn thiện và thi công hoàn thiện xây dựng.</p>
          <blockquote>"Uy tín - Chất lượng - Chính xác: Sự tin tưởng và ủng hộ của Quý khách hàng là động lực thôi thúc đẩy Trần Gia ngày càng cố gắng hơn nữa." - Giám đốc Trần Xuân Anh</blockquote>
          <p>Dưới sự dẫn dắt của ban lãnh đạo tâm huyết, Trần Gia đã xây dựng đội ngũ hơn 50 cán bộ – công nhân viên, trong đó có 10 cán bộ chủ chốt đảm nhiệm các vị trí kỹ thuật, quản lý và vận hành nhà máy sản xuất hiện đại.</p>
          <h3>6 Giá trị cốt lõi tạo nên bản sắc Trần Gia:</h3>
          <ul>
            <li><strong>Uy tín:</strong> Giữ vững niềm tin bằng trách nhiệm và minh bạch.</li>
            <li><strong>Tiến độ:</strong> Cam kết đúng thời gian, đảm bảo hiệu quả công việc.</li>
            <li><strong>Chất lượng:</strong> Tỉ mỉ trong từng chi tiết, tạo giá trị bền vững.</li>
            <li><strong>Sáng tạo:</strong> Đổi mới không ngừng, mang đến giải pháp khác biệt.</li>
            <li><strong>Chuyên nghiệp:</strong> Làm việc tận tâm, quy trình rõ ràng, hiệu quả.</li>
            <li><strong>Nỗ lực:</strong> Luôn phấn đấu để đạt kết quả tốt nhất.</li>
          </ul>
        `,
      },
      {
        title: 'Trần Gia hoàn thiện gói thầu Trần thạch cao và Sơn bả tại Dự án Sentosa Sky Park Hải Phòng',
        slug: 'tran-gia-hoan-thien-goi-thau-tai-sentosa-sky-park-hai-phong',
        categorySlug: 'du-an-cong-trinh',
        thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-08-28T09:30:00Z'),
        viewCount: 1320,
        isFeatured: true,
        summary:
          'Trần Gia vinh dự được Tổng thầu DELTA-V lựa chọn là đơn vị cung cấp vật tư, thi công trần, vách thạch cao và sơn bả cho dự án cao cấp Sentosa Sky Park tại giao lộ Bùi Viện - Võ Nguyên Giáp, Lê Chân, Hải Phòng.',
        content: `
          <p>Dự án <strong>Sentosa Sky Park Hải Phòng</strong> là tổ hợp căn hộ cao cấp tọa lạc tại vị trí đắc địa TP. Hải Phòng. Trần Gia đảm nhận gói thầu cung cấp vật tư, thi công trần, vách thạch cao và sơn bả trần thạch cao với khối lượng lớn.</p>
          <p>Nhờ trang bị hệ thống máy laser định vị cao, máy bắn vít chuyên dụng cùng đội ngũ kỹ sư dày dạn kinh nghiệm, Trần Gia đã bàn giao từng hạng mục đạt chuẩn thẩm mỹ cao nhất, nhận được đánh giá rất cao từ Chủ đầu tư và Tổng thầu DELTA-V.</p>
        `,
      },
      {
        title: 'Thi công Trần kim loại khu vực trong nhà cho Dự án Khách sạn 5 sao Đồng Gia Hạ Long',
        slug: 'thi-cong-tran-kim-loai-khach-san-5-sao-dong-gia-ha-long',
        categorySlug: 'du-an-cong-trinh',
        thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-08-10T14:15:00Z'),
        viewCount: 1100,
        isFeatured: true,
        summary:
          'Hợp tác cùng Viettel Construction, Trần Gia thi công hạng mục trần kim loại trong nhà cho khách sạn 5 sao cao cấp Đồng Gia tại Bãi Cháy, TP. Hạ Long, Quảng Ninh.',
        content: `
          <p>Khách sạn 5 sao Đồng Gia tại Phường Bãi Cháy, TP. Hạ Long là một trong những dự án nghỉ dưỡng trọng điểm. Chi nhánh Công trình Viettel Hà Nội - Tổng công ty Cổ phần Công trình Viettel đã tin tưởng lựa chọn Trần Gia thi công toàn bộ hệ trần kim loại.</p>
          <p>Sản phẩm trần kim loại được gia công chính xác, chống chịu độ ẩm môi trường biển và mang lại vẻ đẹp sang trọng, đẳng cấp quốc tế cho không gian sảnh và phòng khách sạn.</p>
        `,
      },
      {
        title: 'Trần Gia đẩy mạnh đầu tư hơn 300 thiết bị máy móc hiện đại phục vụ thi công đồng bộ',
        slug: 'tran-gia-dau-tu-thiet-bi-may-moc-hien-dai',
        categorySlug: 'cong-nghe-ky-thuat',
        thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-07-22T10:00:00Z'),
        viewCount: 980,
        isFeatured: false,
        summary:
          'Nhằm đáp ứng các yêu cầu kỹ thuật khắt khe, Trần Gia liên tục bổ sung máy móc tân tiến: 70 máy khoan bê tông, 120 máy bắn vít, 65 máy laser định vị cao, 15 máy hàn và 40 máy cắt bàn.',
        content: `
          <p>Ngoài các trang thiết bị phục vụ thi công sẵn có, Công ty Trần Gia không ngừng đầu tư thêm các loại máy móc hiện đại phù hợp với tiêu chuẩn công nghệ mới, đồng thời liên danh liên kết với các đơn vị cho thuê máy công trình uy tín.</p>
          <p>Hệ thống máy móc đồng bộ giúp rút ngắn 30% thời gian thi công, giảm thiểu sai sót và đảm bảo an toàn tuyệt đối cho người lao động tại công trường.</p>
        `,
      },
      {
        title: 'Thi công sơn bả ngoài nhà và phào GFRC tại Dự án KĐT Phía Đông Đại Lộ Bắc Nam Thanh Hóa',
        slug: 'thi-cong-son-ba-phao-gfrc-du-an-nam-ngan-thanh-hoa',
        categorySlug: 'du-an-cong-trinh',
        thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-06-30T08:30:00Z'),
        viewCount: 890,
        isFeatured: false,
        summary:
          'Hạng mục thi công bả sơn mặt ngoài và lắp dựng phào chỉ bê tông sợi thủy tinh GFRC tại Phường Nam Ngạn, TP. Thanh Hóa do Tổng công ty MBLAND làm chủ đầu tư.',
        content: `
          <p>Phào chỉ GFRC là công nghệ đòi hỏi kỹ thuật cao về độ chính xác và khả năng liên kết chịu lực. Đội ngũ kỹ thuật Trần Gia đã hoàn thành toàn diện hạng mục mặt ngoài dự án KĐT Nam Ngạn đúng tiến độ cam kết.</p>
        `,
      },
      {
        title: 'Trần Gia đồng hành thi công Chuỗi Showroom VinFast QS 3 Phía Nam',
        slug: 'tran-gia-thi-cong-chuoi-showroom-vinfast-phia-nam',
        categorySlug: 'doi-tac-khach-hang',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-05-18T11:00:00Z'),
        viewCount: 1420,
        isFeatured: true,
        summary:
          'Trần Gia triển khai thi công hoàn thiện chuỗi Showroom VinFast QS 3 tại các tỉnh thành phía Nam, đáp ứng bộ nhận diện thương hiệu chuẩn quốc tế của VinFast.',
        content: `
          <p>Hệ thống Showroom VinFast đòi hỏi tiêu chuẩn khắt khe về bề mặt sơn bả, ánh sáng và chi tiết trần vách. Trần Gia đã khẳng định năng lực triển khai đồng loạt nhiều điểm với chất lượng vượt trội.</p>
        `,
      },
      {
        title: 'Fit-out Showroom & Multifunction Area tại Nhà xưởng Tập đoàn JINYU Tây Ninh',
        slug: 'fit-out-showroom-nha-xuong-tap-doan-jinyu-tay-ninh',
        categorySlug: 'du-an-cong-trinh',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-04-12T09:00:00Z'),
        viewCount: 1150,
        isFeatured: false,
        summary:
          'Tại Lô 9 KCN Phước Đông, Trảng Bàng, Tây Ninh, Trần Gia hợp tác cùng Cogniplus Interiors hoàn thành hạng mục Fit-out khu trưng bày và hội trường đa năng Jinyu.',
        content: `
          <p>Khu nhà xưởng hiện đại của Tập đoàn Jinyu được hoàn thiện nội thất trọn gói với các tiêu chuẩn công nghiệp cao cấp, cách âm và chống bám bụi tối ưu.</p>
        `,
      },
      {
        title: 'Trần Gia hoàn tất gói thầu Trần thạch cao tại Dự án A&T Sky Garden Bình Dương',
        slug: 'hoan-tat-goi-thau-at-sky-garden-binh-duong',
        categorySlug: 'du-an-cong-trinh',
        thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date('2026-03-25T15:00:00Z'),
        viewCount: 860,
        isFeatured: false,
        summary:
          'Phối hợp cùng Tổng thầu CDC Construction, Trần Gia thi công toàn bộ hệ thống trần thạch cao chất lượng cao cho chung cư cao cấp A&T Sky Garden.',
        content: `
          <p>Dự án A&T Sky Garden tọa lạc tại Số 54C Cách Mạng Tháng 8, Phường Lái Thiêu mang lại không gian sống sang trọng cho cư dân, trong đó hệ trần thạch cao do Trần Gia thi công là điểm nhấn hoàn hảo.</p>
        `,
      },
    ];

    // Seed or update articles
    for (const artItem of realTranGiaArticles) {
      const category = categoryMap.get(artItem.categorySlug);
      let article = await this.articleRepository.findOne({ where: { slug: artItem.slug } });
      if (!article) {
        article = this.articleRepository.create({
          title: artItem.title,
          slug: artItem.slug,
          summary: artItem.summary,
          content: artItem.content,
          thumbnail: artItem.thumbnail,
          status: ArticleStatus.PUBLISHED,
          isFeatured: artItem.isFeatured,
          viewCount: artItem.viewCount,
          publishedAt: artItem.publishedAt,
          author: adminUser,
          category: category || undefined,
        });
        await this.articleRepository.save(article);
      }
    }
    this.logger.log('✅ Đã nạp thành công các bài viết thật của Trần Gia Construction vào Database');
  }
}
