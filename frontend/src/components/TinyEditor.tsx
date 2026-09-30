import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { api } from '../services/api';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
}

export const TinyEditor: React.FC<TinyEditorProps> = ({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết...',
  height = 480,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await api.uploadImage(file);
      if (editorRef.current) {
        editorRef.current.insertContent(
          `<p><img src="${res.url}" alt="${file.name}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" /></p>`,
        );
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tải ảnh');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="tiny-editor-container">
      <div className="tiny-editor-quick-bar">
        <span className="tiny-bar-label">
          <Sparkles size={15} color="#FE7B00" />
          <span>Trình soạn thảo TinyMCE Rich-Text Trần Gia</span>
        </span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="tiny-quick-upload-btn"
          title="Tải ảnh trực tiếp từ máy tính chèn vào bài viết"
        >
          <Upload size={14} />
          <span>Chèn ảnh từ máy tính</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleQuickUpload}
        />
      </div>

      <Editor
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.3/tinymce.min.js"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        disabled={disabled}
        onEditorChange={(newContent) => onChange(newContent)}
        init={{
          height: height,
          menubar: 'file edit view insert format tools table help',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'table link image media | removeformat code fullscreen',
          branding: false,
          promotion: false,
          placeholder: placeholder,
          automatic_uploads: true,
          images_reuse_filename: false,
          images_upload_handler: (blobInfo) => {
            return new Promise(async (resolve, reject) => {
              try {
                const blob = blobInfo.blob();
                const res = await api.uploadImage(blob, blobInfo.filename());
                resolve(res.url || res.location || '');
              } catch (err: any) {
                reject(err.message || 'Tải ảnh lên máy chủ thất bại');
              }
            });
          },
          content_style: `
            body {
              font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
              font-size: 15px;
              line-height: 1.75;
              color: #2D3748;
              padding: 16px;
              background-color: #FFFFFF;
            }
            h1, h2, h3, h4, h5, h6 {
              color: #162D61;
              font-weight: 700;
              margin-top: 1.5em;
              margin-bottom: 0.5em;
            }
            p {
              margin-bottom: 1.2em;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
              margin: 12px auto;
              display: block;
            }
            blockquote {
              border-left: 4px solid #FE7B00;
              padding-left: 16px;
              margin: 16px 0;
              color: #4A5568;
              font-style: italic;
              background: #FFF8F0;
              padding: 12px 16px;
              border-radius: 0 6px 6px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 16px 0;
            }
            table th, table td {
              border: 1px solid #CBD5E0;
              padding: 8px 12px;
            }
            table th {
              background-color: #F7FAFC;
              color: #162D61;
            }
            ul, ol {
              padding-left: 24px;
              margin-bottom: 1.2em;
            }
            li {
              margin-bottom: 0.4em;
            }
            a {
              color: #FE7B00;
              text-decoration: underline;
            }
          `,
        }}
      />
    </div>
  );
};
