"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Timer from "./Timer";
import Sidebar from "./Sidebar";

export default function TestClient({ test }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(test.totalTime * 60 || 50 * 60);
  const [subjects, setSubjects] = useState(test.subjects || []);
  const [currentSubject, setCurrentSubject] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedSubjects, setSubmittedSubjects] = useState([]);
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Start Timer
  useEffect(() => {
    if (!started || testSubmitted) return;

    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [started, timeLeft, testSubmitted]);

  const handleStart = () => {
    console.log("🚀 Test Started");
    setStarted(true);
  };

  const handleSelectAnswer = (qid, opt) => {
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const handleSubmitSubject = () => {
    const current = subjects[currentSubject];
    const subjectAnswers = Object.keys(answers)
      .filter((q) => current.questions.some((x) => x.id === q))
      .reduce((obj, q) => ({ ...obj, [q]: answers[q] }), {});

    console.log(`📘 ${current.name} submitted with answers:`, subjectAnswers);

    const updated = [...submittedSubjects, currentSubject];
    setSubmittedSubjects(updated);

    if (currentSubject < subjects.length - 1) {
      setCurrentSubject(currentSubject + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    if (testSubmitted) return;
    setTestSubmitted(true);
    console.log("✅ Test Submitted! All Answers:", answers);
    setTimeout(() => {
      window.location.href = "/results";
    }, 1500);
  };

  if (!started) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-xl font-bold mb-3">
              {test.title || "Mock Test"}
            </h1>
            <p className="text-muted-foreground mb-4">
              Duration: {test.totalTime || 50} min | Subjects: {subjects.length}
            </p>
            <Button onClick={handleStart} className="w-full">
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (testSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold">Test Submitted!</h2>
            <p className="text-muted-foreground">Redirecting to results...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const current = subjects[currentSubject];

  return (
    <div className="flex h-screen">
      <Sidebar
        subjects={subjects}
        currentSubject={currentSubject}
        submittedSubjects={submittedSubjects}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between p-4 border-b bg-card">
          <h2 className="font-semibold">
            {current?.name} ({currentSubject + 1}/{subjects.length})
          </h2>
          <Timer timeLeft={timeLeft} onTimeout={handleSubmitTest} />
        </div>

        {/* Scrollable questions */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {current?.questions?.map((q, i) => (
            <div key={q.id} className="border p-4 rounded-lg">
              <p className="font-medium mb-2">
                {i + 1}. {q.questionText}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(q.id, opt)}
                    disabled={submittedSubjects.includes(currentSubject)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      answers[q.id] === opt
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="p-4 border-t flex justify-center">
          <Button
            onClick={handleSubmitSubject}
            disabled={submittedSubjects.includes(currentSubject)}
            className="px-6"
          >
            Submit {current?.name}
          </Button>
        </div>
      </div>
    </div>
  );
}
