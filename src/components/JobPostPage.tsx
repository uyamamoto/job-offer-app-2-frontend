import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobPostPageProps {
  addJob: (newJob: { id: number; title: string; category: string; salary: string }) => void;
  fetchJobs: () => void;
};

const JobPostPage: React.FC<JobPostPageProps> = ({ addJob, fetchJobs }) => {
  const [category, setCategory] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && category && salary) {
      const newJob = {
        id: Date.now(),
        title: title,
        category: category,
        salary: salary,
      }

      try {
        const response = await fetch("https://job-offer-app-2-cb37e3f87d5c.herokuapp.com/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });

        if (!response.ok) {
          throw new Error("データの送信に失敗しました");
        }

        // 新しい求人を追加
        addJob(newJob);
        // 投稿後にリストを再取得して、最新の求人を反映
        fetchJobs();
        // 成功したら一覧ページにリダイレクト
        navigate("/");

      } catch (error) {
        console.error("エラーが発生しました: ", error);
      }
    }
  };


  return (
    <div className="p-10">
      <h2 className="font-bold mb-4 text-2xl">求人投稿</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">求人カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border w-64 p-2 w-full border-gray-400"
            required
          >
            <option value="">カテゴリを選択▼</option>
            <option value="事務">事務</option>
            <option value="エンジニア">エンジニア</option>
            <option value="営業">営業</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="財務・経理">財務・経理</option>
            <option value="人事">人事</option>
            <option value="カスタマーサポート">カスタマーサポート</option>
            <option value="製造">製造</option>
            <option value="医療・介護">医療・介護</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">年収 (万円)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="border w-64 p-2 w-full border-gray-400"
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block">求人タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full border-gray-400"
            required
           />
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-48 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          投稿
        </button>
      </form>
    </div>
  );
};

export default JobPostPage;