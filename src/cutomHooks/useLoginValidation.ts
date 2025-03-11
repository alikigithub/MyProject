import {useState} from 'react';

const useLoginValidation = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passworError, setpassworError] = useState('');
  const validateEmail = (inputEmail: string) => {
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailpattern.test(inputEmail);
  };

  const validinput = () => {
    let isValid: boolean = true;
    if (!email) {
      setemailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setemailError('Email is required.');
      isValid = false;
    } else {
      setemailError('');
    }
    if (!password) {
      setpassworError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setpassworError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setpassworError('');
    }
    return isValid;
  };
  return {
    email,
    setemail,
    password,
    setpassword,
    emailError,
    passworError,
    validinput,
  };
};
export default useLoginValidation;
