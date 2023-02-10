import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface IPostCreate extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setOpen: Dispatch<SetStateAction<boolean>>
}