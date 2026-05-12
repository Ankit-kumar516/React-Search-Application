import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [debouncedSearch, users]);

  return (
    <div className="app-container">
      <h1>User Search Application</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading ? <h2>Loading...</h2> : <UserList users={filteredUsers} />}
    </div>
  );
};

export default App;
