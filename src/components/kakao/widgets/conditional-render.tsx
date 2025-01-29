interface ConditionalRendererProps {
  condition: boolean;
  children: React.ReactNode;
}

export default function ConditionalRender({ condition, children }: ConditionalRendererProps) {
  return condition ? <>{children}</> : null;
}
