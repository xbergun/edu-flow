using {
    ApplicationUsers          as DBUsers,
    Departments    as DBDepartments,
    Courses        as DBCourses,
    UserCourses as DBStudentCourses
} from '../db/data-models';


service EduFlowService {
    entity Users          as projection on DBUsers;
    entity Departments    as projection on DBDepartments;
    entity Courses        as projection on DBCourses;
    entity UserCourses as projection on DBStudentCourses;

    function getUserCourses(user_ID: UUID) returns array of UserCourses;
    function getAuth0Keys() returns {
        domain: String;
        clientId: String;
        redirectUri: String;
    };

}
