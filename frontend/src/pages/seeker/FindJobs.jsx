import { useEffect, useState } from "react";
import BrowseJobs from "../../components/job/BrowseJobs";
import { getAvailableJobs } from "../../services/jobService";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Jobs page mounted");
    loadJobs();
  }, []);

  const loadJobs = async () => {
    console.log("loadJobs started");

    try {
      const data = await getAvailableJobs();

      console.log("Received data:", data);

      setJobs(data);
    } catch (error) {
      console.log("loadJobs error:", error);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return <BrowseJobs jobs={jobs} loading={loading} />;
}



