import { useRef } from "react";

type OperationProps = {
  onCorrect: (time: number, a: number, b: number, result: number) => void;
  digitsA: number,
  digitsB: number,
  sign: string,
  audio: HTMLAudioElement
}

function randomize(digits: number) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleDivisions(divisor: number) {
  const mult = Math.floor(Math.random() * 10) + 1;
  const dividend = divisor * mult;
  return dividend;
}

function getResult(a: number, b: number, sign: string) {
  switch (sign) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return a / b;
  }
}

export default function Operation({
  onCorrect,
  digitsA,
  digitsB,
  sign,
  audio }: OperationProps) {

  let a: number;
  let b: number;
  b = randomize(digitsB);
  a = sign === '÷' ? handleDivisions(b) : randomize(digitsA);
  if (sign === '-' && b > a) [a, b] = [b, a]; //NOTE: destructuring assignment

  const startTime = Date.now();
  const inputRef = useRef<HTMLInputElement>(null);
  const result = getResult(a, b, sign);

  const checkResult = () => {
    const value = inputRef.current?.value || "";
    const endTime = Date.now();
    const time = (endTime - startTime) / 1000;

    if (parseInt(value) === result) {
      audio.play().catch(() => { })
      onCorrect(time, a, b, result);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => { //TODO: FormEvent deprecated
    const input = e.currentTarget;
    input.value = input.value.replace(/[^\d-]/g, '');
  };

  return (
    <section className="flex flex-col w-fit text-7xl text-right">
      <span>{a}</span>
      <section className="flex justify-between">
        <span>{sign}</span>
        <span>{b}</span>
      </section>
      <span className="my-2 h-1 border-0 bg-gray-300"></span>
      <input
        type="text"
        inputMode="numeric"
        autoFocus
        maxLength={result?.toString().length}
        ref={inputRef}
        onInput={handleInput}
        onChange={checkResult}
        className="text-right w-0 min-w-full border-none outline-none caret-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
    </section>
  );
};
