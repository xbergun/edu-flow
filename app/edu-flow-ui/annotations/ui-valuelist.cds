using EduFlowService as ef from '../../../srv/data-provider';

annotate ef.UserCourses with {
    course @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        Label         : 'Select Course',
        CollectionPath: 'VHCourses',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'course_ID',
                ValueListProperty: 'ID'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'credits'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'capacity'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'absenceLimit'
            }
        ]
    };

};
