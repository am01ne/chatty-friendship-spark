import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";

const DEMO_PROFILES = [
  { id: "user1", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "user2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "user3", name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=3" },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSelectProfile = (id: string) => {
    localStorage.setItem("currentUserId", id);
    navigate("/chats");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Select a Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_PROFILES.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile}
            onSelect={handleSelectProfile}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;