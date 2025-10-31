"use client";
export default function QuestionCard({ question, answer, onSelect }) {
  if (!question) return <p>No question found</p>;

  return (
    <div>
      <h3 className="font-medium mb-4">{question.questionText}</h3>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            className={`w-full p-3 text-left rounded border ${
              answer === opt
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
