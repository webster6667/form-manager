import React, {FC} from "react";

export interface TextComponentProps {
    error?: string
}

export type PrimaryTextFieldProps<T extends FC<TextComponentProps>> = {Component: T, validate?: (value: any) => undefined | string | Promise<any>} & React.ComponentProps<T>