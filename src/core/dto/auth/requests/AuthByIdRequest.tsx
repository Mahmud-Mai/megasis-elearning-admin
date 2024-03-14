import Auth from "@/core/dto/auth/Auth";

export default interface AuthByIdRequest {
    auth: Auth;
    id: string;
}