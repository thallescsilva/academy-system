import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users.component';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'deleteUser']);

    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        HttpClientTestingModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User,
      { id: 2, name: 'Maria Santos', email: 'maria@academy.com', role: 'PROFESSOR', active: true } as User
    ];

    userService.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should delete user', () => {
    const mockUser: User = { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User;
    component.users = [mockUser];

    userService.deleteUser.and.returnValue(of({}));

    component.deleteUser(mockUser);

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('should open create user dialog', () => {
    spyOn(component, 'openCreateDialog');

    component.createUser();

    expect(component.openCreateDialog).toHaveBeenCalled();
  });

  it('should open edit user dialog', () => {
    const mockUser: User = { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User;
    spyOn(component, 'openEditDialog');

    component.editUser(mockUser);

    expect(component.openEditDialog).toHaveBeenCalledWith(mockUser);
  });
});

import { of } from 'rxjs';
