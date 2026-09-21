type JsonLdNode = Record<string, unknown> | object | null | undefined

const stripContext = (node: object) => {
  if (!("@context" in node)) {
    return node
  }

  const { "@context": _context, ...rest } = node as Record<string, unknown>
  return rest
}

const toJsonLdDocument = (data: JsonLdNode | JsonLdNode[]) => {
  const nodes = (Array.isArray(data) ? data : [data]).filter(
    (node): node is object => Boolean(node)
  )

  if (!nodes.length) {
    return null
  }

  if (nodes.length === 1) {
    return nodes[0]
  }

  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(stripContext)
  }
}

const JsonLd = ({ data }: { data: JsonLdNode | JsonLdNode[] }) => {
  const document = toJsonLdDocument(data)

  if (!document) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(document).replace(/</g, "\\u003c")
      }}
    />
  )
}

export default JsonLd
