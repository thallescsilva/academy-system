-- Script de seed para popular o banco de dados com dados iniciais

-- Inserir usuários iniciais
INSERT INTO users (id, name, email, password, role, active, created_at, updated_at) VALUES
(1, 'Administrador', 'admin@academico.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfF6v3z3Jg5g5g5g5g5g5g5g', 'ADMIN', true, NOW(), NOW()),
(2, 'Coordenador', 'coordenador@academico.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfF6v3z3Jg5g5g5g5g5g5g5g', 'COORDINATOR', true, NOW(), NOW()),
(3, 'Professor', 'professor@academico.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfF6v3z3Jg5g5g5g5g5g5g5g', 'PROFESSOR', true, NOW(), NOW()),
(4, 'Aluno', 'aluno@academico.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfF6v3z3Jg5g5g5g5g5g5g5g', 'STUDENT', true, NOW(), NOW());

-- Inserir cursos iniciais
INSERT INTO courses (id, name, description, total_hours, duration_semesters, active, created_at, updated_at) VALUES
(1, 'Ciência da Computação', 'Curso de graduação em Ciência da Computação', 3200, 8, true, NOW(), NOW()),
(2, 'Engenharia de Software', 'Curso de graduação em Engenharia de Software', 3200, 8, true, NOW(), NOW()),
(3, 'Sistemas de Informação', 'Curso de graduação em Sistemas de Informação', 3200, 8, true, NOW(), NOW());

-- Inserir semestres para Ciência da Computação
INSERT INTO semesters (id, number, course_id, active, created_at, updated_at) VALUES
(1, 1, 1, true, NOW(), NOW()),
(2, 2, 1, true, NOW(), NOW()),
(3, 3, 1, true, NOW(), NOW()),
(4, 4, 1, true, NOW(), NOW()),
(5, 5, 1, true, NOW(), NOW()),
(6, 6, 1, true, NOW(), NOW()),
(7, 7, 1, true, NOW(), NOW()),
(8, 8, 1, true, NOW(), NOW());

-- Inserir semestres para Engenharia de Software
INSERT INTO semesters (id, number, course_id, active, created_at, updated_at) VALUES
(9, 1, 2, true, NOW(), NOW()),
(10, 2, 2, true, NOW(), NOW()),
(11, 3, 2, true, NOW(), NOW()),
(12, 4, 2, true, NOW(), NOW()),
(13, 5, 2, true, NOW(), NOW()),
(14, 6, 2, true, NOW(), NOW()),
(15, 7, 2, true, NOW(), NOW()),
(16, 8, 2, true, NOW(), NOW());

