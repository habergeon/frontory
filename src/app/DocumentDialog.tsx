import { useEffect, useRef, useState } from 'react'
import { MarkdownView } from '../shared/MarkdownView'
import { documents } from './curriculum'

interface Props { initialPath: string; unitPath: string; onClose: () => void }
export function DocumentDialog({ initialPath, unitPath, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const article = useRef<HTMLElement>(null)
  const [path, setPath] = useState(initialPath)
  useEffect(() => { dialog.current?.showModal() }, [])
  const navigate = (next: string) => {
    setPath(next)
    article.current?.scrollTo({ top: 0 })
  }
  return <dialog ref={dialog} className="document-dialog" onCancel={onClose} onClose={onClose} aria-labelledby="document-title">
    <header className="dialog-header">
      <h2 id="document-title">학습 문서</h2>
      <button onClick={onClose} autoFocus>닫기 · Esc</button>
    </header>
    <nav className="document-nav" aria-label="문서 탐색">
      <button onClick={() => navigate(unitPath)}>현재 단위</button>
      <button onClick={() => navigate('/docs/roadmap.md')}>전체 로드맵</button>
      <button onClick={() => navigate('/docs/learning-workspace.md')}>사용법과 저장 안내</button>
    </nav>
    <article ref={article}>
      <MarkdownView text={documents[path] ?? '# 문서를 찾을 수 없습니다\n상단에서 현재 단위나 로드맵을 선택하세요.'}
        documentPath={path} onDocument={navigate} />
    </article>
  </dialog>
}
