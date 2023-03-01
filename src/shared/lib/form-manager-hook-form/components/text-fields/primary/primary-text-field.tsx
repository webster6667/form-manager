import { Controller } from "react-hook-form";
import React, {FC, ReactElement} from "react";
import {PrimaryTextFieldProps, TextComponentProps} from './types'

export const PrimaryTextField = <T extends FC<TextComponentProps>>({Component, ...props}:PrimaryTextFieldProps<T>):ReactElement => {
    return (<Controller {...props}
                        render={({field, formState}) => {
                            return (<>
                                <Component {...props} {...field} error={formState.errors[field.name] && formState.errors[field.name].message}  />
                            </>)
                        }}/>)
}