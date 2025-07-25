// components/ui/label.tsx
export function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-gray-700 space-y-1">{children}</label>;
}
