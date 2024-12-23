export interface JwtPayload {
    id: number; // หรือ string หาก id เป็น UUID
    username: string;
}