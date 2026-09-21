const CLIENT_NAMESPACES = [
  "nav",
  "hero",
  "techStack",
  "experience",
  "hermesPersonas",
  "projects",
  "footer",
] as const;

type ClientNamespace = (typeof CLIENT_NAMESPACES)[number];

export function pickClientMessages(
  messages: Record<string, unknown>
): Record<ClientNamespace, unknown> {
  return CLIENT_NAMESPACES.reduce(
    (acc, namespace) => {
      if (namespace in messages) {
        acc[namespace] = messages[namespace];
      }
      return acc;
    },
    {} as Record<ClientNamespace, unknown>
  );
}
