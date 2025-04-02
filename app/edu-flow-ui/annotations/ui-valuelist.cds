using EduFlowService as ef from '../../../srv/data-provider';

annotate ef.UserCourses with {
    course @Common.ValueList : {
        $Type: 'Common.ValueListType',
        Label: 'Select Course',
        CollectionPath: 'VHCourses',
        Parameters: [
            {
                $Type: 'Common.ValueListParameterOut',
                LocalDataProperty: 'course_ID',
                ValueListProperty: 'ID'
            },
            {
                $Type: 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'name'
            }
        ]
    };
};      
