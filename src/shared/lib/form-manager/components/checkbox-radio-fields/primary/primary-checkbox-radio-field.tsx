import { Field } from "formik";
import React, {FC, ReactElement} from "react";
import {PrimaryCheckboxRadioFieldProps, TextComponentProps} from './types'

export const PrimaryCheckboxRadioField = <T extends FC<TextComponentProps>>({Component, ...props}:PrimaryCheckboxRadioFieldProps<T>):ReactElement => {
    return (<Field {...props} >{({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta: {touched, error},
                                 }) => {
        return (<>
            <Component {...field} {...props} error={touched && error} />
            </>
        )
    }}</Field>)
}