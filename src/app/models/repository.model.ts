export interface IGitGubRepository {
  id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  language: string;
  owner: IOwner;
}

export interface IOwner {
  avatar_url: string;
}
