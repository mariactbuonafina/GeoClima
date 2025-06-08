export interface User {
  id: string;
  email: string;
  displayName?: string;
  favorites?: string[];
  passwordHash?: string; 
}