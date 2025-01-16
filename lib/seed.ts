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
      where: { email: "azharabbass786.com@gmail.com" },
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

    // Seed Subscription Plans
    const plans = [
      {
        id: "free",
        name: "Free",
        price: 0,
        interval: "forever",
        discount: 0,
        features: [
          { id: "f1", text: "Basic listing" },
          { id: "f2", text: "Limited visibility" },
        ],
      },
      {
        id: "monthly",
        name: "Monthly",
        price: 29.99,
        interval: "month",
        discount: 0,
        features: [
          { id: "m1", text: "Basic listing" },
          { id: "m2", text: "Improved visibility" },
        ],
      },
      {
        id: "semi-annual",
        name: "Semi-Annual",
        price: 59.99,
        interval: "6 months",
        discount: 5,
        features: [
          { id: "s1", text: "Top listing" },
          { id: "s2", text: "High visibility" },
          { id: "s3", text: "Get off" },
        ],
      },
      {
        id: "annual",
        name: "Annual",
        price: 99.99,
        interval: "year",
        discount: 10,
        features: [
          { id: "a1", text: "Top listing" },
          { id: "a2", text: "High visibility" },
          { id: "a3", text: "Get more off" },
        ],
      },
    ];

    for (const plan of plans) {
      await prismadb.plan.upsert({
        where: { id: plan.id },
        update: {},
        create: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
          interval: plan.interval,
          discount: plan.discount,
          features: {
            create: plan.features.map((feature) => ({
              id: feature.id,
              text: feature.text,
            })),
          },
        },
      });
    }

    console.log("Subscription plans seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with failure
  }
}
main().then(() => {
  console.log("Database seeding completed.");
  process.exit(0); // Exit successfully
});
