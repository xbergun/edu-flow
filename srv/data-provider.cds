using {
    ApplicationUsers          as DBUsers,
    Departments    as DBDepartments,
    Courses        as DBCourses,
    StudentCourses as DBStudentCourses
} from '../db/data-models';


service EduFlowService {
    entity Users          as projection on DBUsers;
    entity Departments    as projection on DBDepartments;
    entity Courses        as projection on DBCourses;
    entity StudentCourses as projection on DBStudentCourses;
}
