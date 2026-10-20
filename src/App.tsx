import { useRef, useState } from 'react'
import {
  BarChart3,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  FileText,
  HelpCircle,
  ImageUp,
  LineChart,
  LoaderCircle,
  Printer,
  ScanLine,
  Sparkles,
  Target,
  Upload,
  X,
} from 'lucide-react'

type Page = 'today' | 'progress' | 'skills'
type ScanState = 'idle' | 'processing' | 'review'

interface WorksheetSettings {
  count: number
  largePrint: boolean
  mixedRepresentation: boolean
}

interface EvidenceItem {
  id: number
  date: string
  time: string
  title: string
  summary: string
  status: 'review' | 'confirmed'
}

const seededEvidence: EvidenceItem[] = [
  {
    id: 1,
    date: 'Apr 24, 2025',
    time: '2:18 PM',
    title: 'Fractions practice (12 problems)',
    summary: 'Answers extracted and ready for your review.',
    status: 'review',
  },
  {
    id: 2,
    date: 'Apr 22, 2025',
    time: '10:03 AM',
    title: 'Equivalent fractions',
    summary: '12 problems · 10 correct · Teacher confirmed',
    status: 'confirmed',
  },
  {
    id: 3,
    date: 'Apr 17, 2025',
    time: '11:21 AM',
    title: 'Compare fractions (same denominator)',
    summary: '10 problems · 8 correct · Teacher confirmed',
    status: 'confirmed',
  },
]

const reviewRows = [
  { problem: '1/2  ?  3/8', extracted: '3/8', confidence: 'High' },
  { problem: '2/3  ?  3/5', extracted: '2/3', confidence: 'High' },
  { problem: '3/4  =  ?/12', extracted: '9/12', confidence: 'High' },
  { problem: '5/6  ?  4/5', extracted: '4/5', confidence: 'Check' },
]

function AtlasMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="atlas-mark">
      <circle cx="16" cy="8" r="6" />
      <circle cx="9.5" cy="20" r="6" />
      <circle cx="22.5" cy="20" r="6" />
      <path d="M13 12.5 11.5 15M19 12.5l1.5 2.5M15 21h2" />
    </svg>
  )
}

function WhyButton({ label = 'Why this?' }: { label?: string }) {
  return <button className="why-button" type="button" title="See the evidence behind this suggestion"><HelpCircle size={13} />{label}</button>
}

