import { toast } from 'sonner'

export function showToast(message: string, srcUrl?: string) {
  if (srcUrl) {
    toast(
      <div className="flex items-center gap-2">
        <img src={srcUrl} alt="Toast GIF" className="w-8 h-8" loading="lazy" />
        <span>{message}</span>
      </div>
    )
  } else {
    toast.success(message)
  }
}
