import React, { useContext } from "react"
import CardContext from './CardContext'
import { NavLink } from 'react-router-dom'

export default function Card ({ card })
{
    const { onCardDelete, onCardEdit, moveCardToNextState, moveCardToPreviousState } = useContext(CardContext);
    const onDelete = (CardId) =>
    {
        onCardDelete(CardId);
    }

    const onEdit = (CardId) =>
    {
        onCardEdit(CardId);
    }

    const moveNext = (card) =>
    {
        moveCardToNextState(card);
    }
    const moveBack = (card) =>
    {
        moveCardToPreviousState(card)
    }
    const displayBackButton = () =>
    {
        if (card.status == "In Progress" || card.status == "Done")
        {
            return <button type="button" value="Move Back"
                onClick={ () => moveBack(card) }> Move Back
                            </button>
        }
    }
    const displayNextButton = () =>
    {
        if (card.status == "In Progress" || card.status == "Initial")
        {
            return <button type="button" value="Move Next"
                onClick={ () => moveNext(card) }> Move Next
                            </button>
        }
    }

    return (



        <div className="card"
        >
            <div >
                <NavLink to={ `/cards/${ card.id }/read` }>
                    { card.title }
                </NavLink>

            </div>

            <div>
                { card.user }
            </div>
            <div>
                <footer className="text-muted">

                    <button type="button" value="Delete"
                        onClick={ () => onDelete(card.id) }>
                        Delete
                    </button>
                    <button type="button" value="Edit"
                        onClick={ () => onEdit(card.id) }> Edit
                </button>


                    { displayBackButton() }
                    { displayNextButton() }

                </footer>
            </div>

        </div>
    )

} 