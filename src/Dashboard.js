import react, { useState, useEffect } from 'react';

function Dashboard() {
    const [activities , setActivities] = useState([]);


    //carica le attività del back end (APi)
    useEffect(() => {
        fetch('http://localhost:5000/activities')
        .then(response => response.json())
        .then(data => setActivities(data))
    }, []);

    return (
        <div>
            <h1>Benvenuto nella tua dashboard di studio!</h1>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>{activity.name} - {activity.studyTime} minuti</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;