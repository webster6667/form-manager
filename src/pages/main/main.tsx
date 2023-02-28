import React from 'react'
import {sexList, backSkills, frontSkills, countries, courses, validationSchema} from "./const"
import {Container, Row, Col} from "@grid"
import {PrimaryButton} from "@buttons/primary";
import {PrimarySpinner} from "@ui-kit/loading/spinner/primary";
import {PrimaryTextInputWithHint, PrimaryTextInputPassword} from "@inputs/text-input/primary";
import {PrimaryCheckbox} from "@inputs/checkbox/primary";
import {PrimaryRadio} from "@inputs/radio/primary";
import { PrimarySelectSingle, PrimarySelectMultiply } from "@inputs/select/primary";
import {FirstCard} from "@ui-kit/cards/first-card";
import {H3, H2, Text} from "@typography";
import {Box} from "@grid";
import {PrimaryTextField, PrimaryForm, PrimaryCheckboxRadioField, PrimarySelectField} from '@form-manager'
import {FieldArray} from 'formik';





const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const MainPage = () => {

    return <Container className='y-offset-xl'>
        <PrimaryForm
            initialValues={{
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
            }}
            validate={(values) => {
                const errors: any = {};

                if (!values.frontSkills.length && !values.backSkills.length) {
                    errors.skillError = 'Select skills'
                }

                return errors;
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, {setFieldError}) => {
                await sleep(3000);
                const errors: any = {}

                if (values.email === 'test@mail.ru') {
                    errors.email = 'test@mail.ru is exist'
                }


                Object.entries(errors).map(([fieldName, error]) => {
                    //@ts-ignore
                    setFieldError(fieldName, error)
                })

            }}

        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  submitCount
              }) => {



                return (
                    <form onSubmit={handleSubmit}>
                        <H2 className='y-offset-xl'
                            weight='bold'
                        >Auth Data</H2>

                        <PrimaryTextField
                            name="email"
                            Component={PrimaryTextInputWithHint}
                            hint='Enter your email'
                            label='Email'
                            className='y-offset-lg_bottom'
                        />

                        <PrimaryTextField
                            name="password"
                            Component={PrimaryTextInputPassword}
                            className='y-offset-lg_bottom'
                            label='Password'
                        />

                        <PrimarySelectField
                            Component={PrimarySelectSingle}
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
                                                   Component={PrimaryCheckbox}
                                                   label='Accept Terms & Conditions'
                        />

                        <H2 className='y-offset-xl_top'
                            weight='bold'
                        >Skills</H2>

                        <Box style={{columnGap: '10px'}}
                             alignItems='center'
                             className='y-offset-md'
                        >
                            {frontSkills.map((skill) => (<PrimaryCheckboxRadioField
                                                                                    name='frontSkills'
                                                                                    Component={PrimaryCheckbox}
                                                                                    label={skill}
                                                                                    value={skill}
                                                                                    disabled={values.backSkills.length > 0}
                            />))}
                        </Box>

                        <Box style={{columnGap: '10px'}} alignItems='center'>
                            {backSkills.map((skill) => (<PrimaryCheckboxRadioField
                                                                                   name='backSkills'
                                                                                   Component={PrimaryCheckbox}
                                                                                   label={skill}
                                                                                   value={skill}
                                                                                   disabled={values.frontSkills.length > 0}
                            />))}
                        </Box>

                        {errors?.skillError && submitCount > 0 && <Text color='error' className='y-offset-md_top' >{errors?.skillError}</Text>}

                        <H2 className='y-offset-xl_top'
                            weight='bold'
                        >Sex</H2>

                        <Box style={{columnGap: '10px'}}
                             alignItems='center'
                             className='y-offset-md_top'
                        >
                            {sexList.map((sex) => (<PrimaryCheckboxRadioField name='sex'
                                                                              Component={PrimaryRadio}
                                                                              label={sex}
                                                                              value={sex}
                            />))}
                        </Box>

                        <H2 className='y-offset-xl_top'
                            weight='bold'
                        >Projects</H2>

                        <FieldArray name="projects">
                            {({remove, push}) => (
                                <>
                                    {values.projects.length === 0 ? <H3 className='y-offset-md' >Please add project</H3>
                                                                  : <Row desktop={{offsetY: 10, offsetX: 10}}
                                                                         className='y-offset-md_top'>
                                        {values.projects.map((friend, index) => (
                                            <Col desktopSize={3} key={index}>
                                                <FirstCard>
                                                    <PrimaryTextField
                                                        Component={PrimaryTextInputWithHint}
                                                        name={`projects.${index}.name`}
                                                        label="Project name"
                                                        sizeMod='sm'
                                                        className='y-offset-md_bottom'
                                                    />
                                                    <PrimaryTextField
                                                        Component={PrimaryTextInputWithHint}
                                                        name={`projects.${index}.url`}
                                                        label="Project url"
                                                        sizeMod='sm'
                                                        className='y-offset-md_bottom'
                                                    />
                                                    <PrimaryButton
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        label='Delete'
                                                        sizeMod='sm'
                                                        mod='secondary'
                                                        className='full-width'
                                                    />
                                                </FirstCard>
                                            </Col>
                                        ))}
                                    </Row>}
                                    {values.projects.length < 4 && <PrimaryButton
                                        type="button"
                                        onClick={() => push({name: '', url: ''})}
                                        label='Add Project'
                                        className='y-offset-md_top'
                                        sizeMod='sm'
                                    />}
                                </>)}
                        </FieldArray>

                        <br/>
                        <br/>

                        {isSubmitting ? <PrimarySpinner size='sm'/>
                                      : <PrimaryButton type="submit"
                                             disabled={isSubmitting}
                                             label='Submit'
                                             sizeMod='sm'
                                      />
                        }

                    </form>
                )
            }}
        </PrimaryForm>
    </Container>
}