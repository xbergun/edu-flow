export interface IUsers {
    ID : string;
    FullName : string;
    Email: string;
    StudentNumber: string;
    Role: string;
    IsActive: boolean;
}

export interface IUserCourses{
    CourseID : string;
    UserID : string;
    AbsenceCount: number;
    LetterGrade: string;
    EnrollmentDate: Date;
}

export interface ICourses {
    ID : string;
    Name : string;
    Credit: number;
    Capacity: number;
    AbsenceLimit: number;
}

export interface IStudents {
    ID : string;
    Name : string;
    Surname: string;
    Email: string;
    Phone: string;
    AbsenceCount: number;
}

export interface IDepartments {
    ID : string;
    Name : string;
    MaxCredit: number;
}