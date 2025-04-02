export interface ICourses {
    ID : string;
    Name : string;
    Credit: number;
    Capacity: number;
    AbsenceLimit: number;
}

export interface IUserCourses {
    ID: string;
    Name: string;
    Credit: number;
    Capacity: number;
    AbsenceLimit: number;
    TeacherName: string;
    TeacherAuth0Id: string;
}