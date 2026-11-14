import { Minus, Plus } from 'lucide-react'
export default function QuantityControl({ value, onChange }) {
  return <div className="quantity-control"><button onClick={() => onChange(value - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{value}</span><button onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div>
}
