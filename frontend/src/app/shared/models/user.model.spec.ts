import { User } from './user.model';

describe('User Model', () => {
  it('should create an instance', () => {
    const user = new User();
    expect(user).toBeTruthy();
  });

  it('should create user with properties', () => {
    const user = new User();
    user.id = 1;
    user.name = 'João Silva';
    user.email = 'joao@academy.com';
    user.role = 'STUDENT';
    user.active = true;

    expect(user.id).toBe(1);
    expect(user.name).toBe('João Silva');
    expect(user.email).toBe('joao@academy.com');
    expect(user.role).toBe('STUDENT');
    expect(user.active).toBe(true);
  });

  it('should handle all user roles', () => {
    const user = new User();
    
    user.role = 'ADMIN';
    expect(user.role).toBe('ADMIN');
    
    user.role = 'COORDINATOR';
    expect(user.role).toBe('COORDINATOR');
    
    user.role = 'PROFESSOR';
    expect(user.role).toBe('PROFESSOR');
    
    user.role = 'STUDENT';
    expect(user.role).toBe('STUDENT');
  });

  it('should handle timestamps', () => {
    const user = new User();
    const now = new Date();
    
    user.createdAt = now;
    user.updatedAt = now;
    
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });
});
