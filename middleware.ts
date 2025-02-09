// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const Role = request.cookies.get("userRole")?.value;
//   const currentUrl = request.nextUrl.clone();
//   const url = currentUrl.pathname;

//   // List of static pages to allow unrestricted access
//   const allowedStaticPages = [
//     "/about-us",
//     "/safety-center",
//     "/community-guidelines",
//     "/terms-of-service",
//     "/privacy-policy",
//   ];

//   // Allow access to root, auth, profile, and static pages
//   if (
//     url === "/" ||
//     url.startsWith("/auth/") ||
//     url.startsWith("/profile") ||
//     allowedStaticPages.includes(url)
//   ) {
//     return NextResponse.next();
//   }

//   // Check for token only if not accessing root or auth pages
//   const token = request.cookies.get("accessToken");
//   if (!token || token.value === "undefined") {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   try {
//     if (!Role) {
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }

//     // Special case for /pay
//     if (url.startsWith("/pay")) {
//       return NextResponse.next();
//     }

//     // Role-based access control
//     if (Role === "SUPER_ADMIN") {
//       if (url.startsWith("/super-admin")) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/accessDenied", request.url));
//       }
//     } else if (Role === "ADMIN") {
//       if (url.startsWith("/admin")) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/accessDenied", request.url));
//       }
//     } else if (Role === "USER") {
//       if (url.startsWith("/user") || url.startsWith("/hostels")) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/accessDenied", request.url));
//       }
//     } else {
//       return NextResponse.redirect(new URL("/accessDenied", request.url));
//     }
//      } catch (error) {
//     console.error("Error fetching user details:", error);
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|Group.png|firebase-messaging-sw.js|assets).*)",
//   ],
// };

import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const Role = request.cookies.get("userRole")?.value;
  const token = request.cookies.get("accessToken")?.value;
  const currentUrl = request.nextUrl.clone();
  const url = currentUrl.pathname;

  console.log("Checking URL:", url);
  console.log("Token:", token);
  console.log("User Role:", Role);

  // List of static pages to allow unrestricted access
  const allowedStaticPages = [
    "/about-us",
    "/safety-center",
    "/community-guidelines",
    "/terms-of-service",
    "/privacy-policy",
  ];

  // Allow access to public routes
  if (
    url === "/" ||
    url.startsWith("/auth/") ||
    url.startsWith("/profile") ||
    allowedStaticPages.includes(url)
  ) {
    return NextResponse.next();
  }

  // Ensure token exists before allowing access to protected pages
  if (!token) {
    console.log(" No token found, redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", request.url), 308);
  }

  // Role-based access control
  if (Role === "SUPER_ADMIN") {
    if (url.startsWith("/super-admin")) {
      return NextResponse.next();
    } else {
      console.log("SUPER_ADMIN restricted, redirecting to /accessDenied");
      return NextResponse.redirect(new URL("/accessDenied", request.url), 308);
    }
  }

  if (Role === "ADMIN") {
    if (url.startsWith("/admin")) {
      return NextResponse.next();
    } else {
      console.log("ADMIN restricted, redirecting to /accessDenied");
      return NextResponse.redirect(new URL("/accessDenied", request.url), 308);
    }
  }

  if (Role === "USER") {
    if (url.startsWith("/user") || url.startsWith("/hostels")) {
      return NextResponse.next();
    } else {
      console.log("USER restricted, redirecting to /accessDenied");
      return NextResponse.redirect(new URL("/accessDenied", request.url), 308);
    }
  }

  console.log("Unknown role, redirecting to /auth/login");
  return NextResponse.redirect(new URL("/auth/login", request.url), 308);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|dashboard.png|Group.png|firebase-messaging-sw.js|assets).*)",
  ],
};