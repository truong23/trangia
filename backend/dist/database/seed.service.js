"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const category_entity_1 = require("../category/category.entity");
const article_entity_1 = require("../article/article.entity");
const partner_entity_1 = require("../partner/partner.entity");
const bcrypt = require("bcryptjs");
let SeedService = SeedService_1 = class SeedService {
    constructor(userRepository, categoryRepository, articleRepository, partnerRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.articleRepository = articleRepository;
        this.partnerRepository = partnerRepository;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async onApplicationBootstrap() {
        try {
            await this.seedData();
        }
        catch (error) {
            this.logger.error('Error during data seeding:', error);
        }
    }
    async seedData() {
        this.logger.log('🌱 Đang đồng bộ và khởi tạo dữ liệu mẫu Trần Gia Construction vào Database...');
        let adminUser = await this.userRepository.findOne({ where: { username: 'admin' } });
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Admin@123', salt);
            adminUser = this.userRepository.create({
                username: 'admin',
                email: 'trangia.kt69@gmail.com',
                password: hashedPassword,
                fullName: 'Ban Lãnh Đạo Trần Gia',
                role: user_entity_1.UserRole.ADMIN,
            });
            adminUser = await this.userRepository.save(adminUser);
            this.logger.log('✅ Đã tạo tài khoản quản trị: admin / Admin@123');
        }
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
        const categoryMap = new Map();
        for (const catItem of categoriesData) {
            let cat = await this.categoryRepository.findOne({ where: { slug: catItem.slug } });
            if (!cat) {
                cat = this.categoryRepository.create(catItem);
                cat = await this.categoryRepository.save(cat);
            }
            categoryMap.set(catItem.slug, cat);
        }
        this.logger.log('✅ Đã nạp danh mục tin tức Trần Gia vào database');
        const realTranGiaArticles = [
            {
                title: 'Trần Gia phát động phong trào: Uy tín - Chất lượng - Chính xác trong từng chi tiết công trình',
                titleEn: 'Tran Gia launches movement: Prestige - Quality - Precision in every construction detail',
                slug: 'tran-gia-phat-dong-phong-trao-uy-tin-chat-luong-chinh-xac',
                categorySlug: 'tin-hoat-dong-tran-gia',
                thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-09-15T08:00:00Z'),
                viewCount: 1540,
                isFeatured: true,
                summary: 'Với phương châm "Uy tín - Chất lượng - Chính xác", Công ty TNHH Dịch vụ Thương mại và Xây dựng Trần Gia luôn tôn trọng và hết lòng phục vụ khách hàng, tạo nên sự khác biệt và tiện nghi bậc nhất.',
                summaryEn: 'With the motto "Prestige - Quality - Precision", Tran Gia Trading Service and Construction Co., Ltd always respects and wholeheartedly serves customers, creating superior distinction and comfort.',
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
                contentEn: `
          <p>With a sustainable development orientation, <strong>Tran Gia Trading Service and Construction Co., Ltd</strong> has steadily advanced to establish itself as a premier contractor in interior fit-out, gypsum ceiling & drywall, exterior coating, GFRC moldings, and architectural finishes.</p>
          <blockquote>"Prestige - Quality - Precision: The trust and support of our clients are the driving force pushing Tran Gia to continuously strive for excellence." - Director Tran Xuan Anh</blockquote>
          <p>Under visionary leadership, Tran Gia has developed a dedicated workforce of over 50 professionals and specialized technicians equipped with state-of-the-art machinery and precision laser alignment systems.</p>
          <h3>6 Core Values Defining Tran Gia:</h3>
          <ul>
            <li><strong>Prestige:</strong> Upholding trust through responsibility and transparency.</li>
            <li><strong>Timeline:</strong> Committed to on-time milestone delivery and work efficiency.</li>
            <li><strong>Quality:</strong> Meticulous in every detail to create lasting value.</li>
            <li><strong>Innovation:</strong> Continuously evolving to provide distinct solutions.</li>
            <li><strong>Professionalism:</strong> Dedicated work ethics with streamlined processes.</li>
            <li><strong>Diligence:</strong> Striving constantly for peak performance.</li>
          </ul>
        `,
            },
            {
                title: 'Trần Gia hoàn thiện gói thầu Trần thạch cao và Sơn bả tại Dự án Sentosa Sky Park Hải Phòng',
                titleEn: 'Tran Gia completes Gypsum Ceiling and Painting package at Sentosa Sky Park Hai Phong',
                slug: 'tran-gia-hoan-thien-goi-thau-tai-sentosa-sky-park-hai-phong',
                categorySlug: 'du-an-cong-trinh',
                thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-08-28T09:30:00Z'),
                viewCount: 1320,
                isFeatured: true,
                summary: 'Trần Gia vinh dự được Tổng thầu DELTA-V lựa chọn là đơn vị cung cấp vật tư, thi công trần, vách thạch cao và sơn bả cho dự án cao cấp Sentosa Sky Park tại giao lộ Bùi Viện - Võ Nguyên Giáp, Lê Chân, Hải Phòng.',
                summaryEn: 'Tran Gia was selected by General Contractor DELTA-V as the materials supplier and contractor for gypsum ceilings, drywalls, and specialized painting at luxury complex Sentosa Sky Park Hai Phong.',
                content: `
          <p>Dự án <strong>Sentosa Sky Park Hải Phòng</strong> là tổ hợp căn hộ cao cấp tọa lạc tại vị trí đắc địa TP. Hải Phòng. Trần Gia đảm nhận gói thầu cung cấp vật tư, thi công trần, vách thạch cao và sơn bả trần thạch cao với khối lượng lớn.</p>
          <p>Nhờ trang bị hệ thống máy laser định vị cao, máy bắn vít chuyên dụng cùng đội ngũ kỹ sư dày dạn kinh nghiệm, Trần Gia đã bàn giao từng hạng mục đạt chuẩn thẩm mỹ cao nhất, nhận được đánh giá rất cao từ Chủ đầu tư và Tổng thầu DELTA-V.</p>
        `,
                contentEn: `
          <p>The <strong>Sentosa Sky Park Hai Phong</strong> project is an upscale residential and commercial development located in Hai Phong City. Tran Gia undertook large-scale execution of acoustic gypsum ceilings, moisture-resistant partition walls, and premium finishing paint.</p>
          <p>Equipped with high-precision 3D laser alignment and automated fastening tools, our engineering team delivered flawless architectural aesthetics on schedule.</p>
        `,
            },
            {
                title: 'Thi công Trần kim loại khu vực trong nhà cho Dự án Khách sạn 5 sao Đồng Gia Hạ Long',
                titleEn: 'Indoor Metal Ceiling Installation for 5-Star Dong Gia Hotel Ha Long',
                slug: 'thi-cong-tran-kim-loai-khach-san-5-sao-dong-gia-ha-long',
                categorySlug: 'du-an-cong-trinh',
                thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-08-10T14:15:00Z'),
                viewCount: 1100,
                isFeatured: true,
                summary: 'Hợp tác cùng Viettel Construction, Trần Gia thi công hạng mục trần kim loại trong nhà cho khách sạn 5 sao cao cấp Đồng Gia tại Bãi Cháy, TP. Hạ Long, Quảng Ninh.',
                summaryEn: 'In strategic cooperation with Viettel Construction, Tran Gia executed high-grade indoor metal ceilings for 5-star Dong Gia Hotel in Bai Chay, Ha Long City.',
                content: `
          <p>Khách sạn 5 sao Đồng Gia tại Phường Bãi Cháy, TP. Hạ Long là một trong những dự án nghỉ dưỡng trọng điểm. Chi nhánh Công trình Viettel Hà Nội - Tổng công ty Cổ phần Công trình Viettel đã tin tưởng lựa chọn Trần Gia thi công toàn bộ hệ trần kim loại.</p>
          <p>Sản phẩm trần kim loại được gia công chính xác, chống chịu độ ẩm môi trường biển và mang lại vẻ đẹp sang trọng, đẳng cấp quốc tế cho không gian sảnh và phòng khách sạn.</p>
        `,
                contentEn: `
          <p>Dong Gia 5-Star Hotel in Bai Chay, Ha Long is a prestigious coastal hospitality benchmark. Tran Gia manufactured and installed architectural metal ceiling systems designed for coastal humidity resistance and high-end visual elegance.</p>
        `,
            },
            {
                title: 'Trần Gia đẩy mạnh đầu tư hơn 300 thiết bị máy móc hiện đại phục vụ thi công đồng bộ',
                titleEn: 'Tran Gia invests in over 300 modern machinery units for synchronous construction',
                slug: 'tran-gia-dau-tu-thiet-bi-may-moc-hien-dai',
                categorySlug: 'cong-nghe-ky-thuat',
                thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-07-22T10:00:00Z'),
                viewCount: 980,
                isFeatured: false,
                summary: 'Nhằm đáp ứng các yêu cầu kỹ thuật khắt khe, Trần Gia liên tục bổ sung máy móc tân tiến: 70 máy khoan bê tông, 120 máy bắn vít, 65 máy laser định vị cao, 15 máy hàn và 40 máy cắt bàn.',
                summaryEn: 'To meet stringent engineering standards, Tran Gia constantly upgrades its equipment arsenal: 70 rotary hammer drills, 120 drywall screwdrivers, 65 high-precision laser levels, and 40 table cutters.',
                content: `
          <p>Ngoài các trang thiết bị phục vụ thi công sẵn có, Công ty Trần Gia không ngừng đầu tư thêm các loại máy móc hiện đại phù hợp với tiêu chuẩn công nghệ mới, đồng thời liên danh liên kết với các đơn vị cho thuê máy công trình uy tín.</p>
          <p>Hệ thống máy móc đồng bộ giúp rút ngắn 30% thời gian thi công, giảm thiểu sai sót và đảm bảo an toàn tuyệt đối cho người lao động tại công trường.</p>
        `,
                contentEn: `
          <p>Tran Gia continuously equips project sites with standardized modern machinery, cutting site delivery lead times by 30% while upholding maximum occupational safety.</p>
        `,
            },
            {
                title: 'Thi công sơn bả ngoài nhà và phào GFRC tại Dự án KĐT Phía Đông Đại Lộ Bắc Nam Thanh Hóa',
                titleEn: 'Exterior Painting and GFRC Molding at Bac Nam Avenue Urban Area Thanh Hoa',
                slug: 'thi-cong-son-ba-phao-gfrc-du-an-nam-ngan-thanh-hoa',
                categorySlug: 'du-an-cong-trinh',
                thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-06-30T08:30:00Z'),
                viewCount: 890,
                isFeatured: false,
                summary: 'Hạng mục thi công bả sơn mặt ngoài và lắp dựng phào chỉ bê tông sợi thủy tinh GFRC tại Phường Nam Ngạn, TP. Thanh Hóa do Tổng công ty MBLAND làm chủ đầu tư.',
                summaryEn: 'Exterior coating and Glass Fiber Reinforced Concrete (GFRC) molding installation for MBLAND Corporation at Nam Ngan Ward, Thanh Hoa City.',
                content: `
          <p>Phào chỉ GFRC là công nghệ đòi hỏi kỹ thuật cao về độ chính xác và khả năng liên kết chịu lực. Đội ngũ kỹ thuật Trần Gia đã hoàn thành toàn diện hạng mục mặt ngoài dự án KĐT Nam Ngạn đúng tiến độ cam kết.</p>
        `,
                contentEn: `
          <p>GFRC architectural moldings require high precision and structural anchoring strength. Tran Gia engineering completed all exterior facades in full compliance with design specifications.</p>
        `,
            },
            {
                title: 'Trần Gia đồng hành thi công Chuỗi Showroom VinFast QS 3 Phía Nam',
                titleEn: 'Tran Gia collaborates in constructing VinFast QS 3 Showroom Chain in Southern Region',
                slug: 'tran-gia-thi-cong-chuoi-showroom-vinfast-phia-nam',
                categorySlug: 'doi-tac-khach-hang',
                thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-05-18T11:00:00Z'),
                viewCount: 1420,
                isFeatured: true,
                summary: 'Trần Gia triển khai thi công hoàn thiện chuỗi Showroom VinFast QS 3 tại các tỉnh thành phía Nam, đáp ứng bộ nhận diện thương hiệu chuẩn quốc tế của VinFast.',
                summaryEn: 'Tran Gia executed fit-out and drywall installations for VinFast QS 3 Showroom networks across southern provinces in strict accordance with VinFast international brand identity.',
                content: `
          <p>Hệ thống Showroom VinFast đòi hỏi tiêu chuẩn khắt khe về bề mặt sơn bả, ánh sáng và chi tiết trần vách. Trần Gia đã khẳng định năng lực triển khai đồng loạt nhiều điểm với chất lượng vượt trội.</p>
        `,
                contentEn: `
          <p>VinFast showroom identity mandates strict specifications for surface smoothness, acoustics, and lighting integration. Tran Gia proven multi-site rollout capacity ensured timely showroom launches.</p>
        `,
            },
            {
                title: 'Nhà thầu thi công trần thạch cao cho các tập đoàn lớn: Tiêu chuẩn và năng lực Trần Gia',
                titleEn: 'Drywall & Ceiling Contractor for Major Corporations: Standards and Capacity of Tran Gia',
                slug: 'thi-cong-tran-thach-cao-cho-cac-tap-doan-lon',
                categorySlug: 'cong-nghe-ky-thuat',
                thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-09-25T10:00:00Z'),
                viewCount: 2150,
                isFeatured: true,
                summary: 'Tìm hiểu tiêu chuẩn kỹ thuật khắt khe khi thi công trần thạch cao cho các tập đoàn lớn: VinGroup, DELTA, Viettel Construction, Masterise Homes và giải pháp toàn diện từ Trần Gia.',
                summaryEn: 'Discover stringent technical standards when executing gypsum ceilings for major conglomerates like VinGroup, DELTA, Viettel, and Masterise Homes with Tran Gia comprehensive solutions.',
                content: `
          <p>Đối với các công trình quy mô biểu tượng như khách sạn 5 sao, trung tâm thương mại, showroom ô tô và các đại đô thị cao cấp, hạng mục <strong>thi công trần thạch cao cho các tập đoàn lớn</strong> đòi hỏi những tiêu chuẩn kỹ thuật và quy trình kiểm soát chất lượng ở cấp độ cao nhất.</p>
          <h3>1. Những thách thức khi thi công trần thạch cao cho tập đoàn lớn:</h3>
          <ul>
            <li><strong>Tiến độ gấp rút và gối đầu liên tục:</strong> Thường xuyên phải triển khai theo lệnh điều động 3 ca 24/7.</li>
            <li><strong>Độ phẳng và cao độ chuẩn xác:</strong> Bề mặt trần không được phép gợn sóng hay sai lệch cao độ quá 1mm/m.</li>
            <li><strong>Quy chuẩn PCCC nghiêm ngặt:</strong> Vách ngăn và trần chống cháy phải có chứng chỉ kiểm định EI 60 đến EI 120 phút.</li>
            <li><strong>An toàn lao động tuyệt đối:</strong> 100% công nhân trên công trường phải có chứng chỉ huấn luyện an toàn và BHLĐ đạt chuẩn.</li>
          </ul>
          <h3>2. Giải pháp và năng lực vượt trội của Trần Gia:</h3>
          <p>Với hơn <strong>50 cán bộ kỹ sư thường trực</strong>, đội cơ động <strong>50 - 200 thợ tay nghề cao</strong> cùng <strong>300+ thiết bị hiện đại</strong> (65 máy laser 3D, 120 máy bắn vít, 70 máy khoan bê tông), Trần Gia đã hoàn thành xuất sắc hàng loạt gói thầu lớn từ Bắc vào Nam.</p>
          <p>Mọi dự án đều được quản lý theo quy trình nghiệm thu KCS 6 bước chuẩn hóa, đảm bảo bàn giao đúng tiến độ, chất lượng bền vững và tính thẩm mỹ trường tồn.</p>
        `,
                contentEn: `
          <p>For monumental developments such as 5-star hotels, shopping malls, EV showrooms, and mega-urban communities, executing <strong>gypsum ceiling systems for major corporations</strong> requires rigorous technical compliance and top-tier QA/QC protocols.</p>
          <p>Tran Gia provides turnkey solutions backed by 50+ engineers, up to 200 skilled craftsmen, and 300+ specialized machinery units, ensuring on-time milestone handovers with zero structural defects.</p>
        `,
            },
            {
                title: 'Kinh nghiệm thi công trần thạch cao cho hệ sinh thái VinGroup: Vinhomes, VinFast, Vincom',
                titleEn: 'Experience in Gypsum Ceiling Execution for VinGroup Ecosystem: Vinhomes, VinFast, Vincom',
                slug: 'kinh-nghiem-thi-cong-tran-thach-cao-cho-vingroup',
                categorySlug: 'doi-tac-khach-hang',
                thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                publishedAt: new Date('2026-09-20T14:30:00Z'),
                viewCount: 1890,
                isFeatured: true,
                summary: 'Trần Gia chia sẻ kinh nghiệm thực chiến thi công trần vách thạch cao và hoàn thiện tại các dự án trọng điểm của Tập đoàn VinGroup: Vinhomes Grand Park, Showroom VinFast QS 3, Vincom Dĩ An.',
                summaryEn: 'Tran Gia shares hands-on experience in executing gypsum ceilings and drywalls across key VinGroup developments including Vinhomes Grand Park, VinFast Showrooms, and Vincom Mall.',
                content: `
          <p>Tập đoàn <strong>VinGroup</strong> luôn được biết đến là một trong những chủ đầu tư khắt khe nhất tại Việt Nam về tiến độ bàn giao thần tốc và tiêu chuẩn kỹ mỹ thuật hoàn hảo. Trần Gia vinh dự được lựa chọn là đơn vị thi công trần vách thạch cao tại nhiều dự án trọng điểm:</p>
          <h3>1. Đại đô thị Vinhomes Grand Park (TP. Hồ Chí Minh):</h3>
          <p>Trần Gia thi công trần chìm giật cấp và vách thạch cao ngăn phòng cho các tháp căn hộ và khu vực tiện ích công cộng. Đội ngũ kỹ sư Trần Gia ứng dụng máy laser định vị cao độ, bảo đảm hàng chục ngàn mét vuông trần phẳng tuyệt đối.</p>
          <h3>2. Chuỗi Showroom VinFast QS 3 Phía Nam:</h3>
          <p>Đáp ứng bộ nhận diện thương hiệu quốc tế của VinFast với trần phẳng không tì vết, hệ thống rãnh đèn âm trần tinh tế và sơn bả màu sắc chuẩn xác.</p>
          <h3>3. Trung tâm thương mại Vincom Dĩ An Bình Dương:</h3>
          <p>Hệ trần sảnh thương mại và cụm rạp chiếu phim với khả năng tiêu âm chống ồn và khung xương chịu lực gia cố chống rung lắc cao độ.</p>
          <blockquote>"Sự tín nhiệm của Tập đoàn VinGroup là minh chứng rõ ràng nhất cho năng lực thực thi và chữ TÍN của Trần Gia trong ngành xây dựng hoàn thiện."</blockquote>
        `,
                contentEn: `
          <p><strong>VinGroup</strong> is recognized as one of the most demanding developers regarding milestone speed and architectural finish quality. Tran Gia has successfully delivered gypsum ceilings, acoustic drywalls, and specialized coatings across multiple VinGroup landmark projects.</p>
        `,
            },
        ];
        for (const artItem of realTranGiaArticles) {
            const category = categoryMap.get(artItem.categorySlug);
            let article = await this.articleRepository.findOne({ where: { slug: artItem.slug } });
            if (!article) {
                article = this.articleRepository.create({
                    title: artItem.title,
                    titleEn: artItem.titleEn,
                    slug: artItem.slug,
                    summary: artItem.summary,
                    summaryEn: artItem.summaryEn,
                    content: artItem.content,
                    contentEn: artItem.contentEn,
                    lang: 'vi',
                    thumbnail: artItem.thumbnail,
                    status: article_entity_1.ArticleStatus.PUBLISHED,
                    isFeatured: artItem.isFeatured,
                    viewCount: artItem.viewCount,
                    publishedAt: artItem.publishedAt,
                    author: adminUser,
                    category: category || undefined,
                });
                await this.articleRepository.save(article);
            }
            else {
                if (!article.titleEn || !article.summaryEn || !article.contentEn) {
                    article.titleEn = artItem.titleEn;
                    article.summaryEn = artItem.summaryEn;
                    article.contentEn = artItem.contentEn;
                    article.lang = article.lang || 'vi';
                    await this.articleRepository.save(article);
                }
            }
        }
        this.logger.log('✅ Đã nạp thành công các bài viết thật (Đa ngôn ngữ VI/EN) của Trần Gia vào Database');
        const partnersCount = await this.partnerRepository.count();
        if (partnersCount === 0) {
            const defaultPartners = [
                {
                    name: 'TẬP ĐOÀN VINGROUP',
                    role: 'Tập đoàn BĐS, Công nghiệp & Dịch vụ số 1 Việt Nam',
                    category: 'developer',
                    badge: 'Chủ đầu tư Chiến lược',
                    brandColor: '#B91C1C',
                    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
                    projects: 'Vinhomes Grand Park, Chuỗi Showroom VinFast QS 3, Vincom Dĩ An, Khách sạn 5 sao Nam Hội An',
                    description: 'Trần Gia vinh dự được lựa chọn thi công trần vách thạch cao và hoàn thiện cho nhiều dự án trọng điểm trong hệ sinh thái VinGroup.',
                    sortOrder: 1,
                    isActive: true,
                },
                {
                    name: 'MASTERISE HOMES',
                    role: 'Nhà phát triển BĐS Hàng hiệu & Hạng sang Quốc tế',
                    category: 'developer',
                    badge: 'Chủ đầu tư Hạng sang',
                    brandColor: '#B45309',
                    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                    projects: 'Masteri Hưng Yên (Ocean Park 2/3)',
                    description: 'Đối tác thi công trần vách thạch cao sảnh đón và căn hộ mẫu với tiêu chuẩn hoàn thiện khắt khe chuẩn Masterise quốc tế.',
                    sortOrder: 2,
                    isActive: true,
                },
                {
                    name: 'TẬP ĐOÀN XÂY DỰNG DELTA',
                    role: 'Tổng thầu Xây dựng Dân dụng & Công nghiệp Top đầu Việt Nam',
                    category: 'contractor',
                    badge: 'Tổng thầu Chiến lược',
                    brandColor: '#0369A1',
                    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
                    projects: 'TTTM Phức hợp Hải Dương, Sentosa Sky Park Hải Phòng',
                    description: 'Đồng hành cùng Tổng thầu DELTA qua hàng loạt gói thầu thi công trần thạch cao, sơn bả hoàn thiện các tòa cao ốc quy mô lớn.',
                    sortOrder: 3,
                    isActive: true,
                },
                {
                    name: 'VIETTEL CONSTRUCTION',
                    role: 'Tổng công ty Cổ phần Công trình Viettel (Viettel Group)',
                    category: 'contractor',
                    badge: 'Tổng thầu Quốc gia',
                    brandColor: '#DC2626',
                    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=600&q=80',
                    projects: 'Khách sạn 5 sao Đồng Gia Hạ Long',
                    description: 'Đối tác chiến lược cùng Tổng công ty Công trình Viettel thi công hệ trần kim loại kỹ thuật cao cho khách sạn 5 sao tại Hạ Long.',
                    sortOrder: 4,
                    isActive: true,
                },
                {
                    name: 'CÔNG TY CỔ PHẦN XÂY DỰNG CDC',
                    role: 'Công ty Cổ phần Xây dựng CDC',
                    category: 'contractor',
                    badge: 'Tổng thầu Uy tín',
                    brandColor: '#4338CA',
                    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
                    projects: 'Chung cư cao cấp A&T Sky Garden',
                    description: 'Tổng thầu xây dựng dự án A&T Sky Garden, Trần Gia trực tiếp đảm nhận toàn bộ gói thầu trần thạch cao khối căn hộ cao cấp.',
                    sortOrder: 5,
                    isActive: true,
                },
                {
                    name: 'MBLAND HOLDINGS',
                    role: 'Tổng công ty Cổ phần MBLAND (MB Group)',
                    category: 'developer',
                    badge: 'Chủ đầu tư Đô thị',
                    brandColor: '#1D4ED8',
                    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
                    projects: 'KĐT Nam Ngạn Đại Lộ Bắc Nam Thanh Hóa',
                    description: 'Chủ đầu tư đại dự án KĐT Nam Ngạn, Trần Gia đảm nhiệm hạng mục bả sơn mặt ngoài và lắp dựng phào chỉ nghệ thuật GFRC.',
                    sortOrder: 6,
                    isActive: true,
                },
                {
                    name: 'TẬP ĐOÀN CHARM GROUP',
                    role: 'Tập đoàn Đầu tư & Phát triển BĐS Nghỉ dưỡng',
                    category: 'developer',
                    badge: 'Chủ đầu tư',
                    brandColor: '#047857',
                    thumbnail: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=600&q=80',
                    projects: 'Tòa nhà ở cao tầng Charm Group Dĩ An',
                    description: 'Chủ đầu tư tổ hợp căn hộ biểu tượng tại Bình Dương với hệ thống trần thạch cao và vách ngăn chống cháy chất lượng cao.',
                    sortOrder: 7,
                    isActive: true,
                },
                {
                    name: 'COGNIPLUS INTERIORS',
                    role: 'Tổng thầu Nội thất & Fit-out Công nghiệp Quốc tế',
                    category: 'contractor',
                    badge: 'Tổng thầu Fit-out',
                    brandColor: '#D97706',
                    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                    projects: 'Fit-out Nhà xưởng Jinyu Tây Ninh',
                    description: 'Hợp tác trong các gói thầu Fit-out, vách thạch cao ngăn phòng sạch và trần tiêu âm cho các dự án nhà máy công nghiệp FDI.',
                    sortOrder: 8,
                    isActive: true,
                },
                {
                    name: 'VĨNH TƯỜNG - GYPROC (SAINT-GOBAIN)',
                    role: 'Tập đoàn Giải pháp Trần & Vách Thạch cao Hàng đầu',
                    category: 'manufacturer',
                    badge: 'Nhà sản xuất Chính hãng',
                    brandColor: '#0284C7',
                    thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
                    projects: 'Toàn bộ các dự án trọng điểm toàn quốc',
                    description: 'Đối tác cung ứng vật tư khung xương, tấm thạch cao tiêu chuẩn & chống cháy với đầy đủ chứng chỉ chất lượng CO/CQ.',
                    sortOrder: 9,
                    isActive: true,
                },
                {
                    name: 'KNAUF VIỆT NAM',
                    role: 'Tập đoàn Vật liệu Thạch cao Tiêu chuẩn Đức (CHLB Đức)',
                    category: 'manufacturer',
                    badge: 'Nhà sản xuất Quốc tế',
                    brandColor: '#0D9488',
                    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
                    projects: 'Dự án tiêu chuẩn tiêu âm & chống ẩm đặc biệt',
                    description: 'Đối tác cung cấp hệ thống tấm thạch cao kỹ thuật cao, tấm tiêu âm Danoline và giải pháp vách ngăn chịu ẩm cao cấp.',
                    sortOrder: 10,
                    isActive: true,
                },
                {
                    name: 'JOTUN & DULUX (AKZONOBEL)',
                    role: 'Thương hiệu Sơn & Bột bả Kiến trúc Cao cấp Thế giới',
                    category: 'manufacturer',
                    badge: 'Vật tư Sơn bả',
                    brandColor: '#E11D48',
                    thumbnail: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
                    projects: 'Các khối tháp căn hộ & TTTM',
                    description: 'Đối tác cung cấp bột bả và sơn hoàn thiện bề mặt trần vách thạch cao cao cấp cho các công trình cấp tập đoàn.',
                    sortOrder: 11,
                    isActive: true,
                },
            ];
            for (const p of defaultPartners) {
                const item = this.partnerRepository.create(p);
                await this.partnerRepository.save(item);
            }
            this.logger.log(`✅ Đã khởi tạo thành công ${defaultPartners.length} đối tác chiến lược & khách hàng vào Database`);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(3, (0, typeorm_1.InjectRepository)(partner_entity_1.Partner)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map