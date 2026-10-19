import { useReducer, useState } from "react";

type CounterAction = {
  type: "addGood" | "addNeutral" | "addBad";
};

type CountState = {
  goodCount: number;
  neutralCount: number;
  badCount: number;
};

function counterReducer(state: CountState, { type }: CounterAction) {
  let tempCountHold = 0;
  switch (type) {
    case "addGood":
      tempCountHold = state.goodCount;
      ++tempCountHold;
      return { ...state, goodCount: tempCountHold };

    case "addNeutral":
      tempCountHold = state.neutralCount;
      ++tempCountHold;
      return { ...state, neutralCount: tempCountHold };

    case "addBad":
      tempCountHold = state.badCount;
      ++tempCountHold;
      return { ...state, badCount: tempCountHold };

    default:
      return { ...state };
  }
}

export default function App() {
  const [counts, dispatch] = useReducer(counterReducer, {
    goodCount: 0,
    neutralCount: 0,
    badCount: 0,
  });

  return (
    <div className="app">
      <FeedbackSection dispatch={dispatch} />
      <StatisticsSection counts={counts} />
    </div>
  );
}

type FeedbackSectionProps = {
  dispatch: React.Dispatch<CounterAction>;
};

function FeedbackSection({ dispatch }: FeedbackSectionProps) {
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={() => dispatch({ type: "addGood" })}>Good</button>
        <button onClick={() => dispatch({ type: "addNeutral" })}>
          Neutral
        </button>
        <button onClick={() => dispatch({ type: "addBad" })}>Bad</button>
      </div>
    </div>
  );
}

type StatisticsSectionProps = {
  counts: CountState;
};

function StatisticsSection({ counts }: StatisticsSectionProps) {
  return (
    <section>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td className="amount">{counts.goodCount}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td className="amount">{counts.neutralCount}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td className="amount">{counts.badCount}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

/**
 * unicafe step 1 - DONE
 */
