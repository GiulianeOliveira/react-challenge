import React, { useContext, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

import { BackgroundColumn, Column, Row } from '../../components/Grid';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';

import meditatingPerson from '../../static/images/meditating-person.svg';
import backgroundImage from '../../static/images/background.svg';
import logoApp from '../../static/images/logo-app.svg';

import { getJournals } from '../../services/journal';

const CreateNote = () => {
  const [user] = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const history = useHistory();
  const { id: idJournal } = useParams();

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
      <Column alignItems="center" mt="100px">
        <Row mb="30px">
          <Text fontFamily="Abhaya Libre" fontWeight="700" fontSize="24px">
            {title}
          </Text>
        </Row>
        <Image
          src={meditatingPerson}
          alt="image with a person meditating"
          width="323px"
          height="348px"
          mb="100px"
        />
        <Button
          variant="primary-text"
          fontWeight="600"
          fontSize="14px"
          color="mediumBrown"
          onClick={() => history.push(`/journal/${idJournal}/register-note`)}
        >
          Create a note
        </Button>
      </Column>
    </BackgroundColumn>
  );
};

export { CreateNote };
