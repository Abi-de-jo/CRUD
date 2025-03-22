import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUser, deleteUser, addUser } from './api.js';



const App = () => {

  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [name, setname] = useState("");
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  })



  const addMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditId(null);
      setname("");
    }
  });


  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditId(null);
      setname("");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditId(null);

    }
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      updateMutation.mutate({ id: editId, username: name })
    } else {
      addMutation.mutate({ username: name })
    }

  }

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <input type="text" name="username" id="username" value={name} onChange={(e) => setname(e.target.value)} />
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
                    setname(user.username);  
                  }}>Edit</button>
                  <button onClick={() => deleteMutation.mutate(user.id)}>Delete</button>
                  <button onClick={() => {
                    setEditId(null);
                    setname("");
                  }}>Cancel</button>
                </div>
              )
            })}


          </div>}


    </div>
  )
}

export default App;