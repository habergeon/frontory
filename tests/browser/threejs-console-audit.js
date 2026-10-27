// Keep raw diagnostics and exact blob lifetimes, including unique iframe identity.
let pageSerial = 0
export async function auditConsole(page, evidence) {
  evidence.blobAudit ??= []
  const pageId = ++pageSerial
  const frames = new WeakMap()
  let serial = 0
  const id = (frame) => {
    if (!frames.has(frame)) frames.set(frame, pageId + ':' + ++serial)
    return frames.get(frame)
  }
  for (const action of ['frameattached', 'framenavigated', 'framedetached'])
    page.on(action, (frame) =>
      evidence.blobAudit.push({
        action,
        frameId: id(frame),
        frameURL: frame.url(),
        at: Date.now(),
      }),
    )
  for (const action of ['request', 'requestfailed', 'requestfinished'])
    page.on(action, (request) => {
      if (!request.url().startsWith('blob:')) return
      let frameId = null
      try {
        frameId = id(request.frame())
      } catch {}
      evidence.blobAudit.push({
        action,
        frameId,
        url: request.url(),
        resourceType: request.resourceType(),
        at: Date.now(),
      })
    })
  await page.exposeBinding('__threejsAudit', ({ frame }, event) => {
    evidence.blobAudit.push({
      ...event,
      frameId: id(frame),
      frameURL: frame.url(),
      receivedAt: Date.now(),
    })
  })
  await page.addInitScript(() => {
    const emit = (event) =>
      void globalThis
        .__threejsAudit({
          ...event,
          at: Date.now(),
          documentURL: location.href,
        })
        .catch(() => {})
    emit({ action: 'document-start' })
    const create = URL.createObjectURL.bind(URL),
      revoke = URL.revokeObjectURL.bind(URL)
    URL.createObjectURL = (blob) => {
      const url = create(blob)
      emit({ action: 'create', url, mime: blob.type, bytes: blob.size })
      return url
    }
    URL.revokeObjectURL = (url) => {
      emit({ action: 'revoke', url })
      return revoke(url)
    }
    const originalFetch = globalThis.fetch
    globalThis.fetch = function (input, ...args) {
      const url = typeof input === 'string' ? input : input?.url
      if (url?.startsWith('blob:')) emit({ action: 'fetch-use', url })
      return originalFetch.call(this, input, ...args)
    }
    addEventListener('pagehide', () => emit({ action: 'pagehide' }), {
      once: true,
    })
    new MutationObserver((records) => {
      for (const record of records)
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue
          for (const element of [
            node,
            ...node.querySelectorAll('[src],script'),
          ]) {
            if (element.tagName === 'SCRIPT')
              for (const url of element.textContent.match(
                new RegExp('blob:[a-zA-Z0-9:/.-]+', 'g'),
              ) ?? [])
                emit({
                  action: 'script-reference',
                  url,
                  scriptType: element.getAttribute('type'),
                })
            const url = element.getAttribute('src')
            if (url?.startsWith('blob:'))
              emit({ action: 'element-use', url, tag: element.tagName })
          }
        }
    }).observe(document, { childList: true, subtree: true })
  })
}
