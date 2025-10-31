"use client";

export default function Sidebar({
  subjects,
  currentSubject,
  submittedSubjects,
}) {
  return (
    <div className="w-64 border-r bg-muted/30 p-4 space-y-3">
      <h3 className="font-semibold mb-4">Subjects</h3>

      {subjects.map((s, i) => {
        let status = "Locked";
        if (submittedSubjects.includes(i)) status = "Done";
        else if (i === currentSubject) status = "Ongoing";

        return (
          <div
            key={s.id || i}
            className={`p-3 rounded-lg border flex justify-between items-center ${
              status === "Done"
                ? "bg-green-100 dark:bg-green-950 text-green-700"
                : status === "Ongoing"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground opacity-60"
            }`}
          >
            <span>{s.name}</span>
            <span className="text-xs">{status}</span>
          </div>
        );
      })}
    </div>
  );
}
