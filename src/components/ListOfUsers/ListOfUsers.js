import React, { useState, useEffect } from "react";
import axios from "axios";

const ListOfUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "JohnDoe",
      location: "New York",
      tennisLevel: "Intermediate",
      gender: "Male",
      phoneNumber: "123-456-7890",
      matchStatus: "none",
    },
    {
      id: 2,
      username: "JaneSmith",
      location: "Los Angeles",
      tennisLevel: "Beginner",
      gender: "Female",
      phoneNumber: "234-567-8901",
      matchStatus: "requested",
    },
    {
      id: 3,
      username: "AliceJohnson",
      location: "Chicago",
      tennisLevel: "Advanced",
      gender: "Female",
      phoneNumber: "345-678-9012",
      matchStatus: "approved",
    },
    {
      id: 4,
      username: "BobBrown",
      location: "Miami",
      tennisLevel: "Intermediate",
      gender: "Male",
      phoneNumber: "456-789-0123",
      matchStatus: "declined",
    },
    {
      id: 5,
      username: "CharlieGreen",
      location: "Houston",
      tennisLevel: "Beginner",
      gender: "Male",
      phoneNumber: "567-890-1234",
      matchStatus: "none",
    },
    {
      id: 6,
      username: "DianaIngram",
      city: "Phoenix",
      tennisLevel: "Advanced",
      gender: "Female",
      phoneNumber: "678-901-2345",
      matchStatus: "declinedByMatcher",
    },
    {
      id: 7,
      username: "EvanJobs",
      city: "Philadelphia",
      tennisLevel: "Beginner",
      gender: "Male",
      phoneNumber: "789-012-3456",
      matchStatus: "none",
    },
    {
      id: 8,
      username: "FionaLarson",
      city: "San Antonio",
      tennisLevel: "Intermediate",
      gender: "Female",
      phoneNumber: "890-123-4567",
      matchStatus: "approved",
    },
    {
      id: 9,
      username: "GeorgeKing",
      city: "San Diego",
      tennisLevel: "Beginner",
      gender: "Male",
      phoneNumber: "901-234-5678",
      matchStatus: "requested",
    },
    {
      id: 10,
      username: "HelenSpecter",
      city: "Dallas",
      tennisLevel: "Advanced",
      gender: "Female",
      phoneNumber: "012-345-6789",
      matchStatus: "none",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://your-api-url.com/api/users");
        setUsers(response.data);
      } catch (error) {
        setErrors({ fetch: "Failed to fetch users. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRequest = async (id, action) => {
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `https://your-api-url.com/api/match-requests/${id}`,
        { matchStatus: action }
      );
      const updatedUser = response.data;
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      setErrors({});
    } catch (error) {
      setErrors({
        update: `Failed to update match status for ${id}. Please try again.`,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Users Available for Matches</h2>
      {errors.fetch && (
        <div className="alert alert-danger">{errors.fetch}</div>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>City</th>
              <th>Tennis Level</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-center align-middle">{user.username}</td>
                <td className="text-center align-middle">{user.city}</td>
                <td className="text-center align-middle">{user.tennisLevel}</td>
                <td className="text-center align-middle">{user.gender}</td>
                <td className="text-center align-middle">
                  {user.matchStatus === "approved"
                    ? user.phoneNumber
                    : "Hidden"}
                </td>
                <td className="text-center align-middle">
                  {user.matchStatus === "none" && (
                    <button
                      onClick={() => handleRequest(user.id, "requested")}
                      className="btn btn-primary"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Sending..." : "Send Match Request"}
                    </button>
                  )}
                  {user.matchStatus === "requested" && (
                    <>
                      <button
                        onClick={() => handleRequest(user.id, "approved")}
                        className="btn btn-success"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleRequest(user.id, "declined")}
                        className="btn btn-danger"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Decline"}
                      </button>
                    </>
                  )}
                  {user.matchStatus === "approved" && (
                    <span>Successfully Matched</span>
                  )}
                  {user.matchStatus === "declined" && (
                    <span>Match Declined by You</span>
                  )}
                  {user.matchStatus === "declinedByMatcher" && (
                    <span>Match Declined by Matcher</span>
                  )}
                  {errors.update && (
                    <div className="text-danger">{errors.update}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center mt-3">
        Note: Phone numbers are visible only to matched players.
      </p>
    </div>
  );
};

export default ListOfUsers;
