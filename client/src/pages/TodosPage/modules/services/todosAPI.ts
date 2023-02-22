import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { ICategory } from "../interfaces/Category.interface";
import { IProject } from "../interfaces/Project.interface";
import { ITask } from "../interfaces/Task.interface";


export async function getCategories (userId: string) : Promise<ICategory[] | undefined | string> {
    try {
        if(typeof userId !== "undefined") {
            const { data } = await $authHost.get<ICategory[]>(process.env.REACT_APP_API + `/category/?userId=${userId}`);
            return data;
        }
    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}



export async function createNewCategory ({name, status, userId}: ICategory) : Promise<ICategory | undefined | string> {
    try {
        if(typeof userId !== "undefined") {
            const { data } = await $authHost.post<ICategory>(process.env.REACT_APP_API + `/category`, {name, status, userId});
            return data;
        }
    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}

// http://localhost:5001/api/projects?userId=35&categoryId=2

export async function getCategoryProjects (categoryId: string) : Promise<IProject[] | undefined | string> {
    try {
        // if(typeof userId !== "undefined") {
            const { data } = await $authHost.get<IProject[]>(process.env.REACT_APP_API + `/projects?categoryId=${categoryId}`);
            return data;
        // }
    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}

export async function createCategoryProject (project: IProject) : Promise<IProject | undefined | string> {
    try {
        const { data } = await $authHost.post<IProject>(process.env.REACT_APP_API + `/projects`, project);
            
        return data;

    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}

export async function deleteCategoryProject(id: string): Promise<1 | 0 | undefined | string> {
    try {

        const { data } = await $authHost.delete<1 | 0>(process.env.REACT_APP_API + `/projects/${id}`);
        
        return data;

    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}


export async function getProjectTasks (projectId: string): Promise<ITask[] | undefined | string> {
    try {

        const { data } = await $authHost.get<ITask[]>(process.env.REACT_APP_API + `/task?projectId=${projectId}`);
            
        return data;

    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}


export async function createProjectTask(task: ITask): Promise<ITask | undefined | string> {
    try {

        const { data } = await $authHost.post<ITask>(process.env.REACT_APP_API + `/task`, task);
            
        return data;

    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}



export async function deleteProjectTask(id: string): Promise<1 | 0 | undefined | string> {
    try {

        const { data } = await $authHost.delete<1 | 0>(process.env.REACT_APP_API + `/task/${id}`);
        
        return data;

    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}