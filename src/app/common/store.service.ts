import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from '../model/course';
import { createHttpObservable } from './util';
import { map, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';


@Injectable({
  providedIn: 'root'
})

export class Store{

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable('/api/courses');
    const courses$: Observable<Course[]> = http$
        .pipe(
            tap(() => console.log("HTTP request executed")),
            map(res => Object.values(res["payload"]) ),
    )
      .subscribe(
          courses => this.subject.next(courses)
        )
  }

  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER')
  }

  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED')
  }


  filterByCategory(category: string) {
    return this.courses$
    .pipe(
        map(courses => courses
            .filter(course => course.category == category))
    );
  }

  saveCourse(courseId: number, changes): Observable<any> {

    /**
     * First, we are optimistically modifying the in-memory data in the
     * star and next we are doing a request to the backend
     */
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex(course => course.id == courseId);
    const newCourses = courses.slice(0);
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    }

    this.subject.next(newCourses);
    /**
     *  next we are doing a request to the backend and we are returning
     * this promise here to the course dialogue here.
     */
    return fromPromise(fetch(`/api/courses/${courseId}`,
      {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }));
}
  }
