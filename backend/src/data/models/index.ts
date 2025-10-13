export interface RegisterDTO {
  email: string;
  pin?: string;
}
// export interface User {
//   email: string;
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   pin: boolean| null;
//   isVerified: boolean;
// }

export interface UserDTO {
  email: string;
  id: number;
  isVerified: boolean;
}
