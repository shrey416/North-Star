// src/pages/Profile.tsx

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MultiSelect } from '@/components/ui/ours/MultiSelect';
import { Combobox } from '@/components/ui/ours/Combobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CAREER_FIELDS, INTERESTS, STUDYING_LEVELS, INDIAN_INSTITUTIONS, COMMON_DEGREES } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationEntry, ExperienceEntry } from '@/types';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SkillsManager } from '@/components/SkillsManager';

const institutionOptions = INDIAN_INSTITUTIONS.map(name => ({ value: name, label: name }));
const degreeOptions = COMMON_DEGREES.map(name => ({ value: name, label: name }));
const careerFieldOptions = CAREER_FIELDS.map(field => ({ value: field, label: field }));
const interestOptions = INTERESTS.map(interest => ({ value: interest, label: interest }));

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({ displayName: '', age: '', dob: '' });
  const [studyStatus, setStudyStatus] = useState('');
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [experience, setExperience] = useState<ExperienceEntry[]>([]);
  const [careerInterests, setCareerInterests] = useState({
    interestedFields: [] as string[],
    interests: [] as string[],
    blacklistedFields: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      // TODO: Replace with authenticatedFetch('/users/me')
      // MOCK DATA FETCH
      const fetchProfile = async () => {
        console.log("Fetching profile for user:", user.uid);
        // Simulate API call
        await new Promise(res => setTimeout(res, 500)); 
        setPersonalInfo({ displayName: user.displayName || '', age: '25', dob: '1999-01-01' });
        setStudyStatus('Undergraduate (College)');
        setEducation([]);
        setExperience([]);
        setCareerInterests({ interestedFields: [], interests: [], blacklistedFields: [] });
        setLoading(false);
      };
      fetchProfile();
    }
  }, [user]);

  const addEducationEntry = () => setEducation([...education, { id: Date.now().toString(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]);
  const addExperienceEntry = () => setExperience([...experience, { id: Date.now().toString(), company: '', role: '', description: '', startDate: '', endDate: '' }]);
  const removeEducationEntry = (id: string) => setEducation(education.filter(e => e.id !== id));
  const removeExperienceEntry = (id: string) => setExperience(experience.filter(e => e.id !== id));

  const handleEducationChange = (id: string, field: keyof EducationEntry, value: string) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  const handleExperienceChange = (id: string, field: keyof ExperienceEntry, value: string) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    // TODO: Replace with authenticatedFetch('/users/me', { method: 'PUT', body: JSON.stringify(...) })
    console.log("Saving profile data:", { personalInfo, studyStatus, education, experience, careerInterests });
    await new Promise(res => setTimeout(res, 1000));

    setLoading(false);
    toast({ title: "Profile Updated Successfully!" });
  };

  if (loading && !personalInfo.displayName) return <div className="text-center p-24">Loading Your Profile...</div>;
  if (!user) return <div className="text-center p-24">Please log in to view your profile.</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground mb-8">Keep your information up-to-date to get the best career recommendations.</p>
        
        <form onSubmit={handleProfileUpdate}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="p-6 mt-6 cosmic-card">
                <div className="space-y-4">
                  <div><Label htmlFor="displayName">Full Name</Label><Input id="displayName" value={personalInfo.displayName} onChange={(e) => setPersonalInfo({...personalInfo, displayName: e.target.value})} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="age">Age</Label><Input id="age" type="number" value={personalInfo.age} onChange={(e) => setPersonalInfo({...personalInfo, age: e.target.value})} /></div>
                    <div><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" value={personalInfo.dob} onChange={(e) => setPersonalInfo({...personalInfo, dob: e.target.value})} /></div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="p-6 mt-6 cosmic-card space-y-6">
                <div>
                  <Label>What are you currently studying?</Label>
                  <Select value={studyStatus} onValueChange={setStudyStatus}>
                      <SelectTrigger><SelectValue placeholder="Select your current level" /></SelectTrigger>
                      <SelectContent>{STUDYING_LEVELS.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <hr className="border-border/50"/>
                {education.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-md relative space-y-4 bg-background/50">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducationEntry(entry.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label>Institution</Label><Combobox options={institutionOptions} value={entry.institution} onChange={(value) => handleEducationChange(entry.id, 'institution', value)} placeholder="Select Institution..." searchPlaceholder="Search institutions..."/></div>
                        <div><Label>Degree</Label><Combobox options={degreeOptions} value={entry.degree} onChange={(value) => handleEducationChange(entry.id, 'degree', value)} placeholder="Select Degree..." searchPlaceholder="Search degrees..."/></div>
                    </div>
                    <div><Label>Field of Study</Label><Input placeholder="e.g., Computer Science" value={entry.fieldOfStudy} onChange={(e) => handleEducationChange(entry.id, 'fieldOfStudy', e.target.value)} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label>Start Date</Label><Input type="month" value={entry.startDate} onChange={(e) => handleEducationChange(entry.id, 'startDate', e.target.value)} /></div>
                        <div><Label>End Date (or Expected)</Label><Input type="month" value={entry.endDate} onChange={(e) => handleEducationChange(entry.id, 'endDate', e.target.value)} /></div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" className="w-full" onClick={addEducationEntry}><PlusCircle className="mr-2 h-4 w-4" /> Add Past Education</Button>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
                <Card className="p-6 mt-6 cosmic-card">
                    {experience.map(entry => (
                        <div key={entry.id} className="p-4 border rounded-md mb-4 relative bg-background/50">
                           <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperienceEntry(entry.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label>Company</Label><Input value={entry.company} onChange={e => handleExperienceChange(entry.id, 'company', e.target.value)} /></div>
                                <div><Label>Role / Title</Label><Input value={entry.role} onChange={e => handleExperienceChange(entry.id, 'role', e.target.value)} /></div>
                                <div><Label>Start Date</Label><Input type="month" value={entry.startDate} onChange={e => handleExperienceChange(entry.id, 'startDate', e.target.value)} /></div>
                                <div><Label>End Date</Label><Input type="month" value={entry.endDate} onChange={e => handleExperienceChange(entry.id, 'endDate', e.target.value)} /></div>
                            </div>
                            <div className="mt-4"><Label>Description</Label><Textarea value={entry.description} onChange={e => handleExperienceChange(entry.id, 'description', e.target.value)} /></div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="w-full mt-4" onClick={addExperienceEntry}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                </Card>
            </TabsContent>

            <TabsContent value="interests">
              <Card className="p-6 mt-6 cosmic-card">
                <div className="space-y-6">
                  <div><Label>Your Interests</Label><MultiSelect options={interestOptions} selected={careerInterests.interests} onChange={(newSelection: string[]) => setCareerInterests(prev => ({ ...prev, interests: newSelection }))} /></div>
                  <div><Label>Interested Career Fields</Label><MultiSelect options={careerFieldOptions} selected={careerInterests.interestedFields} onChange={(newSelection: string[]) => setCareerInterests(prev => ({ ...prev, interestedFields: newSelection }))}/></div>
                  <div><Label>Fields to Avoid</Label><MultiSelect options={careerFieldOptions} selected={careerInterests.blacklistedFields} onChange={(newSelection: string[]) => setCareerInterests(prev => ({ ...prev, blacklistedFields: newSelection }))}/></div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="p-6 mt-6 cosmic-card">
                  <SkillsManager />
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
             <Button type="submit" className="w-full md:w-auto cosmic-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;