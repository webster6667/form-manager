import React from 'react'
import {sexList, backSkills, frontSkills, countries, courses, validationSchema} from "./const"
import {Container, Row, Col} from "@grid"
import {PrimaryButton} from "@buttons/primary";
import {PrimarySpinner} from "@ui-kit/loading/spinner/primary";
import {PrimaryTextInputWithHint, PrimaryTextInputPassword} from "@inputs/text-input/primary";
import {PrimaryCheckbox} from "@inputs/checkbox/primary";
import { PrimarySelectSingle, PrimarySelectMultiply } from "@inputs/select/primary";
import {FirstCard} from "@ui-kit/cards/first-card";
import {H3, H2, Text} from "@typography";
import {Box} from "@grid";
import { PrimaryTextField, PrimarySelectField, PrimaryCheckboxRadioField } from '@form-manager-hook-form'
import { useForm, useFieldArray } from "react-hook-form";





const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const HooksFormPage = () => {
    const {
            control,
            handleSubmit,
            register,
            watch,
            formState: {
                         errors,
                         isValid,
                         isSubmitting,
                         submitCount
                       }
        } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            country: '',
            courses: [],
            acceptTerms: false,
            frontSkills: [],
            backSkills: [],
            sex: '',
            projects: [
                {
                    name: '',
                    url: '',
                },
            ]
        }
    });
    const {
        fields: projects,
        append: appendProject,
        remove: removeProject
    } = useFieldArray({
        control,
        name: "projects"
    });

    const onSubmit = async data => {
        await sleep(3000)
        console.log(data, 'отправили')
    };

    const watchAllFields = watch();
    const hasSelectedFrontSkills = Boolean(Object.values(watchAllFields.frontSkills).find(item => item === true))
    const hasSelectedBackSkills = Boolean(Object.values(watchAllFields.backSkills).find(item => item === true))


    return (<Container className='y-offset-xl'>
        <form onSubmit={handleSubmit(onSubmit)}>

            <PrimaryTextField
                {...register('email', {required: 'Required', maxLength: {value: 15, message: 'Must be 15 characters or less'}})}
                name="email"
                Component={PrimaryTextInputWithHint}
                hint='Enter your email'
                label='Email'
                className='y-offset-lg_bottom'
                control={control}
                rules={{required: 'Required', maxLength: {value: 15, message: 'Must be 15 characters or less'}}}
                                />

            <PrimaryTextField
                name="password"
                Component={PrimaryTextInputPassword}
                className='y-offset-lg_bottom'
                label='Password'
                control={control}
                rules={{required: 'Required'}}
            />

            <PrimarySelectField
                Component={PrimarySelectSingle}
                control={control}
                options={countries}
                name='country'
                optionValueKey='name'
                optionLabelKey='name'
                children={(SelectItem, {name}) => {
                    return (<SelectItem key={name} >
                        {name}
                    </SelectItem>)
                }}
                className='y-offset-lg_bottom'
            />

            <PrimarySelectField
                Component={PrimarySelectMultiply}
                options={courses}
                name='courses'
                control={control}
                optionValueKey='name'
                optionLabelKey='name'
                children={(SelectItem, {name}) => {
                    return (<SelectItem key={name} >
                        {name}
                    </SelectItem>)
                }}
                className='y-offset-lg_bottom'
            />

            <PrimaryCheckboxRadioField name='acceptTerms'
                                       control={control}
                                       Component={PrimaryCheckbox}
                                       label='Accept Terms & Conditions'
                                       rules={{required: 'Required'}}
            />

            <H2 className='y-offset-xl_top'
                weight='bold'
            >Skills</H2>

            <Box style={{columnGap: '10px'}}
                 alignItems='center'
                 className='y-offset-md'
            >
                {frontSkills.map((skill) => (<PrimaryCheckboxRadioField
                    name={`frontSkills[${skill}]`}
                    Component={PrimaryCheckbox}
                    control={control}
                    label={skill}
                    value={skill}
                    disabled={hasSelectedBackSkills}
                />))}
            </Box>

            <Box style={{columnGap: '10px'}} alignItems='center'>
                {backSkills.map((skill) => (<PrimaryCheckboxRadioField
                    name={`backSkills[${skill}]`}
                    Component={PrimaryCheckbox}
                    control={control}
                    label={skill}
                    value={skill}
                    disabled={hasSelectedFrontSkills}
                />))}
            </Box>


            <H2 className='y-offset-xl_top'
                weight='bold'
            >Sex</H2>

            <Box style={{columnGap: '10px'}}
                 alignItems='center'
                 className='y-offset-md_top'
            >
                {sexList.map((sex) => (
                    <Box alignItems='center' as='label' >
                        <input type="radio" value={sex} {...register("sex")} /> &nbsp; {sex}
                    </Box>
                    ))
                }
            </Box>

            {projects.length === 0 ? <H3 className='y-offset-md' >Please add project</H3>
                        : <Row desktop={{offsetY: 10, offsetX: 10}}
                               className='y-offset-md_top'>
                            {projects.map((friend, index) => (
                                <Col desktopSize={3} key={index}>
                                    <FirstCard>
                                        <PrimaryTextField
                                            Component={PrimaryTextInputWithHint}
                                            name={`projects.${index}.name`}
                                            label="Project name"
                                            sizeMod='sm'
                                            className='y-offset-md_bottom'
                                            control={control}
                                        />
                                        <PrimaryTextField
                                            Component={PrimaryTextInputWithHint}
                                            name={`projects.${index}.url`}
                                            label="Project url"
                                            sizeMod='sm'
                                            className='y-offset-md_bottom'
                                            control={control}
                                        />
                                        <PrimaryButton
                                            type="button"
                                            onClick={() => removeProject(index)}
                                            label='Delete'
                                            sizeMod='sm'
                                            mod='secondary'
                                            className='full-width'
                                        />
                                    </FirstCard>
                                </Col>
                            ))}
            </Row>}

            {
                // projects.length < 4 &&
                <PrimaryButton
                    type="button"
                    onClick={() => appendProject({name: '', url: ''})}
                    label='Add Project'
                    className='y-offset-md'
                    sizeMod='sm'
                />}

            <br/>

            {isSubmitting ? <PrimarySpinner size='sm'/>
                          : <PrimaryButton type="submit"
                                  disabled={!isValid}
                                  label='Submit'
                                  sizeMod='sm'
                           />
            }

        </form>
    </Container>)
}