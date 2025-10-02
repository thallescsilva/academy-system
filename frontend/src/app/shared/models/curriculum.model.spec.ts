import { Curriculum, CurriculumMatrix, SemesterDisciplines } from './curriculum.model';

describe('Curriculum Model', () => {
  it('should create an instance', () => {
    const curriculum = new Curriculum();
    expect(curriculum).toBeTruthy();
  });

  it('should create curriculum with properties', () => {
    const curriculum = new Curriculum();
    curriculum.id = 1;
    curriculum.courseId = 1;
    curriculum.courseName = 'Ciência da Computação';
    curriculum.disciplineId = 1;
    curriculum.disciplineName = 'Algoritmos';
    curriculum.disciplineWorkload = 80;
    curriculum.semesterId = 1;
    curriculum.semesterNumber = 1;
    curriculum.active = true;

    expect(curriculum.id).toBe(1);
    expect(curriculum.courseId).toBe(1);
    expect(curriculum.courseName).toBe('Ciência da Computação');
    expect(curriculum.disciplineId).toBe(1);
    expect(curriculum.disciplineName).toBe('Algoritmos');
    expect(curriculum.disciplineWorkload).toBe(80);
    expect(curriculum.semesterId).toBe(1);
    expect(curriculum.semesterNumber).toBe(1);
    expect(curriculum.active).toBe(true);
  });

  it('should handle timestamps', () => {
    const curriculum = new Curriculum();
    const now = new Date();
    
    curriculum.createdAt = now;
    curriculum.updatedAt = now;
    
    expect(curriculum.createdAt).toBe(now);
    expect(curriculum.updatedAt).toBe(now);
  });
});

describe('CurriculumMatrix Model', () => {
  it('should create an instance', () => {
    const matrix = new CurriculumMatrix();
    expect(matrix).toBeTruthy();
  });

  it('should create matrix with properties', () => {
    const matrix = new CurriculumMatrix();
    matrix.courseId = 1;
    matrix.courseName = 'Ciência da Computação';
    matrix.semesters = [];

    expect(matrix.courseId).toBe(1);
    expect(matrix.courseName).toBe('Ciência da Computação');
    expect(Array.isArray(matrix.semesters)).toBe(true);
  });
});

describe('SemesterDisciplines Model', () => {
  it('should create an instance', () => {
    const semesterDisciplines = new SemesterDisciplines();
    expect(semesterDisciplines).toBeTruthy();
  });

  it('should create semester disciplines with properties', () => {
    const semesterDisciplines = new SemesterDisciplines();
    semesterDisciplines.semesterId = 1;
    semesterDisciplines.semesterNumber = 1;
    semesterDisciplines.disciplines = [];

    expect(semesterDisciplines.semesterId).toBe(1);
    expect(semesterDisciplines.semesterNumber).toBe(1);
    expect(Array.isArray(semesterDisciplines.disciplines)).toBe(true);
  });
});
