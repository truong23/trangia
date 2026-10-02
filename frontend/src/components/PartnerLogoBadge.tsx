import React, { useState, useEffect } from 'react';

/**
 * Trích xuất 2 chữ cái viết tắt đại diện thương hiệu (Monogram Initials)
 * Tự động loại bỏ các tiền tố/hậu tố doanh nghiệp phổ biến để lấy tên cốt lõi
 */
export const getPartnerInitials = (name?: string): string => {
  if (!name || !name.trim()) return 'TG';
  
  // Loại bỏ các từ định danh pháp nhân
  const clean = name
    .replace(/\b(TẬP ĐOÀN|CÔNG TY|CỔ PHẦN|TỔNG CÔNG TY|TNHH|TNHH MTV|GROUP|CORP|CORPORATION|HOLDINGS|CONSTRUCTION|VIỆT NAM|VN)\b/gi, '')
    .trim();
  
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    const rawWords = name.trim().split(/\s+/).filter(Boolean);
    return (rawWords[0]?.slice(0, 2) || 'TG').toUpperCase();
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
};

export interface PartnerLogoBadgeProps {
  name: string;
  logo?: string | null;
  brandColor?: string;
  size?: number;
  borderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  border?: string;
  onStatusChange?: (status: 'success' | 'error' | 'empty') => void;
}

/**
 * Component hiển thị Logo thương hiệu đối tác (Hình vuông / Icon huy hiệu)
 * Tự động fallback về Huy hiệu thương hiệu mặc định (Monogram Badge) khi:
 * 1. Người dùng không nhập logo (rỗng/null)
 * 2. Ảnh logo bị lỗi (404, mạng chặn, sai format)
 */
export const PartnerLogoBadge: React.FC<PartnerLogoBadgeProps> = ({
  name,
  logo,
  brandColor = '#0284C7',
  size = 36,
  borderRadius,
  className = '',
  style = {},
  title,
  border,
  onStatusChange,
}) => {
  const [imgError, setImgError] = useState(false);
  const trimmedLogo = logo?.trim();

  // Reset trạng thái lỗi khi đường dẫn logo thay đổi
  useEffect(() => {
    setImgError(false);
    if (!trimmedLogo) {
      onStatusChange?.('empty');
    }
  }, [trimmedLogo, onStatusChange]);

  const initials = getPartnerInitials(name);
  const actualBorderRadius = borderRadius ?? Math.max(4, Math.round(size * 0.2));
  const fontSize = Math.max(10, Math.round(size * 0.38));
  const hasValidLogo = !!trimmedLogo && !imgError;

  return (
    <div
      className={`partner-logo-badge ${className}`}
      title={title || (hasValidLogo ? `Logo: ${name}` : `Huy hiệu mặc định: ${name}`)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        borderRadius: `${actualBorderRadius}px`,
        background: '#FFFFFF',
        border: border || 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
        position: 'relative',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
    >
      {trimmedLogo && !imgError ? (
        <img
          src={trimmedLogo}
          alt={name || 'Partner Logo'}
          onError={() => {
            setImgError(true);
            onStatusChange?.('error');
          }}
          onLoad={() => {
            setImgError(false);
            onStatusChange?.('success');
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: size > 30 ? '3px' : '1px',
            display: 'block',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, #FFFFFF 0%, ${brandColor}18 100%)`,
            color: brandColor || '#0284C7',
            fontWeight: 800,
            fontSize: `${fontSize}px`,
            fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            letterSpacing: size > 32 ? '0.5px' : '0px',
            lineHeight: 1,
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default PartnerLogoBadge;
