import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// add thissssssssssssssssssssss in package.json
// "prisma": {
//     "seed": "node prisma/seed.js"
//   },
// ---- your mock data here ----
const mockTests = Array.from({ length: 10 }, (_, i) => ({
  title: `Test ${i + 1}`,
  totalTime: 5,
  userId: "cmhensw0l0000f0347low1veq",
  subjects: [
    {
      name: "Reasoning",
      questions: [
        {
          questionText: "Which number completes the series: 2, 4, 8, 16, ?",
          options: ["24", "32", "64", "128"],
          correctAnswer: "32",
        },
        {
          questionText: "If all birds can fly and parrots are birds, then?",
          options: [
            "Parrots can't fly",
            "Parrots can fly",
            "Some parrots can't fly",
            "None",
          ],
          correctAnswer: "Parrots can fly",
        },
        {
          questionText: "Find the odd one: Apple, Banana, Mango, Potato",
          options: ["Apple", "Banana", "Mango", "Potato"],
          correctAnswer: "Potato",
        },
        {
          questionText: "Find the next number: 3, 6, 12, 24, ?",
          options: ["30", "36", "42", "48"],
          correctAnswer: "48",
        },
        {
          questionText: "Which one is different: Car, Bike, Bus, Tree?",
          options: ["Car", "Bike", "Bus", "Tree"],
          correctAnswer: "Tree",
        },
      ],
    },
    {
      name: "English",
      questions: [
        {
          questionText: "Choose correct spelling:",
          options: ["Occassion", "Occasion", "Ocasion", "Occassoin"],
          correctAnswer: "Occasion",
        },
        {
          questionText: "Synonym of 'Brave':",
          options: ["Coward", "Fearless", "Weak", "Soft"],
          correctAnswer: "Fearless",
        },
        {
          questionText: "Antonym of 'Generous':",
          options: ["Kind", "Selfish", "Benevolent", "Rich"],
          correctAnswer: "Selfish",
        },
        {
          questionText: "Find correct passive: He wrote a letter.",
          options: [
            "A letter was written by him.",
            "He was written a letter.",
            "A letter is wrote.",
            "He wrote by a letter.",
          ],
          correctAnswer: "A letter was written by him.",
        },
        {
          questionText: "Choose correct tense: He ____ playing now.",
          options: ["is", "was", "were", "be"],
          correctAnswer: "is",
        },
      ],
    },
    {
      name: "Math",
      questions: [
        {
          questionText: "5 + 3 × 2 = ?",
          options: ["16", "11", "10", "13"],
          correctAnswer: "11",
        },
        {
          questionText: "Simplify: 12 ÷ (3 + 1)",
          options: ["3", "4", "2", "6"],
          correctAnswer: "3",
        },
        {
          questionText: "Square root of 81?",
          options: ["8", "7", "9", "6"],
          correctAnswer: "9",
        },
        {
          questionText: "Value of (2³) × (3²)?",
          options: ["24", "36", "72", "18"],
          correctAnswer: "72",
        },
        {
          questionText: "If x=5, find 2x + 3.",
          options: ["8", "10", "13", "15"],
          correctAnswer: "13",
        },
      ],
    },
  ],
}));

// ---- seed logic ----
async function main() {
  for (const test of mockTests) {
    const created = await prisma.test.create({
      data: {
        title: test.title,
        totalTime: test.totalTime,
        userId: test.userId,
        aiStatus: "done",
        pdfFileUrl: "seed://dummy.pdf",
        pdfHash: Math.random().toString(36).substring(2, 10),
        totalQuestions: 15,
        totalMarks: 15,
        subjects: {
          create: test.subjects.map((subj) => ({
            name: subj.name,
            status: "done",
            extractedText: "seeded data",
            generatedJson: JSON.stringify(subj.questions),
            questions: {
              create: subj.questions.map((q) => ({
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer,
              })),
            },
          })),
        },
      },
    });
    console.log(`✅ Created ${created.title}`);
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
