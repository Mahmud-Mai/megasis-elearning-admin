import React from 'react'
import ImageAvater from '../imageAvater/imageAvater';

interface Props {
    title: string;
    subTitle: string;
    profilePicture: string;
}
export default function UserCard({ title, subTitle, profilePicture }: Props) {
    return (
        <div className='text-center m-1 p-3'>
            <div className="m-2 text-center">
                <ImageAvater size={50} src={profilePicture} alt="" />
            </div>
            <strong>{title}</strong>
            <div style={{ fontSize: "14px" }}>{subTitle}</div>
        </div>
    )
}
