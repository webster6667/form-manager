import { Field } from "formik";
import React, {FC, ReactElement} from "react";
import {PrimaryTextFieldProps, TextComponentProps} from './types'

export const PrimaryTextField = <T extends FC<TextComponentProps>>({Component, ...props}:PrimaryTextFieldProps<T>):ReactElement => {
    return (<Field {...props} >{({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta: {touched, error},
                                 }) => {
        return (
            <Component {...field} {...props} error={touched && error} />
        )
    }}</Field>)
}