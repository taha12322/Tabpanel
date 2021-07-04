//import react
import React from 'react';
//import style
import './contentStyle.css';

const About = ({ persons }) => {
    return (
        <div className='main'>
            {persons.map((person) => (
                <div className='cards'>
                    <h4>{person.street_name}</h4>
                    <h4>{person.street_address}</h4>
                </div>
            ))}
        </div>

    )
}
export default About