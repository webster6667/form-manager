import React, {FC} from "react";

export interface TextComponentProps {
    error?: string
}

export type PrimaryCheckboxRadioFieldProps<T extends FC<TextComponentProps>> = {Component: T} & React.ComponentProps<T>