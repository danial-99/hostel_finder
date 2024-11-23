const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// Use global Prisma instance if available
const prismadb = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

async function main() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Seed Super Admin
    const superAdmin = await prismadb.user.upsert({
      where: { email: "superadmin@example.com" },
      update: {},
      create: {
        name: "Super Admin",
        username: "superadmin",
        email: "azharabbass786.com@gmail.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        phone: "1234567890",
        termsConditions: true,
      },
    });

    console.log("Super Admin seeded:", superAdmin);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with failure
  }
}

main().then(() => {
  console.log("Database seeding completed.");
  process.exit(0); // Exit successfully
});
