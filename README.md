# Formik
👆 Контролируемый менеджер форм

&emsp;&emsp; 🔹 Инициализация
```js
<Formik initialValues={{ email: '', password: '' }} />
```

&emsp;&emsp; 🔹 Общий метод валидации
```js
<Formik validate={values => {
    const errors = {};
    
    if (!values.email) {
        errors.email = 'Required';
    }
    
    return errors;
}} />
```
🎯 Срабатывает на каждое изменение в инпутах и блюрах    
🎯 Общая функция для всех инпутов, не очень выгодно запускать

&emsp;&emsp; 🔹 Колбек отправки формы  
&emsp;&emsp;&emsp;&emsp; 👆 Срабатывает при отсутствии ошибок
```js
<Formik onSubmit={(values, {
    resetForm,
    setErrors,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setFormikState,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    submitForm,
    validateField,
    validateForm,
}) => {
        //...
    }}
/>
```

🎯 Вывести ошибку с бека в интерфейс
```js
<Formik onSubmit={async (values, {setFieldError}) => {
            await sleep(3000);
            const errors: Partial<typeof values> = {}
        
            if (values.email === 'test@mail.ru') {
                errors.email = 'test@mail.ru is exist'
            }
        
            Object.entries(errors).map(([fieldName, error]) => {
                setFieldError(fieldName, error)
            })
}}
/>
```

🎯 Вывести кастомную ошибку, не связанную с полем
```js
<Formik
    initialValues={{
        frontSkills: [],
        backSkills: []
    }}
    validate={(values) => {
        const errors: Partial<typeof values> = {};
    
        if (!values.frontSkills.length && !values.backSkills.length) {
            errors.skillError = 'Select skills'
        }
    
        return errors;
    }}>
        {({errors}) => {
        return (
            <form onSubmit={handleSubmit}>
                {errors?.skillError && <Text color='error' className='y-offset-md_top' >{errors?.skillError}</Text>}
            </form>
        )
    }}
</Formik>
```

# React hooks form
👆 Менеджер форм на неконтролируемых инпутах