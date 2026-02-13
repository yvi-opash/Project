import Header from '../components/Header'
import Footer from '../components/Footer'
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import './Userlist.css'

type user = {
  name: string,
  email: string,
  role: string,
  age: number,
  city: string,
  country: string
}


const Userlist = () => {

  const [allUsers, setAllUsers] = useState<user[]>([])
  const [filteredUsers, setFilteredUsers] = useState<user[]>([])
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<user | null>(null);


    useEffect(() => {
      const users = localStorage.getItem('users')
      if(users){
        const parsedUsers = JSON.parse(users)
        setAllUsers(parsedUsers)
        setFilteredUsers(parsedUsers)
      }
    },[])

    useEffect(() => {
      if(!search.trim()) {
        setFilteredUsers(allUsers)
        return
      }

      const searchLower = search.toLowerCase()
      const filtered = allUsers.filter((item) => 
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.city.toLowerCase().includes(searchLower) ||
        item.country.toLowerCase().includes(searchLower) ||
        item.role.toLowerCase().includes(searchLower) ||
        item.age.toString().includes(search)
      )
      setFilteredUsers(filtered)
    }, [search, allUsers])


  const handleuserdelet = (index: number) => {
    const updatedUsers = allUsers.filter((_, i) => i !== index)
    setAllUsers(updatedUsers)
    setFilteredUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setEditData({...allUsers[index]})
  }

  const handleSave = () => {
    if(editData && editIndex !== null) {
      const updatedUsers = [...allUsers]
      updatedUsers[editIndex] = editData
      setAllUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setEditIndex(null)
      setEditData(null)
    }
  }

  // const handleCancel = () => {
  //   setEditIndex(null)
  //   setEditData(null)
  // }

  return (
    <>
    <Header/>
    <div className="userlist-container">
      <h1 className="userlist-title">User List</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Search by name, email, city, country, role or age...'
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {filteredUsers.length === 0 && search && (
        <p className="no-results">No users found matching "{search}"</p>
      )}
      
      <div className="table-wrapper">
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                 <TableCell>City</TableCell>
               <TableCell>Country</TableCell>
                <TableCell>Role</TableCell>
               <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {filteredUsers?.map((elem, key) => {
             const isEditing = editIndex === key;
             return(
              <TableRow key={key}>
              <TableCell>
                {isEditing ? <input value={editData?.name} onChange={(e) => setEditData({...editData!, name: e.target.value})} /> : elem.name}
              </TableCell>
              <TableCell>
                {isEditing ? <input value={editData?.email} onChange={(e) => setEditData({...editData!, email: e.target.value})} /> : elem.email}
              </TableCell>
              <TableCell>
                {isEditing ? <input type="number" value={editData?.age} onChange={(e) => setEditData({...editData!, age: parseInt(e.target.value)})} /> : elem.age}
              </TableCell>
              <TableCell>
                {isEditing ? <input value={editData?.city} onChange={(e) => setEditData({...editData!, city: e.target.value})} /> : elem.city}
              </TableCell>
              <TableCell>
                {isEditing ? <input value={editData?.country} onChange={(e) => setEditData({...editData!, country: e.target.value})} /> : elem.country}
              </TableCell>
               <TableCell>
                {isEditing ? (
                  <select value={editData?.role} onChange={(e) => setEditData({...editData!, role: e.target.value as "user" | "admin"})}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  elem.role
                )}
              </TableCell>
                  <TableCell>
                {isEditing ? (
                  
                     <button className="save-btn" onClick={handleSave}>Save</button>

                  
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(key)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleuserdelet(key)}>Delete</button>
                  </>
                )}
              </TableCell>
            </TableRow>
            )
          })}
          
            
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Userlist