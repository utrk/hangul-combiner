import { createSignal, Index, type Signal } from "solid-js";
import { range } from "./lib";
import "./style.css";

const codePointToChar = (codePoint: number) => String.fromCodePoint(codePoint);

const initials = range(0x1100, 0x1160).concat(range(0xa960, 0xa97d)).map(codePointToChar);
const medials = range(0x1160, 0x11a8).concat(range(0xd7b0, 0xd7c7)).map(codePointToChar);
const finals = range(0x11a8, 0x1200).concat(range(0xd7cb, 0xd7fc)).map(codePointToChar);

function JamoSelection(props: {
  name: string;
  legend: string;
  values: string[];
  signal: Signal<string>;
}) {
  return (
    <fieldset class="jamo-selection">
      <legend>{props.legend}</legend>
      <Index each={props.values}>
        {(value) => (
          <label>
            <input
              type="radio"
              name={props.name}
              value={value()}
              checked={props.signal[0]() === value()}
              onChange={(e) => props.signal[1](e.target.value)}
            />
            {"\u115F\u1160".includes(value()) ? "◌" : value()}
          </label>
        )}
      </Index>
    </fieldset>
  );
}

export default function App() {
  const [initial, setInitial] = createSignal("\u115F");
  const [medial, setMedial] = createSignal("\u1160");
  const [final, setFinal] = createSignal("");

  const result = () => (initial() + medial() + final()).normalize("NFC");

  return (
    <>
      <h1>Hangul Combiner</h1>
      <div lang="kr" style={{ "font-size": "1.5em" }}>
        <JamoSelection
          name="initial"
          legend="初声"
          values={initials}
          signal={[initial, setInitial]}
        />
        <JamoSelection name="medial" legend="中声" values={medials} signal={[medial, setMedial]} />
        <JamoSelection
          name="final"
          legend="終声"
          values={finals.concat("")}
          signal={[final, setFinal]}
        />
        <p>{result()} </p>
        <p>
          <code>
            {Array.from(result())
              .map(
                (char) => "U+" + char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0"),
              )
              .join(" ")}
          </code>
        </p>
      </div>
    </>
  );
}
