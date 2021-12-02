import React, { useContext } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import { SignIn } from './routes/SignIn';
import { SignUp } from './routes/SignUp';
import { CreateJournal } from './routes/CreateJournal';
import { CreateNote, RegisterNote } from './routes/CreateNote';
import { JournalList } from './routes/JournalList';
import { JournalNotes } from './routes/JournalNotes';

import { AuthContext } from './AuthProvider';

const AuthenticatedApp = () => {
  const [user] = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      {user && <Route path="/home" component={JournalList} />}
      {user && <Route path="/create-journal" component={CreateJournal} />}
      {user && <Route path="/journal/:id/create-note" component={CreateNote} />}
      {user && (
        <Route path="/journal/:id/register-note" component={RegisterNote} />
      )}
      {user && (
        <Route path="/journal/:id/journal-notes" component={JournalNotes} />
      )}
      <Redirect to="/login" />
    </Switch>
  );
};

export default AuthenticatedApp;
