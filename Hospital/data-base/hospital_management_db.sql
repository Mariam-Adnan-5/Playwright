-- rename db
ALTER DATABASE quize_db RENAME TO hospital_management_db;

-- create  4 tables
CREATE TABLE Patients(
patient_id INT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
gender CHAR(1),
dob DATE,
phone VARCHAR(10) UNIQUE,
address VARCHAR(200));

CREATE TABLE Doctors(
doctor_id INT PRIMARY KEY,
doctor_name VARCHAR(100) NOT NULL,
gender CHAR(1),
specialty VARCHAR(50),
email VARCHAR(50),
phone VARCHAR(10) UNIQUE);

-- select 
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

select * from appointments_update_log;

CREATE TABLE Departments(
 department_id INT PRIMARY KEY,
department_name VARCHAR(100) NOT NULL,
floor INT,
phone VARCHAR(10) UNIQUE);


CREATE TABLE Appointments(
appointment_id INT PRIMARY KEY,
appointment_date DATE
);

-- Alter table coulmn
ALTER TABLE Doctors 
ADD COLUMN Department_id INT;

ALTER TABLE Appointments
ADD COLUMN patient_id INT, 
ADD COLUMN doctor_id INT;

ALTER TABLE Doctors 
ADD CONSTRAINT fk_doctor_department
FOREIGN KEY (department_id)
REFERENCES Departments(department_id);

ALTER TABLE Appointments
ADD CONSTRAINT fk_appointment_patient
FOREIGN KEY (patient_id)
REFERENCES Patients(patient_id);

ALTER TABLE Appointments 
ADD CONSTRAINT fk_appointment_doctor
FOREIGN KEY (doctor_id) 
REFERENCES Doctors(doctor_id);

--
CREATE SEQUENCE seq_departments
START WITH 1 INCREMENT BY 1 NO CYCLE;

CREATE SEQUENCE seq_patients 
START WITH 1 INCREMENT BY 1 NO CYCLE;

CREATE SEQUENCE seq_doctors 
START WITH 1 INCREMENT BY 1 NO CYCLE;

CREATE SEQUENCE seq_appointments 
START WITH 1 INCREMENT BY 1 NO CYCLE;

--
CREATE MATERIALIZED VIEW appointments_full_mv
AS
SELECT 
    a.appointment_id,
    a.appointment_date,
    p.name AS patient_name,
    d.doctor_name AS doctor_name,
    dp.department_name
FROM Appointments a
JOIN Patients p ON a.patient_id = p.patient_id
JOIN Doctors d ON a.doctor_id = d.doctor_id
JOIN Departments dp ON d.department_id = dp.department_id;

CREATE MATERIALIZED VIEW doctor_appointment_count_mv
AS
SELECT 
    d.doctor_id,
    d.doctor_name AS doctor_name,
    COUNT(a.appointment_id) AS total_appointments
FROM Doctors d
LEFT JOIN Appointments a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id, d.doctor_name;

-- insert in tables
INSERT INTO Departments (department_id, department_name, floor, phone)
VALUES (nextval('seq_departments'),
'قسم الجراحة',
2,
059511002 );

INSERT INTO Departments (department_id, department_name, floor, phone)
VALUES (nextval('seq_departments'),
'قسم الأطفال',
3,
059511003 );

INSERT INTO Doctors (doctor_id, doctor_name, gender, specialty,email,phone, department_id)
VALUES (
    nextval('seq_doctors'),
    'د. أحمد حسين',
    'M',
    'طوارىء',
     'Ahmad@gmail.com',
    '0591234567',
    1 );
	
INSERT INTO Doctors (doctor_id, doctor_name, gender, specialty,email,phone, department_id)
VALUES (
    nextval('seq_doctors'),
    'الاء أحمد',
    'F',
    'الجراحة',
     'ALLA@gmail.com',
    '0591234568',
    2 );
	
INSERT INTO Patients (patient_id, name, gender, dob, phone, address)
VALUES (
    nextval('seq_patients'),
    'أحمد محمد',
    'M',
    TO_DATE('1999-05-4', 'YYYY-MM-DD'),
    '0598765432',
    'غزة - االوسطى'
);

