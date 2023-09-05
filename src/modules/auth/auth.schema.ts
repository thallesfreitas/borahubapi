export const SignupBody = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'email', 'password', 'passwordConfirm'],
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      maxLength: 50,
    },
    passwordConfirm: {
      type: 'string',
      maxLength: 50,
    },
  },
};

export const SigninBody = {
  type: 'object',
  additionalProperties: false,
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
      maxLength: 50,
    },
  },
};

export const SigninBodyWithEmail = {
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    email: {
      type: 'string',
    },
    page: {
      type: 'string',
    },
  },
};
export const CreateTokenToValidation = {
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    email: {
      type: 'string',
    },
    sendEmailOrWhats: {
      type: 'string',
    },
  },
};

export const SigninOauthBody = {
  type: 'object',
  additionalProperties: false,
  required: ['token'],
  properties: {
    token: {
      type: 'string',
    },
  },
};

export const forgetPasswordBody = {
  type: 'object',
  additionalProperties: false,
  required: ['email'],
  properties: {
    email: {
      type: 'string',
    },
  },
};

export const resetPasswordBody = {
  type: 'object',
  additionalProperties: false,
  required: ['token', 'password', 'passwordConfirm'],
  properties: {
    token: {
      type: 'string',
    },
    password: {
      type: 'string',
      maxLength: 50,
    },
    passwordConfirm: {
      type: 'string',
      maxLength: 50,
    },
  },
};
