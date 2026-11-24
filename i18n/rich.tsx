import { Fragment, type ReactNode } from "react";

/** Renders each tag of a rich message: `<b>text</b>` calls `b("text")`, `<br/>` calls `br()`. */
export type RichTags = Record<string, (chunks?: ReactNode) => ReactNode>;

/** A self-closing tag (`<br/>`) or a tag with content (`<b>…</b>`). */
const TAG = /<(\w+)\s*\/>|<(\w+)>([\s\S]*?)<\/\2>/g;

/**
 * Turns a message with tags into React nodes, e.g.
 * rich("Join <contact>our team</contact>!", { contact: (c) => <Link href="/contact">{c}</Link> }).
 * Tags can be nested when they have different names. An unknown tag throws, so a typo fails the build.
 */
export function rich(message: string, tags: RichTags): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of message.matchAll(TAG)) {
    const [whole, selfClosing, name, content] = match;
    const tagName = selfClosing ?? name;
    const render = tags[tagName];
    if (!render) throw new Error(`Unknown tag <${tagName}> in message: ${message}`);

    if (match.index > last) nodes.push(message.slice(last, match.index));
    nodes.push(
      <Fragment key={match.index}>{selfClosing ? render() : render(rich(content, tags))}</Fragment>,
    );
    last = match.index + whole.length;
  }

  if (last < message.length) nodes.push(message.slice(last));
  return nodes;
}
