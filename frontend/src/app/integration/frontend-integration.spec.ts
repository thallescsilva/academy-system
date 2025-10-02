import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { UsersComponent } from '../modules/admin/users/users.component';
import { CoursesComponent } from '../modules/coordinator/courses/courses.component';
import { UserService } from '../shared/services/user.service';
import { CourseService } from '../shared/services/course.service';
import { User } from '../shared/models/user.model';
import { Course } from '../shared/models/course.model';

describe('Frontend Integration Tests', () => {
  let appFixture: ComponentFixture<AppComponent>;
  let usersFixture: ComponentFixture<UsersComponent>;
  let coursesFixture: ComponentFixture<CoursesComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'getUserById', 'createUser', 'updateUser', 'deleteUser', 'getUsersByRole']);
    const courseServiceSpy = jasmine.createSpyObj('CourseService', ['getAllCourses', 'getCourseById', 'createCourse', 'updateCourse', 'deleteCourse']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        UsersComponent,
        CoursesComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: CourseService, useValue: courseServiceSpy }
      ]
    }).compileComponents();

    appFixture = TestBed.createComponent(AppComponent);
    usersFixture = TestBed.createComponent(UsersComponent);
    coursesFixture = TestBed.createComponent(CoursesComponent);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });

  it('should create all components', () => {
    expect(appFixture.componentInstance).toBeTruthy();
    expect(usersFixture.componentInstance).toBeTruthy();
    expect(coursesFixture.componentInstance).toBeTruthy();
  });

  it('should have working user service', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User,
      { id: 2, name: 'Maria Santos', email: 'maria@academy.com', role: 'PROFESSOR', active: true } as User
    ];

    userService.getAllUsers.and.returnValue(of(mockUsers));

    userService.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
    });

    expect(userService.getAllUsers).toHaveBeenCalled();
  });

  it('should have working course service', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course
    ];

    courseService.getAllCourses.and.returnValue(of(mockCourses));

    courseService.getAllCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
      expect(courses.length).toBe(1);
    });

    expect(courseService.getAllCourses).toHaveBeenCalled();
  });

  it('should handle user CRUD operations', () => {
    const mockUser: User = { name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User;
    const createdUser: User = { id: 1, ...mockUser } as User;

    userService.createUser.and.returnValue(of(createdUser));
    userService.updateUser.and.returnValue(of(createdUser));
    userService.deleteUser.and.returnValue(of({}));

    userService.createUser(mockUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    userService.updateUser(1, createdUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    userService.deleteUser(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    expect(userService.createUser).toHaveBeenCalledWith(mockUser);
    expect(userService.updateUser).toHaveBeenCalledWith(1, createdUser);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
  });

  it('should handle course CRUD operations', () => {
    const mockCourse: Course = { name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;
    const createdCourse: Course = { id: 1, ...mockCourse } as Course;

    courseService.createCourse.and.returnValue(of(createdCourse));
    courseService.updateCourse.and.returnValue(of(createdCourse));
    courseService.deleteCourse.and.returnValue(of({}));

    courseService.createCourse(mockCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    courseService.updateCourse(1, createdCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    courseService.deleteCourse(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    expect(courseService.createCourse).toHaveBeenCalledWith(mockCourse);
    expect(courseService.updateCourse).toHaveBeenCalledWith(1, createdCourse);
    expect(courseService.deleteCourse).toHaveBeenCalledWith(1);
  });

  it('should render app component with navigation', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });

  it('should handle user role filtering', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'João Silva', email: 'joao@academy.com', role: 'STUDENT', active: true } as User,
      { id: 2, name: 'Maria Santos', email: 'maria@academy.com', role: 'PROFESSOR', active: true } as User
    ];

    userService.getUsersByRole.and.returnValue(of([mockUsers[0]]));

    userService.getUsersByRole('STUDENT').subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].role).toBe('STUDENT');
    });

    expect(userService.getUsersByRole).toHaveBeenCalledWith('STUDENT');
  });
});

import { of } from 'rxjs';
