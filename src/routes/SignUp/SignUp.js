import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { BackgroundColumn, Row } from '../../components/Grid';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Image } from '../../components/Image';
import { TextField } from '../../components/TextField';
import { Loader } from '../../components/Loader';

import logoApp from '../../static/images/logo-app.svg';
import backgroundImage from '../../static/images/background.svg';

import { validateSignUp } from '../../helpers/yup-schema';
import { createAccount } from '../../services/login';

import { AuthContext } from '../../AuthProvider';

const SignUp = () => {
  const [, setUser] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSignUp),
  });

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        username: data.username,
        password: data.password,
        email: data?.email,
      };

      setIsLoading(true);
      const response = await createAccount(formattedData);

      if (response?.token) {
        localStorage.setItem('user_login', JSON.stringify(response));
        const userData = localStorage.getItem('user_login');
        setUser([true, JSON.parse(userData)]);

        toast.success('Sign up successful! Redirecting to login :)', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          setIsLoading(false);
          history.push('/login');
        }, 2000);
      } else {
        setIsLoading(false);
        toast.error('Something Wrong. Try again!', {
          position: 'top-right',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackgroundColumn
      backgroundImage={backgroundImage}
      margin="150px auto"
      p="40px 30px"
      width={['375px', '375px', '500px']}
      height={['600px', '812px', 'auto']}
      bg="lightBrown"
    >
      <Image
        src={logoApp}
        width={['205px', '200px', '300px']}
        height={['42px', '50px', '100px']}
        mt="160px"
        alt="logo com o nome do caderno de notas: nocturnal"
      />
      <Row
        m={['110px 0px 20px', '110px 0px 20px', '85px 0px 45px']}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="brown" fontSize="32px" lineHeight="40px">
          Sign up
        </Text>
        <Button
          variant="primary-text"
          fontWeight="600"
          onClick={() => history.push('/login')}
        >
          Already have an account
        </Button>
      </Row>
      {isLoading ? (
        <Row alignItems="center" margin="120px auto 140px">
          <Loader />
        </Row>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputType="text"
            name="username"
            placeholder="Define a username"
            error={errors?.username?.message}
            {...register('username')}
          />
          <TextField
            mt="30px"
            mb="10px"
            inputType="password"
            name="password"
            placeholder="Set your password"
            error={errors?.password?.message}
            {...register('password')}
          />
          <TextField
            mt="30px"
            inputType="text"
            name="email"
            placeholder="Email (optional)"
            error={errors?.email?.message}
            {...register('email')}
          />

          <Row justifyContent="center" mt="40px">
            <Button
              type="submit"
              variant="primary"
              fontWeight="600"
              width="160px"
              height="40px"
            >
              Create account
            </Button>
          </Row>
        </form>
      )}
    </BackgroundColumn>
  );
};

export { SignUp };
