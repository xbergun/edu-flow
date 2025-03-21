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

annotate ef.Departments with @UI :{
    LineItem       : [
        {Value: name},
        {Value: maxCredits},
    ],
    SelectionFields: [
        name,
        maxCredits
    ],
};

annotate ef.Courses with @UI :{
    LineItem       : [
        {Value: name},
        {Value: credits},
        {Value: capacity},
        {Value: absenceLimit},
        {Value: createdBy},
        {Value: createdAt},
    ],
    SelectionFields: [
        name,
        credits,
        capacity,
        absenceLimit
    ],
};