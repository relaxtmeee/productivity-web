export interface IProject {
    id?: string;
    name: string;
    description: string;
    status: 'stopped' | 'progress' | 'complete';
    createdAt?: string;
    updatedAt?: string;
    userId: string;
    categoryId: string;
}