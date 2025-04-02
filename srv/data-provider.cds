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
    @cds.redirection.target: true
    entity Courses     as projection on DBCourses;
    entity UserCourses as projection on DBStudentCourses;
    entity Programs    as projection on DBPrograms;

    define view VHCourses as select from DBCourses distinct {
        key ID,
        name,
        credits,
        capacity,
        absenceLimit,
        to_Program.name as programName,
        to_Teacher.name as teacherName,
    };
    
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
