export interface IUser {
  id?:number;
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
  token?:string;
  message?:string;
}
