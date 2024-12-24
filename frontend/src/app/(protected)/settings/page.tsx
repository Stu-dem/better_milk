"use server";
import { cookies } from 'next/headers'

const SettingsPage = async () => {

  const cookieStore = await cookies()

  return (
    <div>
      <h1>Settings</h1>
      {
        cookieStore.getAll().map((cookie) => (
          <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
          </div>
        ))
      }
    </div>
  );
};

export default SettingsPage;
