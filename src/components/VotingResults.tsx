import { useEffect, useState } from "react";
import {
  getCandidates,
  getVoteCounts,
  voteForCandidate,
  hasUserVoted,
} from "../../hooks/useVoting";

export default function VotingResults() {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const candidateList = await getCandidates();
        const voteCounts = await getVoteCounts();
        setCandidates(candidateList);
        setVotes(voteCounts);

        // Check if the user has already voted
        const userAddress = await window.ethereum?.request({
          method: "eth_accounts",
        });
        if (userAddress && userAddress.length > 0) {
          const userHasVoted = await hasUserVoted(userAddress[0]);
          setVoted(userHasVoted);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  const handleVote = async () => {
    if (selectedCandidate === null) {
      alert("Please select a candidate to vote for.");
      return;
    }

    try {
      setLoading(true);
      await voteForCandidate(selectedCandidate);
      alert(`Successfully voted for ${candidates[selectedCandidate]}`);

      // Refresh results
      const voteCounts = await getVoteCounts();
      setVotes(voteCounts);
      setVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
      alert("Voting failed. Ensure MetaMask is connected and try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Voting Results</h2>
      {loading ? (
        <p>Loading results...</p>
      ) : (
        <div>
          <ul>
            {candidates.map((name, index) => (
              <li key={index}>
                {name}: {votes[index]} votes
              </li>
            ))}
          </ul>
          {!voted ? (
            <div>
              <h3>Cast Your Vote</h3>
              <select
                onChange={(e) => setSelectedCandidate(Number(e.target.value))}
              >
                <option value="">Select a Candidate</option>
                {candidates.map((name, index) => (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleVote}
                disabled={loading || selectedCandidate === null}
              >
                Vote
              </button>
            </div>
          ) : (
            <p>✅ You have already voted.</p>
          )}
        </div>
      )}
    </div>
  );
}
