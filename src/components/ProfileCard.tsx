import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  id: number;
  name: string;
  avatar: string;
  displayId: string;
  onSelect: (id: number) => void;
}

const ProfileCard = ({ id, name, avatar, displayId, onSelect }: ProfileCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 font-mono">{displayId}</p>
        <Button
          onClick={() => onSelect(id)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Select Profile
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;