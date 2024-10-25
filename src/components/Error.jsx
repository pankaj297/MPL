import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div>
      <h2>{err.status}</h2>
      <h2>{err.data}</h2>
      <Link to="/">
        <h2>
          <button>Go back</button>
        </h2>
      </Link>
    </div>
  );
};

export default Error;
