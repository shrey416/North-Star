import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { MainLayout } from "../../components/MainLayout";

export default function ProfilePage() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <Card className="p-8">
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input defaultValue="Aarav Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input type="email" defaultValue="aarav.sharma@example.com" disabled />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Highest Qualification</label>
            <Input defaultValue="Bachelor of Technology in Computer Science" />
          </div>
           <div>
            <label className="block text-sm font-medium mb-1">Institution</label>
            <Input defaultValue="Indian Institute of Technology, Bombay" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Skills & Interests</label>
            <Input defaultValue="Python, Machine Learning, Cloud Computing, Public Speaking" />
            <p className="text-xs text-foreground/60 mt-1">Separate skills with a comma.</p>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </form>
      </Card>
    </MainLayout>
  );
}