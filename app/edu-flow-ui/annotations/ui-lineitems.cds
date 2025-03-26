using {EduFlowService as ef} from '../../../srv/data-provider';



annotate ef.Users with {
    to_Department @UI.HiddenFilter;
} ;



annotate ef.Users with @UI :{
    LineItem       : [
        {Value: fullName},
        {Value: email},
        {Value: role},
        {Value: studentNumber},
        {Value: to_Department.name},
        {Value: isActive}

    ],
    SelectionFields: [
        fullName,
        email
    ]
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


annotate ef.UserCourses with @UI :{
    LineItem       : [
        {Value: user.fullName},
        {Value: course.name},
        {Value: letterGrade},
        {Value: absenceCount},
        {Value: enrollmentDate},
    ],
    SelectionFields: [
        user.fullName,
        course.name,
        letterGrade,
        absenceCount,
        enrollmentDate
    ],
};