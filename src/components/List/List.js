import React from 'react';
import { useDispatch } from 'react-redux';
import { editUser, deleteUser } from '../../redux/actions';

const List = ({ user, idx }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <th scope='row'>{idx + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{user.hobbies.join(', ')}</td>
      <td>{user.skills.join(', ')}</td>
      <td onClick={() => dispatch(editUser(user))}>
        <button className='btn btn-outline-dark'>Edit</button>
      </td>
      <td onClick={() => dispatch(deleteUser(user.id))}>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  );
};

export default List;
