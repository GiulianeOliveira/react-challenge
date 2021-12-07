import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

import { BackgroundColumn, Column, Row } from '../../components/Grid';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { Journal } from '../../components/Journal';
import { Loader } from '../../components/Loader';

import backgroundImage from '../../static/images/background.svg';
import logoApp from '../../static/images/logo-app.svg';

import { getJournals } from '../../services/journal';

const JournalList = () => {
  const [user, setUser] = useContext(AuthContext);
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const listJournals = async () => {
      const userId = user[1].user.id;

      try {
        setIsLoading(true);
        const { journals } = await getJournals(userId);
        setJournals(journals);

        if (journals.length === 0) {
          history.push('/create-journal');
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    listJournals();
  }, [user]);

  return (
    <BackgroundColumn
      backgroundImage={backgroundImage}
      margin={'0px auto'}
      p={['0px 0px 40px', '0px 0px 40px', '40px 30px']}
      width={['375px', '375px', '500px']}
      bg="lightBrown"
    >
      <Row
        alignItems="center"
        justifyContent="space-between"
        width={['375px', '375px', '400px']}
        padding={'0px 15px'}
        mb="20px"
      >
        <Image
          src={logoApp}
          width={['150px', '150px', '200px']}
          height={['50px', '50px', '100px']}
          alt="logo with the note block's name: nocturnal"
        />
        <Button
          variant="primary-outlined"
          width="135px"
          height="40px"
          onClick={() => history.push('/create-journal')}
        >
          + Add Journal
        </Button>
      </Row>
      <Column width={['375px', '375px', '400px']} minHeight="650px">
        {isLoading ? (
          <Row alignItems="center" margin="200px auto">
            <Loader />
          </Row>
        ) : (
          <Row
            alignItems="center"
            flexWrap="wrap"
            justifyContent="space-between"
            padding={'0px 15px'}
          >
            {journals?.map(({ title, id }, index) => {
              return (
                <Journal
                  name={title}
                  key={index}
                  numberJournal={index}
                  hasCategories
                  mt="20px"
                  onClick={() => history.push(`/journal/${id}/journal-notes`)}
                />
              );
            })}
          </Row>
        )}
      </Column>

      <Row justifyContent="center" width="100%">
        <Button
          mt="30px"
          variant="primary-text"
          fontSize={['16px', '16px', '14px']}
          onClick={() => {
            setUser(false);
            history.push('/logout');
          }}
        >
          Logout
        </Button>
      </Row>
    </BackgroundColumn>
  );
};

export { JournalList };
