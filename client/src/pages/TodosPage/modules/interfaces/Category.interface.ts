export interface ICategory {
    id?: string;
    name: string;
    status: 'stopped' | 'progress' | 'complete';
    createdAt?: string;
    updatedAt?: string;
    userId: string;
}



export interface IProject {
    id?: string;
    name: string;
    status: 'stopped' | 'progress' | 'complete';
    createdAt?: string;
    updatedAt?: string;
    userId: string;
}