import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { CsrfToken } from './types';
import { Auth } from './components/Auth';
import { Home } from './components/home/Home';
import { AddFriend } from './components/home/addFriend/AddFriend';
import { FriendRequestList } from './components/home/friendRequestList/FriendRequestList';
import { FriendList } from './components/home/friendList/FriendList';
import { Dm } from './components/home/dm/Dm';
import { Room } from './components/room/Room';
function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get<CsrfToken>(
  //       `${process.env.REACT_APP_API_URL}/csrf`
  //     )
  //     axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
  //   }
  //   getCsrfToken()
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/home/dm/:roomId" element={<Dm />}/>
        <Route path="/home/rooms/:roomId" element={<Room />}/>
        <Route path="/home/search" element={<AddFriend />}/>
        <Route path="/home/friends" element={<FriendList />} />
        <Route path="/home/friends/requests" element={<FriendRequestList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
