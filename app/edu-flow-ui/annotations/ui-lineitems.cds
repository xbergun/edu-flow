using {EduFlowService as ef} from '../../../srv/data-provider';



annotate ef.Users with {
    to_Program @UI.HiddenFilter;
};


annotate ef.Users with @UI :{
    LineItem       : [
        {Value: name},
        {Value: email},
        {Value: role},
        {Value: nickname},
        {Value: studentNumber},
        {Value: to_Program.name},
        {Value: to_Program.to_Department.name},
        {Value: isActive}

    ],
    SelectionFields: [
        name,
        email,
        studentNumber,
        to_Program.name,
        to_Program.to_Department.name,
        isActive
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

annotate ef.Programs with @UI :{
    LineItem       : [
        {Value: name},
    ],
    SelectionFields: [
        name
    ],
};


annotate ef.Courses with @UI :{
    LineItem       : [
        {Value: name},
        {Value: credits},
        {Value: capacity},
        {Value: absenceLimit},
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
        {Value: user_auth0_ID},
        {Value: user.name},
        {Value: course.name},
        {Value: letterGrade},
        {Value: absenceCount},
        {Value: enrollmentDate},
    ],
    SelectionFields: [
        user.name,
        course.name,
        letterGrade,
        absenceCount,
        enrollmentDate
    ],
};

annotate ef.CourseRegistrations with @UI :{
    Chart  : {
        $Type : 'UI.ChartDefinitionType',
        ChartType : #Column,
        Title : 'Course Registrations',
        Description : 'Number of students registered for each course',
        Dimensions : [
            courseName
        ],
        Measures : [
            registrationCount
        ],
    },
    LineItem  : [
        {Value: courseName},
        {Value: registrationCount}
    ],
};