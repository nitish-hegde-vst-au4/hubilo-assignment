import React from 'react';
import { useSelector } from 'react-redux';
import List from '../List/List';

const ListPage = () => {
  const usersList = useSelector((state) => state.usersList);
  return (
    <div className='container'>
      <h1 className='text-center mb-2'>Users List</h1>
      {!usersList.length ? (
        <h3 className='text-center mt-4'>No users found</h3>
      ) : (
        <table className='table table-striped table-responsive-sm mt-3'>
          <thead className='thead-dark'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Skills</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, idx) => (
              <List key={user.id} user={user} idx={idx} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPage;
