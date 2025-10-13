export interface RegisterDTO {
  email: string;
  pin?: string;
}

export interface UserDTO {
  email: string;
  id: number;
  isVerified: boolean;
}
