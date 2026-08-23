(() => {
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  const text = (value) => value == null ? '' : String(value).replace(/\r?\n/g, ' ').trim();
  const colorFor = (name) => {
    const palette = ['#1976d2', '#1b9b78', '#7b61c9', '#e67335', '#3178c6', '#ad5592'];
    return palette[[...String(name ?? '')].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length];
  };

  const mapJob = (record) => {
    const typeLabel = text(record.hireTypeNmLst) || text(record.recrutSeNm);
    return {
      id: String(record.recrutPblntSn),
      c: text(record.instNm),
      f: (text(record.instNm).slice(0, 1) || '공'),
      color: colorFor(record.instNm),
      known: '',
      role: text(record.recrutPbancTtl),
      type: /인턴/.test(typeLabel) ? 'intern' : 'entry',
      typeLabel,
      pay: '',
      due: Number(record.decimalDay),
      dueLabel: Number.isFinite(Number(record.decimalDay)) ? `${record.decimalDay}일 후` : '',
      period: '',
      sourceUrl: text(record.srcUrl),
      clear: Boolean(text(record.aplyQlfcCn)),
      eligibility: text(record.aplyQlfcCn),
      desc: text(record.ncsCdNmLst),
      full: text(record.aplyQlfcCn),
    };
  };

  const card = (job) => `<article class="card ${job.due <= 3 ? 'top' : ''}">
    <div class="company">
      <div class="logo" style="background:${job.color}">${escapeHtml(job.f)}</div>
      <div><b>${escapeHtml(job.c)}</b><small>${escapeHtml(job.known)}</small></div>
      <button class="save ${saved.includes(job.id) ? 'saved' : ''}" data-save="${escapeHtml(job.id)}">${saved.includes(job.id) ? '✓ 저장됨' : '♡ 저장'}</button>
    </div>
    <h2 class="role">${escapeHtml(job.role)}</h2>
    <span class="badge">${escapeHtml(job.typeLabel)}</span>
    <div class="details">
      <div><span>급여·지원금</span>${escapeHtml(job.pay)}</div>
      <div><span>마감일</span>${escapeHtml(job.dueLabel)}</div>
      ${job.type === 'intern' ? `<div><span>근무 기간</span>${escapeHtml(job.period)}</div>` : ''}
      <div><span>지원 자격</span>${escapeHtml(job.eligibility)}</div>
    </div>
    <p class="desc"><b>업무 핵심</b> · ${escapeHtml(job.desc)}</p>
    <div class="hidden" id="more-${escapeHtml(job.id)}"><p class="desc"><b>전체 내용</b> · ${escapeHtml(job.full)}</p></div>
    <button class="more" data-more="${escapeHtml(job.id)}">전체 내용 보기</button>
    ${job.sourceUrl ? `<a class="more" href="${escapeHtml(job.sourceUrl)}" target="_blank" rel="noopener noreferrer">공고 바로가기 ↗</a>` : ''}
  </article>`;

  const bindCardActions = () => {
    document.querySelectorAll('[data-save]').forEach((button) => {
      button.addEventListener('click', () => toggleSave(button.dataset.save));
    });
    document.querySelectorAll('[data-more]').forEach((button) => {
      button.addEventListener('click', () => {
        const detail = document.getElementById(`more-${button.dataset.more}`);
        detail.classList.toggle('hidden');
        button.textContent = detail.classList.contains('hidden') ? '전체 내용 보기' : '접기';
      });
    });
  };

  fetch('./jobs.json')
    .then((response) => {
      if (!response.ok) throw new Error('jobs.json을 불러오지 못했습니다.');
      return response.json();
    })
    .then((records) => {
      jobs.splice(0, jobs.length, ...records.map(mapJob));
      saved = saved.map(String).filter((id) => jobs.some((job) => job.id === id));
      localStorage.setItem('jfSaved', JSON.stringify(saved));

      render = function renderLiveJobs() {
        const visibleJobs = visible();
        cards.innerHTML = visibleJobs.length ? visibleJobs.map(card).join('') : '<div class="empty">조건에 맞는 공고가 없어요. 다른 필터를 선택해 보세요.</div>';
        count.textContent = `${visibleJobs.length}개의 공고를 보고 있어요`;
        const savedJobs = jobs.filter((job) => saved.includes(job.id));
        savedCards.innerHTML = savedJobs.length ? savedJobs.map(card).join('') : '<div class="empty">아직 저장한 공고가 없어요.<br>마음에 드는 공고의 ♡ 저장 버튼을 눌러 보세요.</div>';
        savedNum.textContent = saved.length;
        bindCardActions();
      };
      render();
    })
    .catch((error) => {
      console.error(error);
      cards.innerHTML = '<div class="empty">공고 데이터를 불러오지 못했습니다.</div>';
    });
})();
