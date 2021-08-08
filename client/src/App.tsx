import React from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { RelayPoint } from "@itt/common";
import { Form } from "./pages";
import { GET_RELAY_POINTS } from "./graphql";

interface RelayPointsData {
  relayPoints: RelayPoint[];
}

function RelayPointsList() {
  const { loading, error, data } = useQuery<RelayPointsData>(GET_RELAY_POINTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data!.relayPoints.map(({ name, day }) => (
        <div key={name + day}>
          <p>
            {name}, {day}
          </p>
        </div>
      ))}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<RelayPointsList />*/} <Form />
      </header>
    </div>
  );
}

export default App;
