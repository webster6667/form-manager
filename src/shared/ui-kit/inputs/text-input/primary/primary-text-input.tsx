import React, {FC, ChangeEventHandler} from "react";
import {Wrapper, Input, Label, InputWrapper, Error, IconWrapper } from "./styles"
import {PrimaryTextInputProps} from "./types"

/**
 * Primary text input
 */
export const PrimaryTextInput:FC<PrimaryTextInputProps> = ({
   value= '',
   label = 'placeholder',
   error,
   sizeMod= 'md',
   LeftIcon,
   RightIcon,
   className = '',
   // onChange,
   ...props
})  => {
    const isInputFilled = String(value).length > 0,
          hasError = error && error.length > 0,
          hasLeftIcon = Boolean(LeftIcon),
          hasRightIcon = Boolean(RightIcon)

    return (<Wrapper className={className} >
        <InputWrapper>
            {hasLeftIcon && <IconWrapper position='left' sizeMod={sizeMod} >
                {typeof LeftIcon === 'function' ? LeftIcon() : LeftIcon}
            </IconWrapper>}
            {hasRightIcon && <IconWrapper position='right' sizeMod={sizeMod} >
                {typeof RightIcon === 'function' ? RightIcon() : RightIcon}
            </IconWrapper>}
            {/*@ts-ignore*/}
            <Input
                {...props}
                //@ts-ignore
                // onChange={inputChangeHandler}
                autoComplete={'off'}
                value={value}
                isInputFilled={isInputFilled}
                sizeMod={sizeMod}
                hasError={hasError}
            />
            <Label>{label}</Label>
        </InputWrapper>
        <Error isVisible={hasError} >
            {error}
        </Error>
    </Wrapper>)
};