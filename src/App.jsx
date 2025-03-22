import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUsersId, updateUser, deleteUser, addUser } from './api.js';



const App = () => {

  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  })



  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditId(null);
      setEditUsername("");
    }
  });


  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditId(null);
      setEditUsername("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      updateMutation.mutate({ id: editId, username: editUsername })
    } else {
      addMutation.mutate({ username: editUsername })
    }

  }

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <input type="text" name="username" id="username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>


      {isLoading ? <div>Loading...</div>
        : isError ? <div>Something went wrong</div> :
          <div>


            {users.map((user) => {
              return (
                <div key={user.id}>
                  <p>{user.username}</p>

                  <button onClick={() => {
                    setEditId(user.id);
                    setEditUsername(user.username);  
                  }}>Edit</button>
                  <button onClick={() => deleteMutation.mutate(user.id)}>Delete</button>

                </div>
              )
            })}


          </div>}


    </div>
  )
}

export default App;