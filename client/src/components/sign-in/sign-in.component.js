import React from  'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss' ;
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

function SignIn({ emailSignInStart, googleSignInStart }){

  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput 
            name="email" 
            value={email} 
            handleChange={event => setEmail(event.target.value)}
            label="Email"
            required
          />
          <FormInput 
            name="password"
            type="password"
            value={password} 
            handleChange={event => setPassword(event.target.value)}
            label="Password"
            required
          />
          <div className='buttons'>
            <CustomButton type="submit" value="Submit Form">Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In with Google</CustomButton>
          </div>
        </form>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);