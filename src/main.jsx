import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Bookmark, BriefcaseBusiness, ChevronDown, Clock3, Compass, Filter, GraduationCap, MapPin, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import './styles.css'

const jobs = [
  { company: 'toss', title: 'Brand Design Intern', type: '인턴', team: '디자인', place: '서울 · 강남구', days: 3, due: 'D-4', color: '#1d4ed8', tags: ['시각디자인', '포트폴리오'], fit: 98 },
  { company: '29CM', title: 'MD Assistant', type: '인턴', team: '커머스', place: '서울 · 성동구', days: 5, due: 'D-7', color: '#f97316', tags: ['패션', '커머스'], fit: 95 },
  { company: '당근', title: 'Product Marketing Intern', type: '인턴', team: '마케팅', place: '서울 · 서초구', days: 1, due: 'D-2', color: '#ff6f0f', tags: ['마케팅', '콘텐츠'], fit: 93 },
  { company: 'MUSINSA', title: 'Contents Creator', type: '계약직', team: '콘텐츠', place: '서울 · 성동구', days: 8, due: 'D-10', color: '#111827', tags: ['영상', 'SNS'], fit: 91 },
  { company: 'NAVER', title: '서비스 기획 체험형 인턴', type: '인턴', team: '기획', place: '경기 · 성남시', days: 2, due: 'D-5', color: '#03c75a', tags: ['서비스기획', '데이터'], fit: 89 },
  { company: 'Yanolja', title: 'Global Business Intern', type: '인턴', team: '비즈니스', place: '서울 · 강남구', days: 6, due: 'D-8', color: '#7c3aed', tags: ['영어', '사업개발'], fit: 87 },
]

function App() {
  const [saved, setSaved] = useState([])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('전체')
  const [filterOpen, setFilterOpen] = useState(false)
  const categories = ['전체', '인턴', '대외활동', '신입', '공모전']
  const shown = useMemo(() => jobs.filter(j => (active === '전체' || j.type === active) && `${j.company} ${j.title} ${j.team}`.toLowerCase().includes(query.toLowerCase())), [query, active])
  const toggleSave = title => setSaved(s => s.includes(title) ? s.filter(x => x !== title) : [...s, title])

  return <main>
    <section className="hero">
      <nav><div className="brand"><span className="brand-dot">c</span>campus <b>career</b></div><div className="nav-links"><a href="#recommend">추천 공고</a><a href="#explore">둘러보기</a><button className="login">로그인</button></div></nav>
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> 대학생 맞춤 커리어 탐색</div><h1>첫 커리어의 시작,<br/><em>나답게</em> 찾아보세요.</h1><p>관심사와 경험을 바탕으로, 지금의 나에게 꼭 맞는<br/>채용공고와 기회를 추천해 드려요.</p></div>
      <div className="search-box"><Search size={21}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="직무, 회사, 키워드를 검색하세요"/><button onClick={() => document.getElementById('recommend').scrollIntoView({behavior:'smooth'})}>검색하기 <ArrowUpRight size={17}/></button></div>
      <div className="hero-orb orb-one"></div><div className="hero-orb orb-two"></div><div className="stars">✦　·　✧</div>
    </section>

    <section className="content" id="recommend">
      <div className="intro-row"><div><span className="section-kicker">CURATED FOR YOU</span><h2>지금, 이런 기회는 어때요?</h2><p>회원님의 관심 분야를 바탕으로 골라봤어요.</p></div><button className="filter-btn" onClick={() => setFilterOpen(!filterOpen)}><SlidersHorizontal size={17}/> 필터 <ChevronDown size={15}/></button></div>
      {filterOpen && <div className="filter-panel"><span>공고 유형</span>{categories.slice(1).map(x => <button key={x} onClick={() => setActive(x)}>{x}</button>)}<button onClick={() => setActive('전체')}>초기화</button></div>}
      <div className="chips">{categories.map(c => <button key={c} className={active === c ? 'chip active' : 'chip'} onClick={() => setActive(c)}>{c}</button>)}</div>
      <div className="job-grid">{shown.map((job, i) => <article className="job-card" key={job.title}><div className="card-top"><div className="company-logo" style={{background:job.color}}>{job.company.slice(0, 1)}</div><button className={saved.includes(job.title) ? 'save saved' : 'save'} onClick={() => toggleSave(job.title)} aria-label="저장"><Bookmark size={19} fill={saved.includes(job.title) ? 'currentColor' : 'none'}/></button></div><div className="match"><Sparkles size={13}/> 나와의 매칭 {job.fit}%</div><h3>{job.title}</h3><strong>{job.company}</strong><div className="meta"><span><BriefcaseBusiness size={14}/>{job.team}</span><span><MapPin size={14}/>{job.place}</span></div><div className="card-bottom"><div className="tag-wrap">{job.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div><span className={job.days <= 3 ? 'due urgent' : 'due'}>{job.due}</span></div></article>)}</div>
      {!shown.length && <div className="empty"><Search size={28}/><p>검색 결과가 없어요. 다른 키워드를 시도해 보세요.</p></div>}
      <div className="more-wrap"><button className="more">더 많은 공고 보기 <ArrowUpRight size={16}/></button></div>
    </section>
    <section className="steps" id="explore"><div><span className="section-kicker">HOW IT WORKS</span><h2>막막한 커리어 탐색,<br/>이제 가볍게 시작해요.</h2></div><div className="step-list"><p><b>01</b><span>관심 분야와 경험을 알려주세요</span></p><p><b>02</b><span>맞춤 공고를 추천받으세요</span></p><p><b>03</b><span>마음에 드는 기회는 저장해 두세요</span></p></div></section>
    <footer><div className="brand"><span className="brand-dot">c</span>campus <b>career</b></div><span>대학생의 모든 시작을 응원합니다.</span></footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App />)
