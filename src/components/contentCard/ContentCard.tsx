import React from 'react';
import { Image } from 'react-bootstrap';

interface Props {
    title: string;
    author: string;
    imageSource: string;
}

export default function ContentCard({ title, author, imageSource }: Props) {
    return (
        <div className="shadow rounded p-1">
            <Image className="img-responsive" width="100%" height={150} src={imageSource} alt={title}  ></Image>
            <div className="text-center m-2">
                <span className='text-capitalize fw-bold text-center'>{title}</span>
                <br />
                <span style={{ fontSize: "12px" }} className="text-center ">By: {author}</span>
            </div>
        </div>
    )
}