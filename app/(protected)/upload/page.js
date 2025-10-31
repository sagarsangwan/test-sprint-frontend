"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function UploadPage() {
  const [uploadState, setUploadState] = useState({
    status: "idle",
    progress: 0,
  });
  const tatti = () => {
    toast.message(
      "nhi nhi krle start aaja krle jbb bol diya ye nhi chl rha hai to kyu krr rha hai upload "
    );
  };
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file.name.endsWith(".pdf")) {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Please upload a PDF file",
      });
      return;
    }

    // Simulate upload and parsing
    setUploadState({ status: "uploading", progress: 0, fileName: file.name });

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadState({
          status: "parsing",
          progress: 100,
          fileName: file.name,
        });

        // Simulate AI parsing
        setTimeout(() => {
          setUploadState({
            status: "success",
            progress: 100,
            fileName: file.name,
          });
        }, 2000);
      } else {
        setUploadState((prev) => ({
          ...prev,
          progress: Math.min(progress, 99),
        }));
      }
    }, 300);
  };

  const handleFileInputChange = (e) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleReset = () => {
    setUploadState({ status: "idle", progress: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Upload Question Paper
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload a PDF to generate a mock test automatically using AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload PDF</CardTitle>
              <CardDescription>
                Drag and drop your question paper or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadState.status === "idle" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors cursor-pointer ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop your PDF here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to select a file
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 50MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* File Info */}
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {uploadState.fileName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {uploadState.status === "uploading" && "Uploading..."}
                        {uploadState.status === "parsing" &&
                          "AI is parsing your document..."}
                        {uploadState.status === "success" && "Upload complete!"}
                        {uploadState.status === "error" && "Upload failed"}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(uploadState.progress)}%
                      </span>
                    </div>
                    <Progress value={uploadState.progress} className="h-2" />
                  </div>

                  {/* Status Messages */}
                  {uploadState.status === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          Upload successful!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Your test is ready. Click "Start Test" to begin.
                        </p>
                      </div>
                    </div>
                  )}

                  {uploadState.status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-900 dark:text-red-100">
                          Upload failed
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {uploadState.error}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-3">
                    {uploadState.status === "success" ? (
                      <>
                        <Button onClick={() => tatti()} className="flex-1">
                          Start Test
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="flex-1 bg-transparent"
                        >
                          Upload Another
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="w-full bg-transparent"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Supported Formats</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>✓ PDF files</p>
              <p>✓ Up to 50MB</p>
              <p>✓ Multiple pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p>AI analyzes your question paper</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p>Extracts questions and subjects</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p>Generates structured mock test</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <p>Ready to take the test!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
