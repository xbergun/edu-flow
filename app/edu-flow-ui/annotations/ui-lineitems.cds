using {EduFlowService as ef} from '../../../srv/data-provider';


annotate ef.Users with @UI :{
    LineItem       : [
        {Value: fullName},
        {Value: email},
        {Value: role},
        {Value: studentNumber},

    ],
    SelectionFields: [
        fullName,
        email
    ],
};
