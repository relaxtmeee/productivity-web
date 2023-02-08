import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IButton extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    children: ReactNode;
}