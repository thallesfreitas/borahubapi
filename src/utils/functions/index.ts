import slugify from 'slugify';

const slugifyConfig = {
  lower: true,
  strict: true,
  trim: true,
  replacement: '',
};
const letters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+';
export class Utils {
  static generateSlug(text: string): string {
    return slugify(text, slugifyConfig);
  }

  static generatePassword(): string {
    let password = '';
    for (let i = 0; i < 16; i += 1) {
      password += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return password;
  }
}
