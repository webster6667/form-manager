import React, {FC, ReactElement} from "react";
import {Field} from "formik";
import {SelectComponentProps, PrimarySelectFieldProps} from './types'


export const PrimarySelectField = <T extends FC<SelectComponentProps>>({Component, ...props}:PrimarySelectFieldProps<T>):ReactElement => {
    return (<Field {...props} >{({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta: {touched, error},
                                 }) => {
        return (<>
                <Component {...field} {...props} onChange={(option) => {
                    form.setFieldValue(field.name, option)}
                } />
            </>
        )
    }}</Field>)
}