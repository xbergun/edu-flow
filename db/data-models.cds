using {managed} from '@sap/cds/common';

type UserRole : String enum {
        Student = 'Student';
        Teacher = 'Teacher';
}

entity ApplicationUsers : managed {
        key auth0_ID      : String(255);
            name          : String(100);
            nickname      : String(100);
            email         : String(50);
            picture       : String(255);
            role          : UserRole default #Student;
            studentNumber : String(20);
            to_Program    : Association to one Programs;
            isActive      : Boolean default true;
}

entity Departments {
        key ID         : UUID;
            name       : String(100);
            maxCredits : Integer;
}

entity Programs {
        key ID            : UUID;
            name          : String(100);
            to_Department : Association to one Departments;
}

entity Courses : managed {
        key ID           : UUID;
            name         : String(100);
            credits      : Integer default 3;
            capacity     : Integer default 30;
            absenceLimit : Integer default 4;
            to_Program   : Association to one Programs;
            to_Teacher   : Association to one ApplicationUsers;
}

entity UserCourses {
        key ID             : UUID;
            user           : Association to ApplicationUsers;
            course         : Association to Courses;
            letterGrade    : String(2);
            absenceCount   : Integer;
            enrollmentDate : Timestamp;
}

view CourseRegistrations as
        select from UserCourses {
                key course.ID     as courseId          : UUID,
                    course.name   as courseName        : String(100),
                    count(ID)     as registrationCount : Integer
        }
        group by
                course.ID,
                course.name;
