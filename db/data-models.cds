using {managed} from '@sap/cds/common';

type UserRole : String enum {
        Student = 'Student';
        Teacher = 'Teacher';
}

entity ApplicationUsers : managed {
        key ID            : UUID;
            auth0_id      : String(255);
            fullName      : String(100);
            email         : String(255);
            role          : UserRole;
            studentNumber : String(20);
            to_Department : Association to Departments;
}

entity Departments {
        key ID      : UUID;
            name    : String(100);
            maxAkts : Integer;
}

entity Courses {
        key ID           : UUID;
            name         : String(100);
            akts         : Integer;
            capacity     : Integer;
            absenceLimit : Integer;
            department   : Association to Departments;
            teacher      : Association to ApplicationUsers;
}

entity StudentCourses {
        key student        : Association to ApplicationUsers;
        key course         : Association to Courses;
            letterGrade    : String(2);
            absenceCount   : Integer;
            enrollmentDate : Timestamp;
}
