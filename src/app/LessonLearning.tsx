import { SeriesRoadmap } from './SeriesRoadmap'
import { useRef, useState } from 'react'
import type { Locale } from '../i18n/locale'
import { learningMessages } from '../i18n/messages'
import { MarkdownView } from '../shared/MarkdownView'
import { getLocalizedUnit } from './curriculum'
import { localizedDocPath } from './documents'
import {
  getApiReference,
  readLearningCode,
  type LessonLearningData,
} from './learningContent'

export interface LearningExample {
  code: string
  language: 'html'
}
export function LessonLearning({
  lesson,
  locale,
  hidden = false,
  onDocument,
  onLoadExample,
  onNotes,
}: {
  lesson: LessonLearningData
  locale: Locale
  hidden?: boolean
  onDocument: (path: string) => void
  onLoadExample: (example: LearningExample) => void
  onNotes: () => void
}) {
  const copy = learningMessages[locale]
  const [stepId, setStepId] = useState(lesson.steps[0].id)
  const [pending, setPending] = useState<string | null>(null)
  const loadButton = useRef<HTMLButtonElement | null>(null)
  const confirmation = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const step =
    lesson.steps.find((step) => step.id === stepId) ?? lesson.steps[0]
  const markdown = (text: string) => (
    <MarkdownView text={text} locale={locale} onDocument={onDocument} />
  )
  const code = (path: string) => (
    <pre>
      <code>{readLearningCode(path, locale)}</code>
    </pre>
  )
  const requestLoad = (path: string, button: HTMLButtonElement) => {
    loadButton.current = button
    setPending(path)
    requestAnimationFrame(() => confirmation.current?.focus())
  }
  const cancel = () => {
    setPending(null)
    loadButton.current?.focus()
  }
  return (
    <article className="lesson-learning" hidden={hidden}>
      <h2 ref={heading} tabIndex={-1}>
        {copy.learning}
      </h2>
      {markdown(lesson.introduction)}
      {!!lesson.prerequisiteIds.length && (
        <nav aria-label={copy.prerequisites}>
          <h3>{copy.prerequisites}</h3>
          {lesson.prerequisiteIds.map((id) => {
            const unit = getLocalizedUnit(locale, id)
            return (
              unit && (
                <button
                  key={id}
                  className="text-link"
                  onClick={() =>
                    onDocument(localizedDocPath(locale, unit.docPath))
                  }
                >
                  {unit.title}
                </button>
              )
            )
          })}
        </nav>
      )}
      <label htmlFor="learning-step">{copy.steps}</label>
      <select
        id="learning-step"
        value={step.id}
        onChange={(event) => {
          setStepId(event.target.value)
          setPending(null)
          heading.current?.focus()
        }}
      >
        {lesson.steps.map((step) => (
          <option value={step.id} key={step.id}>
            {step.title}
          </option>
        ))}
      </select>
      <h3>{step.title}</h3>
      {markdown(step.explanation)}
      <h3>{copy.expected}</h3>
      {markdown(step.expected)}
      <details key={step.id + '-starter'}>
        <summary>{copy.starter}</summary>
        {code(step.starterPath)}
        <button
          onClick={(event) =>
            requestLoad(step.starterPath, event.currentTarget)
          }
        >
          {copy.load}
        </button>
      </details>
      <details key={step.id + '-hints'}>
        <summary>{copy.hints}</summary>
        {step.hints.map((hint, index) => (
          <div key={index}>{markdown(hint)}</div>
        ))}
      </details>
      <details key={step.id + '-solution'}>
        <summary>{copy.solution}</summary>
        {markdown(step.solutionExplanation)}
        {code(step.solutionPath)}
        <button
          onClick={(event) =>
            requestLoad(step.solutionPath, event.currentTarget)
          }
        >
          {copy.load}
        </button>
      </details>
      {pending && (
        <div
          ref={confirmation}
          tabIndex={-1}
          className="example-confirm"
          role="group"
          aria-label={copy.confirm}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation()
              cancel()
            }
          }}
        >
          <p>{copy.confirm}</p>
          <button
            onClick={() => {
              onLoadExample({
                code: readLearningCode(pending, locale),
                language: 'html',
              })
              cancel()
            }}
          >
            {copy.replace}
          </button>
          <button onClick={cancel}>{copy.cancel}</button>
        </div>
      )}
      <h3>{copy.questions}</h3>
      <ul>
        {step.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
      <h3>{copy.api}</h3>
      {lesson.apiIds.map((id) => {
        const api = getApiReference(id, locale)!
        return (
          <details key={id} className="api-reference">
            <summary>{api.symbol}</summary>
            {markdown(api.description)}
            <dl>
              {api.parameters.map((parameter) => (
                <div key={parameter.name}>
                  <dt>
                    <code>
                      {parameter.name}: {parameter.type}
                    </code>
                  </dt>
                  <dd>
                    {parameter.description}
                    {parameter.defaultValue !== undefined && (
                      <code> = {parameter.defaultValue}</code>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <h4>{copy.result}</h4>
            {markdown(api.result)}
            <h4>{copy.cautions}</h4>
            <ul>
              {api.cautions.map((caution) => (
                <li key={caution}>{caution}</li>
              ))}
            </ul>
            <pre>
              <code>{api.example}</code>
            </pre>
            <p>
              <a href={api.sourceUrl} target="_blank" rel="noreferrer">
                {copy.source}
              </a>{' '}
              · three@{api.packageVersion} · {copy.checked} {api.checkedAt}
            </p>
          </details>
        )
      })}
      {lesson.unitId === 'threejs-step-04' && <SeriesRoadmap locale={locale} />}
      <button onClick={onNotes}>{copy.notes}</button>
    </article>
  )
}
