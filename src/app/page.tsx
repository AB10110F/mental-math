"use client";

import SettingsIsland from '@/components/SettingsIsland';
import Operation from '@/components/Operation';
import Button from '@/components/Button';
import Timer from '@/components/timer';
import Resume from '@/components/Resume';
import dynamic from "next/dynamic";
import { useState } from "react";

type results = {
  time: number,
  a: number,
  sign: string,
  b: number,
  result: number
}

function Home() {

  //TODO: Support advanced operations
  //TODO: Add option to change the display of the operation
  const [started, setStarted] = useState(false);
  const [operationId, setOperationId] = useState(0);
  const [timerId, setTimerId] = useState(20); //NOTE: timerId cannot be equal to operationId

  const [digitsA, setDigitsA] = useState('1');
  const [digitsB, setDigitsB] = useState('1');
  const [sign, setSign] = useState('+');
  const [sequence, setSequence] = useState('5');

  const [results, setResults] = useState<results[]>([]);
  const [resume, setResume] = useState<results[]>([]);

  function toggleState() {
    if (started == true) {
      setOperationId(0)
      setTimerId(20)
      setResume(results);
      setResults([]);
    }
    setStarted(prevState => !prevState);
  }

  function changeId(time: number, a: number, b: number, result: number) {
    setOperationId(prev => prev + 1)
    setTimerId(prev => prev + 1)
    setResults(prev => [...prev, { time: time, a: a, sign: sign, b: b, result: result }]);
  }

  function setSettings(id: string, selection: string) {
    switch (id) {
      case 'digitsA': setDigitsA(selection);
        break;
      case 'digitsB': setDigitsB(selection);
        break;
      case 'sign': setSign(selection);
        break;
      case 'sequence': setSequence(selection);
        break;
    }
  };

  //NOTE: make dynamic labels for settingsIsland
  return (
    <main className="flex flex-1 w-full flex-col items-center py-5 px-16 bg-white dark:bg-neutral-800">
      <section className="flex flex-col w-full justify-between py-2 px-4 gap-10 lg:flex-row">
        <SettingsIsland
          id="digitsA"
          label={<span>Digits</span>}
          separator={<span className="w-0.5 h-full border-0 bg-gray-300" />}
          options={["1", "2", "3", "4"]}
          currentSign={sign}
          onClick={setSettings}
        />
        <SettingsIsland
          id="sign"
          options={["+", "-", "×", "÷"]}
          onClick={setSettings}
        />
        <SettingsIsland
          id="digitsB"
          label={<span>Digits</span>}
          separator={<span className="w-0.5 h-full border-0 bg-gray-300" />}
          options={["1", "2", "3", "4"]}
          currentSign={sign}
          digitsA={parseInt(digitsA)}
          onClick={setSettings}
        />
        <SettingsIsland
          id="sequence"
          label={<span>Sequence</span>}
          separator={<span className="w-0.5 h-full border-0 bg-gray-300" />}
          options={["5", "10", "15", "20"]}
          onClick={setSettings}
        />
      </section>
      <div className="flex flex-1 flex-col w-full items-center justify-center">
        {started ? (
          <>
            {operationId > parseInt(sequence, 10) - 1 ? (toggleState()) : (
              <>
                <Operation key={operationId} onCorrect={changeId} digitsA={parseInt(digitsA, 10)} digitsB={parseInt(digitsB, 10)} sign={sign} />
                <Timer key={timerId} />
                <Button onClick={toggleState} text="Stop" color="bg-red-500 hover:bg-red-700" />
              </>
            )}
          </>
        ) : (
          <>
            {Object.keys(resume).length === 0 ? (
              <h1 className="text-5xl py-10">Mathemagics</h1>
            ) : (
              <Resume resume={resume} />
            )}
            <Button onClick={toggleState} text="Start" color="bg-blue-500 hover:bg-blue-700" />
          </>
        )}
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
