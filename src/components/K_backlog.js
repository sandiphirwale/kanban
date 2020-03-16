import React, { useContext } from 'react'
import CardContext from './CardContext';
import Card from './Card';

export default function Kanban_backLog ()
{
    const { cards } = useContext(CardContext);

    let vcards = cards.filter((card) =>
    {
        return card.status == "Initial";
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

