export default function App() {
  return (
    <div className="app">
      <h1>Give feedback</h1>
      <div>
        <button>Good</button>
        <button>Neutral</button>
        <button>Bad</button>
      </div>
      <h1>Statistics</h1>
      <table>
        <tr>
          <td>Good</td>
          <td className="amount">0</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td className="amount">0</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td className="amount">0</td>
        </tr>
      </table>
    </div>
  );
}
