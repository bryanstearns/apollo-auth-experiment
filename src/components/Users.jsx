import React from "react";
import { gql, graphql } from "react-apollo";
import { Redirect } from "react-router";

const usersQuery = gql`
  query users {
    allUsers {
      id
      secret
    }
  }
`;

const RawUsers = ({ data: { error, loading, allUsers } }) => {
  if (error) {
    if (error.message.match(/GraphQL error: Insufficient Permissions/)) {
      console.log("rendering Users: permissions, redirecting to login");
      return <Redirect push to="/login" />;
    } else {
      console.log("rendering Users: error", error.message);
      return (
        <div>
          Oops: {error}
        </div>
      );
    }
  }
  if (loading) {
    console.log("rendering Users: loading");
    return <div>(loading...)</div>;
  }
  if (allUsers.length === 0) {
    console.log("rendering Users: none");
    return <span>No users yet.</span>;
  }
  console.log("rendering Users: have users");
  return (
    <div>
      All the users:
      <ul className="users">
        {allUsers.map((user, i) =>
          <li key={i}>
            {user.secret}
          </li>
        )}
      </ul>
    </div>
  );
};

export const Users = graphql(usersQuery)(RawUsers);
