import { useState } from "react";

export default function AddTodoList() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const localStorageJobs = localStorage.getItem("jobs");
    if (localStorageJobs) {
      return JSON.parse(localStorageJobs);
    }
    return [];
  });

  const handleSubmit = () => {
    setJobs((prev:string) => {
      const newJobs = [...prev, job];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);
      return newJobs;
    });
    setJob("");
  };

  return (
    <div className="App">
      <input onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>add</button>

      <ul>
        {jobs.map((job:string, index:string) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}