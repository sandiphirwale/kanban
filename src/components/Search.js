import React, { useState, useContext } from "react"
import CardContext from './CardContext'

export default function Search ()
{
    const [ user, setUser ] = useState("");
    const { searchByUser } = useContext(CardContext);

    const onSubmit = (e) =>
    {
        e.preventDefault();
        searchByUser(user);
    }
    const onChangeUser = (e) =>
    {
        setUser(e.target.value);
    }
    return (
        <div className="form">
            <form onSubmit={ onSubmit }>
                <input type="text" className="col-6"
                    onChange={ onChangeUser } value={ user }
                    placeholder="user Name?" />
                <button type="submit" className="ml-2">submit</button>


            </form>
        </div>
    )
}