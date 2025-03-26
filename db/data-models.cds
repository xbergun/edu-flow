using {managed} from '@sap/cds/common';

type UserRole : String enum {
        Student = 'Student';
        Teacher = 'Teacher';
}

entity ApplicationUsers : managed {
        key ID            : UUID;
            auth0_ID      : String(255);
            fullName      : String(100);
            email         : String(255);
            role          : UserRole default #Student;
            studentNumber : String(20);
            to_Department : Association to Departments;
            isActive      : Boolean default false;
}

entity Departments {
        key ID         : UUID;
            name       : String(100);
            maxCredits : Integer;
}

entity Courses : managed {
        key ID            : UUID;
            name          : String(100);
            credits       : Integer default 3;
            capacity      : Integer default 30;
            absenceLimit  : Integer default 4;
            to_Department : Association to Departments;
            to_Teacher    : Association to ApplicationUsers;
}

entity UserCourses {
        key user           : Association to ApplicationUsers;
            course         : Association to Courses;
            letterGrade    : String(2);
            absenceCount   : Integer;
            enrollmentDate : Timestamp;
}
