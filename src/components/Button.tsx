type ButtonProps = {
  color: "bg-blue-500 hover:bg-blue-700" | "bg-red-500 hover:bg-red-700",
  text: string
  onClick: () => void;
}
export default function Button({ color, text, onClick }: ButtonProps) {

  return (
    <button onClick={onClick} className={`${color} text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer`}>
      {text}
    </button>
  );
};
