import { useEffect, useState } from "react"

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <article className="text-4xl py-5">
      {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
    </article>
  )
}
