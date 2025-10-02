import { Discipline } from './discipline.model';

describe('Discipline Model', () => {
  it('should create an instance', () => {
    const discipline = new Discipline();
    expect(discipline).toBeTruthy();
  });

  it('should create discipline with properties', () => {
    const discipline = new Discipline();
    discipline.id = 1;
    discipline.name = 'Algoritmos e Estruturas de Dados';
    discipline.description = 'Introdução a algoritmos';
    discipline.workload = 80;
    discipline.semesterId = 1;
    discipline.semesterNumber = 1;
    discipline.active = true;

    expect(discipline.id).toBe(1);
    expect(discipline.name).toBe('Algoritmos e Estruturas de Dados');
    expect(discipline.description).toBe('Introdução a algoritmos');
    expect(discipline.workload).toBe(80);
    expect(discipline.semesterId).toBe(1);
    expect(discipline.semesterNumber).toBe(1);
    expect(discipline.active).toBe(true);
  });

  it('should handle timestamps', () => {
    const discipline = new Discipline();
    const now = new Date();
    
    discipline.createdAt = now;
    discipline.updatedAt = now;
    
    expect(discipline.createdAt).toBe(now);
    expect(discipline.updatedAt).toBe(now);
  });
});
