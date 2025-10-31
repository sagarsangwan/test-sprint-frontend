"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "./QuestionCard";

export default function SubjectPanel({
  subject,
  onSubmit,
  answers,
  onSelectAnswer,
}) {
  // ✅ Desired subject order
  const SUBJECT_ORDER = [
    "reasoning",
    "general_awareness",
    "math",
    "english",
    "hindi",
  ];

  // ✅ Ensure subject questions are ordered by this sequence (if needed)
  const orderedSubject = useMemo(() => {
    if (!subject?.questions) return subject;
    // Just in case you have subjects combined or mixed, you can filter/sort here
    return {
      ...subject,
      name: subject.name?.toLowerCase(),
      questions: subject.questions,
    };
  }, [subject]);

  const [index, setIndex] = useState(0);
  const q = orderedSubject?.questions[index];

  const next = () => {
    if (index < orderedSubject.questions.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Subject Name Display */}
      <div className="text-center py-2 text-lg font-semibold capitalize">
        {SUBJECT_ORDER.includes(orderedSubject.name)
          ? orderedSubject.name.replace("_", " ")
          : orderedSubject.name}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <QuestionCard
          question={q}
          answer={answers[q?.id]}
          onSelect={(opt) => onSelectAnswer(q?.id, opt)}
        />
      </div>

      <div className="border-t p-4 flex justify-between">
        <Button onClick={prev} disabled={index === 0} variant="outline">
          Previous
        </Button>
        {index === orderedSubject.questions.length - 1 ? (
          <Button onClick={onSubmit}>Submit Subject</Button>
        ) : (
          <Button onClick={next}>Next</Button>
        )}
      </div>

      <div className="px-6 pb-4">
        <Progress
          value={((index + 1) / orderedSubject.questions.length) * 100}
        />
      </div>
    </div>
  );
}
