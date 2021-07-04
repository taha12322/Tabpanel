//import react
import React from 'react';
//import style
import './contentStyle.css';

const Home = ({ persons }) => {
    return (
        <div className='main'>
            {persons.map((person) => (
                <div className='cards'>
                    <h4>{person.city}</h4>
                    <h4>{person.state}</h4>
                </div>
            ))}
        </div>

    )
}

export default Home