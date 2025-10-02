import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './courses.component';
import { CourseService } from '../../../shared/services/course.service';
import { Course } from '../../../shared/models/course.model';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    const courseServiceSpy = jasmine.createSpyObj('CourseService', ['getAllCourses', 'deleteCourse']);

    await TestBed.configureTestingModule({
      imports: [
        CoursesComponent,
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
        { provide: CourseService, useValue: courseServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course
    ];

    courseService.getAllCourses.and.returnValue(of(mockCourses));

    component.ngOnInit();

    expect(courseService.getAllCourses).toHaveBeenCalled();
    expect(component.courses).toEqual(mockCourses);
  });

  it('should delete course', () => {
    const mockCourse: Course = { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;
    component.courses = [mockCourse];

    courseService.deleteCourse.and.returnValue(of({}));

    component.deleteCourse(mockCourse);

    expect(courseService.deleteCourse).toHaveBeenCalledWith(1);
  });

  it('should open create course dialog', () => {
    spyOn(component, 'openCreateDialog');

    component.createCourse();

    expect(component.openCreateDialog).toHaveBeenCalled();
  });

  it('should open edit course dialog', () => {
    const mockCourse: Course = { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;
    spyOn(component, 'openEditDialog');

    component.editCourse(mockCourse);

    expect(component.openEditDialog).toHaveBeenCalledWith(mockCourse);
  });
});

import { of } from 'rxjs';
