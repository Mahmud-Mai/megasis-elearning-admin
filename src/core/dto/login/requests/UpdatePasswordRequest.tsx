export default  interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    loginId: string;
}