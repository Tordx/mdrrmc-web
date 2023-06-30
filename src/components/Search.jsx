import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import '../style.css'

const Search = () => {

  const { dispatch } = useContext(ChatContext);

  const [searchTerm, setsearchTerm] = useState("");
  const [status] = useState("Active")
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user, setUsers] = useState([]);

  const handleSearch = async () => {
    // setErr(false);
  
    if (!searchTerm) {
      setUsers([]);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("FullName", ">=", searchTerm),
      where("FullName", "<=", searchTerm + '\uf8ff')
    );


    try {
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    } catch (err) {
      setErr(true);
    }
  };
  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        dispatch({ type: "CHANGE_USER", payload: user });
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            FullName: user.FullName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            FullName: currentUser.FullName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUsers([]);
    setsearchTerm("")
  };
  return (
    <div className="search">
    <div className="searchForm">
    <input
      type="text"
      placeholder="Find a user"
      onKeyDown={handleSearch}
      onChange={(e) => setsearchTerm(e.target.value)}
      value={searchTerm}
    />
    </div>
    {err && <span>User not found!</span>}
    {user.map((user) => (
      <div className="userChat" onClick={() => handleSelect(user)} key={user.uid}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.FullName}</span>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Search;
