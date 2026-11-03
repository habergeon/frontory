import { useEffect, useState, type ComponentPropsWithRef } from 'react'
import { Workspace as LoadedWorkspace } from './Workspace'
import { prepareUnitSources } from './curriculum'
import { useLocale } from '../i18n/LocaleProvider'
import { messages } from '../i18n/messages'

export function Workspace(
  props: ComponentPropsWithRef<typeof LoadedWorkspace>,
) {
  const { locale } = useLocale()
  const { unit } = props
  const key = unit.id + ':' + locale
  const [result, setResult] = useState<{ key: string; failed: boolean } | null>(
    null,
  )
  useEffect(() => {
    let current = true
    setResult(null)
    prepareUnitSources(unit, locale).then(
      () => {
        if (current) setResult({ key, failed: false })
      },
      () => {
        if (current) setResult({ key, failed: true })
      },
    )
    return () => {
      current = false
    }
  }, [unit, locale, key])
  if (result?.key !== key)
    return <p role="status">{messages[locale].preparingWorkspace}</p>
  if (result.failed)
    return (
      <div role="alert">
        <p>
          {locale === 'ko'
            ? '실습 원문을 불러오지 못했습니다.'
            : 'Could not load the practice source.'}
        </p>
        <button onClick={() => window.location.reload()}>
          {locale === 'ko' ? '새로고침하여 다시 시도' : 'Reload and try again'}
        </button>
      </div>
    )
  return <LoadedWorkspace {...props} key={key} />
}
