export interface IPasswordLessAuthenticationMutationProps {
  name: string;
  email: string;
  profileImage?: string;
}
export interface IBodyOTPArgs {
  otp: number;
  userId: string;
}
