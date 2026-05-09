import { HTMLProps } from "react";

type SettingsIslandProps = {
  label?: React.ReactElement,
  separator?: React.ReactElement;
  options: [string, string, string, string]
}
export default function SettingsIsland({
  label,
  separator,
  options
}: SettingsIslandProps) {

  const textStyle: HTMLProps<HTMLElement>["className"] = "cursor-pointer text-neutral-500 hover:text-neutral-100";

  return (
    <section className="flex w-full justify-between py-2 px-4 gap-10">
      <article className="flex w-full justify-evenly bg-neutral-900 rounded-lg py-2">
        {label}
        {separator}
        <span className={textStyle}>{options[0]}</span>
        <span className={textStyle}>{options[1]}</span>
        <span className={textStyle}>{options[2]}</span>
        <span className={textStyle}>{options[3]}</span>
      </article>
    </section>
  );
}
