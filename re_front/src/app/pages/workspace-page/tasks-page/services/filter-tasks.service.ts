import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { taskFilter } from '@app/core/enity/taskFilter.entity';
import { TaskData, priority } from '@env/interface.env';

@Injectable({
  providedIn: 'root',
})
export class FilterTasksService {
  private _filters: WritableSignal<taskFilter> = signal({
    search: '',
    category: [],
    priority: null,
    status: false,
    subtaskFilter: false,
  });

  private _filteredTasks = new BehaviorSubject<TaskData[]>([]);

  filteredTasks$ = this._filteredTasks.asObservable();

  get filters() {
    return this._filters();
  }

  applyFilter(tasks: TaskData[]): TaskData[] {
    const filteredTasks: TaskData[] = [];
    const { search, category, priority, status, subtaskFilter } =
      this._filters();

    tasks.forEach((task) => {
      const filteredTask: TaskData = { ...task };

      const tags = task.categories.map((tag) => tag.name).join(' ');

      const searchedText: string =
        task.task.name.toLowerCase() +
        task.task.priority.toLowerCase() +
        tags.toLowerCase();

      // const search:string[] = search.toLowerCase().split(' ');

      const searchText = () => {
        if (search && search.length > 0) {
          return search.toLowerCase().split(' ');
        } else {
          return [''];
        }
      };

      const haveAllWords = (text: string, words: string[]) => {
        return words.every((word) => text.includes(word));
      }

      if (
        (status ? true : task.task.completed == false) &&
        (priority ? task.task.priority === priority : true) &&
        (category.length > 0
          ? task.categories.find((c) => category.includes(c.id))
          : true) &&
        // (search ? searchedText.includes(search.toLowerCase()) : true)
        (search ? haveAllWords(searchedText, searchText()) : true)
      ) {
        if (task.subtasks && task.subtasks.length > 0 && subtaskFilter) {
          filteredTask.subtasks = this.applyFilter(task.subtasks);
        }

        filteredTasks.push(filteredTask);
      }
    });

    return filteredTasks;
  }

  applyFilters(tasks: TaskData[]) {
    this._filteredTasks.next(this.applyFilter(tasks));
  }

  addCategory(category: number, tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      category: [...this._filters().category, category],
    });
    this.applyFilters(tasks);
  }

  removeCategory(category: number, tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      category: this._filters().category.filter((c) => c !== category),
    });
    this.applyFilters(tasks);
  }

  toggleCategory(category: number, tasks: TaskData[]) {
    if (this._filters().category.includes(category)) {
      this.removeCategory(category, tasks);
    } else {
      this.addCategory(category, tasks);
    }
  }

  filterCompleted(tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      status: !this._filters().status,
    });
    this.applyFilters(tasks);
  }

  toogleFilterSubtasks(tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      subtaskFilter: !this._filters().subtaskFilter,
    });
    this.applyFilters(tasks);
  }

  filterPriority(priority: priority, tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      priority: this._filters().priority === priority ? null : priority,
    });
    this.applyFilters(tasks);
  }

  filterSearch(search: string, tasks: TaskData[]) {
    this._filters.set({
      ...this._filters(),
      search,
    });
    this.applyFilters(tasks);
  }

  clearFilters(tasks: TaskData[]) {
    this._filters.set({
      search: '',
      category: [],
      priority: null,
      status: true,
      subtaskFilter: false,
    });
    this.applyFilters(tasks);
  }
}
