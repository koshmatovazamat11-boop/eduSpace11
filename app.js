(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const set = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  let tasks = get('eduspace_tasks', []), notes = get('eduspace_notes', []), username = get('eduspace_name', 'Гость');
  let timer;
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(timer); timer=setTimeout(()=>el.classList.remove('show'),2200); }
  function stats(){ $('#noteCount').textContent=notes.length; $('#taskCount').textContent=tasks.filter(t=>t.done).length; }
  function renderTasks(){
    const list=$('#tasks'); list.replaceChildren();
    if(!tasks.length){const li=document.createElement('li');li.className='empty';li.textContent='Добавь первую задачу — и начни движение.';list.append(li);}
    tasks.forEach(task=>{
      const li=document.createElement('li'); if(task.done)li.classList.add('done');
      const check=document.createElement('input');check.type='checkbox';check.checked=task.done;check.setAttribute('aria-label','Выполнено');
      check.addEventListener('change',()=>{task.done=check.checked;set('eduspace_tasks',tasks);renderTasks();});
      const span=document.createElement('span');span.textContent=task.text;
      const del=document.createElement('button');del.className='delete';del.type='button';del.textContent='×';del.setAttribute('aria-label','Удалить задачу');
      del.addEventListener('click',()=>{tasks=tasks.filter(t=>t.id!==task.id);set('eduspace_tasks',tasks);renderTasks();});
      li.append(check,span,del);list.append(li);
    }); stats();
  }
  function renderNotes(){const list=$('#notes');list.replaceChildren();notes.slice().reverse().forEach(n=>{const li=document.createElement('li');li.textContent=n;list.append(li);});stats();}
  $('#taskForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#taskInput'),text=input.value.trim();if(!text)return;tasks.push({id:Date.now()+Math.random(),text,done:false});set('eduspace_tasks',tasks);input.value='';renderTasks();toast('Задача добавлена.');});
  $('#saveNote').addEventListener('click',()=>{const input=$('#noteInput'),text=input.value.trim();if(!text){toast('Сначала напиши заметку.');return;}notes.push(text);set('eduspace_notes',notes);input.value='';$('#counter').textContent='До 500 символов';renderNotes();toast('Заметка сохранена в этом браузере.');});
  $('#noteInput').addEventListener('input',e=>$('#counter').textContent=`${e.target.value.length} / 500`);
  const modal=$('#modal');
  $('#profile').addEventListener('click',()=>{ $('#modalTitle').textContent='Твой профиль';$('#modalText').textContent='Введи имя. Это демо-профиль, он сохраняется только в этом браузере.';$('#nameInput').value=username==='Гость'?'':username;$('#nameInput').hidden=false;$('#modalSave').hidden=false;modal.showModal();});
  $('#modalSave').addEventListener('click',e=>{e.preventDefault();const name=$('#nameInput').value.trim();if(!name){toast('Введи имя.');return;}username=name;set('eduspace_name',username);$('#username').textContent=username;modal.close();toast('Профиль обновлён.');});
  document.querySelectorAll('.course').forEach(btn=>btn.addEventListener('click',()=>{ $('#modalTitle').textContent=btn.dataset.name;$('#modalText').textContent='Это демонстрационная карточка курса. Учебные материалы можно добавить на следующем этапе разработки.';$('#nameInput').hidden=true;$('#modalSave').hidden=true;modal.showModal();}));
  $('#theme').addEventListener('click',()=>{document.body.classList.toggle('light');try{localStorage.setItem('eduspace_theme',document.body.classList.contains('light')?'light':'dark');}catch{}});
  try{if(localStorage.getItem('eduspace_theme')==='light')document.body.classList.add('light');}catch{}
  $('#username').textContent=username;$('#year').textContent=new Date().getFullYear();renderTasks();renderNotes();
})();