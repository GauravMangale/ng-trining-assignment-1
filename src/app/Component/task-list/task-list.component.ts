 import { Component, HostListener } from '@angular/core';
import { TaskObj } from '../../Interface/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Task interface
interface Task {
  AssignedTo: string;
  Status: string;
  DueDate: string;
  Priority: string;
  Comments: string;
  selected?: boolean; // For checkbox selection
}

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  
  // Search key
  searchKey: any;

  // Pagination
  pageSize: number = 20;
  page: number = 1;

  // Row menu toggle
  openRow: number | null = null;

  // Modal states
  isModalOpen = false;
  isEditMode = false;
  editIndex = -1;

  // Close row menu on outside click
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    const clickedInside = (event.target as HTMLElement).closest('.row-menu');
    if (!clickedInside) {
      this.openRow = null;
    }
  }

  // Reset filter
  refreshItems() {
    this.searchKey = null;
    this.filteredList = [...this.tasklist];
  }

  constructor() {
    this.filteredList = [...this.tasklist];
  }

  // Row menu toggle
  toggleRow(i: number, event: Event) {
    event.stopPropagation();
    this.openRow = this.openRow === i ? null : i;
  }

  // Default list
  tasklist: Task[] = [
    {
      AssignedTo: 'User 1',
      Status: 'In Progress',
      DueDate: '2025-01-10',
      Priority: 'High',
      Comments: 'Initial task',
    },
  ];

  // Form object
  task: Task = {
    AssignedTo: '',
    Status: '',
    DueDate: '',
    Priority: '',
    Comments: '',
  };

  // Add modal
  openAddModal() {
    this.isEditMode = false;
    this.task = { AssignedTo: '', Status: '', DueDate: '', Priority: '', Comments: '' };
    this.isModalOpen = true;
  }

  // Edit modal
  openEditModal(i: number) {
    this.isEditMode = true;
    this.editIndex = i;
    this.task = { ...this.tasklist[i] };
    this.isModalOpen = true;
    this.openRow = null;
  }

  // Pagination getter
  get pagedItems() {
    const start = (this.page - 1) * this.pageSize;
    return this.tasklist.slice(start, start + this.pageSize);
  }

  // Next & previous page
  nextPage() {
    if (this.page * this.pageSize < this.tasklist.length) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  // Filter list
  filteredList: any = [];
  filterRecords() {
    const key = this.searchKey.toLowerCase();

    this.filteredList = this.tasklist.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(key))
    );
  }

  // Save task (add/edit)
  saveTask() {
    if (this.isEditMode) {
      this.tasklist[this.editIndex] = { ...this.task };
    } else {
      this.tasklist.push({ ...this.task });
    }

    this.filteredList = [...this.tasklist];

    this.editIndex = -1;
    this.closeModal();
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Delete modal states
  taskIndexToDelete: number | null = null;
  showDeleteModal = false;

  openDeleteModal(i: number) {
    this.taskIndexToDelete = i;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.taskIndexToDelete = null;
  }

  confirmDelete() {
    if (this.taskIndexToDelete !== null) {
      this.tasklist.splice(this.taskIndexToDelete, 1);
      this.filteredList = [...this.tasklist];
    }
    this.cancelDelete();
  }

  // Select all checkbox
  toggleSelectAll(event: any) {
    const checked: boolean = event.target.checked;
    this.filteredList.forEach((item: Task) => (item.selected = checked));
  }
}
