// types/User.ts
export interface IUser {
    userId: number;         // Adding userId as suggested
    username: string;
    password: string;       // The password field for authentication
    roles?: string[];       // Optional roles, assuming a user can have multiple roles
}
