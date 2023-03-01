import React, {FC} from "react";

export interface SelectComponentProps {
    optionValueKey: any
    optionLabelKey: any
}

export type PrimarySelectFieldProps<T extends FC<SelectComponentProps>> = {Component: T} & React.ComponentProps<T>