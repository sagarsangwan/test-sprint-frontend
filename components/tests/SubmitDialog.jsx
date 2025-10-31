"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function SubmitDialog({
  open,
  onClose,
  onConfirm,
  totalSubjects,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Test?</AlertDialogTitle>
          <AlertDialogDescription>
            You have completed all {totalSubjects} subjects. Once submitted, it
            cannot be changed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Submit Test</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
