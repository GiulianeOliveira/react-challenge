import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as IoIcons from 'react-icons/io';
import { AuthContext } from '../../AuthProvider';

import { BackgroundColumn, Row } from '../../components/Grid';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { Image } from '../../components/Image';
import { Note } from '../../components/Note';
import { Loader } from '../../components/Loader';

import backgroundImage from '../../static/images/background.svg';
import logoApp from '../../static/images/logo-app.svg';

import { getNotes, getJournals } from '../../services/journal';

const JournalNotes = () => {
  const [user] = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id: idJournal } = useParams();

  useEffect(() => {
    const listJournals = async () => {
      try {
        setIsLoading(true);
        const { entries } = await getNotes(idJournal);

        setNotes(entries);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    listJournals();
  }, []);

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
  }, [idJournal]);

  return (
    <BackgroundColumn
      backgroundImage={backgroundImage}
      margin={['0px auto', '100px auto', '100px auto']}
      p="40px 30px"
      width={['375px', '375px', '500px']}
      height="100%"
      bg="lightBrown"
    >
      <Image
        src={logoApp}
        width={['200px', '300px', '300px']}
        height={['50px', '100px', '100px']}
        alt="logo with the note block's name: nocturnal"
      />
      <Row mt="30px" justifyContent="space-between">
        <Row alignItems="center">
          <Button
            variant="primary-text"
            color="black"
            onClick={() => history.push('/home')}
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
        <Button
          variant="primary-outlined"
          width="116px"
          height="40px"
          fontWeight="600"
          onClick={() => history.push(`/journal/${idJournal}/create-note`)}
        >
          + Add note
        </Button>
      </Row>
      {isLoading ? (
        <Row alignItems="center" margin="200px auto">
          <Loader />
        </Row>
      ) : (
        <Row flexWrap="wrap" justifyContent="space-between" mt="20px">
          {notes?.map(({ title, content }, index) => (
            <Note
              m={['10px', '10px', '22px']}
              title={title}
              description={content}
              key={index}
            />
          ))}
        </Row>
      )}
    </BackgroundColumn>
  );
};

export { JournalNotes };
