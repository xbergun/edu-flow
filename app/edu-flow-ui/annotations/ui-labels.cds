using EduFlowService as ef from '../../../srv/data-provider';


annotate ef.Users with {
    name              @Common.Label: '{i18n>name}';
    email                 @Common.Label: '{i18n>email}';
    role                  @Common.Label: '{i18n>role}';
    studentNumber         @Common.Label: '{i18n>studentNumber}';
    isActive              @Common.Label: '{i18n>isActive}';
    auth0_ID              @Common.Label: '{i18n>auth0_ID}';
    nickname              @Common.Label: '{i18n>nickname}';
};

annotate ef.Departments with {
    name                  @Common.Label: '{i18n>departmentName}';
    maxCredits            @Common.Label: '{i18n>maxCredits}';
};

annotate ef.Programs with {
    name                  @Common.Label: '{i18n>programName}';
};

annotate ef.Courses with {
    name                  @Common.Label: '{i18n>name}';
    credits               @Common.Label: '{i18n>credits}';
    capacity              @Common.Label: '{i18n>capacity}';
    absenceLimit          @Common.Label: '{i18n>absenceLimit}';
};

annotate ef.UserCourses with {
    absenceCount          @Common.Label: '{i18n>absenceCount}';
    enrollmentDate        @Common.Label: '{i18n>enrollmentDate}';
    letterGrade           @Common.Label: '{i18n>letterGrade}';
};
