export interface ITask {
    id?: string;
    name: string;
    description: string;
    status: 'stopped' | 'progress' | 'complete';
    createdAt?: string;
    updatedAt?: string;
    projectId: string;
}