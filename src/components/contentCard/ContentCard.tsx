import React from 'react';
import { Image } from 'react-bootstrap';

interface Props {
    title: string;
    mediaType: string;
    url: string;
}

export default function ContentCard({ title, mediaType, url }: Props) {
    return (
        <div className="shadow rounded p-1">
            {
                mediaType == "VIDEO" ? <iframe src={url}/>
                : mediaType == "DOCUMENT"
                    ? <p>Document</p>
                    : <p>Unsupported Format</p>
            }
            <div className="text-center m-2">
                <span className='text-capitalize fw-bold text-center'>{title}</span>
                <br />
                <span style={{ fontSize: "12px" }} className="text-center ">{mediaType}</span>
            </div>
        </div>
    )
}