function Topbar({ page, onPage }: { page: Page; onPage: (page: Page) => void }) {
  return (
    <header className="topbar">
      <button className="brand" type="button" onClick={() => onPage('today')}>
        <AtlasMark />
        <strong>Open Learning Atlas</strong>
      </button>
      <nav aria-label="Primary navigation">
        {(['today', 'progress', 'skills'] as Page[]).map((item) => (
          <button key={item} type="button" className={page === item ? 'active' : ''} onClick={() => onPage(item)}>
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
      <button className="teacher-menu" type="button">
        <span>JW</span>
        <b>Josiah</b>
        <ChevronDown size={14} />
      </button>
    </header>
  )
}

function StudentBand() {
  return (
    <section className="student-band" aria-label="Current student">
      <div className="student-identity">
        <span className="student-avatar">M</span>
        <div><h1>Maya</h1><p>Age 10 · 5th grade</p></div>
      </div>
      <div className="student-fact focus-fact">
        <small>Current focus</small>
        <strong>Fractions and proportional reasoning</strong>
        <WhyButton />
      </div>
      <div className="student-fact">
        <small>Last confirmed evidence</small>
        <strong><CalendarDays size={15} /> Apr 22, 2025</strong>
        <p>7 days ago</p>
      </div>
      <div className="student-fact status-fact">
        <small>Status</small>
        <strong><i /> Making progress</strong>
        <p>One pattern needs review</p>
      </div>
    </section>
  )
}

function WorksheetPanel({
  settings,
  setSettings,
  onGenerate,
  onUpload,
}: {
  settings: WorksheetSettings
  setSettings: (settings: WorksheetSettings) => void
  onGenerate: () => void
  onUpload: () => void
}) {
  return (
    <section className="panel worksheet-panel">
      <div className="panel-heading worksheet-heading">
        <div className="heading-icon"><FileText size={20} /></div>
        <div>
          <h2>Next worksheet</h2>
          <p>Personalized from Maya’s confirmed work and current focus.</p>
          <WhyButton />
        </div>
        <button className="secondary-action upload-action" type="button" onClick={onUpload}><Upload size={17} />Upload completed work</button>
      </div>
      <div className="worksheet-controls">
        <label className="select-control">
          <span>Number of problems</span>
          <span className="select-wrap">
            <select value={settings.count} onChange={(event) => setSettings({ ...settings, count: Number(event.target.value) })}>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
            <ChevronDown size={15} />
          </span>
        </label>
        <label className="check-control">
          <input type="checkbox" checked={settings.largePrint} onChange={(event) => setSettings({ ...settings, largePrint: event.target.checked })} />
          <span className="checkbox"><Check size={15} /></span>
          <span><b>Large print</b><small>Larger text and room to work</small></span>
        </label>
        <label className="check-control">
          <input type="checkbox" checked={settings.mixedRepresentation} onChange={(event) => setSettings({ ...settings, mixedRepresentation: event.target.checked })} />
          <span className="checkbox"><Check size={15} /></span>
          <span><b>Mixed representation</b><small>Numbers, models, and word problems</small></span>
        </label>
        <button className="primary-action" type="button" onClick={onGenerate}><Sparkles size={18} />Generate worksheet</button>
      </div>
    </section>
  )
}

function ProgressChart({ updated = false, expanded = false }: { updated?: boolean; expanded?: boolean }) {
  return (
    <section className={`panel progress-panel ${expanded ? 'expanded-panel' : ''}`}>
      <div className="panel-heading">
        <div className="heading-icon"><LineChart size={20} /></div>
        <div><h2>Progress over time</h2><p>Fraction comparison accuracy from confirmed work.</p></div>
        <WhyButton />
      </div>
      <div className="chart-wrap" aria-label="Maya's fraction comparison accuracy is improving toward her individual goal">
        <svg className="progress-chart" viewBox="0 0 760 210" role="img">
          <title>Fraction comparison accuracy over time</title>
          {[20, 65, 110, 155].map((y) => <line key={y} x1="48" y1={y} x2="742" y2={y} className="grid-line" />)}
          <line x1="48" y1="183" x2="742" y2="183" className="axis-line" />
          <line x1="270" y1="20" x2="270" y2="183" className="change-line" />
          <text x="278" y="34" className="change-label">Started visual-model intervention</text>
          <text x="278" y="50" className="change-date">Mar 3</text>
          <path d="M58 147 C120 140 165 126 220 118 S320 104 380 92 S475 78 535 62 S650 42 728 32" className="goal-line" />
          <path d={`M58 157 L120 155 L176 137 L230 141 L278 119 L330 127 L384 116 L442 101 L506 80 L570 69 L642 58 ${updated ? 'L728 45' : ''}`} className="performance-line" />
          {[['58','157'],['120','155'],['176','137'],['230','141'],['278','119'],['330','127'],['384','116'],['442','101'],['506','80'],['570','69'],['642','58']].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4.5" className="performance-dot" />)}
          {updated && <circle cx="728" cy="45" r="5" className="performance-dot newest-dot" />}
          <text x="4" y="24" className="axis-label">100%</text><text x="12" y="69" className="axis-label">75%</text><text x="12" y="114" className="axis-label">50%</text><text x="12" y="159" className="axis-label">25%</text>
          <text x="48" y="204" className="axis-label">Feb</text><text x="250" y="204" className="axis-label">Mar</text><text x="472" y="204" className="axis-label">Apr</text><text x="698" y="204" className="axis-label">May</text>
        </svg>
        <div className="chart-legend"><span><i className="solid-key" />Maya’s performance</span><span><i className="goal-key" />Individual goal</span></div>
      </div>
    </section>
  )
}

function EvidenceList({ evidence, onReview }: { evidence: EvidenceItem[]; onReview: () => void }) {
  return (
    <section className="panel evidence-panel">
      <div className="panel-heading">
        <div className="heading-icon"><ScanLine size={20} /></div>
        <div><h2>Recent evidence</h2><p>Every insight stays connected to the work it came from.</p></div>
        <button className="text-action" type="button">View all <ChevronRight size={15} /></button>
      </div>
      <div className="evidence-list">
        {evidence.map((item) => (
          <button className="evidence-row" type="button" key={item.id} onClick={item.status === 'review' ? onReview : undefined}>
            <span className={`timeline-dot ${item.status}`} />
            <span className="paper-thumb" aria-hidden="true"><span /><span /><span /></span>
            <span className="evidence-copy"><small>{item.date} · {item.time}</small><strong>{item.title}</strong><p>{item.summary}</p></span>
            <span className={`review-state ${item.status}`}>{item.status === 'review' ? 'Needs teacher review' : <><Check size={13} />Confirmed</>}</span>
            <ChevronRight className="row-chevron" size={18} />
          </button>
        ))}
      </div>
    </section>
  )
}

const skills = [
  { name: 'Understand what a fraction means', status: 'On track', level: 82, evidence: 8, date: 'Apr 22', tone: 'green' },
  { name: 'Compare fractions with the same denominator', status: 'Building', level: 66, evidence: 6, date: 'Apr 22', tone: 'green' },
  { name: 'Compare fractions with different denominators', status: 'Needs support', level: 38, evidence: 7, date: 'Apr 24', tone: 'copper' },
]

function LearningPicture({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className={`panel learning-panel ${expanded ? 'expanded-panel' : ''}`}>
      <div className="panel-heading">
        <div className="heading-icon"><BarChart3 size={20} /></div>
        <div><h2>Learning picture</h2><p>Current signals from confirmed evidence.</p></div>
        <WhyButton />
      </div>
      <div className="skill-list">
        {skills.map((skill) => (
          <button className="skill-row" type="button" key={skill.name}>
            <span className="skill-title"><strong>{skill.name}</strong><b className={skill.tone}>{skill.status}</b></span>
            <span className="skill-meter"><i style={{ width: `${skill.level}%` }} className={skill.tone} /></span>
            <span className="skill-meta">{skill.evidence} pieces of evidence <em>Last confirmed {skill.date}</em></span>
          </button>
        ))}
      </div>
      {expanded && (
        <div className="skill-context">
          <h3>Nearby skills</h3>
          <div className="skill-path" aria-label="Focused skill path">
            <span>Fraction meaning</span><ChevronRight size={16} /><span>Equivalent fractions</span><ChevronRight size={16} /><strong>Compare fractions</strong>
          </div>
          <p>This small neighborhood provides curriculum context without turning Maya’s evidence into a full skill-tree view.</p>
        </div>
      )}
    </section>
  )
}

function AttentionPanel({ onReview }: { onReview: () => void }) {
  return (
    <section className="panel attention-panel">
      <div className="attention-title"><CircleAlert size={23} /><h2>Needs attention</h2></div>
      <p>Maya often compares fractions with different denominators by looking only at the numerators.</p>
      <p className="supporting-copy">This pattern appears in 5 of the last 7 relevant responses.</p>
      <div className="evidence-example">
        <small>Recent example · Apr 24</small>
        <strong>1/2&nbsp;&nbsp; ? &nbsp;&nbsp;3/8</strong>
        <p>Maya chose <b>3/8</b> <span>Needs teacher review</span></p>
      </div>
      <div className="attention-actions">
        <button className="secondary-action" type="button" onClick={onReview}><ScanLine size={17} />Review evidence</button>
        <WhyButton label="Why this pattern?" />
      </div>
    </section>
  )
}

function WorksheetDialog({ settings, onClose }: { settings: WorksheetSettings; onClose: () => void }) {
  const sample = [
    'Circle the larger fraction: 1/2 or 3/8',
    'Write >, <, or = : 2/3  __  3/5',
    'Complete the equivalent fraction: 3/4 = __/12',
    'Explain how a fraction model can help compare 5/6 and 4/5.',
  ]
  return (
    <div className="modal-backdrop" role="presentation">
      <section className={`dialog worksheet-dialog ${settings.largePrint ? 'large-print' : ''}`} role="dialog" aria-modal="true" aria-labelledby="worksheet-title">
        <div className="dialog-header no-print">
          <div><small>Ready to use</small><h2 id="worksheet-title">Maya’s next worksheet</h2><p>{settings.count} problems · {settings.largePrint ? 'Large print' : 'Standard print'} · {settings.mixedRepresentation ? 'Mixed representation' : 'Number problems'}</p></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button>
        </div>
        <div className="worksheet-page">
          <div className="worksheet-page-head"><div><b>Open Learning Atlas</b><h3>Comparing fractions</h3></div><span>Name: Maya&nbsp;&nbsp;&nbsp; Date: __________</span></div>
          <p className="worksheet-note">Show your thinking. Draw a model when it helps.</p>
          <ol>{sample.map((problem) => <li key={problem}><span>{problem}</span><i /></li>)}</ol>
          <p className="worksheet-more">+ {settings.count - sample.length} more personalized problems</p>
        </div>
        <div className="dialog-actions no-print">
          <button className="quiet-action" type="button" onClick={onClose}>Back</button>
          <button className="primary-action" type="button" onClick={() => window.print()}><Printer size={17} />Print or save PDF</button>
        </div>
      </section>
    </div>
  )
}

function ReviewDialog({ filename, onClose, onConfirm }: { filename: string; onClose: () => void; onConfirm: () => void }) {
  const [accepted, setAccepted] = useState(reviewRows.map(() => true))
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="dialog review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-title">
        <div className="dialog-header">
          <div><small>Needs teacher review</small><h2 id="review-title">Check the extracted work</h2><p>{filename || 'Fractions-practice.jpg'} · Prototype extraction</p></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button>
        </div>
        <div className="review-notice"><CircleAlert size={18} /><p>The system can misread handwriting. Nothing updates Maya’s learning record until you confirm it.</p></div>
        <div className="review-table">
          <div className="review-table-head"><span>Problem</span><span>Extracted answer</span><span>Reading</span><span>Use</span></div>
          {reviewRows.map((row, index) => (
            <div className="review-table-row" key={row.problem}>
              <strong>{row.problem}</strong><span>{row.extracted}</span>
              <span className={row.confidence === 'Check' ? 'check-reading' : ''}>{row.confidence}</span>
              <label><input type="checkbox" checked={accepted[index]} onChange={() => setAccepted(accepted.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span className="checkbox"><Check size={14} /></span></label>
            </div>
          ))}
        </div>
        <div className="review-summary"><Target size={18} /><p><strong>Possible pattern:</strong> comparing numerators instead of fraction sizes. Based on two incorrect responses; teacher confirmation required.</p></div>
        <div className="dialog-actions">
          <button className="quiet-action" type="button" onClick={onClose}>Cancel</button>
          <button className="primary-action" type="button" onClick={onConfirm} disabled={!accepted.some(Boolean)}><CheckCircle2 size={17} />Confirm {accepted.filter(Boolean).length} responses</button>
        </div>
      </section>
    </div>
  )
}

function ProcessingOverlay({ filename }: { filename: string }) {
  return (
    <div className="modal-backdrop" role="status" aria-live="polite">
      <section className="processing-dialog"><LoaderCircle size={30} /><h2>Reading completed work</h2><p>{filename}</p><small>Detecting problems, handwriting, and possible answers…</small></section>
    </div>
  )
}

function App() {
  const [page, setPage] = useState<Page>('today')
  const [settings, setSettings] = useState<WorksheetSettings>({ count: 12, largePrint: true, mixedRepresentation: true })
  const [worksheetOpen, setWorksheetOpen] = useState(false)
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [filename, setFilename] = useState('Fractions-practice.jpg')
  const [evidence, setEvidence] = useState(seededEvidence)
  const [updated, setUpdated] = useState(false)
  const [toast, setToast] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const upload = (file?: File) => {
    if (file) setFilename(file.name)
    setScanState('processing')
    window.setTimeout(() => setScanState('review'), 1050)
  }

  const confirmEvidence = () => {
    setEvidence((items) => items.map((item) => item.status === 'review' ? { ...item, status: 'confirmed', summary: '12 problems · 8 responses confirmed · Pattern noted' } : item))
    setUpdated(true)
    setScanState('idle')
    showToast('Maya’s learning picture was updated from confirmed evidence.')
  }

  const reviewPending = () => {
    setFilename('Fractions-practice.jpg')
    setScanState('review')
  }

  return (
    <div className="app-shell">
      <Topbar page={page} onPage={setPage} />
      <main>
        <StudentBand />
        {page === 'today' && (
          <div className="dashboard-grid">
            <div className="main-column">
              <WorksheetPanel settings={settings} setSettings={setSettings} onGenerate={() => setWorksheetOpen(true)} onUpload={() => fileInput.current?.click()} />
              <ProgressChart updated={updated} />
              <EvidenceList evidence={evidence} onReview={reviewPending} />
            </div>
            <aside className="side-column"><LearningPicture /><AttentionPanel onReview={reviewPending} /></aside>
          </div>
        )}
        {page === 'progress' && (
          <div className="single-page-view">
            <div className="page-intro"><div><h2>Maya’s progress</h2><p>Look for change over time, not a single grade.</p></div><button className="secondary-action" type="button" onClick={() => fileInput.current?.click()}><Camera size={17} />Add new work</button></div>
            <ProgressChart updated={updated} expanded />
            <EvidenceList evidence={evidence} onReview={reviewPending} />
          </div>
        )}
        {page === 'skills' && (
          <div className="single-page-view">
            <div className="page-intro"><div><h2>Maya’s skills</h2><p>Evidence-backed signals with curriculum context on demand.</p></div><button className="secondary-action" type="button" onClick={() => setPage('today')}><FileText size={17} />Plan next worksheet</button></div>
            <LearningPicture expanded />
          </div>
        )}
      </main>
      <input ref={fileInput} className="visually-hidden" type="file" accept="image/*,.pdf" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.target.value = '' }} />
      <button className="camera-fab" type="button" onClick={() => fileInput.current?.click()} aria-label="Photograph or upload completed work"><ImageUp size={21} /><span>Add completed work</span></button>
      {worksheetOpen && <WorksheetDialog settings={settings} onClose={() => setWorksheetOpen(false)} />}
      {scanState === 'processing' && <ProcessingOverlay filename={filename} />}
      {scanState === 'review' && <ReviewDialog filename={filename} onClose={() => setScanState('idle')} onConfirm={confirmEvidence} />}
      {toast && <div className="toast" role="status"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  )
}

export default App
