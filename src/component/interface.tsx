export interface IBaseUser {
  name: string;
  profession: string;
  age: Date;
}
export interface IUser extends IBaseUser {
  id: number;
}
