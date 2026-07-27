export function DraftResponsePanel({ response }: { response: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
      <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
        {response}
      </pre>
    </div>
  );
}
