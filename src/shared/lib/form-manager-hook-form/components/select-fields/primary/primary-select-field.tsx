import React, {FC, ReactElement} from "react";
import {Controller} from "react-hook-form";
import {SelectComponentProps, PrimarySelectFieldProps} from './types'


export const PrimarySelectField = <T extends FC<SelectComponentProps>>({Component, ...props}:PrimarySelectFieldProps<T>):ReactElement => {
    return (<Controller {...props}
                        render={({field, formState}) => {
                            return (<>
                                <Component {...field} {...props} onChange={(option) => {
                                    field.onChange(option)
                                }} />
                            </>)
                        }}/>)
}