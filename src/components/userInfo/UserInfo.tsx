import ImageAvater from "@/components/imageAvater/imageAvater"

interface PropInterface {
    username: string
    dp: string
    fullname: string
}

export default function UserInfo({ username, dp, fullname }: PropInterface) {
    return (
        <div>
            <ImageAvater src={dp} alt={`${username} profile picture`} />
            <strong>Admin</strong>
            <p>{fullname}</p>
        </div>
    )
}
