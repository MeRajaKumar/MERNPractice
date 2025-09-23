const API = {
  departments: "/api/departments",
  courses: "/api/courses",
  modules: "/api/modules"
};

let currentItem = { type: null, id: null };

// Show only the selected section
function showSection(section) {
  const sections = ['heroSection', 'departmentsSection', 'coursesSection', 'modulesSection'];
  sections.forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById(section + 'Section').classList.remove('hidden');

  // Manage body overflow based on the section
  if (section === 'hero') {
    document.body.style.overflow = 'auto';
    updateStats();
  } else {
    document.body.style.overflow = 'hidden';
  }

  // Call the appropriate display function
  if (section === 'departments') showDepartments();
  if (section === 'courses') showCourses();
  if (section === 'modules') showModules();
}

// Fetch data for dropdowns
async function fetchData() {
  const deps = await fetch(API.departments).then(res => res.json());
  populateDeptDropdown(deps);

  const courses = await fetch(API.courses).then(res => res.json());
  populateCourseDropdown(courses);
}

function populateDeptDropdown(departments) {
  const deptSelect = document.getElementById("courseDeptSelect");
  deptSelect.innerHTML = `<option value="">Select Department</option>`;
  departments.forEach(dep => {
    const opt = document.createElement("option");
    opt.value = dep._id;
    opt.textContent = dep.name;
    deptSelect.appendChild(opt);
  });
}

function populateCourseDropdown(courses) {
  const courseSelect = document.getElementById("moduleCourseSelect");
  courseSelect.innerHTML = `<option value="">Select Course</option>`;
  courses.forEach(course => {
    const opt = document.createElement("option");
    opt.value = course._id;
    opt.textContent = course.name;
    courseSelect.appendChild(opt);
  });
}

// Utility to render list
function renderList(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'list-item';
    const span = document.createElement('span');
    span.textContent = item.text;
    div.appendChild(span);

    if (item.id) {
      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.innerHTML = '<i class="fas fa-pen"></i>';
      editBtn.onclick = () => showEditModal(item.type, item.id, item.text);
      div.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.className = 'delete';
      delBtn.innerHTML = '<i class="fas fa-trash"></i>';
      delBtn.onclick = () => showDeleteModal(item.type, item.id);
      div.appendChild(delBtn);
    }

    container.appendChild(div);
  });
}

// ------------------ CRUD Functions ------------------ //
// Add Department
document.getElementById("deptForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("deptName").value;
  await fetch(API.departments, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  e.target.reset();
  fetchData();
  showDepartments();
});

// Add Course
document.getElementById("courseForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("courseName").value;
  const department = document.getElementById("courseDeptSelect").value;
  if (!department) return alert("Select Department!");
  await fetch(API.courses, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, department })
  });
  e.target.reset();
  fetchData();
  showCourses();
});

// Add Module
document.getElementById("moduleForm").addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("moduleTitle").value;
  const course = document.getElementById("moduleCourseSelect").value;
  if (!course) return alert("Select Course!");
  await fetch(API.modules, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, course })
  });
  e.target.reset();
  fetchData();
  showModules();
});

// ------------------ New Modal Functions ------------------ //

// Edit Modal
document.getElementById("editForm").addEventListener("submit", async e => {
  e.preventDefault();
  const newValue = document.getElementById("editName").value;
  const body = currentItem.type === 'modules' ? { title: newValue } : { name: newValue };
  await fetch(`${API[currentItem.type]}/${currentItem.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  hideEditModal();
  refreshList(currentItem.type);
});

document.querySelector("#editModal .cancel-btn").addEventListener("click", hideEditModal);

function showEditModal(type, id, text) {
  currentItem.type = type;
  currentItem.id = id;
  const name = type === 'modules' ? 'title' : 'name';
  document.getElementById("editName").value = text.split(" (")[0]; // Extract name from the text
  document.getElementById("editModal").classList.remove('hidden');
}

function hideEditModal() {
  document.getElementById("editModal").classList.add('hidden');
  document.getElementById("editForm").reset();
}

// Delete Modal
document.querySelector("#deleteModal .yes-btn").addEventListener("click", async () => {
  await fetch(`${API[currentItem.type]}/${currentItem.id}`, { method: 'DELETE' });
  hideDeleteModal();
  refreshList(currentItem.type);
});

document.querySelector("#deleteModal .no-btn").addEventListener("click", hideDeleteModal);

function showDeleteModal(type, id) {
  currentItem.type = type;
  currentItem.id = id;
  document.getElementById("deleteModal").classList.remove('hidden');
}

function hideDeleteModal() {
  document.getElementById("deleteModal").classList.add('hidden');
}

// Utility to refresh the list after CRUD operations
function refreshList(type) {
  fetchData();
  if (type === 'departments') showDepartments();
  if (type === 'courses') showCourses();
  if (type === 'modules') showModules();
}

// ------------------ View / Search ------------------ //
async function showDepartments() {
  const data = await fetch(API.departments).then(res => res.json());
  renderList('departmentsList', data.map(d => ({
    text: `${d.name} (ID: ${d._id})`,
    id: d._id,
    type: 'departments'
  })));
  updateStats();
}

async function showCourses() {
  const data = await fetch(API.courses).then(res => res.json());
  renderList('coursesList', data.map(c => ({
    text: `${c.name} (Dept: ${c.department.name || c.department})`,
    id: c._id,
    type: 'courses'
  })));
}

async function showModules() {
  const data = await fetch(API.modules).then(res => res.json());
  renderList('modulesList', data.map(m => ({
    text: `${m.title} (Course: ${m.course.name || m.course})`,
    id: m._id,
    type: 'modules'
  })));
}

async function searchDepartment() {
  const id = document.getElementById("deptSearch").value.trim();
  if (!id) return alert("Enter ID");
  const data = await fetch(`${API.departments}/${id}`).then(res => res.json());
  renderList('departmentsList', [{ text: data.name, id: data._id, type: 'departments' }]);
}

async function searchCourse() {
  const id = document.getElementById("courseSearch").value.trim();
  if (!id) return alert("Enter ID");
  const data = await fetch(`${API.courses}/${id}`).then(res => res.json());
  renderList('coursesList', [{ text: `${data.name} (Dept: ${data.department})`, id: data._id, type: 'courses' }]);
}

async function searchModule() {
  const id = document.getElementById("moduleSearch").value.trim();
  if (!id) return alert("Enter ID");
  const data = await fetch(`${API.modules}/${id}`).then(res => res.json());
  renderList('modulesList', [{ text: `${data.title} (Course: ${data.course})`, id: data._id, type: 'modules' }]);
}

// Initial fetch to populate dropdowns and update stats
fetchData();
updateStats();

async function updateStats() {
  const deps = await fetch(API.departments).then(res => res.json());
  const courses = await fetch(API.courses).then(res => res.json());
  const modules = await fetch(API.modules).then(res => res.json());
  document.getElementById('deptCount').textContent = deps.length;
  document.getElementById('courseCount').textContent = courses.length;
  document.getElementById('moduleCount').textContent = modules.length;
}