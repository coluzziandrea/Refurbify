import { Password } from '../password';

it('returns true on compare same password string', async () => {
  const pwdTest = 'PWD_TEST';
  const hashedPwd = await Password.toHash(pwdTest);
  expect(await Password.compare(hashedPwd, pwdTest)).toBeTruthy();
});
