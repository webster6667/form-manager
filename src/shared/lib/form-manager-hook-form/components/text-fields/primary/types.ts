import React, {FC} from "react";

export interface TextComponentProps {
    error?: string,
    [key: string]: any
}

export type PrimaryTextFieldProps<T extends FC<TextComponentProps>> = {Component: T, control: any, rules?: any, validate?: (value: any) => undefined | string | Promise<any>} & React.ComponentProps<T>