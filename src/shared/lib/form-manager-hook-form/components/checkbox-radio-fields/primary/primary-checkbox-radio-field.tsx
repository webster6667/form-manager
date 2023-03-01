import React, {FC, ReactElement} from "react";
import {PrimaryCheckboxRadioFieldProps, TextComponentProps} from './types'
import {Controller} from "react-hook-form";

export const PrimaryCheckboxRadioField = <T extends FC<TextComponentProps>>({Component, ...props}:PrimaryCheckboxRadioFieldProps<T>):ReactElement => {
    return (<Controller {...props}
                        render={({field, formState}) => {
                            return (<>
                                <Component {...props}
                                           {...field}
                                           error={formState.errors[field.name] && formState.errors[field.name].message}
                                />
                            </>)
                        }}/>)
}