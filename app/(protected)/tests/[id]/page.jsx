import TestClient from "@/components/tests/TestClient";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TestPage({ params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  // const test = await prisma.Test.findUnique({
  //   where: { id },
  //   include: {
  //     subjects: {
  //       include: { questions: true },
  //       orderBy: { name: "asc" },
  //     },
  //   },
  // });
  const mockTest = {
    title: "DSSSB Mock Test",
    totalTime: 1,
    subjects: [
      {
        name: "Reasoning",
        questions: Array.from({ length: 5 }).map((_, i) => ({
          id: `r${i}`,
          questionText: `Reasoning Question ${i + 1}`,
          options: ["A", "B", "C", "D"],
        })),
      },
      {
        name: "English",
        questions: Array.from({ length: 5 }).map((_, i) => ({
          id: `e${i}`,
          questionText: `English Question ${i + 1}`,
          options: ["A", "B", "C", "D"],
        })),
      },
      {
        name: "Math",
        questions: Array.from({ length: 5 }).map((_, i) => ({
          id: `m${i}`,
          questionText: `Math Question ${i + 1}`,
          options: ["A", "B", "C", "D"],
        })),
      },
    ],
  };

  return <TestClient test={mockTest} />;
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Clock, ChevronRight, ChevronLeft } from "lucide-react";
// import { useState, useEffect } from "react";

// const mockSubjects = [
//   {
//     id: "1",
//     name: "Reasoning",
//     questions: [
//       {
//         id: "q1",
//         text: "If all roses are flowers and some flowers fade, then which of the following must be true?",
//         options: [
//           "All roses fade",
//           "Some roses fade",
//           "No roses fade",
//           "Some flowers are not roses",
//         ],
//         type: "mcq",
//       },
//       {
//         id: "q2",
//         text: "Complete the series: 2, 4, 8, 16, ?",
//         options: ["24", "32", "48", "64"],
//         type: "mcq",
//       },
//       {
//         id: "q3",
//         text: "What is the next letter in the sequence: A, C, E, G, ?",
//         options: ["H", "I", "J", "K"],
//         type: "mcq",
//       },
//     ],
//     answered: 0,
//   },
//   {
//     id: "2",
//     name: "GK",
//     questions: [
//       {
//         id: "q4",
//         text: "What is the capital of France?",
//         options: ["London", "Paris", "Berlin", "Madrid"],
//         type: "mcq",
//       },
//       {
//         id: "q5",
//         text: "Which planet is known as the Red Planet?",
//         options: ["Venus", "Mars", "Jupiter", "Saturn"],
//         type: "mcq",
//       },
//     ],
//     answered: 0,
//   },
//   {
//     id: "3",
//     name: "English",
//     questions: [
//       {
//         id: "q6",
//         text: "Choose the correct spelling:",
//         options: ["Occassion", "Occasion", "Ocasion", "Occassoin"],
//         type: "mcq",
//       },
//       {
//         id: "q7",
//         text: "What is the synonym of 'Benevolent'?",
//         options: ["Cruel", "Kind", "Angry", "Sad"],
//         type: "mcq",
//       },
//     ],
//     answered: 0,
//   },
//   {
//     id: "4",
//     name: "Maths",
//     questions: [
//       {
//         id: "q8",
//         text: "What is the value of 15% of 200?",
//         options: ["20", "25", "30", "35"],
//         type: "mcq",
//       },
//       {
//         id: "q9",
//         text: "Solve: 2x + 5 = 15",
//         options: ["x = 5", "x = 10", "x = 15", "x = 20"],
//         type: "mcq",
//       },
//     ],
//     answered: 0,
//   },
//   {
//     id: "5",
//     name: "Hindi",
//     questions: [
//       {
//         id: "q10",
//         text: "निम्नलिखित में से कौन सा शब्द संज्ञा है?",
//         options: ["दौड़ना", "सुंदर", "पुस्तक", "तेजी से"],
//         type: "mcq",
//       },
//     ],
//     answered: 0,
//   },
// ];

// export default function TestPage({ params }) {
//   const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes in seconds
//   const [answers, setAnswers] = useState({});
//   const [subjects, setSubjects] = useState(mockSubjects);
//   const [showSubmitDialog, setShowSubmitDialog] = useState(false);
//   const [testSubmitted, setTestSubmitted] = useState(false);

//   // Timer effect
//   useEffect(() => {
//     if (testSubmitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           handleSubmitTest();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [testSubmitted]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const currentSubject = subjects[currentSubjectIndex];
//   const currentQuestion = currentSubject.questions[currentQuestionIndex];
//   const totalQuestions = subjects.reduce(
//     (sum, s) => sum + s.questions.length,
//     0
//   );
//   const answeredQuestions = Object.keys(answers).length;

//   const handleSelectAnswer = (option) => {
//     const questionId = currentQuestion.id;
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: option,
//     }));
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < currentSubject.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmitSubject = () => {
//     const newSubjects = [...subjects];
//     newSubjects[currentSubjectIndex].answered = currentSubject.questions.length;
//     setSubjects(newSubjects);

//     if (currentSubjectIndex < subjects.length - 1) {
//       setCurrentSubjectIndex(currentSubjectIndex + 1);
//       setCurrentQuestionIndex(0);
//     } else {
//       setShowSubmitDialog(true);
//     }
//   };

//   const handleSubmitTest = () => {
//     setTestSubmitted(true);
//     // Redirect to results page
//     setTimeout(() => {
//       window.location.href = `/results?testId=${params.id}`;
//     }, 1000);
//   };

//   if (testSubmitted) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-background">
//         <Card className="max-w-md">
//           <CardContent className="pt-6 text-center">
//             <p className="text-lg font-semibold text-foreground mb-2">
//               Test Submitted!
//             </p>
//             <p className="text-muted-foreground">Redirecting to results...</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header with Timer */}
//         <div className="border-b border-border bg-card p-4 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold text-foreground">
//               {currentSubject.name} - Question {currentQuestionIndex + 1} of{" "}
//               {currentSubject.questions.length}
//             </h1>
//             <p className="text-sm text-muted-foreground mt-1">
//               Overall Progress: {answeredQuestions} of {totalQuestions} answered
//             </p>
//           </div>
//           <div
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//               timeLeft < 300 ? "bg-red-100 dark:bg-red-950" : "bg-primary/10"
//             }`}
//           >
//             <Clock
//               className={`w-5 h-5 ${
//                 timeLeft < 300
//                   ? "text-red-600 dark:text-red-400"
//                   : "text-primary"
//               }`}
//             />
//             <span
//               className={`font-mono font-bold text-lg ${
//                 timeLeft < 300
//                   ? "text-red-600 dark:text-red-400"
//                   : "text-primary"
//               }`}
//             >
//               {formatTime(timeLeft)}
//             </span>
//           </div>
//         </div>

//         {/* Question Content */}
//         <div className="flex-1 overflow-auto p-8">
//           <Card className="max-w-3xl">
//             <CardContent className="pt-6">
//               {/* Question */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">
//                   {currentQuestion.text}
//                 </h2>

//                 {/* Options */}
//                 <div className="space-y-3">
//                   {currentQuestion.options.map((option, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSelectAnswer(option)}
//                       className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
//                         answers[currentQuestion.id] === option
//                           ? "border-primary bg-primary/10"
//                           : "border-border hover:border-primary/50"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                             answers[currentQuestion.id] === option
//                               ? "border-primary bg-primary"
//                               : "border-border"
//                           }`}
//                         >
//                           {answers[currentQuestion.id] === option && (
//                             <div className="w-2 h-2 bg-primary-foreground rounded-full" />
//                           )}
//                         </div>
//                         <span className="text-foreground">{option}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="mt-8 pt-6 border-t border-border">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm font-medium text-foreground">
//                     Subject Progress
//                   </span>
//                   <span className="text-sm text-muted-foreground">
//                     {currentQuestionIndex + 1} of{" "}
//                     {currentSubject.questions.length}
//                   </span>
//                 </div>
//                 <Progress
//                   value={
//                     ((currentQuestionIndex + 1) /
//                       currentSubject.questions.length) *
//                     100
//                   }
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Navigation Footer */}
//         <div className="border-t border-border bg-card p-6 flex justify-between items-center">
//           <Button
//             variant="outline"
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestionIndex === 0}
//             className="gap-2 bg-transparent"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Previous
//           </Button>

