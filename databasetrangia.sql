-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th9 28, 2026 lúc 03:22 AM
-- Phiên bản máy phục vụ: 8.4.3
-- Phiên bản PHP: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `default`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article`
--

CREATE TABLE `article` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `content` text NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'published',
  `viewCount` int NOT NULL DEFAULT '0',
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `publishedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `categoryId` varchar(255) DEFAULT NULL,
  `authorId` varchar(255) DEFAULT NULL,
  `lang` varchar(255) NOT NULL DEFAULT 'vi',
  `titleEn` text,
  `summaryEn` text,
  `contentEn` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `article`
--

INSERT INTO `article` (`id`, `title`, `slug`, `summary`, `content`, `thumbnail`, `status`, `viewCount`, `isFeatured`, `publishedAt`, `createdAt`, `updatedAt`, `categoryId`, `authorId`, `lang`, `titleEn`, `summaryEn`, `contentEn`) VALUES
('09ff03bc-ad11-4861-b4ef-56b397d95740', 'Delta Group và bước tiến nội lực tới vị trí thứ 2 trong ngành xây dựng', 'delta-group-va-buoc-tien-noi-luc-toi-vi-tri-thu-2', 'Bảng xếp hạng VNR500 ghi nhận bước nhảy vọt của DELTA Group trong nhóm các nhà thầu xây dựng tư nhân uy tín và lớn nhất Việt Nam.', '\n          <p>Báo chí trong nước đồng loạt đưa tin về sự bứt phá mạnh mẽ của DELTA Group với chỉ số doanh thu và lợi nhuận tăng trưởng ấn tượng.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/04/top10.webp', 'published', 1650, 1, '2026-04-15 16:00:00', '2026-09-19 11:49:06.609221', '2026-09-19 11:49:06.609221', 'b59fbbca-9446-48b5-b3a6-d1541a2aa5c5', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('17be6ed0-772d-4469-a686-7fffeab7447a', 'Tối ưu hơn - Hiệu quả hơn: Bắt đầu từ những điều nhỏ nhất!', 'toi-uu-hon-hieu-qua-hon-bat-dau-tu-nhung-dieu-nho-nhat', 'Phong trào \"Tối ưu hơn - Hiệu quả hơn: Bắt đầu từ những điều nhỏ nhất\" được DELTA Group phát động rộng rãi tại tất cả các ban chỉ huy công trường trên cả nước.', '\n          <p>Trong bối cảnh thị trường xây dựng đòi hỏi sự chuẩn xác, tiến độ và chất lượng ngày một khắt khe, Tập đoàn DELTA đã phát động phong trào <strong>\"Tối ưu hơn - Hiệu quả hơn: Bắt đầu từ những điều nhỏ nhất\"</strong> trên quy mô toàn bộ các công trường.</p>\n          <blockquote>\"Chất lượng của một công trình thế kỷ được tạo nên từ sự cẩn trọng và chuẩn mực trong từng đường nét nhỏ nhất.\" - Ban Lãnh đạo DELTA</blockquote>\n          <p>Tại DELTA, chuyển đổi số và ứng dụng BIM (Building Information Modeling) không chỉ dừng lại ở bàn làm việc của kỹ sư mà đã đi sâu vào từng tổ đội công nhân, giảm thiểu tối đa hao hụt vật liệu và nâng cao năng suất lao động.</p>\n          <h3>Các mục tiêu trọng tâm trong chiến dịch:</h3>\n          <ul>\n            <li>Áp dụng tiêu chuẩn an toàn lao động nghiêm ngặt 5S trên toàn công trường.</li>\n            <li>Kiểm soát vật tư thông qua hệ thống phần mềm quản lý kho thông minh.</li>\n            <li>Đào tạo tay nghề thực chiến định kỳ cho đội ngũ kỹ sư và công nhân.</li>\n          </ul>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/09/1V7A8103.webp', 'published', 1420, 1, '2026-09-14 15:00:00', '2026-09-19 11:49:06.557226', '2026-09-19 11:49:06.557226', 'ec731acd-3174-4662-8749-f9821f142a98', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('18ca01c5-263a-4293-b29a-afbb35efb163', 'Thi công sơn bả ngoài nhà và phào GFRC tại Dự án KĐT Phía Đông Đại Lộ Bắc Nam Thanh Hóa', 'thi-cong-son-ba-phao-gfrc-du-an-nam-ngan-thanh-hoa', 'Hạng mục thi công bả sơn mặt ngoài và lắp dựng phào chỉ bê tông sợi thủy tinh GFRC tại Phường Nam Ngạn, TP. Thanh Hóa do Tổng công ty MBLAND làm chủ đầu tư.', '\n          <p>Phào chỉ GFRC là công nghệ đòi hỏi kỹ thuật cao về độ chính xác và khả năng liên kết chịu lực. Đội ngũ kỹ thuật Trần Gia đã hoàn thành toàn diện hạng mục mặt ngoài dự án KĐT Nam Ngạn đúng tiến độ cam kết.</p>\n        ', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 'published', 890, 0, '2026-06-30 15:30:00', '2026-09-26 17:22:07.382641', '2026-09-28 10:04:21.000000', '50a79d31-b63a-4368-bba7-e4f80aa73c43', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Exterior Painting and GFRC Molding at Bac Nam Avenue Urban Area Thanh Hoa', 'Exterior coating and Glass Fiber Reinforced Concrete (GFRC) molding installation for MBLAND Corporation at Nam Ngan Ward, Thanh Hoa City.', '\n          <p>GFRC architectural moldings require high precision and structural anchoring strength. Tran Gia engineering completed all exterior facades in full compliance with design specifications.</p>\n        '),
('5328df0d-0bf3-42ed-9d6a-90050b89e984', 'Trần Gia phát động phong trào: Uy tín - Chất lượng - Chính xác trong từng chi tiết công trình', 'tran-gia-phat-dong-phong-trao-uy-tin-chat-luong-chinh-xac', 'Với phương châm \"Uy tín - Chất lượng - Chính xác\", Công ty TNHH Dịch vụ Thương mại và Xây dựng Trần Gia luôn tôn trọng và hết lòng phục vụ khách hàng, tạo nên sự khác biệt và tiện nghi bậc nhất.', '\n          <p>Với định hướng phát triển bền vững, <strong>Công ty TNHH Thương Mại Dịch Vụ và Xây Dựng Trần Gia</strong> đã từng bước đi lên và khẳng định mình là một đơn vị hàng đầu trong lĩnh vực thiết kế thi công nội thất, trần, vách, sơn bả hoàn thiện và thi công hoàn thiện xây dựng.</p>\n          <blockquote>\"Uy tín - Chất lượng - Chính xác: Sự tin tưởng và ủng hộ của Quý khách hàng là động lực thôi thúc đẩy Trần Gia ngày càng cố gắng hơn nữa.\" - Giám đốc Trần Xuân Anh</blockquote>\n          <p>Dưới sự dẫn dắt của ban lãnh đạo tâm huyết, Trần Gia đã xây dựng đội ngũ hơn 50 cán bộ – công nhân viên, trong đó có 10 cán bộ chủ chốt đảm nhiệm các vị trí kỹ thuật, quản lý và vận hành nhà máy sản xuất hiện đại.</p>\n          <h3>6 Giá trị cốt lõi tạo nên bản sắc Trần Gia:</h3>\n          <ul>\n            <li><strong>Uy tín:</strong> Giữ vững niềm tin bằng trách nhiệm và minh bạch.</li>\n            <li><strong>Tiến độ:</strong> Cam kết đúng thời gian, đảm bảo hiệu quả công việc.</li>\n            <li><strong>Chất lượng:</strong> Tỉ mỉ trong từng chi tiết, tạo giá trị bền vững.</li>\n            <li><strong>Sáng tạo:</strong> Đổi mới không ngừng, mang đến giải pháp khác biệt.</li>\n            <li><strong>Chuyên nghiệp:</strong> Làm việc tận tâm, quy trình rõ ràng, hiệu quả.</li>\n            <li><strong>Nỗ lực:</strong> Luôn phấn đấu để đạt kết quả tốt nhất.</li>\n          </ul>\n        ', 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=800&q=80', 'published', 1540, 1, '2026-09-15 15:00:00', '2026-09-26 17:22:07.334011', '2026-09-28 10:04:21.000000', 'fe8b40fc-1fb2-457f-8b44-3c451d03be88', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Tran Gia launches movement: Prestige - Quality - Precision in every construction detail', 'With the motto \"Prestige - Quality - Precision\", Tran Gia Trading Service and Construction Co., Ltd always respects and wholeheartedly serves customers, creating superior distinction and comfort.', '\n          <p>With a sustainable development orientation, <strong>Tran Gia Trading Service and Construction Co., Ltd</strong> has steadily advanced to establish itself as a premier contractor in interior fit-out, gypsum ceiling & drywall, exterior coating, GFRC moldings, and architectural finishes.</p>\n          <blockquote>\"Prestige - Quality - Precision: The trust and support of our clients are the driving force pushing Tran Gia to continuously strive for excellence.\" - Director Tran Xuan Anh</blockquote>\n          <p>Under visionary leadership, Tran Gia has developed a dedicated workforce of over 50 professionals and specialized technicians equipped with state-of-the-art machinery and precision laser alignment systems.</p>\n          <h3>6 Core Values Defining Tran Gia:</h3>\n          <ul>\n            <li><strong>Prestige:</strong> Upholding trust through responsibility and transparency.</li>\n            <li><strong>Timeline:</strong> Committed to on-time milestone delivery and work efficiency.</li>\n            <li><strong>Quality:</strong> Meticulous in every detail to create lasting value.</li>\n            <li><strong>Innovation:</strong> Continuously evolving to provide distinct solutions.</li>\n            <li><strong>Professionalism:</strong> Dedicated work ethics with streamlined processes.</li>\n            <li><strong>Diligence:</strong> Striving constantly for peak performance.</li>\n          </ul>\n        '),
('54b7360a-9e90-4d69-9ca5-e0c8c6d0e0ad', 'Thi công Trần kim loại khu vực trong nhà cho Dự án Khách sạn 5 sao Đồng Gia Hạ Long', 'thi-cong-tran-kim-loai-khach-san-5-sao-dong-gia-ha-long', 'Hợp tác cùng Viettel Construction, Trần Gia thi công hạng mục trần kim loại trong nhà cho khách sạn 5 sao cao cấp Đồng Gia tại Bãi Cháy, TP. Hạ Long, Quảng Ninh.', '\n          <p>Khách sạn 5 sao Đồng Gia tại Phường Bãi Cháy, TP. Hạ Long là một trong những dự án nghỉ dưỡng trọng điểm. Chi nhánh Công trình Viettel Hà Nội - Tổng công ty Cổ phần Công trình Viettel đã tin tưởng lựa chọn Trần Gia thi công toàn bộ hệ trần kim loại.</p>\n          <p>Sản phẩm trần kim loại được gia công chính xác, chống chịu độ ẩm môi trường biển và mang lại vẻ đẹp sang trọng, đẳng cấp quốc tế cho không gian sảnh và phòng khách sạn.</p>\n        ', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', 'published', 1100, 1, '2026-08-10 21:15:00', '2026-09-26 17:22:07.359992', '2026-09-28 10:04:21.000000', '50a79d31-b63a-4368-bba7-e4f80aa73c43', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Indoor Metal Ceiling Installation for 5-Star Dong Gia Hotel Ha Long', 'In strategic cooperation with Viettel Construction, Tran Gia executed high-grade indoor metal ceilings for 5-star Dong Gia Hotel in Bai Chay, Ha Long City.', '\n          <p>Dong Gia 5-Star Hotel in Bai Chay, Ha Long is a prestigious coastal hospitality benchmark. Tran Gia manufactured and installed architectural metal ceiling systems designed for coastal humidity resistance and high-end visual elegance.</p>\n        '),
('5536dd32-fa6d-4bb4-907a-5ecec2b7d23e', 'CHUYẾN DU LỊCH HÈ 2026: Together We Shine của DELTA Group!', 'chuyen-du-lich-he-2026-cua-delta-group-together-we-shine', 'Kỳ nghỉ hè tràn ngập niềm vui và năng lượng tích cực của đại gia đình cán bộ nhân viên DELTA với thông điệp Together We Shine.', '\n          <p>Chuyến du lịch hè thường niên là dịp để toàn thể cán bộ nhân viên nghỉ ngơi, tái tạo năng lượng sau những tháng ngày miệt mài cùng các công trình.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/06/z7887918067020_0bd1bde541cd58e52e6cb683a9e235a5.webp', 'published', 890, 0, '2026-06-18 17:00:00', '2026-09-19 11:49:06.583229', '2026-09-19 11:49:06.583229', '495f5895-cae5-4e32-a84b-97f7fba8bb84', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('55e4fb23-794b-4cfc-9f25-492ecf086cf7', 'Trần Gia hoàn thiện gói thầu Trần thạch cao và Sơn bả tại Dự án Sentosa Sky Park Hải Phòng', 'tran-gia-hoan-thien-goi-thau-tai-sentosa-sky-park-hai-phong', 'Trần Gia vinh dự được Tổng thầu DELTA-V lựa chọn là đơn vị cung cấp vật tư, thi công trần, vách thạch cao và sơn bả cho dự án cao cấp Sentosa Sky Park tại giao lộ Bùi Viện - Võ Nguyên Giáp, Lê Chân, Hải Phòng.', '\n          <p>Dự án <strong>Sentosa Sky Park Hải Phòng</strong> là tổ hợp căn hộ cao cấp tọa lạc tại vị trí đắc địa TP. Hải Phòng. Trần Gia đảm nhận gói thầu cung cấp vật tư, thi công trần, vách thạch cao và sơn bả trần thạch cao với khối lượng lớn.</p>\n          <p>Nhờ trang bị hệ thống máy laser định vị cao, máy bắn vít chuyên dụng cùng đội ngũ kỹ sư dày dạn kinh nghiệm, Trần Gia đã bàn giao từng hạng mục đạt chuẩn thẩm mỹ cao nhất, nhận được đánh giá rất cao từ Chủ đầu tư và Tổng thầu DELTA-V.</p>\n        ', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', 'published', 1320, 1, '2026-08-28 16:30:00', '2026-09-26 17:22:07.347450', '2026-09-28 10:04:21.000000', '50a79d31-b63a-4368-bba7-e4f80aa73c43', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Tran Gia completes Gypsum Ceiling and Painting package at Sentosa Sky Park Hai Phong', 'Tran Gia was selected by General Contractor DELTA-V as the materials supplier and contractor for gypsum ceilings, drywalls, and specialized painting at luxury complex Sentosa Sky Park Hai Phong.', '\n          <p>The <strong>Sentosa Sky Park Hai Phong</strong> project is an upscale residential and commercial development located in Hai Phong City. Tran Gia undertook large-scale execution of acoustic gypsum ceilings, moisture-resistant partition walls, and premium finishing paint.</p>\n          <p>Equipped with high-precision 3D laser alignment and automated fastening tools, our engineering team delivered flawless architectural aesthetics on schedule.</p>\n        '),
('5cd48c52-8bee-45a7-9a66-89d4aa4aef44', 'DELTA GROUP THAM DỰ LỄ KHỞI CÔNG TỔ HỢP CĂN HỘ NOBLE WEST LAKE HA NOI', 'delta-group-tham-du-le-khoi-cong-to-hop-can-ho-noble-west-lake-ha-noi', 'Lễ khởi công dự án căn hộ hạng sang bên bờ Hồ Tây - một trong những dự án bất động sản cao cấp được mong đợi nhất năm.', '\n          <p>Tổ hợp căn hộ Noble West Lake Ha Noi hứa hẹn sẽ là biểu tượng kiến trúc đẳng cấp mới tại khu vực Hồ Tây, do DELTA làm tổng thầu thi công.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/08/1785313263482_6710203315847274943_6710203315847274943_288611e688b6701bd4f46778934a3645.webp', 'published', 1120, 0, '2026-03-01 15:00:00', '2026-09-19 11:49:06.651171', '2026-09-19 11:49:06.651171', '51d61d3c-6424-4da5-8e6a-3b14656d81cc', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('62d51bca-e5b1-4993-a89a-197264a68408', 'Fit-out Showroom & Multifunction Area tại Nhà xưởng Tập đoàn JINYU Tây Ninh', 'fit-out-showroom-nha-xuong-tap-doan-jinyu-tay-ninh', 'Tại Lô 9 KCN Phước Đông, Trảng Bàng, Tây Ninh, Trần Gia hợp tác cùng Cogniplus Interiors hoàn thành hạng mục Fit-out khu trưng bày và hội trường đa năng Jinyu.', '\n          <p>Khu nhà xưởng hiện đại của Tập đoàn Jinyu được hoàn thiện nội thất trọn gói với các tiêu chuẩn công nghiệp cao cấp, cách âm và chống bám bụi tối ưu.</p>\n        ', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'published', 1150, 0, '2026-04-12 16:00:00', '2026-09-26 17:22:07.400254', '2026-09-26 17:22:07.400254', '50a79d31-b63a-4368-bba7-e4f80aa73c43', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('657cfe92-3128-4a6e-805f-26f42cdbca88', 'DELTA Group: Xây dựng Phố Nối House, không gian sống xanh mới tại Hưng Yên', 'pho-noi-house-kien-tao-khong-gian-xanh-cho-cu-dan-tai-hung-yen', 'Dự án Phố Nối House do DELTA Group đảm nhận thi công mang lại chuẩn mực sống mới với tiện ích đồng bộ, cảnh quan cây xanh và không gian trong lành.', '\n          <p>Với vai trò là Tổng thầu thi công, DELTA Group đã triển khai các giải pháp xây dựng tiên tiến nhất, đảm bảo tiến độ và chất lượng vượt trội cho dự án Phố Nối House.</p>\n          <p>Dự án tích hợp đầy đủ công viên cây xanh, hồ điều hòa, khu vui chơi và hạ tầng giao thông kết nối liên vùng thuận tiện.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/08/1785313263482_6710203315847274943_6710203315847274943_288611e688b6701bd4f46778934a3645.webp', 'published', 1180, 1, '2026-08-25 16:30:00', '2026-09-19 11:49:06.566420', '2026-09-19 11:49:06.566420', '51d61d3c-6424-4da5-8e6a-3b14656d81cc', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('7be29561-921b-404b-99c4-4849ef846006', 'DELTA Group vào Top 17 Doanh nghiệp tiên phong phát triển bền vững (VSCF Award 2026)', 'delta-group-vao-top-17-doanh-nghiep-tien-phong-phat-trien-ben-vung-vscf-award-2026-2', 'Tập đoàn DELTA vinh dự được xướng tên trong Top 17 Doanh nghiệp tiên phong phát triển bền vững nhờ những cam kết bảo vệ môi trường và tiêu chuẩn ESG.', '\n          <p>Tại Diễn đàn Doanh nghiệp Phát triển Bền vững Việt Nam (VSCF 2026), DELTA Group được vinh danh trong Top 17 doanh nghiệp dẫn đầu về công trình xanh và trách nhiệm xã hội.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/07/740812631_1952792258853725_1845094259528161113_n.jpg', 'published', 960, 1, '2026-07-20 21:15:00', '2026-09-19 11:49:06.574888', '2026-09-19 11:49:06.574888', 'b59fbbca-9446-48b5-b3a6-d1541a2aa5c5', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('7e37a329-383c-4c65-8053-62016efb3c02', 'Ngày hội của bé 1/6 - Nơi tiếng cười trẻ thơ kết nối những trái tim DELTA', 'ngay-hoi-cua-be-1-6-noi-tien-cuoi-tre-tho-ket-noi-nhung-trai-tim-delta', 'DELTA Group tổ chức chương trình Ngày hội Thiếu nhi 1/6 cho con em cán bộ nhân viên với nhiều hoạt động trải nghiệm vui tươi, ý nghĩa.', '\n          <p>Công đoàn và Đoàn Thanh niên DELTA Group đã tổ chức một ngày hội tràn ngập nụ cười và quà tặng dành cho các bé nhân Ngày Quốc tế Thiếu nhi 1/6.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/05/1V7A0034-scaled.jpg', 'published', 750, 0, '2026-06-01 15:30:00', '2026-09-19 11:49:06.592954', '2026-09-19 11:49:06.592954', '495f5895-cae5-4e32-a84b-97f7fba8bb84', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('80ea8ef4-02df-4450-810c-bed95e886918', 'DELTA Group tổ chức chuyến du Xuân ý nghĩa nhân ngày 8-3', 'delta-group-to-chuc-chuyen-du-xuan-y-nghia-nhan-ngay-quoc-te-phu-nu-8-3', 'Tôn vinh và gửi những lời chúc mừng tốt đẹp nhất tới toàn thể nữ cán bộ nhân viên Tập đoàn DELTA nhân ngày Quốc tế Phụ nữ.', '\n          <p>Chuyến du xuân đầu năm là món quà tri ân ý nghĩa dành tặng các chị em cán bộ nhân viên đã luôn tận tụy đồng hành cùng sự phát triển của DELTA.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/03/647422613_921195457225126_406631945977474515_n.jpg', 'published', 520, 0, '2026-03-08 16:00:00', '2026-09-19 11:49:06.643027', '2026-09-19 11:49:06.643027', '495f5895-cae5-4e32-a84b-97f7fba8bb84', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('8b69a858-176a-40d2-af23-6da86175bcd5', 'Trần Gia đồng hành thi công Chuỗi Showroom VinFast QS 3 Phía Nam', 'tran-gia-thi-cong-chuoi-showroom-vinfast-phia-nam', 'Trần Gia triển khai thi công hoàn thiện chuỗi Showroom VinFast QS 3 tại các tỉnh thành phía Nam, đáp ứng bộ nhận diện thương hiệu chuẩn quốc tế của VinFast.', '\n          <p>Hệ thống Showroom VinFast đòi hỏi tiêu chuẩn khắt khe về bề mặt sơn bả, ánh sáng và chi tiết trần vách. Trần Gia đã khẳng định năng lực triển khai đồng loạt nhiều điểm với chất lượng vượt trội.</p>\n        ', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', 'published', 1420, 1, '2026-05-18 18:00:00', '2026-09-26 17:22:07.392310', '2026-09-28 10:04:21.000000', '7f732c9d-edd8-4e5b-98d6-02a47c1ac836', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Tran Gia collaborates in constructing VinFast QS 3 Showroom Chain in Southern Region', 'Tran Gia executed fit-out and drywall installations for VinFast QS 3 Showroom networks across southern provinces in strict accordance with VinFast international brand identity.', '\n          <p>VinFast showroom identity mandates strict specifications for surface smoothness, acoustics, and lighting integration. Tran Gia proven multi-site rollout capacity ensured timely showroom launches.</p>\n        '),
('92415032-97fd-445c-a5ee-0b274f351577', 'Tổng kết chương trình đào tạo Lực lượng kế cận 2025: Học thực chất, sẵn sàng lên level', 'tong-ket-chuong-trinh-dao-tao-luc-luong-ke-can-2025-hoc-thuc-chat-san-sang-len-level', 'Đào tạo thực chất, trang bị kiến thức chuyên sâu và kỹ năng chỉ huy công trường cho đội ngũ kỹ sư trẻ tài năng của DELTA.', '\n          <p>Khóa đào tạo bồi dưỡng 60 kỹ sư hạt giống đã bế giảng thành công, sẵn sàng nhận nhiệm vụ tại các dự án trọng điểm trên toàn quốc.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/03/645202591_1326983652796043_5105919049748547586_n.jpg', 'published', 680, 0, '2026-03-15 21:00:00', '2026-09-19 11:49:06.635356', '2026-09-19 11:49:06.635356', 'ec731acd-3174-4662-8749-f9821f142a98', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('94929efb-fcbe-4b40-94d0-62736efaf88e', 'Trần Gia đẩy mạnh đầu tư hơn 300 thiết bị máy móc hiện đại phục vụ thi công đồng bộ', 'tran-gia-dau-tu-thiet-bi-may-moc-hien-dai', 'Nhằm đáp ứng các yêu cầu kỹ thuật khắt khe, Trần Gia liên tục bổ sung máy móc tân tiến: 70 máy khoan bê tông, 120 máy bắn vít, 65 máy laser định vị cao, 15 máy hàn và 40 máy cắt bàn.', '\n          <p>Ngoài các trang thiết bị phục vụ thi công sẵn có, Công ty Trần Gia không ngừng đầu tư thêm các loại máy móc hiện đại phù hợp với tiêu chuẩn công nghệ mới, đồng thời liên danh liên kết với các đơn vị cho thuê máy công trình uy tín.</p>\n          <p>Hệ thống máy móc đồng bộ giúp rút ngắn 30% thời gian thi công, giảm thiểu sai sót và đảm bảo an toàn tuyệt đối cho người lao động tại công trường.</p>\n        ', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 'published', 980, 0, '2026-07-22 17:00:00', '2026-09-26 17:22:07.369067', '2026-09-28 10:04:21.000000', '5b29a8b0-efab-497b-bef3-388d2bd44c56', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', 'Tran Gia invests in over 300 modern machinery units for synchronous construction', 'To meet stringent engineering standards, Tran Gia constantly upgrades its equipment arsenal: 70 rotary hammer drills, 120 drywall screwdrivers, 65 high-precision laser levels, and 40 table cutters.', '\n          <p>Tran Gia continuously equips project sites with standardized modern machinery, cutting site delivery lead times by 30% while upholding maximum occupational safety.</p>\n        '),
('a60ef232-0d11-4027-bdfb-5d500b83007f', 'DELTA Group triển khai dự án MIC Tower', 'delta-group-trien-khai-du-an-mic-tower', 'Khởi động gói thầu thi công phần móng và tầng hầm sâu tòa tháp tài chính MIC Tower tại trung tâm thủ đô Hà Nội.', '\n          <p>Kỹ thuật thi công cọc khoan nhồi đường kính lớn và tường vây của DELTA tiếp tục khẳng định thế mạnh số 1 trong các công trình ngầm phức tạp.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/03/647422613_921195457225126_406631945977474515_n.jpg', 'published', 910, 0, '2026-03-20 17:30:00', '2026-09-19 11:49:06.627468', '2026-09-19 11:49:06.627468', '51d61d3c-6424-4da5-8e6a-3b14656d81cc', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('aa40e05e-1973-42cf-a98c-1755dc4ac0b2', 'Trần Gia hoàn tất gói thầu Trần thạch cao tại Dự án A&T Sky Garden Bình Dương', 'hoan-tat-goi-thau-at-sky-garden-binh-duong', 'Phối hợp cùng Tổng thầu CDC Construction, Trần Gia thi công toàn bộ hệ thống trần thạch cao chất lượng cao cho chung cư cao cấp A&T Sky Garden.', '\n          <p>Dự án A&T Sky Garden tọa lạc tại Số 54C Cách Mạng Tháng 8, Phường Lái Thiêu mang lại không gian sống sang trọng cho cư dân, trong đó hệ trần thạch cao do Trần Gia thi công là điểm nhấn hoàn hảo.</p>\n        ', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 'published', 860, 0, '2026-03-25 22:00:00', '2026-09-26 17:22:07.408897', '2026-09-26 17:22:07.408897', '50a79d31-b63a-4368-bba7-e4f80aa73c43', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('aabaaa02-6638-40fe-b6e8-be58f508fef1', 'DELTA Group thúc đẩy chuyển đổi số, đón đầu xu hướng công nghệ trong ngành xây dựng', 'delta-group-thuc-day-chuyen-doi-so-don-dau-xu-huong-cong-nghe-trong-nganh-xay-dung', 'Ứng dụng mô hình thông tin công trình BIM, phần mềm ERP quản trị dự án hiện đại giúp tối ưu hóa thời gian và chi phí cho các chủ đầu tư.', '\n          <p>Chuyển đổi số là một trong những trụ cột chiến lược giúp DELTA Group bứt phá và giữ vững vị thế tiên phong trong công nghệ thi công hiện đại.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/04/anh-1.webp', 'published', 1320, 1, '2026-04-28 18:00:00', '2026-09-19 11:49:06.600881', '2026-09-19 11:49:06.600881', 'ec731acd-3174-4662-8749-f9821f142a98', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL),
('bd145e21-85eb-41b1-a22b-916bfc61b379', 'DELTA Group tham dự Lễ khởi động dự án D’. PATRIMONY', 'delta-group-tham-du-le-khoi-dong-du-an-d-patrimony', 'Lễ khởi động dự án bất động sản cao cấp D’. PATRIMONY đánh dấu sự hợp tác chiến lược giữa DELTA và các chủ đầu tư danh tiếng.', '\n          <p>Tại buổi lễ, đại diện DELTA Group cam kết huy động tối đa nhân lực, thiết bị hiện đại để hoàn thành dự án an toàn và đạt chất lượng cao nhất.</p>\n        ', 'https://deltagroup.vn/wp-content/uploads/2026/03/651000310_925865493424789_2002822399053710778_n.webp', 'published', 840, 0, '2026-03-25 22:00:00', '2026-09-19 11:49:06.617579', '2026-09-19 11:49:06.617579', '51d61d3c-6424-4da5-8e6a-3b14656d81cc', 'a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'vi', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`) VALUES
('495f5895-cae5-4e32-a84b-97f7fba8bb84', 'Văn hóa doanh nghiệp', 'van-hoa-doanh-nghiep', 'Đời sống cán bộ nhân viên, phong trào thể thao, du lịch và trách nhiệm xã hội.', '2026-09-19 11:49:06.545175', '2026-09-19 11:49:06.545175'),
('4d5f2d96-22c9-4507-84fa-f7a7576b640a', 'Bản tin Delta', 'ban-tin-delta', 'Ấn phẩm bản tin nội bộ và các hoạt động truyền thông định kỳ của Tập đoàn DELTA.', '2026-09-19 11:49:06.516073', '2026-09-19 11:49:06.516073'),
('4f3d6aa5-9b36-4806-a05e-4da69fb33453', 'Văn hóa & Đội ngũ', 'van-hoa-doi-ngu', 'Đời sống cán bộ nhân viên, chính sách đào tạo tay nghề, hoạt động thể thao và an toàn lao động.', '2026-09-26 17:22:07.309211', '2026-09-26 17:22:07.309211'),
('50a79d31-b63a-4368-bba7-e4f80aa73c43', 'Dự án & Công trình', 'du-an-cong-trinh', 'Tiến độ thi công các dự án khách sạn, trung tâm thương mại, showroom và căn hộ trên toàn quốc.', '2026-09-26 17:22:07.285949', '2026-09-26 17:22:07.285949'),
('51d61d3c-6424-4da5-8e6a-3b14656d81cc', 'Dự án tiêu biểu', 'du-an-tieu-bieu', 'Tiến độ thi công, khởi công, cất nóc và bàn giao các công trình trọng điểm toàn quốc.', '2026-09-19 11:49:06.530803', '2026-09-19 11:49:06.530803'),
('5b29a8b0-efab-497b-bef3-388d2bd44c56', 'Công nghệ & Kỹ thuật thi công', 'cong-nghe-ky-thuat', 'Giải pháp thi công trần vách thạch cao tiêu chuẩn ISO, sơn bả ngoài nhà, phào GFRC và Fit-out.', '2026-09-26 17:22:07.297587', '2026-09-26 17:22:07.297587'),
('7f732c9d-edd8-4e5b-98d6-02a47c1ac836', 'Đối tác & Khách hàng', 'doi-tac-khach-hang', 'Hợp tác chiến lược cùng các đối tác: Delta Group, Viettel Construction, CDC, Mbland, Vingroup...', '2026-09-26 17:22:07.317913', '2026-09-26 17:22:07.317913'),
('b59fbbca-9446-48b5-b3a6-d1541a2aa5c5', 'Báo chí nói về Delta', 'bao-chi-noi-ve-delta', 'Tổng hợp các bài viết, phóng sự trên các báo đài lớn về năng lực thi công của DELTA.', '2026-09-19 11:49:06.538193', '2026-09-19 11:49:06.538193'),
('ec731acd-3174-4662-8749-f9821f142a98', 'Tin hoạt động', 'tin-hoat-dong', 'Cập nhật tin tức sự kiện, tiến độ, phong trào và các cột mốc phát triển mới nhất.', '2026-09-19 11:49:06.523786', '2026-09-19 11:49:06.523786'),
('fe8b40fc-1fb2-457f-8b44-3c451d03be88', 'Tin hoạt động Trần Gia', 'tin-hoat-dong-tran-gia', 'Cập nhật tin tức hoạt động, phong trào, sự kiện nội bộ và tiến độ thi công của Trần Gia.', '2026-09-26 17:22:07.266928', '2026-09-26 17:22:07.266928');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1789792344637, 'CreateUserTable1789792344637'),
(2, 1789792350322, 'CreateCategoryTable1789792350322'),
(3, 1789792353934, 'CreateArticleTable1789792353934');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `settings`
--

CREATE TABLE `settings` (
  `key` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `settings`
--

INSERT INTO `settings` (`key`, `value`, `description`, `updatedAt`) VALUES
('site_config', '{\"company\":{\"name\":\"CÔNG TY TNHH TẬP ĐOÀN XÂY DỰNG DELTA\",\"logo\":\"https://deltagroup.vn/wp-content/uploads/2020/06/tr4-1.png\",\"whiteLogo\":\"https://deltagroup.vn/wp-content/uploads/2019/03/TRANG.png\",\"address\":\"81 Phố Quang Trung, Quận Hai Bà Trưng, Hà Nội\",\"phone\":\"(024) 3821 7885\",\"hotline\":\"(024) 3821 7885\",\"fax\":\"(024) 3974 1530\",\"email\":\"info@deltagroup.vn\",\"website\":\"https://deltagroup.vn\",\"slogan\":\"Xây dựng tương lai bằng chất lượng và chữ tín\"},\"heroBanner\":{\"title\":\"TIN TỨC – SỰ KIỆN DELTA\",\"subtext\":\"Góp ý vui lòng liên hệ :\",\"feedbackEmail\":\"info@deltagroup.vn\",\"backgroundImage\":\"https://deltagroup.vn/wp-content/uploads/2020/06/slider-news.jpg\"},\"navigation\":[{\"title\":\"TRANG CHỦ\",\"href\":\"/\"},{\"title\":\"GIỚI THIỆU\",\"href\":\"#about\",\"children\":[{\"title\":\"Lịch sử phát triển\",\"href\":\"#history\"},{\"title\":\"Đội ngũ lãnh đạo\",\"href\":\"#leadership\"},{\"title\":\"Thành tựu & Chứng nhận\",\"href\":\"#awards\"}]},{\"title\":\"LĨNH VỰC\",\"href\":\"#fields\"},{\"title\":\"DỰ ÁN\",\"href\":\"#projects\"},{\"title\":\"TRUYỀN THÔNG\",\"href\":\"/\",\"active\":true},{\"title\":\"TUYỂN DỤNG\",\"href\":\"https://deltagroup.shiring.ai/\"},{\"title\":\"LIÊN HỆ\",\"href\":\"#contact\"}],\"footer\":{\"introHeading\":\"GIỚI THIỆU\",\"fieldsHeading\":\"LĨNH VỰC\",\"newsletterHeading\":\"BẢN TIN DELTA\",\"newsletterText\":\"Đăng ký để nhận thông tin mới nhất về các dự án và tiến độ thi công từ DELTA Group.\",\"copyright\":\"Copyright © 2026 Công ty TNHH Tập đoàn Xây dựng DELTA. All rights reserved.\",\"introLinks\":[{\"title\":\"Lịch sử phát triển\",\"href\":\"#history\"},{\"title\":\"Đội ngũ lãnh đạo\",\"href\":\"#leadership\"},{\"title\":\"Văn hóa DELTA\",\"href\":\"#culture\"},{\"title\":\"Giải thưởng & Danh hiệu\",\"href\":\"#awards\"},{\"title\":\"Chính sách HSE & Chất lượng\",\"href\":\"#hse\"}],\"fieldLinks\":[{\"title\":\"Thi công công trình ngầm\",\"href\":\"#underground\"},{\"title\":\"Tổng thầu Xây dựng Dân dụng\",\"href\":\"#highrise\"},{\"title\":\"Công trình Công nghiệp & Hạ tầng\",\"href\":\"#industrial\"},{\"title\":\"Tổng thầu Design & Build\",\"href\":\"#designbuild\"},{\"title\":\"Vật liệu & Công nghệ xây dựng\",\"href\":\"#materials\"}]}}', 'Toàn bộ cấu hình hệ thống & thông tin công ty Delta Group', '2026-09-19 13:24:44.817131');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL DEFAULT 'Thành viên Trần Gia',
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `resetPasswordOtp` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `fullName`, `role`, `createdAt`, `updatedAt`, `status`, `resetPasswordOtp`, `resetPasswordExpires`) VALUES
('a143c4fa-b385-41bf-a73a-9aab1a4d6b86', 'admin', 'admin@deltagroup.vn', '$2a$10$hEI79AyfS27UTMirFl/DpeSveaMswNvXIcB72d88a6T4jQygvldYy', 'Ban Truyền Thông DELTA', 'admin', '2026-09-19 11:49:06.500955', '2026-09-19 11:49:06.500955', 'active', NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_0ab85f4be07b22d79906671d72` (`slug`),
  ADD KEY `FK_12824e4598ee46a0992d99ba553` (`categoryId`),
  ADD KEY `FK_a9c5f4ec6cceb1604b4a3c84c87` (`authorId`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_23c05c292c439d77b0de816b50` (`name`),
  ADD UNIQUE KEY `IDX_cb73208f151aa71cdd78f662d7` (`slug`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_12824e4598ee46a0992d99ba553` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_a9c5f4ec6cceb1604b4a3c84c87` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
