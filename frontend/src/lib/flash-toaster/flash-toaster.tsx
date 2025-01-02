import { Toaster } from "sonner";
import FlashToasterClient from "@/lib/flash-toaster/flash-toaster-client";
import { cookies } from "next/headers";

export async function FlashToaster() {
    const cookieStore = await cookies();
    const flash = cookieStore.get("flash");
    //TODO: find way to ensure change in flash state is detected by react
    console.log({
        flash
    })
    return (
        <>
            <Toaster richColors closeButton />
            <FlashToasterClient flash={flash?.value} />
        </>
    )
}

export async function setFlash(flash: { type: "success" | "error", message: string }) {
    const cookieStore = await cookies();
    cookieStore.set('flash', JSON.stringify(flash), { path: '/', expires: new Date(Date.now() + 10 * 1000) });
}