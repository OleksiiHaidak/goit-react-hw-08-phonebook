import React from 'react'
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/auth/auth.reducer';
import css from 'components/Phonebook/Phonebook.module.css';

const LoginPage = () => {

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        const email = e.currentTarget.elements.userEmail.value;
        const password = e.currentTarget.elements.userPassword.value;

        const formData = {
            email,
            password,
        }

        dispatch(loginThunk(formData));
    };


  return (
    <div className={`${css.phonebookForm} ${css.form}`}>
    <form onSubmit={onSubmit} className={css.contactsForm}>
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
                  name='userPassword'
                  minLength={7}/>
        </label>
        <br/>
        <button type='submit' className={`${css.addBtn} ${css.btn}`}>Sign In</button>
    </form>
    </div>
  )
}

export default LoginPage