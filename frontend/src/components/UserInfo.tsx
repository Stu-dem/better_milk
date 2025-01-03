
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface Role {
  id: string;
  name: string;
  code: string;
}

interface Branch {
  id: string;
  name: string;
  code: string;
}

interface UserInfoProps {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      is_active: boolean;
      roles: Role[];
      branches: Branch[];
    }
    label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {

    return (
        <Card className="w-[600] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            First name
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.first_name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Last name
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.last_name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Is active
          </p>
          <Badge 
            variant={user?.is_active ? "success" : "destructive"}
          >
            {user?.is_active ? "YES" : "NO"}
          </Badge>
        </div>
      </CardContent>
        </Card>
    );
}

export default UserInfo;