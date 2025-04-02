using {
    ApplicationUsers as DBUsers,
    Departments      as DBDepartments,
    Courses          as DBCourses,
    UserCourses      as DBStudentCourses,
    Programs         as DBPrograms
} from '../db/data-models';


service EduFlowService {
    entity Users       as projection on DBUsers;
    entity Departments as projection on DBDepartments;
    entity Courses     as projection on DBCourses;
    entity UserCourses as projection on DBStudentCourses;
    entity Programs    as projection on DBPrograms;
    
    function getAuth0Keys()                 returns {
        domain : String;
        clientId : String;
        redirectUri : String;
    };

    function getCurrentCreditsByStudent(
        auth0_ID : String
    ) returns {
        currentCredits : Integer;
        maxCredits : Integer;
    };

}
