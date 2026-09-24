/* Only namespaces consumed by a "use client" component belong here. `experience` and `footer` are
   rendered by Server Components, which read from the request config instead, so shipping them to
   the client would duplicate every string into the page payload. */
const CLIENT_NAMESPACES = [
  "nav",
  "hero",
  "techStack",
  "hermesPersonas",
  "projects",
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
