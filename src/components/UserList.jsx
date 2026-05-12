import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <h2>No users found.</h2>
      )}
    </div>
  );
};

export default UserList;
