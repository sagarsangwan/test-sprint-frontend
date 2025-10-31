"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "./QuestionCard";

export default function SubjectPanel({
  subject,
  onSubmit,
  answers,
  onSelectAnswer,
}) {
  const [index, setIndex] = useState(0);
  const q = subject?.questions[index];

  const next = () => {
    if (index < subject.questions.length - 1) setIndex(index + 1);
  };
  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-auto p-6">
        <QuestionCard
          question={q}
          answer={answers[q.id]}
          onSelect={(opt) => onSelectAnswer(q.id, opt)}
        />
      </div>

      <div className="border-t p-4 flex justify-between">
        <Button onClick={prev} disabled={index === 0} variant="outline">
          Previous
        </Button>
        {index === subject.questions.length - 1 ? (
          <Button onClick={onSubmit}>Submit Subject</Button>
        ) : (
          <Button onClick={next}>Next</Button>
        )}
      </div>

      <div className="px-6 pb-4">
        <Progress value={((index + 1) / subject.questions.length) * 100} />
      </div>
    </div>
  );
}
