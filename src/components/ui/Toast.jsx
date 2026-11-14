import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
export default function Toast() {
  const { toast } = useStore()
  return toast ? <div className="toast"><CheckCircle2 size={18}/>{toast}</div> : null
}
