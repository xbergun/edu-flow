using EduFlowService as ef from '../../../srv/data-provider';


annotate ef.Users with {
    fullName              @Common.Label: '{i18n>fullName}';
    email                 @Common.Label: '{i18n>email}';
    role                  @Common.Label: '{i18n>role}';
    studentNumber         @Common.Label: '{i18n>studentNumber}';
};
