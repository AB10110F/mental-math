import { HTMLProps, useState } from "react";

type SettingsIslandProps = {
  id: string,
  label?: React.ReactElement,
  separator?: React.ReactElement;
  options: [string, string, string, string]
  currentSign?: string,
  digitsA?: number,
  onClick: (id: string, selection: string) => void;
}
export default function SettingsIsland({
  id,
  label,
  separator,
  options,
  currentSign,
  digitsA,
  onClick
}: SettingsIslandProps) {

  const [selected, setSelected] = useState(options[0]);
  const labelStyle: HTMLProps<HTMLElement>["className"] = "cursor-pointer text-neutral-500 hover:text-neutral-50 peer-checked:text-neutral-50 peer-disabled:text-neutral-500 peer-disabled:hover:text-neutral-500 peer-disabled:cursor-not-allowed";

  return (
    <section className="flex select-none w-full justify-between py-2 px-4 gap-10">
      <ul className="flex w-full justify-evenly bg-neutral-900 rounded-lg py-2">
        {label}
        {separator}
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              key={index}
              name={id}
              id={`${id}-${index}`}
              onChange={() => setSelected(option)}
              onClick={() => onClick(id, option)}
              checked={selected === option}
              disabled={(id === "digitsA" && currentSign === '÷') || (id === "digitsB" && currentSign === '-' && parseInt(option) > (digitsA ?? 1))} //NOTE: fallback required due to possibly undefined behavior, probably because digitsA is used in an arithmetic comparison
              className="peer hidden"
            />
            <label htmlFor={`${id}-${index}`} className={labelStyle}>{option}</label>
          </li>
        ))}
      </ul>
    </section>
  );
}
