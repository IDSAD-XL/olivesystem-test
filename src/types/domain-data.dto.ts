export type DomainData = {
  email?: string;
  ip_address?: string;
  username?: string;
  password?: string;
  hashed_password?: string;
  name?: string;
  vin?: string;
  address?: string;
  phone?: string;
  database_name?: string;
};

export type DomainDataResponse = {
  entries: DomainData[];
  total: number;
};
