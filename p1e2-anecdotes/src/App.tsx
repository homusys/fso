import { useState } from "react";

import "./App.css";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array.from(anecdotes, () => 0));
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);

  function getRandomIntExclusive(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  function getRandomAnecdote() {
    const oldSelection = selected;
    const newSelection = getRandomIntExclusive(0, anecdotes.length);

    if (newSelection === oldSelection) {
      getRandomAnecdote();
      return;
    }

    setSelected(newSelection);
  }

  function addVote() {
    const newVotes = [...votes];
    ++newVotes[selected];
    setVotes(newVotes);

    updateFeaturedVote();
  }

  function updateFeaturedVote() {
    const highestValue = Math.max(...votes);
    setFeaturedIndex(votes.indexOf(highestValue));
  }

  return (
    <div className="anecdote__container">
      <p className="anecdote">{anecdotes[selected]}</p>
      <p className="anecdote">Votes: {votes[selected]}</p>

      <div className="controls">
        <button onClick={addVote}>Vote</button>
        <button onClick={getRandomAnecdote}>Next anecdote</button>
      </div>

      {featuredIndex !== null ? (
        <FeaturedContainer featured={anecdotes[featuredIndex]} />
      ) : (
        <p>There are no featured posts right now.</p>
      )}
    </div>
  );
};

type FeaturedContainerProps = {
  featured: string;
};

function FeaturedContainer({ featured }: FeaturedContainerProps) {
  return (
    <div className="featured">
      <h2>Featured Anecdote</h2>
      <p>{featured}</p>
    </div>
  );
}

export default App;
