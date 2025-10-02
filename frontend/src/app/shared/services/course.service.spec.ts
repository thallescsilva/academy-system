import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all courses', () => {
    const mockCourses: Course[] = [
      { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course
    ];

    service.getAllCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should get course by id', () => {
    const mockCourse: Course = { id: 1, name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;

    service.getCourseById(1).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('should create course', () => {
    const newCourse: Course = { name: 'Ciência da Computação', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;
    const createdCourse: Course = { id: 1, ...newCourse } as Course;

    service.createCourse(newCourse).subscribe(course => {
      expect(course).toEqual(createdCourse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(createdCourse);
  });

  it('should update course', () => {
    const updatedCourse: Course = { id: 1, name: 'Ciência da Computação Updated', description: 'Curso de CC', totalHours: 3200, durationSemesters: 8, active: true } as Course;

    service.updateCourse(1, updatedCourse).subscribe(course => {
      expect(course).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
  });

  it('should delete course', () => {
    service.deleteCourse(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
