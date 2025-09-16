// frontend/src/components/SkillsManager.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox } from '@/components/ui/ours/Combobox';
import { Trash2, PlusCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// This data should come from your backend via GET /api/skills
const ALL_AVAILABLE_SKILLS = [
  { value: 'React', label: 'React' },
  { value: 'Python', label: 'Python' },
  { value: 'SQL', label: 'SQL' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Project Management', label: 'Project Management' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Data Analysis', label: 'Data Analysis' },
  { value: 'Figma', label: 'Figma' },
];

type UserSkill = {
  id: number;
  skill: { name: string; };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  is_verified: boolean;
};

export const SkillsManager = () => {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // TODO: Replace with authenticatedFetch('/profile/skills')
    const fetchUserSkills = async () => {
      setIsLoading(true);
      await new Promise(res => setTimeout(res, 500)); // Simulate API delay
      // Mock initial data
      setUserSkills([
        { id: 1, skill: { name: 'React' }, level: 'Intermediate', is_verified: true },
        { id: 2, skill: { name: 'Python' }, level: 'Beginner', is_verified: false },
      ]);
      setIsLoading(false);
    };
    fetchUserSkills();
  }, []);

  const handleAddSkill = () => {
    if (!selectedSkillToAdd) {
      toast({ title: "Please select a skill to add.", variant: "destructive" });
      return;
    }
    if (userSkills.some(s => s.skill.name === selectedSkillToAdd)) {
      toast({ title: "This skill has already been added.", variant: "destructive" });
      return;
    }
    
    // TODO: Replace with POST to /api/profile/skills
    const newSkill = {
      id: Date.now(),
      skill: { name: selectedSkillToAdd },
      level: 'Beginner' as const,
      is_verified: false,
    };
    setUserSkills([...userSkills, newSkill]);
    setSelectedSkillToAdd('');
    toast({ title: `Skill "${selectedSkillToAdd}" added.` });
  };

  const handleRemoveSkill = (skillId: number, skillName: string) => {
    // TODO: Replace with DELETE to /api/profile/skills/{skillId}
    setUserSkills(userSkills.filter(s => s.id !== skillId));
    toast({ title: `Skill "${skillName}" removed.`, variant: "destructive" });
  };

  const handleLevelChange = (skillId: number, level: UserSkill['level']) => {
    // TODO: Replace with PATCH to /api/profile/skills/{skillId}
    setUserSkills(userSkills.map(s => s.id === skillId ? { ...s, level } : s));
  };
  
  if (isLoading) return <div className="text-center p-8">Loading skills...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground">Your Skillset</h3>
        <p className="text-muted-foreground">
          Add skills you possess and specify your proficiency. Verified skills will boost your recommendations.
        </p>
      </div>

      <div className="space-y-3">
        {userSkills.length > 0 ? userSkills.map(skill => (
          <div key={skill.id} className="flex flex-wrap items-center gap-4 p-3 border rounded-md bg-background/50">
            <div className="flex-grow font-medium flex items-center gap-2">
                {skill.skill.name}
                {skill.is_verified && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        <CheckCircle className="w-3 h-3 mr-1.5" />
                        Verified
                    </Badge>
                )}
            </div>
            <Select value={skill.level} onValueChange={(value) => handleLevelChange(skill.id, value as UserSkill['level'])}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Proficiency" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            {!skill.is_verified && (
                <Button variant="outline" size="sm">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Take Assessment
                </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(skill.id, skill.skill.name)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )) : (
            <div className="text-center p-6 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No skills added yet. Start building your profile!</p>
            </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
        <div className="flex-grow">
          <Combobox
            options={ALL_AVAILABLE_SKILLS.filter(opt => !userSkills.some(s => s.skill.name === opt.value))}
            value={selectedSkillToAdd}
            onChange={setSelectedSkillToAdd}
            placeholder="Select a skill to add..."
            searchPlaceholder="Type to search for skills..."
          />
        </div>
        <Button type="button" onClick={handleAddSkill}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>
    </div>
  );
};