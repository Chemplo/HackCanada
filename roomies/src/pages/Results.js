import './Results.css';

function Results() {
    function getUserInfo(user, score, name, gender, contact, matched_score) {
        fetch('/inputted_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user }) // Send data to Flask
        })
        .then(response => response.json()) // Parse JSON response
        .then(user => {
            console.log(user); // Handle response (e.g., update UI)
            name.innerHTML = user.fname + ' ' + user.lname;
            gender.innerHTML = user.gender;
            contact.innerHTML = user.email;
            matched_score.innerHTML = score;
        })
        .catch(error => console.error('Error:', error));
    }

    function getMatches() {
        fetch('/curr_results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) // Parse JSON response
        .then(str => {
            let matches = str.split(",");
            matches.forEach(function(pair) {
                let paired = pair.split(";");
                let user = paired[0];
                let score = paired[1];

                let table = document.getElementByID("match-table");
                let row =  table.insertRow(-1); // -1 means add to the end

                let name = row.insertCell(0); // First column
                let gender = row.insertCell(1); 
                let contact = row.insertCell(2); 
                let matched_score = row.insertCell(3); 
                getUserInfo(user, score, name, gender, contact, matched_score);
            });

        })
        .catch(error => console.error('Error:', error));
    }

    return (
    <div>
        <h1>Results Page!</h1>
        <div className = "results-page">
            <h2>Welcome back, [name]</h2>
            <p>Please look through the matches we have for you :D Feel free to reach out the anyone interesting!</p>
            <table id = "match-table">
                <tr>
                    <th>Match Name</th>
                    <th>Gender</th>
                    <th>Contact Information</th>
                    <th>Match Score</th>
                </tr>
                {getMatches()}
            </table>
        </div>
    </div>);
}

export default Results;