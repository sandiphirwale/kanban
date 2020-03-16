import React from 'react'
import { useState, useContext, useEffect } from 'react'
import CardContext from './CardContext';

export default function Cardform ({ card })
{
    const [ newCard, setCard ] = useState({ id: "", title: "", user: "", status: "Initial" });
    const { onFormSubmit, onEditCancel } = useContext(CardContext);
    const onChange = (e) =>
    {
        setCard({ ...newCard, title: e.target.value });
    }
    const onChangeUser = (e) =>
    {
        setCard({ ...newCard, user: e.target.value });
    }
    const onSubmit = (e) =>
    {
        e.preventDefault();
        onFormSubmit(newCard);
    }
    const onCancel = (e) =>
    {
        setCard({ ...newCard, title: "", user: "" });
        onEditCancel();
    }
    useEffect(() =>
    {
        setCard(card);
    }, [ card.id ])
    return (
        <div className="form">
            <form onSubmit={ onSubmit }>
                <input type="text" className="col-6"
                    onChange={ onChange } value={ newCard.title }
                    placeholder="add card " />
                <input type="text" className="col-6"
                    onChange={ onChangeUser } value={ newCard.user }
                    placeholder="user Name?" />
                <button type="submit" className="ml-2">submit</button>
                <button type="button" onClick={ onCancel } className="ml-2" >cancel</button>

            </form>
        </div>
    )
}