import {auth} from "@/auth";

const SettingsPage = async () => {

    const session = await auth();

    return (
        <div>
            <h1>Settings</h1>
            <div className="">
                {JSON.stringify(session)}
            </div>
        </div>
    );
}

export default SettingsPage;