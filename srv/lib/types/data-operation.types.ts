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