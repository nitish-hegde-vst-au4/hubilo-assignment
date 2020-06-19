import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import FormPage from './components/FormPage/FormPage';
import ListPage from './components/ListPage/ListPage';
import Navbar from './components/Navbar/Navbar';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import FormContainer from './components/FormContainer/FormContainer';
import { updateUser, editUser } from './redux/actions';

function App() {
  const userToEdit = useSelector((state) => state.userToEdit);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Navbar />
      {userToEdit ? (
        <div className='modal-backdrop-container'>
          <Modal
            user={userToEdit}
            action={updateUser}
            component={FormContainer}
          />
          <Backdrop onClick={() => dispatch(editUser(null))} />
        </div>
      ) : null}

      <Switch>
        <Route exact path='/' component={FormPage} />
        <Route path='/users-list' component={ListPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
