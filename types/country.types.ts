export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
  phone: string;
  currency: string;
}
