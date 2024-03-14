import Auth from "@/core/dto/auth/Auth";

export default interface AuthByLevelRequest {
    auth: Auth;
    authLevels: string[];
}