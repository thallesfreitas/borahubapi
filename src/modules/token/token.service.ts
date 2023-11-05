import jwt from 'jsonwebtoken';
import dbClient from '../../lib/dbClient';

interface TokenProps {
  email?: string;
  phone?: string;
  token?: string;
  uuid?: string;
}
export const makeToken = (
  uuid: string,
  email: string,
  login: boolean = false
) => {
  // const expiresIn = login ? '5m' : '1d';
  const expiresIn = '1d';
  const token = jwt.sign(
    {
      uuid,
      email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn,
    }
  );
  console.log('++++++++++++++++++++++++++++++++++++++++++++++');
  console.log('token, expiresIn: ', expiresIn);
  console.log(token, jwt.verify(token, process.env.JWT_SECRET as string));
  console.log('++++++++++++++++++++++++++++++++++++++++++++++');
  return token;
};

export const deleteUserTokens = async (email: string) => {
  console.log('deleteUserTokens: ', email);
  return dbClient.token.deleteMany({
    where: {
      email,
      toLogin: true,
    },
  });
};
export const deleteUserTokensPhone = async (phone: string) => {
  console.log('deleteUserTokensPhone: ', phone);
  return dbClient.token.deleteMany({
    where: {
      phone,
      toLogin: true,
    },
  });
};

export const createToken = async (
  uuid: string,
  phone: string = '',
  email: string = '',
  login: boolean = false,
  page = ''
) => {
  const token = await makeToken(uuid, email || phone, login);

  return dbClient.token.create({
    data: {
      token,
      email,
      phone,
      page,
    },
  });
};

export const getToken = async ({ email, phone, token, uuid }: TokenProps) => {
  console.log(`getToken`);
  console.log('email, phone, token, uuid');
  console.log(email, phone, token, uuid);
  const tokenDB = await dbClient.token.findFirst({
    select: {
      token: true,
      page: true,
    },
    where: {
      OR: [{ email }, { phone }, { token }, { uuid }],
    },
  });

  console.log(tokenDB);
  return tokenDB;
};
export const getTokenConfirm = async ({
  email,
  phone,
  token,
  uuid,
}: TokenProps) => {
  console.log(`getToken`);
  console.log('email, phone, token, uuid');
  console.log(email, phone, token, uuid);
  const tokenDB = await dbClient.token.findFirst({
    select: {
      token: true,
      page: true,
    },
    where: {
      OR: [{ email }, { phone }, { token }, { uuid }],
      toLogin: true,
    },
  });

  console.log(tokenDB);
  return tokenDB;
};

export const changeToken = async ({ email, phone }: TokenProps) => {
  return dbClient.token.updateMany({
    where: {
      OR: [
        {
          email: {
            contains: email,
          },
        },
        {
          phone: {
            contains: phone,
          },
        },
      ],
    },
    data: {
      toLogin: true,
    },
  });
};

export const changeTokenPhone = async ({ phone }: TokenProps) => {
  console.log('changeTokenPhone');
  console.log('changeTokenPhone');
  console.log('changeTokenPhone');
  console.log(phone);
  return dbClient.token.updateMany({
    where: {
      phone,
    },
    data: {
      toLogin: true,
    },
  });
};
export const checkToken = async (token: string) => {
  // console.log('--------------==============================');
  // console.log('checkToken #97');
  // console.log(token);
  // console.log(jwt.verify(token, process.env.JWT_SECRET as string));
  // console.log('====================0-----------------------');

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err: any) {
    return err.message;
  }
};

// export const checkValidToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     return {
//       valid: true,
//       decoded,
//     };
//   } catch (err: any) {
//     return {
//       valid: false,
//       error: err.message,
//     };
//   }
// };
