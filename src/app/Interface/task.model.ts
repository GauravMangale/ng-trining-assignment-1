export interface TaskObj {


    tasklist: tasklistObj[]
}

interface tasklistObj {
    AssignedTo: number 
    Status: string;
    DueDate: string;
    Priority: string;
    Comments: string;
}