import  { useEffect, useState } from "react";

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67e2b20a8a456b79667c41b7"; // Replace with your Bin ID
const JSONBIN_API_KEY = "$2a$10$yti1izYQ7PKY9IhwxrQiuuIk8TZDdxM6nzYFnduMOvJtKIdyRhBB."; // Replace with your API key

interface Winner {
  id: number;
  fullName: string;
  amount: number;
  status: string;
  gender: string;
}

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch(JSONBIN_URL, {
          headers: { "X-Master-Key": JSONBIN_API_KEY },
        });
        const data = await response.json();
        setWinners(data.record); // JSONBin stores data inside 'record'
      } catch (error) {
        console.error("Error fetching winners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">🏆 Winners List</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner) => (
              <tr key={winner.id} className="text-center">
                <td className="border p-2">{winner.fullName}</td>
                <td className="border p-2">${winner.amount}</td>
                <td className="border p-2">{winner.status}</td>
                <td className="border p-2">{winner.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Winners;
