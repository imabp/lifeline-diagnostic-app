import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";

type RowProps = {
  label: string;
  value: number;
};
export const Row = ({ label, value }: RowProps) => {
  const { appState, setAppState } = useContext(GlobalContext);
  console.log("ABIR APP STATE", appState);
  const [checked, setChecked] = useState<boolean>();
  const onChange = (checked: boolean) => {
    setChecked(checked);
    if (checked)
      setAppState?.([
        ...appState,
        {
          name: label,
          price: value
        }
      ]);
    if (!checked) {
      setAppState(appState.filter((item) => item.name !== label));
    }
  };

  useEffect(() => {
    if (appState.filter((i) => i.name === label).length > 0) {
      setChecked(true);
    }
  }, [appState]);

  return (
    <div
      style={{
        margin: "8px 2px 8px 2px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <label htmlFor={label}>{label}</label>
      <input
        style={{ height: "20px", width: "20px" }}
        type="checkbox"
        id={label}
        name={label}
        value={value}
        checked={checked}
        onChange={(e) => {
          onChange(!!e.target.checked);
        }}
      />
    </div>
  );
};
