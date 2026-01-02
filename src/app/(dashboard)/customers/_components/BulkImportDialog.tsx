"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { CustomersService } from "@/lib/api/services/CustomersService";
import { toast } from "sonner";
import { Loader2, Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Progress } from "@/components/ui/progress";

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function BulkImportDialog({
  open,
  onOpenChange,
  organizationId,
}: BulkImportDialogProps) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importStats, setImportStats] = useState<{ total: number; success: number; failed: number } | null>(null);

  const downloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Customers");

    sheet.columns = [
      { header: "WhatsApp Number (Required)", key: "whatsappNumber", width: 25 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Tags (Comma Separated)", key: "tags", width: 30 },
    ];

    sheet.addRow({ whatsappNumber: "15550101234", name: "Alice Smith", email: "alice@example.com", tags: "vip, new" });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "customer_import_template.xlsx");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImportStats(null);
      setProgress(0);
    }
  };

  const processImport = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setImportStats(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.getWorksheet(1);

      if (!worksheet) {
          toast.error("Invalid Excel file: No worksheet found.");
          setIsProcessing(false);
          return;
      }

      const rows: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        // Parse row data safely
        // Note: ExcelJS rows are 1-based, cell accessors can vary. We assume simplified column order or mapped by key if strictly formatted, but safer to assume index.
        // Col 1: WA, Col 2: Name, Col 3: Email, Col 4: Tags
        const whatsappNumber = row.getCell(1).text?.toString().replace(/[^0-9]/g, ""); // basic sanitization
        const name = row.getCell(2).text?.toString();
        const email = row.getCell(3).text?.toString();
        const tags = row.getCell(4).text?.toString();

        if (whatsappNumber) {
          rows.push({ whatsappNumber, name, email, tags });
        }
      });

      let successCount = 0;
      let failCount = 0;
      const total = rows.length;

      if (total === 0) {
          toast.warning("No valid data rows found in file.");
          setIsProcessing(false);
          return;
      }

      for (let i = 0; i < total; i++) {
        const row = rows[i];
        try {
          // Sequential creating to avoid rate limits/overwhelming server
          await CustomersService.postApiV1Customers({
            organizationId,
            whatsappNumber: row.whatsappNumber,
            name: row.name || undefined,
            email: row.email || undefined,
            tags: row.tags ? row.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
          });
          successCount++;
        } catch (error) {
          console.error(`Failed to import row ${i + 2}:`, error);
          failCount++;
        }
        setProgress(Math.round(((i + 1) / total) * 100));
      }

      setImportStats({ total, success: successCount, failed: failCount });
      queryClient.invalidateQueries({ queryKey: ["customers", organizationId] });
      toast.success("Import processing complete.");

    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to process Excel file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        if (!isProcessing) {
            onOpenChange(val);
            if (!val) {
                setFile(null);
                setImportStats(null);
                setProgress(0);
            }
        }
    }}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Bulk Import Customers</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Upload an Excel sheet to import multiple customers at once.
          </DialogDescription>
        </DialogHeader>

        {!importStats ? (
            <div className="space-y-6 py-4">
            <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-zinc-700 rounded-xl bg-black/20 text-center hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-white">
                        {file ? file.name : "Drag and drop or click to upload"}
                    </p>
                     <p className="text-xs text-zinc-500">
                        {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports .xlsx files"}
                    </p>
                </div>
                {!isProcessing && (
                    <Input
                        type="file"
                        accept=".xlsx"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                    />
                )}
                 {!file && (
                    <Button variant="outline" size="sm" className="mx-auto" asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">Browse Files</label>
                    </Button>
                )}
            </div>

            {isProcessing && (
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                        <span>Processing...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-zinc-800 [&>div]:bg-emerald-500" />
                </div>
            )}

            <div className="flex justify-between items-center text-xs text-zinc-500">
                <span>Need formatting help?</span>
                <Button variant="link" className="text-emerald-400 h-auto p-0" onClick={downloadTemplate}>
                    Download Template
                </Button>
            </div>
            </div>
        ) : (
             <div className="py-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
                         <div className="flex justify-center mb-2">
                             <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                         </div>
                         <p className="text-2xl font-bold text-white">{importStats.success}</p>
                         <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Imported</p>
                     </div>
                     <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center space-y-1">
                         <div className="flex justify-center mb-2">
                             <AlertCircle className="w-6 h-6 text-orange-500" />
                         </div>
                         <p className="text-2xl font-bold text-white">{importStats.failed}</p>
                         <p className="text-xs uppercase tracking-wider text-orange-400 font-bold">Failed</p>
                     </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-zinc-400">
                        Process completed. {importStats.total} rows processed.
                    </p>
                </div>
             </div>
        )}

        <DialogFooter>
            {!importStats ? (
                <div className="flex w-full gap-2">
                     <Button variant="ghost" className="flex-1" onClick={() => onOpenChange(false)} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold" disabled={!file || isProcessing} onClick={processImport}>
                        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                        {isProcessing ? "Importing..." : "Start Import"}
                    </Button>
                </div>
            ) : (
                <Button className="w-full" onClick={() => onOpenChange(false)}>Close</Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
