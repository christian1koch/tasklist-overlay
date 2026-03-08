const COMMANDS = [
  { command: "!addtask <title>", description: "Add a task" },
  { command: "!done <number>", description: "Complete a task" },
  { command: "!deltask <number>", description: "Delete a task" },
  { command: "!tasks", description: "List your tasks" },
];

export function CommandsCard() {
  return (
    <div className="absolute right-0 top-0 m-10 w-full max-w-xs rounded-xl border bg-black/90 p-4 shadow-md">
      <h2 className="text-primary mb-3 text-center text-2xl font-bold">Commands</h2>
      <div className="flex flex-col gap-1">
        {COMMANDS.map(({ command, description }) => (
          <div key={command} className="flex items-center justify-between text-lg">
            <span className="text-primary font-mono font-semibold">{command}</span>
            <span className="text-muted-foreground">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