-- Inserir semestres para Sistemas de Informação
INSERT INTO semesters (id, number, course_id, active, created_at, updated_at) VALUES
(17, 1, 3, true, NOW(), NOW()),
(18, 2, 3, true, NOW(), NOW()),
(19, 3, 3, true, NOW(), NOW()),
(20, 4, 3, true, NOW(), NOW()),
(21, 5, 3, true, NOW(), NOW()),
(22, 6, 3, true, NOW(), NOW()),
(23, 7, 3, true, NOW(), NOW()),
(24, 8, 3, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 1º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(1, 'Algoritmos e Programação I', 'Fundamentos de programação e algoritmos', 80, 1, true, NOW(), NOW()),
(2, 'Matemática Discreta', 'Fundamentos de matemática para computação', 80, 1, true, NOW(), NOW()),
(3, 'Cálculo I', 'Cálculo diferencial e integral', 80, 1, true, NOW(), NOW()),
(4, 'Introdução à Computação', 'História e fundamentos da computação', 40, 1, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 2º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(5, 'Algoritmos e Programação II', 'Estruturas de dados e algoritmos avançados', 80, 2, true, NOW(), NOW()),
(6, 'Estruturas de Dados', 'Implementação de estruturas de dados', 80, 2, true, NOW(), NOW()),
(7, 'Cálculo II', 'Cálculo diferencial e integral avançado', 80, 2, true, NOW(), NOW()),
(8, 'Física I', 'Fundamentos de física', 80, 2, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 3º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(9, 'Programação Orientada a Objetos', 'Paradigma de programação orientada a objetos', 80, 3, true, NOW(), NOW()),
(10, 'Banco de Dados I', 'Fundamentos de banco de dados', 80, 3, true, NOW(), NOW()),
(11, 'Álgebra Linear', 'Álgebra linear para computação', 80, 3, true, NOW(), NOW()),
(12, 'Física II', 'Física avançada', 80, 3, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 4º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(13, 'Estruturas de Dados Avançadas', 'Estruturas de dados complexas', 80, 4, true, NOW(), NOW()),
(14, 'Banco de Dados II', 'Banco de dados avançado', 80, 4, true, NOW(), NOW()),
(15, 'Teoria da Computação', 'Fundamentos teóricos da computação', 80, 4, true, NOW(), NOW()),
(16, 'Estatística', 'Estatística aplicada à computação', 80, 4, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 5º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(17, 'Engenharia de Software I', 'Fundamentos de engenharia de software', 80, 5, true, NOW(), NOW()),
(18, 'Redes de Computadores', 'Fundamentos de redes de computadores', 80, 5, true, NOW(), NOW()),
(19, 'Sistemas Operacionais', 'Fundamentos de sistemas operacionais', 80, 5, true, NOW(), NOW()),
(20, 'Inteligência Artificial', 'Fundamentos de inteligência artificial', 80, 5, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 6º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(21, 'Engenharia de Software II', 'Engenharia de software avançada', 80, 6, true, NOW(), NOW()),
(22, 'Compiladores', 'Fundamentos de compiladores', 80, 6, true, NOW(), NOW()),
(23, 'Grafos', 'Teoria e algoritmos em grafos', 80, 6, true, NOW(), NOW()),
(24, 'Machine Learning', 'Aprendizado de máquina', 80, 6, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 7º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(25, 'Projeto de Software', 'Desenvolvimento de projeto de software', 80, 7, true, NOW(), NOW()),
(26, 'Segurança da Informação', 'Fundamentos de segurança da informação', 80, 7, true, NOW(), NOW()),
(27, 'Computação Gráfica', 'Fundamentos de computação gráfica', 80, 7, true, NOW(), NOW()),
(28, 'Tópicos Avançados', 'Tópicos avançados em computação', 80, 7, true, NOW(), NOW());

-- Inserir disciplinas para Ciência da Computação - 8º Semestre
INSERT INTO disciplines (id, name, description, workload, semester_id, active, created_at, updated_at) VALUES
(29, 'Trabalho de Conclusão de Curso', 'Desenvolvimento do TCC', 160, 8, true, NOW(), NOW()),
(30, 'Estágio Supervisionado', 'Estágio supervisionado', 160, 8, true, NOW(), NOW());

-- Inserir matriz curricular para Ciência da Computação
INSERT INTO curriculum (id, course_id, discipline_id, active, created_at, updated_at) VALUES
-- 1º Semestre
(1, 1, 1, true, NOW(), NOW()),
(2, 1, 2, true, NOW(), NOW()),
(3, 1, 3, true, NOW(), NOW()),
(4, 1, 4, true, NOW(), NOW()),
-- 2º Semestre
(5, 1, 5, true, NOW(), NOW()),
(6, 1, 6, true, NOW(), NOW()),
(7, 1, 7, true, NOW(), NOW()),
(8, 1, 8, true, NOW(), NOW()),
-- 3º Semestre
(9, 1, 9, true, NOW(), NOW()),
(10, 1, 10, true, NOW(), NOW()),
(11, 1, 11, true, NOW(), NOW()),
(12, 1, 12, true, NOW(), NOW()),
-- 4º Semestre
(13, 1, 13, true, NOW(), NOW()),
(14, 1, 14, true, NOW(), NOW()),
(15, 1, 15, true, NOW(), NOW()),
(16, 1, 16, true, NOW(), NOW()),
-- 5º Semestre
(17, 1, 17, true, NOW(), NOW()),
(18, 1, 18, true, NOW(), NOW()),
(19, 1, 19, true, NOW(), NOW()),
(20, 1, 20, true, NOW(), NOW()),
-- 6º Semestre
(21, 1, 21, true, NOW(), NOW()),
(22, 1, 22, true, NOW(), NOW()),
(23, 1, 23, true, NOW(), NOW()),
(24, 1, 24, true, NOW(), NOW()),
-- 7º Semestre
(25, 1, 25, true, NOW(), NOW()),
(26, 1, 26, true, NOW(), NOW()),
(27, 1, 27, true, NOW(), NOW()),
(28, 1, 28, true, NOW(), NOW()),
-- 8º Semestre
(29, 1, 29, true, NOW(), NOW()),
(30, 1, 30, true, NOW(), NOW());

-- Resetar sequências
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses));
SELECT setval('semesters_id_seq', (SELECT MAX(id) FROM semesters));
SELECT setval('disciplines_id_seq', (SELECT MAX(id) FROM disciplines));
SELECT setval('curriculum_id_seq', (SELECT MAX(id) FROM curriculum));
