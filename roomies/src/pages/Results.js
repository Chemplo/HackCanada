import React, { useState, useEffect } from "react";
import "./Results.css";

const name = "rinuah";

function Results() {
    // ==========================
    // TEST CODE (ACTIVE)
    // ==========================
    const [matches, setMatches] = useState([
        {
            name: "Alice Johnson",
            gender: "Female",
            contact: "alice@email.com",
            score: 85,
        },
        {
            name: "Bob Smith",
            gender: "Male",
            contact: "bob@email.com",
            score: 92,
        },
        {
            name: "Charlie Davis",
            gender: "Non-binary",
            contact: "charlie@email.com",
            score: 78,
        },
    ]);

    /* ==========================
     ACTUAL CODE (COMMENTED OUT)
  ========================== */
    /*
  useEffect(() => {
    fetch("/curr_results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedMatches = data.map((match) => ({
          name: match.fname + " " + match.lname,
          gender: match.gender,
          contact: match.email,
          score: match.score,
        }));
        setMatches(formattedMatches);
      })
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);
  */

    return (
        <div>
            <div className="results-page">
                <h1 className="result-text">Welcome back, {name}</h1>
                <p className="result-text">
                    Please look through the matches we have for you :D Feel free
                    to reach out to anyone interesting!
                </p>

                <table id="match-table">
                    <thead>
                        <tr>
                            <th className="result-headers">Match Name</th>
                            <th className="result-headers">Gender</th>
                            <th className="result-headers">
                                Contact Information
                            </th>
                            <th className="result-headers">Match Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td>{match.name}</td>
                                <td>{match.gender}</td>
                                <td>{match.contact}</td>
                                <td>{match.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
