import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IHTag extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    htag: 'h1' | 'h2' | 'h3';
    children: ReactNode;
}