import { Injectable} from '@angular/core';
import {UserLdap} from "../model/user-ldap";
import {LDAP_USERS} from "../model/ldap-mock-data";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users : UserLdap[] = LDAP_USERS;

  getUsers(login: string) : Observable<UserLdap[]> {
    // @ts-ignore
    return of (this.users.find(user => user.login === login));
  }
  constructor() { }
}
