import { NextResponse, NextMiddleware, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const Role = request.cookies.get("userRole")?.value;
  const currentUrl = request.nextUrl.clone();
  const url = currentUrl.pathname;

  // Allow access to the root page and auth folder for all users without token check
  if (url === "/" || url.startsWith("/auth/")) {
    return NextResponse.next();
  } 
  // Check for token only if not accessing root or auth pages
  const token = request.cookies.get("accessToken");

  // If no token or token is undefined, redirect to login
  if (!token || token.value === "undefined") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Only proceed with API call and role checking if there's a valid token
  try {
    if (!Role) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (Role === "SUPER_ADMIN") {
      if (url.startsWith("/super-admin")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/accessDenied", request.url));
      }
    } else if (Role === "ADMIN") {
      if (url.startsWith("/admin")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/accessDenied", request.url));
      }
    } else if (Role === "USER") {
      if (url.startsWith("/user")) {
        return NextResponse.next();
      }else if(url.startsWith("/hostels")){
        return NextResponse.next();
      }else {
        return NextResponse.redirect(new URL("/accessDenied", request.url));
      }
    }
    else {
      return NextResponse.redirect(new URL("/accessDenied", request.url));
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|Group.png|firebase-messaging-sw.js|assets).*)",
  ],
};
