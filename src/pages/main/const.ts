import * as Yup from 'yup';

export const frontSkills = ['React', 'Angular', 'Vue']
export const backSkills = ['Node', 'Php', 'Python']
export const sexList = ['Men', 'Woman']

export const countries = [
    {name: 'ua', id: '0'},
    {name: 'en', id: '1'},
    {name: 'ru', id: '2'},
]

export const courses = [
    {name: 'skillBox', id: '0'},
    {name: 'geekBrains', id: '1'},
    {name: 'Youtube', id: '2'},
]

export const validationSchema = Yup.object({
    password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    acceptTerms: Yup.bool()
        .oneOf([true], "You must accept the terms and conditions"),
    projects: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().min(4, 'too short').required('Required'),
                url: Yup.string().min(3, 'too short').required('Required'),
            })
        )
})