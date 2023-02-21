import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface ITaskCreate extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setOpen: Dispatch<SetStateAction<boolean>>
}