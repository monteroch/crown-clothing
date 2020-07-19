import React from 'react' ;
import FormInput from '../form-input/form-input.component.js';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

function SignUp({signUpStart}){

  const [ displayName, setDisplayName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ confirmPassword, setConfirmPassword ] = React.useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert("Passwords don't match");
      return;
    }
    signUpStart({displayName, email, password});
  };

    return(
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          
        <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={event => setDisplayName(event.target.value)}
            label='Display Name'
            required
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            label='Email'
            required
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            label='Password'
            required
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            label='confirmPassword'
            required
          />

          <CustomButton type='submit'>SIGN UP</CustomButton>

        </form>
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);