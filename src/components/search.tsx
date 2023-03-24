import { useState, useMemo } from "react";
import { rateChart } from "../data/index";
import { Row } from "./row";

export const Search = () => {
  const [state, setState] = useState<string>("");

  const filteredArray = useMemo(
    () =>
      rateChart.filter(
        (i) =>
          state &&
          i.name.trim().toLowerCase().includes(state.trim().toLowerCase())
      ),
    [state]
  );

  return (
    <div>
      <input
        style={{
          width: "300px",
          padding: "8px"
        }}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <br />
      <br />

      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll"
        }}
      >
        {filteredArray.map((item) => {
          return <Row label={item.name} value={item.price} />;
        })}
      </div>
    </div>
  );
};