//           <div className="flex gap-3">
//             {currentQuestionIndex === currentSubject.questions.length - 1 ? (
//               <Button onClick={handleSubmitSubject} className="gap-2">
//                 Submit Subject
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             ) : (
//               <Button onClick={handleNextQuestion} className="gap-2">
//                 Next
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Sidebar - Subject Navigation */}
//       <div className="w-64 border-l border-border bg-muted/30 p-4 overflow-auto">
//         <h3 className="font-semibold text-foreground mb-4">Subjects</h3>
//         <div className="space-y-2">
//           {subjects.map((subject, index) => (
//             <button
//               key={subject.id}
//               onClick={() => {
//                 if (subject.answered === 0 || index === currentSubjectIndex) {
//                   setCurrentSubjectIndex(index);
//                   setCurrentQuestionIndex(0);
//                 }
//               }}
//               disabled={subject.answered > 0 && index !== currentSubjectIndex}
//               className={`w-full p-3 rounded-lg text-left transition-all ${
//                 index === currentSubjectIndex
//                   ? "bg-primary text-primary-foreground"
//                   : subject.answered > 0
//                   ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
//                   : "bg-card text-foreground hover:bg-muted"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <span className="font-medium">{subject.name}</span>
//                 {subject.answered > 0 && (
//                   <span className="text-xs">✓ Done</span>
//                 )}
//               </div>
//               <p className="text-xs mt-1 opacity-75">
//                 {subject.questions.length} questions
//               </p>
//             </button>
//           ))}
//         </div>

//         {/* Question Navigator */}
//         <div className="mt-6 pt-4 border-t border-border">
//           <h4 className="text-sm font-semibold text-foreground mb-3">
//             Questions
//           </h4>
//           <div className="grid grid-cols-4 gap-2">
//             {currentSubject.questions.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentQuestionIndex(index)}
//                 className={`w-full aspect-square rounded text-xs font-medium transition-all ${
//                   index === currentQuestionIndex
//                     ? "bg-primary text-primary-foreground"
//                     : answers[currentSubject.questions[index].id]
//                     ? "bg-green-500 text-white"
//                     : "bg-muted text-muted-foreground hover:bg-muted/80"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Submit Dialog */}
//       <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Submit Test?</AlertDialogTitle>
//             <AlertDialogDescription>
//               You have completed all subjects. Are you sure you want to submit
//               your test? You cannot make changes after submission.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <div className="bg-muted p-4 rounded-lg my-4">
//             <p className="text-sm text-foreground">
//               <span className="font-semibold">Total Questions:</span>{" "}
//               {totalQuestions}
//             </p>
//             <p className="text-sm text-foreground mt-1">
//               <span className="font-semibold">Answered:</span>{" "}
//               {answeredQuestions}
//             </p>
//             <p className="text-sm text-foreground mt-1">
//               <span className="font-semibold">Time Remaining:</span>{" "}
//               {formatTime(timeLeft)}
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <AlertDialogCancel>Continue Test</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleSubmitTest}
//               className="bg-primary"
//             >
//               Submit Test
//             </AlertDialogAction>
//           </div>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
