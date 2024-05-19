export default interface MediaDTO {
  context?: {
    caption?: string;
    alt?: string;
  };
  public_id: string;
  secure_url: string;
  url: string;

  asset_id: string;
  format: "png" | "jpg" | "jpeg" | "mp4" | "pdf";
  version: number;
  resource_type: "image" | "video" | "pdf";
  type: "upload";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  access_mode: "public";
}

// id: string;
// title: string;
// url: string;
// description: string;
// chapterId: string;
// mediaType: string;
// mediaUploadLocation: string;
// createdAt: string;
// updatedAt: string;
// interface CloudinaryResource {
//   context?: {
//     caption?: string;
//     alt?: string;
//   };
//   public_id: string;
//   secure_url: string;
//   url: string;

//   asset_id: string;
//   format: "png" | "jpg" | "jpeg" | "mp4" | "pdf";
//   version: number;
//   resource_type: "image" | "video" | "pdf";
//   type: "upload";
//   created_at: string;
//   bytes: number;
//   width: number;
//   height: number;
//   folder: string;
//   access_mode: "public";
// }
