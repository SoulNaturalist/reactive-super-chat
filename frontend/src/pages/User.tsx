import React from 'react'
import { useRoute, useLocation } from "wouter";


export default function User() {
    const [match, params] = useRoute("/profile/:name");
    const [, setLocation] = useLocation();
    const userComponent = () => {
        return <div className='nickname_wrapper'>
                <div className='nickname_content'>
                    {params && params.name}
                </div>
        </div>

    }
    return (
        {userComponent}
    )
}
