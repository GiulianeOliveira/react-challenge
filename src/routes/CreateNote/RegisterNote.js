import React, { useContext, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as IoIcons from 'react-icons/io';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider';

import { BackgroundColumn, Column, Row } from '../../components/Grid';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import { TextArea } from '../../components/TextArea';
import { Loader } from '../../components/Loader';

import backgroundImage from '../../static/images/background.svg';
import logoApp from '../../static/images/logo-app.svg';

import { validateNote } from '../../helpers/yup-schema';

import { createNote, getJournals } from '../../services/journal';

const RegisterNote = () => {
  const [user] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const history = useHistory();
  const { id: idJournal } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validateNote),
  });

  useMemo(() => {
    const listJournals = async () => {
      const userId = user[1].user.id;

      try {
        const { journals } = await getJournals(userId);
        setTitle(journals[idJournal - 1].title);
      } catch (error) {
        console.log(error);
      }
    };

    listJournals();
  }, [idJournal, user]);

  const onSubmit = async ({ note_title, note_description }) => {
    try {
      const formattedData = {
        title: note_title,
        content: note_description,
        journalId: idJournal,
      };

      setIsLoading(true);
      const response = await createNote(idJournal, formattedData);

      if (response?.journal) {
        toast.success('Note created!', {
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
          history.push(`/journal/${idJournal}/journal-notes`);
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

  return (
    <BackgroundColumn
      backgroundImage={backgroundImage}
      margin={['0px auto', '100px auto', '100px auto']}
      p={['0px 20px 40px', '0px 20px 40px', '40px 30px']}
      width={['375px', '375px', '500px']}
      height="100%"
      bg="lightBrown"
    >
      <Image
        src={logoApp}
        width={['150px', '150px', '200px']}
        height={['50px', '50px', '100px']}
        alt="logo with the note block's name: nocturnal"
      />
      <Row mt="30px" alignItems="center">
        <Button
          variant="primary-text"
          color="black"
          onClick={() => history.push(`/journal/${idJournal}/journal-notes`)}
        >
          <IoIcons.IoIosArrowBack size="24" />
        </Button>
        <Text
          ml="9px"
          fontFamily="Abhaya Libre"
          fontWeight="700"
          fontSize="24px"
        >
          {title}
        </Text>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Column alignItems="center">
          {isLoading ? (
            <Row alignItems="center" margin="200px auto">
              <Loader />
            </Row>
          ) : (
            <>
              <TextField
                mt="40px"
                inputType="text"
                width={['320px', '320px', '420px']}
                bgColor="faintBrown"
                name="note_title"
                placeholder="Title"
                error={errors?.note_title?.message}
                {...register('note_title')}
              />
              <TextArea
                placeholder="Write your note"
                bgColor="faintBrown"
                mt="20px"
                width={['320px', '320px', '420px']}
                name="note_description"
                error={errors?.note_description?.message}
                {...register('note_description')}
              />
              <Row mt="40px">
                <Button
                  type="submit"
                  variant="primary"
                  fontWeight="600"
                  width="190px"
                  height="40px"
                >
                  Save Note
                </Button>
              </Row>
            </>
          )}
        </Column>
      </form>
    </BackgroundColumn>
  );
};

export { RegisterNote };
