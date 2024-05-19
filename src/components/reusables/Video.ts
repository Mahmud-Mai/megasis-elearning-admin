import { useState, useEffect } from "react";

export function Video({ src }) {
  const [videoPublicId, setPublicId] = useState(publicId);
  useEffect(() => {
    setPublicId(publicId);
  }, [publicId]);
  if (videoPublicId.length === 0) {
    return <></>;
  }
  return (
    <video
      className={`${videoPublicId.length === 0 ? "hidden" : "block m-4"}`}
      autoPlay
      controls
      muted
      src={src}
    ></video>
  );
}
