import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: session, error } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (error) {
      console.error("Error exchanging code for session:", error);
      // Handle the error
    } else if (session?.user) {
      // User has logged in
      const user = session.user;

      // Retrieve phone from user_metadata
      const phone = user.user_metadata.phone;

      // Check if phone exists, then proceed to insert
      if (phone) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: user.id, phone: phone }]); // Use phone from metadata

        if (profileError) {
          console.error("Error inserting profile:", profileError);
          // Handle the profile insertion error
        }
      }
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}
