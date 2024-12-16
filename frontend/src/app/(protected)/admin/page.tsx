"use client"

import { RoleGate } from "@/components/ui/auth/RoleGate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = () => {

    return (
        <Card className="w-[600px]">
            
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🔑Admin</p>
            </CardHeader>
            <RoleGate userRole="active">
                <CardContent className="space-y-4">
                    <p>Admin content</p>
            </CardContent>
            </RoleGate>
        </Card>
    );
};

export default AdminPage;