INSERT INTO Appointments (appointment_id, appointment_date, patient_id, doctor_id)
VALUES (
  nextval('seq_appointments'),
   TO_DATE('2025-07-25', 'YYYY-MM-DD'),
   1,
   1
);

-- insert function

CREATE OR REPLACE PROCEDURE insert_patient (
    p_name      VARCHAR,
    p_gender    CHAR,
    p_dob       DATE,
    p_phone     VARCHAR,
    p_address   VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Patients (patient_id, name, gender, dob, phone, address)
    VALUES (
        nextval('seq_patients'),
        p_name,
        p_gender,
        p_dob,
        p_phone,
        p_address
    );
END;
$$;

CREATE OR REPLACE FUNCTION insert_doctor (
    p_name          VARCHAR,
    p_gender        CHAR(1),
    p_specialty     VARCHAR,
    p_phone         VARCHAR,
    p_department_id INT
)
RETURNS void AS $$
BEGIN
    INSERT INTO Doctors (doctor_id, doctor_name, gender, specialty, phone, department_id)
    VALUES (
        nextval('seq_doctors'),
        p_name, p_gender, p_specialty, p_phone, p_department_id
    );
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_department (
    p_name   VARCHAR,
    p_floor  INT,
    p_phone  VARCHAR
)
RETURNS void AS $$
BEGIN
    INSERT INTO Departments (department_id, department_name, floor, phone)
    VALUES (
        nextval('seq_departments'),
        p_name, p_floor, p_phone
    );
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_appointment (
    p_patient_id INT,
    p_doctor_id  INT,
    p_date   DATE
)
RETURNS void AS $$
BEGIN
    INSERT INTO Appointments (appointment_id, appointment_date, patient_id, doctor_id)
    VALUES (
        nextval('seq_appointments'), p_date,
        p_patient_id, p_doctor_id
    );
END;
$$ LANGUAGE plpgsql;

-- update function
CREATE OR REPLACE FUNCTION update_patient (
    p_id        INTEGER,
    p_name      VARCHAR,
    p_gender    CHAR(1),
    p_dob       DATE,
    p_phone     VARCHAR,
    p_address   VARCHAR
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Patients
    SET name = p_name,
        gender = p_gender,
        dob = p_dob,
        phone = p_phone,
        address = p_address
    WHERE patient_id = p_id;
END;
$$;
CREATE OR REPLACE FUNCTION update_doctor (
    p_id            INTEGER,
    p_name          VARCHAR,
    p_gender        CHAR(1),
    p_specialty     VARCHAR,
    p_email         VARCHAR,
    p_phone         VARCHAR,
    p_department_id INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Doctors
    SET doctor_name = p_name,
        gender = p_gender,
        specialty = p_specialty,
        email = p_email,
        phone = p_phone,
        department_id = p_department_id
    WHERE doctor_id = p_id;
END;
$$;
CREATE OR REPLACE FUNCTION update_appointment (
    p_id         INTEGER,
    p_date       DATE,
    p_patient_id INTEGER,
    p_doctor_id  INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Appointments
    SET appointment_date = p_date,
        patient_id = p_patient_id,
        doctor_id = p_doctor_id
    WHERE appointment_id = p_id;
END;
$$;
CREATE OR REPLACE FUNCTION update_department (
    p_id    INTEGER,
    p_name  VARCHAR,
    p_floor VARCHAR,
    p_phone VARCHAR
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Departments
    SET department_name = p_name,
        floor = p_floor,
        phone = p_phone
    WHERE department_id = p_id;
END;
$$;

-- delete function
CREATE OR REPLACE PROCEDURE delete_patient (
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Patients
    WHERE patient_id = p_id;
END;
$$;
CREATE OR REPLACE PROCEDURE delete_doctor (
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Doctors
    WHERE doctor_id = p_id;
END;
$$;
CREATE OR REPLACE PROCEDURE delete_department (
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Departments
    WHERE department_id = p_id;
END;
$$;
CREATE OR REPLACE PROCEDURE delete_appointment (
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Appointments
    WHERE appointment_id = p_id;
END;
$$;

-- details function
CREATE OR REPLACE FUNCTION get_patient_details (
    p_id INTEGER
)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_result VARCHAR(1000);
BEGIN
    SELECT
        'ID: ' || patient_id::TEXT ||
        ', Name: ' || name ||
        ', Gender: ' || gender ||
        ', DOB: ' || dob::TEXT ||
        ', Phone: ' || phone ||
        ', Address: ' || address
    INTO v_result
    FROM Patients
    WHERE patient_id = p_id;
    IF NOT FOUND THEN
        RETURN 'There is no patient with this name';
    END IF;
    RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION get_doctor_info(p_id INTEGER)
RETURNS VARCHAR AS $$
DECLARE
    v_result  VARCHAR(1000);
BEGIN
   SELECT
                'Name: ' ||doctor_name||
                ', Gender: ' ||gender||
                ', Specialty: '||specialty||
                ', Email: ' ||email||
                ', Phone: ' ||phone||
                ', Department ID: ' || department_id
    INTO   v_result
    FROM   Doctors
    WHERE  doctor_id = p_id;
    IF NOT FOUND THEN
        RETURN 'Doctor not found';
    END IF;
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_appointment_details (
    p_id INTEGER
)
RETURNS VARCHAR(1000)
AS $$
DECLARE
    v_result VARCHAR(1000);
BEGIN
    SELECT
        'Appointment ID: ' || a.appointment_id ||
        ', Date: ' || a.appointment_date ||
        ', Patient ID: ' || a.patient_id ||
        ', Doctor ID: ' || a.doctor_id
    INTO v_result
    FROM Appointments a
    WHERE a.appointment_id = p_id;
    IF v_result IS NULL THEN
        RETURN 'There is no appointment with this number';
    ELSE
        RETURN v_result;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_department_info(p_id INTEGER)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_result VARCHAR(1000);
BEGIN
    SELECT
          'Name: ' || department_name ||
           ', Floor: ' || floor ||
            ', Phone: ' || phone
    INTO   v_result
    FROM   Departments
    WHERE  department_id = p_id;
    IF NOT FOUND THEN
        RETURN 'There is no Ddepartment with this number';
    END IF;
    RETURN v_result;
END;
$$;
CREATE OR REPLACE FUNCTION get_department_info(p_id INTEGER)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_result VARCHAR(1000);
BEGIN
    SELECT
          'Name: ' || department_name ||
           ', Floor: ' || floor ||
            ', Phone: ' || phone
    INTO   v_result
    FROM   Departments
    WHERE  department_id = p_id;
    IF NOT FOUND THEN
        RETURN 'There is no Ddepartment with this number';
    END IF;
    RETURN v_result;
END;
$$;
-- update
CREATE TABLE patients_update_log (
  old_patient_id    INTEGER,
  old_name          VARCHAR(100),
  old_gender        VARCHAR(10),
  old_dob           DATE,
  old_phone         VARCHAR(20),
  old_address       VARCHAR(200),
  new_patient_id    INTEGER,
  new_name          VARCHAR(100),
  new_gender        VARCHAR(10),
  new_dob           DATE,
  new_phone         VARCHAR(20),
  new_address       VARCHAR(200),
  updated_by        VARCHAR(30),
  update_time       TIMESTAMP
);


CREATE OR REPLACE FUNCTION trg_log_patients_update_func()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO patients_update_log (
    old_patient_id, old_name, old_gender, old_dob, old_phone, old_address,
    new_patient_id, new_name, new_gender, new_dob, new_phone, new_address,
    updated_by, update_time
  )
  VALUES (
    OLD.patient_id, OLD.name, OLD.gender, OLD.dob, OLD.phone, OLD.address,
    NEW.patient_id, NEW.name, NEW.gender, NEW.dob, NEW.phone, NEW.address,
    CURRENT_USER, NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_patients_update
AFTER UPDATE ON patients
FOR EACH ROW
EXECUTE FUNCTION trg_log_patients_update_func();
CREATE TABLE doctors_update_log (
old_doctor_id     INTEGER,
old_doctor_name          VARCHAR(100),
old_gender        VARCHAR(10),
old_specialty     VARCHAR(100),
old_email         VARCHAR(100),
old_phone         VARCHAR(20),
old_department_id INTEGER,
new_doctor_id     INTEGER,
new_doctor_name          VARCHAR(100),
new_gender        VARCHAR(10),
new_specialty     VARCHAR(100),
new_email         VARCHAR(100),
new_phone         VARCHAR(20),
new_department_id INTEGER,
updated_by        VARCHAR(30),
update_time       TIMESTAMP
);

CREATE OR REPLACE FUNCTION trg_log_doctors_update_func()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO doctors_update_log (
    old_doctor_id, old_doctor_name, old_gender, old_specialty, old_email, old_phone, old_department_id,
    new_doctor_id, new_doctor_name, new_gender, new_specialty, new_email, new_phone, new_department_id,
    updated_by, update_time
  )
  VALUES (
    OLD.doctor_id, OLD.doctor_name, OLD.gender, OLD.specialty, OLD.email, OLD.phone, OLD.department_id,
    NEW.doctor_id, NEW.doctor_name, NEW.gender, NEW.specialty, NEW.email, NEW.phone, NEW.department_id,
    CURRENT_USER, NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_doctors_update
AFTER UPDATE ON doctors
FOR EACH ROW
EXECUTE FUNCTION trg_log_doctors_update_func();
CREATE TABLE departments_update_log (
  old_department_id INTEGER,
  old_department_name VARCHAR(100),
  old_floor        VARCHAR(10),
  old_phone        VARCHAR(20),
  new_department_id INTEGER,
  new_department_name VARCHAR(100),
  new_floor        VARCHAR(10),
  new_phone        VARCHAR(20),
  updated_by       VARCHAR(30),
  update_time      TIMESTAMP
);


CREATE OR REPLACE FUNCTION trg_log_departments_update_func()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO departments_update_log (
    old_department_id, old_department_name, old_floor, old_phone,
    new_department_id, new_department_name, new_floor, new_phone,
    updated_by, update_time
  )
  VALUES (
    OLD.department_id, OLD.department_name, OLD.floor, OLD.phone,
    NEW.department_id, NEW.department_name, NEW.floor, NEW.phone,
    CURRENT_USER, NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_departments_update
AFTER UPDATE ON departments
FOR EACH ROW
EXECUTE FUNCTION trg_log_departments_update_func();
CREATE TABLE appointments_update_log (
  old_appointment_id  INTEGER,
  old_patient_id      INTEGER,
  old_doctor_id       INTEGER,
  old_appointment_date DATE,
  new_appointment_id  INTEGER,
  new_patient_id      INTEGER,
  new_doctor_id       INTEGER,
  new_appointment_date DATE,
  updated_by          VARCHAR(30),
  update_time         TIMESTAMP
);

CREATE OR REPLACE FUNCTION trg_log_appointments_update_func()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO appointments_update_log (
    old_appointment_id, old_patient_id, old_doctor_id, old_appointment_date,
    new_appointment_id, new_patient_id, new_doctor_id, new_appointment_date,
    updated_by, update_time
  )
  VALUES (
    OLD.appointment_id, OLD.patient_id, OLD.doctor_id, OLD.appointment_date,
    NEW.appointment_id, NEW.patient_id, NEW.doctor_id, NEW.appointment_date,
    CURRENT_USER, NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_appointments_update
AFTER UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION trg_log_appointments_update_func();
CREATE OR REPLACE FUNCTION prevent_dml_on_dob_func()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'no insert,update,delete in dob column';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_dml_on_dob_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'no insert,update,delete in dob column';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_dml_on_dob
BEFORE INSERT OR UPDATE OR DELETE ON patients
FOR EACH STATEMENT
EXECUTE FUNCTION prevent_dml_on_dob_trigger_func();

