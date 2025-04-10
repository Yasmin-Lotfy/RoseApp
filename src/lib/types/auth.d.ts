declare type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  isVerifed: boolean;
  blocked: boolean;
} & DatabaseProperties;

declare type LoginResponse = {
  token: string;
  user: User;
};

declare type RegisterFields = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  rePassword: string;
  gender:string,
  phone:string
};
declare type ForgotPasswordFields = {
 
  email: string;
 
};
type VerifyCodeFields = {
  resetCode: string;
}