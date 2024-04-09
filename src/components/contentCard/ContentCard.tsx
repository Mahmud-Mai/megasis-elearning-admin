"use client";
import React from "react";
import ReactPlayer from "react-player";

interface Props {
  title: string;
  mediaType: string;
  url: string;
}

export default function ContentCard({ title, mediaType, url }: Props) {
  return (
    <div className="p-1">
      {mediaType == "VIDEO" ? (
        <ReactPlayer className="react-player" url={url} width="100%" />
      ) : mediaType == "DOCUMENT" ? (
        <p>Document</p>
      ) : (
        <p>Unsupported Format</p>
      )}
      <div className="text-center m-2">
        <span className="text-capitalize fw-bold text-center">{title}</span>
        <br />
        <span style={{ fontSize: "12px" }} className="text-center ">
          {mediaType}
        </span>
      </div>
    </div>
  );
}
