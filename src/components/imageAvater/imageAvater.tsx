import { Image } from "react-bootstrap";
import AvaterStyle from "./imageAvater.module.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Prop {
    src: string;
    alt: string;
    size?: number;
}


export default function ImageAvater({ src, alt = "", size = 35 }: Prop) {
    return (
        <div className="text-center d-flex align-items-center justify-content-center">
            {
                src == "" ?
                    <div style={{ height: `${size}px`, width: `${size}px`, borderRadius: "50%" }} className=" shadow-4 border border-primary flex items-center align-middle justify-center">
                        {alt == "" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg> : <div className="uppercase font-bold" style={{ fontSize: "25px" }}>{alt.substring(0, 1)}</div>}
                    </div>
                    :
                    <Avatar>
                        <AvatarImage height={size} width={size} src={src} />
                        <AvatarFallback>{alt}</AvatarFallback>
                    </Avatar>
            }
        </div>
    )
}