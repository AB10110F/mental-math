type ResumeProps = { //NOTE: can you make it a single line?
  resume: {
    time: number;
    a: number;
    sign: string;
    b: number;
    result: number;
  }[];
};

export default function Resume({ resume }: ResumeProps) {
  return (
    <section className="flex flex-col py-5 select-none">
      <h1 className="text-5xl py-5 text-center">Resume</h1>
      <ul className="grid grid-rows-5 grid-flow-col gap-x-10">
        {resume.map((item, index) => ( //NOTE: index seems to be implicit in the map method
          <li className="text-2xl" key={index}>{index + 1}. {item.a} {item.sign} {item.b} = {item.result} in {Math.floor(item.time / 60).toString().padStart(2, '0')}:{Math.floor(item.time % 60).toString().padStart(2, '0')}</li>
        ))}
      </ul>
    </section>
  );
};
