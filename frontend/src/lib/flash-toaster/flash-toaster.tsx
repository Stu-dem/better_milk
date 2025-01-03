import { Toaster } from "sonner";
import FlashToasterClient from "@/lib/flash-toaster/flash-toaster-client";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function FlashToaster() {
  const cookieStore = await cookies();
  const flash = cookieStore.get("flash");

  return (
    <>
      <Toaster richColors closeButton />
      <FlashToasterClient flash={flash?.value} />
    </>
  );
}

export async function setFlash(flash: {
  type: "success" | "error";
  message: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set(
    "flash",
    JSON.stringify({
      ...flash,
      id: randomUUID(), // required to change the cookie value for UE to render the component
    }),
    { path: "/", expires: new Date(Date.now() + 10 * 1000) }
  );
}
