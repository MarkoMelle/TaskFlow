// src/scripts/tasks.js
export const tasks = [
   { id: 'rtks1', subject: 'RTKS',  deadline: '07.05', desc: 'Ü-blatt 1' },
   { id: 'ara1',  subject: 'ARA',   deadline: '07.05', desc: 'Ü-blatt 1' },
   { id: 'sto1',  subject: 'STO',   deadline: '10.05', desc: 'Ü-blatt 1' },
   { id: 'pdb2',  subject: 'PDB',   deadline: '11.05', desc: 'Ü-blatt 2' },
   { id: 'anuma3',subject: 'AnNuMa',deadline: '13.05', desc: 'Ü-blatt 3' },
 ];
 
 let taskState = JSON.parse(localStorage.getItem('taskState') || '{}');
 let isOpen = false;
 
 function saveState() {
   localStorage.setItem('taskState', JSON.stringify(taskState));
 }
 
 function renderTaskRow(task, completed = false) {
   const tr = document.createElement('tr');
   const now = new Date();
   const [day, month] = task.deadline.split('.').map(Number);
   const deadline = new Date(now.getFullYear(), month - 1, day, 23, 59, 59);
   const diffHours = (deadline - now) / (1000 * 60 * 60);
 
   let bgClass = 'bg-gray-800';
   if (!completed) {
     if (diffHours < 48) bgClass = 'bg-red-500 bg-opacity-50';
     else if (diffHours < 72) bgClass = 'bg-amber-500';
   }
 
   tr.innerHTML = `
     <td class="pl-2 pr-3 py-2 text-white whitespace-nowrap rounded-l-md border border-gray-700 ${bgClass}">
       ${task.subject}
     </td>
     <td class="px-3 py-2 text-white whitespace-nowrap border border-gray-700 ${bgClass}">${task.deadline}</td>
     <td class="px-3 py-2 text-white border border-gray-700 ${bgClass}">${task.desc}</td>
     <td class="px-3 py-2 align-middle rounded-r-md border border-gray-700 ${bgClass}">
       <div class="h-full flex items-center justify-center">
         <input type="checkbox" class="h-4 w-4" ${completed ? 'checked' : ''} data-id="${task.id}"/>
       </div>
     </td>
   `;
 
   tr.querySelector('input').addEventListener('change', e => {
     taskState[task.id] = e.target.checked;
     saveState();
     renderAll();
   });
 
   return tr;
 }
 
 function renderAll() {
   const tasksBody = document.getElementById('tasks-body');
   const completedBody = document.getElementById('completed-body');
   const completedWrapper = document.getElementById('completed-wrapper');
   const chevronIcon = document.getElementById('chevron-icon');
 
   tasksBody.innerHTML = '';
   completedBody.innerHTML = '';
   let hasCompleted = false;
 
   tasks.forEach(task => {
     const done = !!taskState[task.id];
     const row = renderTaskRow(task, done);
     if (done) {
       completedBody.appendChild(row);
       hasCompleted = true;
     } else {
       tasksBody.appendChild(row);
     }
   });
 
   completedWrapper.classList.toggle('hidden', !isOpen || !hasCompleted);
   chevronIcon.classList.toggle('rotate-180', isOpen);
 }
 
 export function initTasks() {
   document.getElementById('toggle-completed')
     .addEventListener('click', () => {
       isOpen = !isOpen;
       document.getElementById('completed-wrapper').classList.toggle('hidden', !isOpen);
       document.getElementById('chevron-icon').classList.toggle('rotate-180', isOpen);
     });
   renderAll();
 }
 
window.addEventListener('DOMContentLoaded', initTasks);