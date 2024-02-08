export const SchemaCreateArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'text'],
  properties: {
    userId: { type: 'number' },
    slug: { type: 'string' },
    title: { type: 'string' },
    text: { type: 'object' },
    categories: { type: 'array' },
    tags: { type: 'array' },
    isPublished: { type: 'boolean' },
    paid: { type: 'boolean' },
    price: { type: 'number' },
  },
};
export const SchemaUpdateArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    save: { type: 'boolean' },
    id: { type: 'number' },
    slug: { type: 'string' },
    title: { type: 'string' },
    text: { type: 'object' },
    categories: { type: 'array' },
    tags: { type: 'array' },
    isPublished: { type: 'boolean' },
    paid: { type: 'boolean' },
    price: { type: 'number' },
  },
};

export const SchemaCreateCommentArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'comment'],
  properties: {
    slug: { type: 'string' },
    userId: { type: 'number' },
    comment: { type: 'string' },
  },
};

export const SchemaUpdateCommentArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'comment'],
  properties: {
    id: { type: 'number' },
    comment: { type: 'string' },
  },
};
export const SchemaDeleteCommentArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

export const SchemaCreateLikeArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['userId', 'type', 'slug'],
  properties: {
    slug: { type: 'string' },
    userId: { type: 'number' },
    type: { type: 'number' },
  },
};
export const SchemaUpdateLikeArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'type'],
  properties: {
    id: { type: 'number' },
    type: { type: 'number' },
  },
};
export const SchemaDeleteLikeArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: { type: 'number' },
  },
};

export const SchemaGetArticleBody = {
  type: 'object',
  additionalProperties: false,
  required: ['slug'],
  properties: {
    slug: { type: 'string' },
    userId: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' },
    isPublished: { type: 'boolean' },
  },
};

export const SchemaGetFeedBody = {
  type: 'object',
  additionalProperties: false,
  required: ['limit', 'skip'],
  properties: {
    slug: { type: 'string' },
    filter: { type: 'string' },
    keyword: { type: 'string' },
    tag: { type: 'string' },
    category: { type: 'string' },
    area: { type: 'string' },
    limit: { type: 'number' },
    skip: { type: 'number' },
    isActive: { type: 'boolean' },
  },
};
