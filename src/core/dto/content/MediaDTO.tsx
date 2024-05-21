export default interface MediaDTO {
  context?: {
    caption?: string;
    alt?: string;
  };
  public_id: string;
  secure_url: string;
  url: string;

  asset_id: string;
  format:
    | "png"
    | "jpg"
    | "jpeg"
    | "mp4"
    | "pdf"
    | "ppt"
    | "docx"
    | "xls"
    | "gif"
    | "svg";
  version: number;
  resource_type: "image" | "video" | "pdf" | "raw";
  type: "upload";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  filename: string;
  access_mode: "public";
}
