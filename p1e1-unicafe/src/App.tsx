import { useReducer, useState } from "react";

type CounterAction = {
  type: "addGood" | "addNeutral" | "addBad";
};

type CountState = {
  goodCount: number;
  neutralCount: number;
  badCount: number;
};

const initialCountState = {
  goodCount: 0,
  badCount: 0,
  neutralCount: 0,
} as CountState;

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
  const [counts, dispatch] = useReducer(counterReducer, initialCountState);

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
  function getAll() {
    let totalCount = counts.goodCount + counts.neutralCount + counts.badCount;

    return totalCount;
  }

  function getAverage(total: number, counts: CountState) {
    if (!total) {
      return 0;
    }

    const { goodCount, badCount } = counts;

    let totalGood = goodCount * 1;
    let totalBad = badCount > 0 ? badCount * -1 : 0;

    return (totalGood + totalBad) / total;
  }

  function getPositive(total: number, goodCount: number) {
    if (!total) {
      return 0;
    }

    return (goodCount / total) * 100;
  }

  return (
    <section>
      <h1>Statistics</h1>
      {!Object.is(counts, initialCountState) && (
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
            <tr>
              <td>all: </td>
              <td className="amount">{getAll()}</td>
            </tr>
            <tr>
              <td>Average: </td>
              <td className="amount">{getAverage(getAll(), counts)}</td>
            </tr>
            <tr>
              <td>Positive: </td>
              <td className="amount">
                {getPositive(getAll(), counts.goodCount)} %
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {Object.is(counts, initialCountState) && <p>No feedback given</p>}
    </section>
  );
}

/**
 * unicafe step 1 - DONE
 */
