export type Repository = {
  id: number;
  name: string;
  full_name: string;
  language: string;
  visibility: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};
