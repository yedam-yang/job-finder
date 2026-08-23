import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Bookmark, BriefcaseBusiness, MapPin, Search, Sparkles } from 'lucide-react'
import './styles.css'

const jobs = [
  { company:'NAVER', title:'서비스 기획 체험형 인턴', type:'인턴', industry:'인터넷·플랫폼', team:'기획', place:'경기 · 성남시', duration:'3개월', eligibility:'재학생·휴학생', pay:'월 250만원', days:2, color:'#03c75a', tags:['서비스기획','데이터'], known:true },
  { company:'toss', title:'Brand Design Intern', type:'인턴', industry:'금융·핀테크', team:'디자인', place:'서울 · 강남구', duration:'6개월', eligibility:'포트폴리오 제출', pay:'월 280만원', days:3, color:'#1d4ed8', tags:['시각디자인','포트폴리오'], known:true },
  { company:'당근', title:'Product Marketing Intern', type:'인턴', industry:'지역 커뮤니티', team:'마케팅', place:'서울 · 서초구', duration:'3개월', eligibility:'대학생 누구나', pay:'월 230만원', days:1, color:'#ff6f0f', tags:['마케팅','콘텐츠'], known:true },
  { company:'29CM', title:'MD Assistant', type:'인턴', industry:'패션·커머스', team:'커머스', place:'서울 · 성동구', duration:'4개월', eligibility:'재학생·휴학생', pay:'월 220만원', days:5, color:'#f97316', tags:['패션','커머스'], known:true },
  { company:'MUSINSA', title:'콘텐츠 제작 신입', type:'신입', industry:'패션·커머스', team:'콘텐츠', place:'서울 · 성동구', duration:'정규직', eligibility:'신입 지원 가능', pay:'연 3,600만원', days:8, color:'#111827', tags:['영상','SNS'], known:true },
]

function App(){
  const [query,setQuery]=useState(''), [type,setType]=useState('전체'), [urgent,setUrgent]=useState(false), [saved,setSaved]=useState([])
  const shown=useMemo(()=>jobs.filter(j=>(type==='전체'||j.type===type)&&(!urgent||j.days<=3)&&`${j.company} ${j.title} ${j.team} ${j.industry}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>Number(b.known)-Number(a.known)||a.days-b.days),[query,type,urgent])
  const toggle=title=>setSaved(s=>s.includes(title)?s.filter(x=>x!==title):[...s,title])
  return <main>
    <header className="hero"><nav><div className="brand"><span className="brand-dot">c</span>campus <b>career</b></div><div className="nav-links"><a href="#recommend">추천 공고</a><a href="#saved">저장 목록</a></div></nav><div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> 대학생 맞춤 커리어 탐색</div><h1>첫 커리어의 시작,<br/><em>나답게</em> 찾아보세요.</h1><p>인턴과 신입 공고를 한눈에 비교하고, 지금 지원할 기회를 찾아보세요.</p></div><div className="search-box"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="직무, 회사, 키워드를 검색하세요"/><button onClick={()=>document.getElementById('recommend').scrollIntoView({behavior:'smooth'})}>검색하기 ↗</button></div></header>
    <section className="content" id="recommend"><div className="section-kicker">CURATED FOR YOU</div><h2>지금, 이런 기회는 어때요?</h2><p className="lead">공고 데이터만으로 지원 가능성을 비교할 수 있게 정리했어요.</p><div className="filters">{['전체','인턴','신입'].map(x=><button className={type===x?'active':''} onClick={()=>setType(x)} key={x}>{x}</button>)}<button className={urgent?'active':''} onClick={()=>setUrgent(v=>!v)}>마감 임박</button></div><div className="job-grid">{shown.map(j=><article className="job-card" key={j.title}><div className="card-top"><div className="company-logo" style={{background:j.color}}>{j.company[0]}</div><button className={saved.includes(j.title)?'save saved':'save'} onClick={()=>toggle(j.title)} aria-label="공고 저장"><Bookmark size={20} fill={saved.includes(j.title)?'currentColor':'none'}/></button></div><div className="match"><Sparkles size={13}/> 추천 공고</div><h3>{j.title}</h3><strong>{j.company}</strong><div className="company-detail">회사 규모·업종: {j.industry}</div><div className="meta"><span><BriefcaseBusiness size={14}/>{j.team} · {j.type}</span><span><MapPin size={14}/>{j.place}</span></div><div className="details"><span>지원 자격 <b>{j.eligibility}</b></span><span>급여·지원금 <b>{j.pay}</b></span><span>근무 기간·조건 <b>{j.duration}</b></span></div><div className="card-bottom"><div className="tag-wrap">{j.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><span className={j.days<=3?'due urgent':'due'}>D-{j.days}</span></div></article>)}</div>{!shown.length&&<div className="empty">검색 결과가 없습니다.</div>}</section>
    <section className="saved-area" id="saved"><h2>저장 목록</h2><p>{saved.length?saved.join(' · '):'저장한 공고가 없습니다.'}</p></section><footer>campus career · 대학생의 모든 시작을 응원합니다.</footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>)
