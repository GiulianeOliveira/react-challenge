import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { BackgroundColumn, Column, Row } from '../../components/Grid';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { Journal } from '../../components/Journal';
import { TextField } from '../../components/TextField';
import { Loader } from '../../components/Loader';

import meditatingPerson from '../../static/images/meditating-person.svg';
import backgroundImage from '../../static/images/background.svg';
import logoApp from '../../static/images/logo-app.svg';

import { validateJournal } from '../../helpers/yup-schema';
import { postJournal } from '../../services/journal';

import { AuthContext } from '../../AuthProvider';

const CreateJournal = () => {
  const [user] = useContext(AuthContext);
  const [isCreatingJournal, setIsCreatingJournal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validateJournal),
  });

  const onSubmit = async ({ journal_name }) => {
    const userId = user[1].user.id;

    try {
      const formattedData = {
        title: journal_name,
        userId: userId,
      };

      setIsLoading(true);
      const { journal } = await postJournal(formattedData);
      sessionStorage.setItem('journal_data', JSON.stringify(journal));

      if (journal) {
        toast.success('Journal created!', {
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
          history.push('/home');
        }, 2000);
      } else {
        setIsLoading(false);
        toast.error('Something wrong. Try again!', {
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

  const journalName = watch('journal_name');

  useEffect(() => {}, [journalName]);

  return (
    <BackgroundColumn
      backgroundImage={backgroundImage}
      margin={['0px auto', '100px auto', '100px auto']}
      p={['0px 20px 40px', '0px 20px 40px', '40px 30px']}
      width={['375px', '375px', '500px']}
      height={['600px', '812px', '630px']}
      bg="lightBrown"
    >
      <Image
        src={logoApp}
        width={['150px', '150px', '200px']}
        height={['50px', '50px', '100px']}
        alt="logo with the note block's name: nocturnal"
      />
      <Column alignItems="center" mt="100px">
        {!isCreatingJournal ? (
          <>
            <Image
              src={meditatingPerson}
              alt="image with a person meditating"
              width="323px"
              height="348px"
              mb="80px"
            />
            <Button
              variant="primary-text"
              fontWeight="600"
              fontSize="14px"
              color="mediumBrown"
              onClick={() => setIsCreatingJournal(!isCreatingJournal)}
            >
              Create a journal
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Column alignItems="center">
              {isLoading ? (
                <Row alignItems="center" margin="200px auto">
                  <Loader />
                </Row>
              ) : (
                <>
                  <Journal name={getValues('journal_name')} />
                  <TextField
                    mt="40px"
                    inputType="text"
                    width={['320px', '320px', '420px']}
                    bgColor="faintBrown"
                    name="journal_name"
                    placeholder="Journal name"
                    error={errors?.journal_name?.message}
                    {...register('journal_name')}
                  />
                  <Row mt="40px">
                    <Button
                      type="submit"
                      variant="primary"
                      fontWeight="600"
                      width="190px"
                      height="40px"
                    >
                      Save journal
                    </Button>
                  </Row>
                </>
              )}
            </Column>
          </form>
        )}
      </Column>
    </BackgroundColumn>
  );
};

export { CreateJournal };
