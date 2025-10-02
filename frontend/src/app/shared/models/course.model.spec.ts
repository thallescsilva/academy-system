import { Course } from './course.model';

describe('Course Model', () => {
  it('should create an instance', () => {
    const course = new Course();
    expect(course).toBeTruthy();
  });

  it('should create course with properties', () => {
    const course = new Course();
    course.id = 1;
    course.name = 'Ciência da Computação';
    course.description = 'Curso de graduação em CC';
    course.totalHours = 3200;
    course.durationSemesters = 8;
    course.active = true;

    expect(course.id).toBe(1);
    expect(course.name).toBe('Ciência da Computação');
    expect(course.description).toBe('Curso de graduação em CC');
    expect(course.totalHours).toBe(3200);
    expect(course.durationSemesters).toBe(8);
    expect(course.active).toBe(true);
  });

  it('should handle timestamps', () => {
    const course = new Course();
    const now = new Date();
    
    course.createdAt = now;
    course.updatedAt = now;
    
    expect(course.createdAt).toBe(now);
    expect(course.updatedAt).toBe(now);
  });

  it('should handle semesters array', () => {
    const course = new Course();
    course.semesters = [];
    
    expect(course.semesters).toEqual([]);
    expect(Array.isArray(course.semesters)).toBe(true);
  });
});
