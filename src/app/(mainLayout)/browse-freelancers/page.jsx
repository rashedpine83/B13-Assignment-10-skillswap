"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserForFreelancer } from "@/lib/api/users";

export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        setError(null);

        // 👇 using your API function
        const res = await getUserForFreelancer("freelancer");
        console.log("API RESPONSE:", res);
        if (res?.success) {
          setFreelancers(res.data);
        } else {
          setFreelancers([]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load freelancers");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  return (
    <div className="p-6 container mx-auto pt-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Browse Freelancers
        </h1>
        <p className="text-gray-500">
          Find skilled professionals for your tasks
        </p>
      </div>

      {/* Loading */}
      {loading && <div className="text-gray-500">Loading freelancers...</div>}

      {/* Error */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Empty */}
      {!loading && !error && freelancers.length === 0 && (
        <div className="text-gray-500">No freelancers found</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((user) => (
          <div
            key={user._id}
            onClick={() => router.push(`/freelancers/${user._id}`)}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 
            hover:shadow-xl hover:-translate-y-1 hover:border-cyan-400"
          >
            {/* Top */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <p className="text-xs text-gray-500">{user.jobs || 0} jobs</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-4 line-clamp-2">
              {user.bio || "No description provided"}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">No skills</span>
              )}
            </div>

            {/* Rate */}
            <div className="mt-4 font-bold text-purple-600">
              ${user.hourlyRate || 0}/hr
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
