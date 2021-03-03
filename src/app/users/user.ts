export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  img: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUserinfo {
  postsArray: IPosts[];
  img: string;
}
