import { userInfo } from 'os';

export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpiryDate: Date
  ) { }

  get token() {
    const currentTime = Date.now();
    const expiryTime = this._tokenExpiryDate.getTime();

    const token = currentTime > expiryTime ? null : this._token;
    return token;
  }
}
