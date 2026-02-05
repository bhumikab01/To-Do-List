let tasks = [];
let currentFilter = 'all';

function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }
function loadTasks() { const raw = localStorage.getItem('tasks'); tasks = raw ? JSON.parse(raw) : []; }


function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function addTask() {

    const textEl = document.getElementById('taskInput');
    const dateEl = document.getElementById('dueDate');
    const prEl = document.getElementById('priority');
    const text = textEl.value.trim();
    if (!text) { alert('Please enter a task'); return; }
    const task = { id: uid(), text, completed: false, dueDate: dateEl.value || null, priority: prEl.value };
    tasks.push(task);
    saveTasks();
    renderTasks();

    textEl.value = '';
    dateEl.value = '';
    prEl.value = 'medium';
    textEl.focus();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    const filtered = tasks.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });
    filtered.forEach(t => {
        const li = document.createElement('li');
        li.dataset.id = t.id;
        li.className = (t.completed ? 'completed ' : '') + `priority-${t.priority}`;

        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';

        const span = document.createElement('span');
        span.textContent = t.text;
        span.title = 'Double-click to edit';
        span.style.cursor = 'text';
        span.addEventListener('dblclick', () => startEdit(t.id));

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = (t.dueDate ? `Due: ${t.dueDate}` : '') + (t.dueDate && t.priority ? ' • ' : '') + (t.priority ? t.priority.charAt(0).toUpperCase()+t.priority.slice(1) : '');

        left.appendChild(span);
        left.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const doneBtn = document.createElement('button');
        doneBtn.className = 'complete-btn';
        doneBtn.textContent = t.completed ? 'Undo' : 'Done';
        doneBtn.onclick = () => toggleComplete(t.id);

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => startEdit(t.id);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTask(t.id);

        actions.appendChild(doneBtn);
        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(left);
        li.appendChild(actions);
        list.appendChild(li);
    });
    updateCounts();
}

function toggleComplete(id) {
    const t = tasks.find(x => x.id === id); if (!t) return;
    t.completed = !t.completed; saveTasks(); renderTasks();
}

function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    tasks = tasks.filter(t => t.id !== id); saveTasks(); renderTasks();
}

function startEdit(id) {
    const t = tasks.find(x => x.id === id); if (!t) return;
    const li = document.querySelector(`li[data-id="${id}"]`);
    if (!li) return;

    li.innerHTML = '';
    const txt = document.createElement('input'); txt.type='text'; txt.value = t.text; txt.style.flex='1';
    const date = document.createElement('input'); date.type='date'; date.value = t.dueDate || '';
    const pr = document.createElement('select');
    ['low','medium','high'].forEach(p => { const o = document.createElement('option'); o.value=p; o.textContent = p.charAt(0).toUpperCase()+p.slice(1); if (p===t.priority) o.selected=true; pr.appendChild(o); });
    const save = document.createElement('button'); save.textContent='Save'; save.className='edit-btn';
    const cancel = document.createElement('button'); cancel.textContent='Cancel';

    save.onclick = () => { t.text = txt.value.trim() || t.text; t.dueDate = date.value || null; t.priority = pr.value; saveTasks(); renderTasks(); };
    cancel.onclick = () => renderTasks();

    li.appendChild(txt); li.appendChild(date); li.appendChild(pr); li.appendChild(save); li.appendChild(cancel);
    txt.focus();
}

function clearCompleted() {
    if (!confirm('Remove all completed tasks?')) return;
    tasks = tasks.filter(t => !t.completed); saveTasks(); renderTasks();
}

function updateCounts() {
    const total = tasks.length; const completed = tasks.filter(t=>t.completed).length; const active = total - completed;
    document.getElementById('counts').textContent = `${total} total • ${active} active • ${completed} completed`;
}

    // Filters
document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); currentFilter = b.dataset.filter; renderTasks();
}));

    // Event bindings
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('clearCompleted').addEventListener('click', clearCompleted);
document.getElementById('taskInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });

    // Initialize
loadTasks(); renderTasks();