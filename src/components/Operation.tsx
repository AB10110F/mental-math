type OperationProps = {
  digits1: number,
  digits2: number,
  sign: "+" | "-" | "*" | "/"
}

function randomize(digits: number) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Operation({
  digits1,
  digits2,
  sign }: OperationProps) {

  const number1 = randomize(digits1)
  const number2 = randomize(digits2)

  return (
    <section className="flex flex-col w-fit text-7xl text-right">
      <span>{number1}</span>
      <section className="flex justify-between">
        <span>{sign}</span>
        <span>{number2}</span>
      </section>
      <span className="my-2 h-1 border-0 bg-gray-300"></span>
      <input
        type="number"
        // pattern="\d*"
        className="text-right w-0 min-w-full border-none outline-none caret-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
    </section>
  );
};
