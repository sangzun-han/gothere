export default function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
