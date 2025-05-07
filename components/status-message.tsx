import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface StatusMessageProps {
  type: "loading" | "error" | "success"
  message: string
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  return (
    <div
      className={`border-2 border-black rounded-md p-4 shadow-retro flex items-center gap-3 ${
        type === "error" ? "bg-red-100" : type === "success" ? "bg-green-100" : "bg-yellow-100"
      }`}
    >
      {type === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
      {type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
      {type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
      <p className="font-medium">{message}</p>
    </div>
  )
}
