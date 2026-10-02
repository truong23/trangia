import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateJobAndApplicationTables1790838600000 implements MigrationInterface {
  name = 'CreateJobAndApplicationTables1790838600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasJobTable = await queryRunner.hasTable('job_postings');
    if (!hasJobTable) {
      await queryRunner.createTable(
        new Table({
          name: 'job_postings',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '36',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'title',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'department',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'location',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'salary',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'jobType',
              type: 'varchar',
              length: '100',
              isNullable: false,
            },
            {
              name: 'deadline',
              type: 'date',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'requirements',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'benefits',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'varchar',
              length: '50',
              default: "'open'",
            },
            {
              name: 'viewCount',
              type: 'int',
              default: 0,
            },
            {
              name: 'createdAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );
    }

    const hasAppTable = await queryRunner.hasTable('job_applications');
    if (!hasAppTable) {
      await queryRunner.createTable(
        new Table({
          name: 'job_applications',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '36',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'candidateName',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'phone',
              type: 'varchar',
              length: '50',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'cvUrl',
              type: 'varchar',
              length: '500',
              isNullable: false,
            },
            {
              name: 'coverLetter',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'hrNote',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'varchar',
              length: '50',
              default: "'pending'",
            },
            {
              name: 'jobId',
              type: 'varchar',
              length: '36',
              isNullable: true,
            },
            {
              name: 'createdAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'job_applications',
        new TableForeignKey({
          columnNames: ['jobId'],
          referencedTableName: 'job_postings',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );
    }

    // Seed sẵn 6 bài tuyển dụng mẫu chất lượng cao cho Trần Gia Construction
    const countResult = await queryRunner.query('SELECT COUNT(*) as count FROM job_postings');
    const count = Number(countResult[0]?.count || countResult[0]?.COUNT || 0);

    if (count === 0) {
      const defaultJobs = [
        {
          id: 'a0000001-0000-0000-0000-000000000001',
          title: 'Chỉ Huy Trưởng Công Trường (Trần Thạch Cao & Hoàn Thiện)',
          department: 'Khối Quản Lý Dự Án',
          location: 'Hà Nội & Các Tỉnh Phía Bắc',
          salary: '22.000.000 - 35.000.000 VNĐ',
          jobType: 'Toàn thời gian',
          deadline: '2026-11-30',
          description: 'Chỉ huy toàn diện công tác thi công hệ thống trần thạch cao ISO, vách ngăn chống cháy, sơn bả hoàn thiện tại các dự án Khách sạn 5 sao, TTTM và Chung cư cao cấp (Delta Group, Vingroup, Charm Group...). Chịu trách nhiệm trực tiếp về an toàn lao động, chất lượng thi công và tiến độ cam kết với Tổng thầu và CĐT.',
          requirements: '• Tốt nghiệp Đại học chuyên ngành Xây dựng Dân dụng & Công nghiệp hoặc Kiến trúc.\n• Tối thiểu 3 năm kinh nghiệm ở vị trí tương đương tại các công trình cao tầng/khách sạn.\n• Thành thạo đọc bản vẽ kỹ thuật, AutoCad, lập biện pháp thi công và hồ sơ nghiệm thu thanh quyết toán.\n• Kỹ năng quản lý nhân sự công trường, giao tiếp và đàm phán tốt với Tư vấn giám sát & Tổng thầu.',
          benefits: '• Thu nhập hấp dẫn 22 - 35 triệu/tháng + thưởng mốc tiến độ và chất lượng dự án.\n• Đóng BHXH, BHYT, BHTN đầy đủ theo Luật Lao động.\n• Phụ cấp công trình xa, bao ăn ở và phương tiện di chuyển 100%.\n• Cơ hội thăng tiến lên Giám đốc Ban Điều hành Dự án Trần Gia.',
          status: 'open',
          viewCount: 142,
        },
        {
          id: 'a0000001-0000-0000-0000-000000000002',
          title: 'Kỹ Sư Giám Sát Thi Công Hiện Trường (Site Engineer)',
          department: 'Kỹ sư Nhà máy & Công trường',
          location: 'Hà Nội, Hải Phòng, Quảng Ninh',
          salary: '14.000.000 - 20.000.000 VNĐ',
          jobType: 'Toàn thời gian',
          deadline: '2026-11-15',
          description: 'Giám sát trực tiếp chất lượng thi công trần vách thạch cao, khung xương chịu lực, xử lý mối nối và bả sơn đạt chuẩn CO/CQ. Triển khai bản vẽ Shop-drawing tại hiện trường, điều phối và quản lý đội thợ (30 - 80 nhân công). Kiểm soát định mức hao hụt vật tư Vĩnh Tường, Gyproc, Knauf.',
          requirements: '• Tốt nghiệp Cao đẳng/Đại học chuyên ngành Xây dựng / Hoàn thiện nội thất.\n• Tối thiểu 1 năm kinh nghiệm giám sát hoàn thiện công trình hoặc thạch cao.\n• Nhanh nhẹn, trung thực, tinh thần trách nhiệm cao, chịu được áp lực tiến độ công trình.',
          benefits: '• Lương cứng 14 - 20 triệu/tháng + thưởng công trình theo tháng/quý.\n• Hỗ trợ nhà ở cư xá công trình cho kỹ sư xa nhà, phụ cấp ăn trưa và công tác phí.\n• Môi trường làm việc thực chiến tại các đại dự án cấp quốc gia.',
          status: 'open',
          viewCount: 98,
        },
        {
          id: 'a0000001-0000-0000-0000-000000000003',
          title: 'Kiến Trúc Sư Thiết Kế & Triển Khai Bản Vẽ (Fit-out & 3D BIM)',
          department: 'Phòng Thiết Kế & Kỹ Thuật',
          location: 'Hà Nội',
          salary: '15.000.000 - 25.000.000 VNĐ',
          jobType: 'Toàn thời gian',
          deadline: '2026-11-20',
          description: 'Lập phối cảnh 3D nội thất, trần vách trang trí giật cấp nghệ thuật, sảnh khách sạn và căn hộ mẫu. Triển khai hồ sơ bản vẽ thi công chi tiết (Shop-drawing) trần vách thạch cao, trần kim loại, phào chỉ GFRC. Phối hợp với Kỹ sư công trường giải quyết các xung đột M&E trên cao độ trần.',
          requirements: '• Tốt nghiệp Đại học chuyên ngành Kiến trúc / Thiết kế Nội thất.\n• Sử dụng thành thạo AutoCAD, 3Ds Max, SketchUp, Revit (ưu tiên ứng dụng BIM).\n• Có tư duy thẩm mỹ cao, am hiểu sâu về vật liệu và cấu tạo kỹ thuật thi công thạch cao hoàn thiện.',
          benefits: '• Lương cạnh tranh 15 - 25 triệu/tháng + thưởng đồ án thiết kế.\n• Trang thiết bị máy tính đồ họa cấu hình cao phục vụ công việc.\n• Tham gia các khóa đào tạo nâng cao công nghệ mới, chế độ du lịch, teambuilding định kỳ.',
          status: 'open',
          viewCount: 125,
        },
        {
          id: 'a0000001-0000-0000-0000-000000000004',
          title: 'Kỹ Sư Kinh Tế Xây Dựng & Đấu Thầu (QS / Dự Toán)',
          department: 'Phòng Dự Toán & Đấu Thầu',
          location: 'Hà Nội',
          salary: '13.000.000 - 18.000.000 VNĐ',
          jobType: 'Toàn thời gian',
          deadline: '2026-11-25',
          description: 'Bóc tách khối lượng trần thạch cao, vách ngăn, sơn bả, phào GFRC từ hồ sơ thiết kế. Lập dự toán báo giá gói thầu thi công cho các đối tác Tổng thầu lớn (Delta Group, Viettel Construction, CDC...). Kiểm soát khối lượng phát sinh và lập hồ sơ thanh quyết toán dự án hoàn thành.',
          requirements: '• Tốt nghiệp Đại học chuyên ngành Kinh tế Xây dựng / Quản lý Xây dựng.\n• Có từ 1 - 2 năm kinh nghiệm bóc tách khối lượng và lập dự toán mảng hoàn thiện.\n• Nắm vững định mức vật tư, đơn giá nhân công thị trường và quy định nghiệm thu thanh toán.',
          benefits: '• Lương cứng 13 - 18 triệu + thưởng hoa hồng dự án trúng thầu.\n• Chế độ du lịch hàng năm, thưởng lễ tết, lương tháng 13 đầy đủ.\n• Môi trường làm việc văn phòng chuyên nghiệp, giờ giấc ổn định.',
          status: 'open',
          viewCount: 86,
        },
        {
          id: 'a0000001-0000-0000-0000-000000000005',
          title: 'Đội Trưởng Thi Công & Thợ Kỹ Thuật Trần Thạch Cao (Số lượng lớn)',
          department: 'Khối Sản Xuất & Công Nhân Kỹ Thuật',
          location: 'Hà Nội, Quảng Ninh, Bình Dương, TP.HCM',
          salary: '450.000 - 700.000 VNĐ/Ngày (15 - 22 Triệu/Tháng)',
          jobType: 'Toàn thời gian / Khoán theo dự án',
          deadline: '2026-12-31',
          description: 'Thi công lắp dựng khung xương trần thả, trần chìm giật cấp, vách ngăn chống ẩm, vách chống cháy. Bắn tấm thạch cao phẳng mịn, dán băng keo xử lý mối nối và bả sơn hoàn thiện. Hướng dẫn công nhân phụ việc, đảm bảo tuân thủ an toàn lao động và bảo hộ 100% trên giàn giáo.',
          requirements: '• Có kinh nghiệm thi công trần thạch cao từ 1 năm trở lên.\n• Sức khỏe tốt, chăm chỉ, không say độ cao, có tinh thần trách nhiệm.\n• Nhận cả cá nhân hoặc nhóm/đội thợ thi công khoán m2.',
          benefits: '• Thu nhập cao 15 - 22 triệu/tháng, thanh toán đúng hạn không trễ lương.\n• Hỗ trợ chỗ ở tại lán trại công trường sạch sẽ, hỗ trợ tiền cơm.\n• Trang bị đồ bảo hộ lao động, mũ, giày, dây an toàn, mua bảo hiểm tai nạn 24/7.',
          status: 'open',
          viewCount: 230,
        },
        {
          id: 'a0000001-0000-0000-0000-000000000006',
          title: 'Chuyên Viên Nhân Sự & Quản Lý Lao Động Công Trường',
          department: 'Phòng Hành Chính - Nhân Sự',
          location: 'Hà Nội',
          salary: '10.000.000 - 15.000.000 VNĐ',
          jobType: 'Toàn thời gian',
          deadline: '2026-11-10',
          description: 'Tuyển dụng và điều phối lực lượng thợ kỹ thuật, lao động thời vụ (50 - 200 nhân sự) đáp ứng tiến độ công trình. Làm thủ tục cấp thẻ ra vào công trường, hồ sơ an toàn lao động nộp Ban An toàn Tổng thầu. Quản lý chấm công, tính lương và giải quyết chế độ cho người lao động tại dự án.',
          requirements: '• Tốt nghiệp Cao đẳng/Đại học chuyên ngành Quản trị Nhân sự, Luật hoặc khối kinh tế.\n• Tối thiểu 1 năm kinh nghiệm tuyển dụng / nhân sự ngành xây dựng, nhà máy sản xuất.\n• Kỹ năng giao tiếp và xử lý tình huống linh hoạt, nhiệt huyết với công việc.',
          benefits: '• Lương cứng 10 - 15 triệu/tháng + thưởng KPI tuyển dụng đủ quân số.\n• Môi trường làm việc năng động, nhiều cơ hội phát triển chuyên sâu mảng HR Xây dựng.\n• Đầy đủ chế độ BHXH, du lịch, thưởng các ngày lễ lớn trong năm.',
          status: 'open',
          viewCount: 75,
        },
      ];

      for (const j of defaultJobs) {
        await queryRunner.query(
          `INSERT INTO job_postings (id, title, department, location, salary, jobType, deadline, description, requirements, benefits, status, viewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            j.id,
            j.title,
            j.department,
            j.location,
            j.salary,
            j.jobType,
            j.deadline,
            j.description,
            j.requirements,
            j.benefits,
            j.status,
            j.viewCount,
          ],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasAppTable = await queryRunner.hasTable('job_applications');
    if (hasAppTable) {
      await queryRunner.dropTable('job_applications');
    }

    const hasJobTable = await queryRunner.hasTable('job_postings');
    if (hasJobTable) {
      await queryRunner.dropTable('job_postings');
    }
  }
}
