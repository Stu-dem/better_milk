"use server";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SettingsPage = async () => {
  const cookieStore = await cookies();

  return (
    <Card className="w-[600] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {cookieStore.getAll().map((cookie) => (
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">{cookie.name}</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
              {cookie.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
