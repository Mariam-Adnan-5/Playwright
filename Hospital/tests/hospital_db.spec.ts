import {Pool} from 'pg';
import{test, expect } from 'playwright/test';
import {DataBase} from '../../nebula/test-data/enums';

let DataBaseUser = DataBase.USER;
let DataBasePassword = DataBase.PASSWORD;
let DataBaseHost = DataBase.HOST;
let DataBasePort = DataBase.PORT;
let DataBaseName = DataBase.DATABASE;

test('Discover database tables', async ({}) =>{

    const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });

    const queryResult = await connection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;")
    const tableNames = queryResult.rows.map(row => row.table_name);
    console.log('The tables names IN DATABASE :', tableNames);

})

test('Discover database columns', async ({}) =>{

    const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });

    const queryResult = await connection.query(` 
        SELECT table_name,
        column_name,data_type,
        is_nullable,
        column_default 
        FROM information_schema.columns WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position;
    `);

    console.log(' The database columns:', queryResult.rows);

})

test('Discover database relationships', async ({}) =>{

    const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });

    
    const queryResult = await connection.query(`
        SELECT
            tc.table_name,
            tc.constraint_name,
            tc.constraint_type,
            kcu.column_name,
            ccu.table_name AS referenced_table,
            ccu.column_name AS referenced_column
        FROM information_schema.table_constraints AS tc
        LEFT JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
            AND tc.table_name = kcu.table_name
        LEFT JOIN information_schema.constraint_column_usage AS ccu
            ON tc.constraint_name = ccu.constraint_name
            AND tc.table_schema = ccu.table_schema
        WHERE tc.table_schema = 'public'
        ORDER BY tc.table_name, tc.constraint_type, tc.constraint_name;
    `);

    console.log('Database constraints:', queryResult.rows);
});


// crud  in  patients table
const phone = '0599009876';
const name = 'Adnan Atta';
// create a new patient record
test('1-Create a new patient ', async () => {

     const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });
    const queryResult = await connection.query(`
        INSERT INTO Patients (patient_id, name, gender, dob ,phone, address)
    VALUES (
    nextval('seq_patients'),
     $1,
    'F',
    TO_DATE('2000-05-4', 'YYYY-MM-DD'),
     $2,
    'Hebron' 
    )
    RETURNING *;`,
    [name, phone]

    );

   console.log('New patient created:', queryResult.rows[0]);
    })
// read patient records
test('2-Read patient records', async ({}) =>{

    const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });
    const queryresult = await connection.query('select * from patients')
    const queryLength = queryresult.rows.length;
    const queryResult = await connection.query('select * from patients')
    const patientPhone=JSON.stringify(queryResult.rows[queryLength-1 ].phone)
    const patientName=JSON.stringify(queryResult.rows[queryLength-1 ].name)

    //expect(patientPhone).toBe(`"${phone}"`);
    //expect(patientName).toBe(`"${name}"`);

    console.log('Patients data:', queryResult.rows);


})
  // update a patient record
    test('3-Update a patient record', async () => {

     const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });
        // Find the test patient using the phone number from Create
    const newAddress = 'Ramallah';

    const patientResult = await connection.query(
        `SELECT patient_id
         FROM patients
         WHERE phone = $1;`,
        [phone]
    );


    const patientId = patientResult.rows[0].patient_id;

    // Update the address only
    const updateResult = await connection.query(
        `UPDATE public.patients
         SET address = $1
         WHERE patient_id = $2
         RETURNING  address;`,
        [newAddress, patientId]
    );

    expect(updateResult.rows[0].address).toBe(newAddress);

    console.log('Updated patient:', updateResult.rows[0]);
});
 // delete a patient record
test('Delete test patient from database', async () => {
    const connection = new Pool({
       user: DataBaseUser,
       password: DataBasePassword,
       host: DataBaseHost,
       port: DataBasePort,
       database: DataBaseName
    });
    // Use the same phone number from the Create test

    // Find the test patient
    const patientResult = await connection.query(
        `SELECT patient_id
         FROM public.patients
         WHERE phone = $1;`,
        [phone]
    );

    // Make sure the patient exists
    expect(patientResult.rows.length).toBe(1);

    const patientId = patientResult.rows[0].patient_id;

    // Delete the test patient
    const deleteResult = await connection.query(
        `DELETE FROM public.patients
         WHERE patient_id = $1
         RETURNING patient_id, name, phone;`,
        [patientId]
    );

    // Verify that one patient was deleted
    expect(deleteResult.rows[0].phone).toBe(phone);

    // Verify that the patient no longer exists
    const verifyResult = await connection.query(
        `SELECT patient_id
         FROM public.patients
         WHERE phone = $1;`,
        [phone]
    );

    console.log('Deleted patient:', deleteResult.rows[0]);
});
