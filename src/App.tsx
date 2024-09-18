import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import JobListPage from "./components/JobListPage";
import JobPostPage from "./components/JobPostPage";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: string;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  // APIから求人データを取得する非同期関数
  const fetchJobs = async (): Promise<void> => {
    try {
      const response = await fetch("https://job-offer-app-2-cb37e3f87d5c.herokuapp.com/jobs");
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
      const data: Job[] = await response.json();
      setJobs(data);
    } catch (error: any) {
      setError(error.message);
    }
  }

  // コンポーネントが初めて描画されたときにデータを取得
  useEffect(() => {
    fetchJobs();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  // 新しい求人を追加する関数
  const addJob = (newJob: Job) => {
    setJobs([...jobs, newJob]);
  }

  return (
    <Router>
      <div>
        <nav className="p-4 bg-gray-800 text-white flex">
          <h1 className="text-2xl font-bold">求人検索アプリ</h1>
          <div className="ml-auto">
            <Link to="/" className="mr-4">求人検索</Link>
            <Link to="/post">求人投稿</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<JobListPage jobs={jobs} />} />
          <Route path="/post" element={<JobPostPage addJob={addJob} fetchJobs={fetchJobs} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;