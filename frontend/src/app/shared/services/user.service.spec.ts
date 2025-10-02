import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User,
      { id: 2, name: 'Maria Santos', email: 'maria@academy.com', role: 'PROFESSOR', active: true } as User
    ];

    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get user by id', () => {
    const mockUser: User = { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User;

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create user', () => {
    const newUser: User = { name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User;
    const createdUser: User = { id: 1, ...newUser } as User;

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should update user', () => {
    const updatedUser: User = { id: 1, name: 'João Silva Updated', email: 'joao.updated@academy.com', role: 'STUDENT', active: true } as User;

    service.updateUser(1, updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser);
  });

  it('should delete user', () => {
    service.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get users by role', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User
    ];

    service.getUsersByRole('STUDENT').subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/role/STUDENT');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
