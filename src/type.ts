export interface ITask {
  id: string;
  _id?: string;
  task: string;
  category: string;
  isCompleted: boolean;
  description: string;
  dueDate: string;
  priority: string;
  remind: string;
  repeat: string;
  userId: string;
  createdAt: Date;
}

export interface IState {
  myTasks: ITask[];
  tab: string;
  auth: { data: IDecodedObject; isLoggedIn: boolean };
}
export interface IUser {
  email: string;
  googleId: string;
  name: string;
}
export interface IDecodedObject {
  at_hash?: string;
  aud?: string;
  azp?: string;
  email: string;
  email_verified: boolean;
  exp?: number;
  family_name: string;
  given_name: string;
  iat?: number;
  iss?: string;
  jti?: string;
  locale?: string;
  name: string;
  picture: string;
  sub: string;
}

export type DataSet = {
  label: string;
  data: number[];
  backgroundColor: string;
};

export type DataItem = {
  categoryName: string;
  months: number[];
};

export type CategoryItem = {};
