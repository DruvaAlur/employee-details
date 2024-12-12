import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {

  private dbName = 'myDatabase';
  private storeName = 'myObjectStore';
  private db: IDBDatabase | null = null;

  constructor() {
    this.openDatabase();
  }

  // Open the IndexedDB database
  openDatabase(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBRequest).result;
      console.log('Database opened successfully');
    };

    request.onerror = (event) => {
      console.error('Database error: ', (event.target as IDBRequest).error);
    };
  }

  // Create or Add an item to IndexedDB
  createItem(data: any): Observable<any> {
    return new Observable((observer) => {
      if (!this.db) {
        observer.error('Database not open');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        observer.next(request.result);
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Read items from IndexedDB
  readItems(): Observable<any[]> {
    return new Observable((observer) => {
      if (!this.db) {
        observer.error('Database not open');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        observer.next(request.result);
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Update an item in IndexedDB
  updateItem(id: number, data: any): Observable<any> {
    return new Observable((observer) => {
      if (!this.db) {
        observer.error('Database not open');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put({ id, ...data });

      request.onsuccess = () => {
        observer.next(request.result);
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }

  // Delete an item from IndexedDB
  deleteItem(id: number): Observable<void> {
    return new Observable((observer) => {
      if (!this.db) {
        observer.error('Database not open');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        observer.next();
        observer.complete();
      };

      request.onerror = (event) => {
        observer.error((event.target as IDBRequest).error);
      };
    });
  }
}
