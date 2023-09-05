export type SlugFilters = {
  email: string;
  slug: string;
};

export type UserQuery = {
  isActive: string;
  limit: string;
  type?: string;
};

export type SlugParams = {
  Params: SlugFilters;
  Query: UserQuery;
};
