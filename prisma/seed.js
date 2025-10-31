import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockTests = Array.from({ length: 5 }, (_, i) => ({
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
          questionText: "Find the odd one: Apple, Banana, Mango, Potato",
          options: ["Apple", "Banana", "Mango", "Potato"],
          correctAnswer: "Potato",
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
          questionText: "Square root of 81?",
          options: ["8", "7", "9", "6"],
          correctAnswer: "9",
        },
      ],
    },
    {
      name: "Hindi",
      questions: [
        {
          questionText: "‘राम’ शब्द किस प्रकार का शब्द है?",
          options: ["संज्ञा", "सर्वनाम", "क्रिया", "विशेषण"],
          correctAnswer: "संज्ञा",
        },
        {
          questionText: "‘किताबें’ शब्द का एकवचन रूप क्या होगा?",
          options: ["किताबें", "किताबी", "किताब", "किताबीपन"],
          correctAnswer: "किताब",
        },
        {
          questionText: "‘काला’ का विलोम शब्द क्या है?",
          options: ["गहरा", "सफेद", "अंधेरा", "धूसर"],
          correctAnswer: "सफेद",
        },
        {
          questionText: "‘जल्दी आना’ का समानार्थक वाक्य कौन सा है?",
          options: ["धीरे आना", "शीघ्र आना", "कभी मत आना", "फिर आना"],
          correctAnswer: "शीघ्र आना",
        },
        {
          questionText: "‘कहाँ जा रहे हो?’ यह कौन-सा वाक्य है?",
          options: ["वर्णनात्मक", "प्रश्नवाचक", "आज्ञार्थक", "विस्मयादिबोधक"],
          correctAnswer: "प्रश्नवाचक",
        },
      ],
    },
  ],
}));

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
