export enum UserRole {
    SUPER_ADMIN,
    ADMIN,
    USER,
  }

export interface ISignupBody {
   role: UserRole;
   name: string;
   email: string;
   password: string;
  }

export enum HostelType {
    MALE,
    FEMALE
}
