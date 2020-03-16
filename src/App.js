import React, { useState } from 'react';

import KanbanBackLog from './components/K_backlog';
import KanbanDone from './components/k_done';
import KanbanInProgress from './components/k_in';
import Cardform from './components/Cardform';
import CardContext from './components/CardContext';
import Search from './components/Search';
import { BrowserRouter as Router } from 'react-router-dom';

const DEFAULT_STATE = {
  cards: [
    {
      id: 1, title: "card 1",
      body: '',
      published: true, comment_count: 3, user: "j37", status: "Initial"
    },
    { id: 2, status: "In Progress", user: "j37", title: "card 2", body: 'card 2 Goes here', published: true, comment_count: 1 },
    { id: 4, status: "In Progress", user: "j37", title: "card 4", body: 'card 2 Goes here', published: true, comment_count: 1 },
    { id: 3, status: "Done", user: "j37", title: "card 3", body: 'card 3 Goes here', published: true, comment_count: 0 }
  ],
  subtask: [
    { id: 1, card_id: 1, title: "comment 1", body: "comment 1 goes here" },
    { id: 2, card_id: 1, title: "comment 2", body: "comment 2 goes here" },
    { id: 3, card_id: 1, title: "comment 3", body: "comment 3 goes here" },
    { id: 4, card_id: 2, title: "comment 4", body: "comment 4 goes here" }
  ]
}


function App ()
{
  const [ cards, setcards ] = useState(DEFAULT_STATE.cards);



  const onCardSubmit = (changedCard) =>
  {
    let emptyCard = {};
    if (changedCard.id == undefined || changedCard.id == "")
    {
      emptyCard.id = +new Date();
      emptyCard.user = changedCard.user;
      emptyCard.title = changedCard.title;
      emptyCard.status = "Initial"

      console.log("*****************8" + changedCard)
      setcards([ emptyCard, ...cards ]);
      // Make API call
    } else
    {
      let _cards = cards.map((t) =>
      {
        if (t.id == changedCard.id)
        {
          t.title = changedCard.title;
          t.user = changedCard.user;
        }
        return t;
      });
      setcards(_cards)
    }

  }
  const [ card, setCard ] = useState({
    id: undefined,
    title: "",
    status: "Initial",
    user: ""
  });

  const onCardEdit = (cardId) =>
  {
    let card = cards.find(c =>
    {
      return (c.id == cardId);
    });
    setCard(card);
  }


  const moveCardToNextState = (changedCard) =>
  {
    let _cards = cards.map((t) =>
    {
      if (t.id == changedCard.id)
      {
        console.log(changedCard.status)
        if (changedCard.status === "Initial")
        {
          t.status = "In Progress";
        } else
        {
          t.status = "Done";
        }
      }

      return t;
    });
    setcards(_cards)
  }

  const moveCardToPreviousState = (changedCard) =>
  {
    let _cards = cards.map((t) =>
    {
      if (t.id == changedCard.id)
      {
        console.log(changedCard.status)
        if (changedCard.status == "Done")
        {
          t.status = "In Progress";
        }
        else 
        {
          t.status = "Initial";
        }
      }

      return t;
    });
    setcards(_cards)
  }
  const onEditCancel = () =>
  {
    setCard({
      title: "",
      completed: false,
      id: undefined
    });
  }
  const onCardDelete = (cardId) =>
  {
    let _cards = cards.filter(card => card.id != cardId);
    setcards(_cards)
  }
  const searchByUser = (userName) =>
  {
    if (userName === "")
    {
      setcards(cards)
    } else
    {
      let _cards = cards.filter(card => card.user == userName);
      setcards(_cards)
    }
  }
  const todoProvider = {
    cards,
    onFormSubmit: onCardSubmit,
    onEditCancel,
    moveCardToPreviousState,
    moveCardToNextState,
    onCardDelete,
    searchByUser,
    onCardEdit
  }


  return (
    <Router>
      <CardContext.Provider value={ todoProvider }>
        <div>
          <Search />
        </div>
        <div>
          <Cardform card={ card } />
        </div>

        <div className="container">

          <div className='row'>
            <div className="col-md-4">
              Backlog
            </div>
            <div className="col-md-4">
              In Progress
            </div>
            <div className="col-md-4">
              Completed
            </div>
          </div>
        </div>
        <div className="container">

          <div className='row'>
            <div className="col-md-4">
              <KanbanBackLog cards11={ DEFAULT_STATE.cards } />
            </div>
            <div className="col-md-4">
              <KanbanInProgress cards={ DEFAULT_STATE.cards } />
            </div>
            <div className="col-md-4">
              <KanbanDone cards={ DEFAULT_STATE.cards } />
            </div>
          </div>
        </div>
      </CardContext.Provider>
    </Router>
  );
}

export default App;
