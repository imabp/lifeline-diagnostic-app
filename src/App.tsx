import "./styles.css";
import { Search } from "./components/search";
import { createContext, useState } from "react";
import { RateChartItem } from "./data";
type GlobalContextProps = {
  appState: RateChartItem[];
  setAppState: React.Dispatch<React.SetStateAction<RateChartItem[]>>;
};
export const GlobalContext = createContext<GlobalContextProps>({
  appState: [],
  setAppState: () => {}
});

export default function App() {
  const [appState, setAppState] = useState<RateChartItem[]>([]);

  const [hideDetails, setHideDetails] = useState<boolean>(true);

  let totalPrice = 0;

  appState.forEach((s) => {
    totalPrice += s.price;
  });

  return (
    <GlobalContext.Provider value={{ appState, setAppState }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <div
          className="App"
          style={{
            background: "#E6E6FA",
            maxHeight: "200",
            height: "200",
            overflowY: "scroll",
            padding: "8px"
          }}
        >
          <h1>Selected Item</h1>
          <h2>Total Price: {totalPrice}</h2>{" "}
          {totalPrice > 0 && (
            <button
              onClick={() => {
                setHideDetails(!hideDetails);
              }}
            >
              {hideDetails ? "Show Details" : "HideDetails"}
            </button>
          )}
          {/* {appState.reduce((acc, current) => acc.price+current.price)} */}
          {!hideDetails &&
            appState?.map((s) => (
              <div
                style={{
                  display: "flex",
                  maxHeight: "200",
                  height: "200",
                  overflowY: "scroll",
                  justifyContent: "space-between"
                }}
              >
                <div>{s.name}</div>
                <div>{s.price}</div>
              </div>
            ))}
        </div>
        <div className="App">
          <h1>RATE CHART</h1>
          <h2>Type test name to start</h2>
          <Search />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}
