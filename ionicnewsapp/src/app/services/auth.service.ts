import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private USERS_KEY = 'users';
  private USER_LOGGED_KEY = 'user';

  constructor() {
    const userJson = localStorage.getItem(this.USER_LOGGED_KEY);
    if (userJson) {
      this.userSubject.next(JSON.parse(userJson));
    }
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  /** Gera hash SHA-256 de uma string */
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // Converte para string hexadecimal
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

login(email: string, password: string): Observable<User | null> {
  return from(this.hashPassword(password)).pipe(
    map(passwordHash => {
      const users = this.getAllUsers();
      const user = users.find(u => u.email === email);
      if (!user) {
        // E-mail não encontrado
        throw new Error('E-mail não cadastrado.');
      }
      if (user.passwordHash !== passwordHash) {
        // Senha incorreta
        throw new Error('Senha incorreta.');
      }
      localStorage.setItem(this.USER_LOGGED_KEY, JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    })
  );
}

register(email: string, password: string, name?: string): Observable<User | null> {
  return from(this.hashPassword(password)).pipe(
    map(passwordHash => {
      const users = this.getAllUsers();
      if (users.find(u => u.email === email)) {
        throw new Error('E-mail já cadastrado.');
      }
      const newUser: User & { passwordHash: string } = {
        id: email,
        email,
        displayName: name || email.split('@')[0],
        favorites: [],
        passwordHash,
      };
      users.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      localStorage.setItem(this.USER_LOGGED_KEY, JSON.stringify(newUser));
      this.userSubject.next(newUser);
      return newUser;
    })
  );
}

  logout(): void {
    localStorage.removeItem(this.USER_LOGGED_KEY);
    this.userSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  private getAllUsers(): any[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }
}