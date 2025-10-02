import { Semester } from './semester.model';

describe('Semester Model', () => {
  it('should create an instance', () => {
    const semester = new Semester();
    expect(semester).toBeTruthy();
  });

  it('should create semester with properties', () => {
    const semester = new Semester();
    semester.id = 1;
    semester.number = 1;
    semester.courseId = 1;
    semester.courseName = 'Ciência da Computação';
    semester.active = true;

    expect(semester.id).toBe(1);
    expect(semester.number).toBe(1);
    expect(semester.courseId).toBe(1);
    expect(semester.courseName).toBe('Ciência da Computação');
    expect(semester.active).toBe(true);
  });

  it('should handle timestamps', () => {
    const semester = new Semester();
    const now = new Date();
    
    semester.createdAt = now;
    semester.updatedAt = now;
    
    expect(semester.createdAt).toBe(now);
    expect(semester.updatedAt).toBe(now);
  });
});
