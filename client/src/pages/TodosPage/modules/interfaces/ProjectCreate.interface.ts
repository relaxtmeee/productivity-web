import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface IProjectCreate extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setOpen: Dispatch<SetStateAction<boolean>>
}