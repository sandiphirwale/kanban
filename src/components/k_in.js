import React, { useContext } from 'react'
import './kanban.css'
import CardContext from './CardContext';
import Card from "./Card"
export default function Kanban_in_progress ()
{
    const { cards } = useContext(CardContext);

    let vcards = cards.filter((card) =>
    {
        return card.status == "In Progress";
    })

    let ui = vcards.map(vcard =>
    {
        return <Card key={ vcard.id } card={ vcard } />
    });

    return (
        <div className="container">
            { ui }
        </div>
    )
}
