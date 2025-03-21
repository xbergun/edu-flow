using EduFlowService as ef from '../../../srv/data-provider';


annotate ef.Users with {
    fullName              @Common.Label: '{i18n>fullName}';
    email                 @Common.Label: '{i18n>email}';
    role                  @Common.Label: '{i18n>role}';
    studentNumber         @Common.Label: '{i18n>studentNumber}';
};

annotate ef.Departments with {
    name                  @Common.Label: '{i18n>name}';
    maxCredits            @Common.Label: '{i18n>maxCredits}';
};

annotate ef.Courses with {
    name                  @Common.Label: '{i18n>name}';
    credits               @Common.Label: '{i18n>credits}';
    capacity              @Common.Label: '{i18n>capacity}';
    absenceLimit          @Common.Label: '{i18n>absenceLimit}';
};