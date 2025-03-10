import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Results.css";

const name = "rinuah";

function Results() {

    const [user, setUser] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const matchInfo = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/inputted_user?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Ensure token is sent
                }
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
    
            return await response.json();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/current_user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Send token in header
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const runResultsAndFetch = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
    
            try {
                await fetch("http://localhost:5000/result", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
    
                const response = await fetch("http://localhost:5000/curr_results", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                const text = await response.text();
                console.log(text);
                if (!text) {
                    console.warn("Empty JSON response from backend");
                    setResults({});
                    return;
                }
    
                const data = await text.json();
                console.log("Results:", data);
                setResults(data);
            } catch (err) {
                setError(err.message);
            }
        };
    
        runResultsAndFetch();
    }, []);

    var result;
    if(results && results.compatible) {
        result = results.compatible.split(',');
    } else {
        result = [];
    }
    let table = document.getElementById("match-table");
    useEffect(() => {
        if (!results || !results.compatible) return;
    
        const fetchMatches = async () => {
            const resultPairs = results.compatible.split(",").filter(pair => pair);
            const fetchedMatches = [];
    
            for (let pair of resultPairs) {
                let [matchId, score] = pair.split(";");
                let userData = await matchInfo(matchId);
    
                if (userData) {
                    fetchedMatches.push({
                        name: `${userData.fname} ${userData.lname}`,
                        gender: userData.gender,
                        contact: userData.email,
                        score: parseInt(score),
                    });
                }
            }
    
            setMatches(fetchedMatches);
            setSortedMatches(fetchedMatches);
        };
    
        fetchMatches();
    }, [results]);
    
    

    // Sample test data
    const initialMatches = [/*
        {
            name: "-------",
            gender: "-------",
            contact: "-------",
            score: 0,
        },*/
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
        {
            name: "David Kim",
            gender: "Male",
            contact: "david@email.com",
            score: 65,
        },
        {
            name: "Emily Wong",
            gender: "Female",
            contact: "emily@email.com",
            score: 74,
        },
    ];

    const [matches, setMatches] = useState(initialMatches);
    const [sortedMatches, setSortedMatches] = useState(initialMatches);
    const [isScoreAscending, setIsScoreAscending] = useState(null);
    const [isGenderAscending, setIsGenderAscending] = useState(null);

    // Toggle sorting order for Score
    const toggleScoreSort = () => {
        setIsScoreAscending(
            isScoreAscending === null ? true : !isScoreAscending
        );
        setIsGenderAscending(null); // Reset gender sort when sorting score
    };

    // Toggle sorting order for Gender
    const toggleGenderSort = () => {
        setIsGenderAscending(
            isGenderAscending === null ? true : !isGenderAscending
        );
        setIsScoreAscending(null); // Reset score sort when sorting gender
    };

    // Reset sorting to the original state
    const resetSort = () => {
        setIsScoreAscending(null);
        setIsGenderAscending(null);
        setSortedMatches(table); // Resets to the original order
    };

    // Sorting logic
    useEffect(() => {
        if(matches == null) {
            return;
        }
        let newSortedMatches = [...matches];

        if (isScoreAscending !== null) {
            newSortedMatches.sort((a, b) =>
                isScoreAscending ? a.score - b.score : b.score - a.score
            );
        }

        if (isGenderAscending !== null) {
            newSortedMatches.sort((a, b) =>
                isGenderAscending
                    ? a.gender.localeCompare(b.gender)
                    : b.gender.localeCompare(a.gender)
            );
        }

        setSortedMatches(newSortedMatches);
    }, [isScoreAscending, isGenderAscending]);

    /* ==========================
     ACTUAL IMPLEMENTATION (COMMENTED OUT)
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
        setSortedMatches(formattedMatches);
      })
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);
  */

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

    return (
        <div>
            <div className="results-page">
                <h1 className="result-text">Welcome back, {user.username != null ? user.username : name}</h1>
                <p className="result-text">
                    Please look through the matches we have for you :D Feel free
                    to reach out to anyone interesting!
                </p>

                {/* Match Table */}
                <table id="match-table">
                    <thead>
                        <tr>
                            <th className="result-headers">Match Name</th>

                            {/* Sortable Gender Column */}
                            <th
                                className="result-headers"
                                onClick={toggleGenderSort}
                                style={{ cursor: "pointer" }}
                            >
                                Gender{" "}
                                {isGenderAscending === true
                                    ? "▲"
                                    : isGenderAscending === false
                                    ? "▼"
                                    : ""}
                            </th>

                            <th className="result-headers">
                                Contact Information
                            </th>

                            {/* Sortable Score Column */}
                            <th
                                className="result-headers"
                                onClick={toggleScoreSort}
                                style={{ cursor: "pointer" }}
                            >
                                Match Score{" "}
                                {isScoreAscending === true
                                    ? "▲"
                                    : isScoreAscending === false
                                    ? "▼"
                                    : ""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMatches.length > 0 ? (
                            sortedMatches.map((match, index) => (
                                <tr key={index}>
                                    <td>{match.name}</td>
                                    <td>{match.gender}</td>
                                    <td>{match.contact}</td>
                                    <td>{match.score}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No matches found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Results;
