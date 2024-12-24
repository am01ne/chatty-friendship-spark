import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import { setAuthToken } from "@/lib/api/config";

const DEMO_PROFILES = [
  { 
    id: 1, 
    name: "John Doe", 
    avatar: "https://i.pravatar.cc/150?img=1",
    displayId: "ID: 1",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1MTQ1MDA1LCJpYXQiOjE3MzUwNTg2MDUsImp0aSI6ImQ3MGU2YThmNTYxODRkN2E5YjQ0YTA4MWZjMTJjNmRjIiwidXNlcl9pZCI6MX0.bz-QlYnscdebjjDQJ9hVivobCZ2DHz2U5G7XRDUiB6M"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    avatar: "https://i.pravatar.cc/150?img=2",
    displayId: "ID: 2",
    token: "dummy_token_2" // Replace with actual token for user 2
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    avatar: "https://i.pravatar.cc/150?img=3",
    displayId: "ID: 3",
    token: "dummy_token_3" // Replace with actual token for user 3
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSelectProfile = (id: number) => {
    const profile = DEMO_PROFILES.find(p => p.id === id);
    if (profile) {
      localStorage.setItem("currentUserId", id.toString());
      setAuthToken(profile.token);
      console.log(`Selected profile ${id}, stored token in localStorage`);
      navigate("/chats");
    }
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