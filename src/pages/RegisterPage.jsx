import React from 'react'
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/auth/auth.reducer';
import css from 'components/Phonebook/Phonebook.module.css';

const RegisterPage = () => {

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        const name = e.currentTarget.elements.userName.value;
        const email = e.currentTarget.elements.userEmail.value;
        const password = e.currentTarget.elements.userPassword.value;

        const formData = {
            name,
            email,
            password,
        }

        dispatch(registerThunk(formData));
    };


  return (
    <div className={`${css.phonebookForm} ${css.form}`}>
      <form onSubmit={onSubmit} className={css.contactsForm}>
          <label className={css.formLabel}>
              <p>Name:</p>
              <input
                  className={css.input}
                  type='text' 
                  placeholder='John Doe'
                  required
                  name='userName' />
        </label>
        <label className={css.formLabel}>
              <p>Email:</p>
              <input
                  className={css.input}
                  type='email' 
                  placeholder='john.doe@gmail.com'
                  required
                  name='userEmail' />
          </label>
          <label className={css.formLabel}>
              <p>Password:</p>
              <input
                  className={css.input}
                  type='password' 
                  placeholder='******'
                  required
                  name='userPassword' />
        </label>
        <br/>
        <button type='submit' className={`${css.addBtn} ${css.btn}`}>Sign Up</button>
    </form>
    </div>
  )
}

export default RegisterPage