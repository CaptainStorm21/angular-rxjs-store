import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import { Store } from '../common/store.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    // courseId:string;
    courseId:number;

    course$ : Observable<Course>;

    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    /**
     * So first, let's refactor here our course component to fetch
     * the data directly from the store instead of making this extra
     * HTTP request.
     * We're going to start by injecting here the store in the constructor
     * with this store.
     */
    private store: Store){}

    ngOnInit() {
      this.courseId = this.route.snapshot.params['id'];
        // this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
      //video 41 bug
      // this.course$ = this.store.selectCourseById(Number(this.courseId));
      this.course$ = this.store.selectCourseById(this.courseId);
    }

    ngAfterViewInit() {

        const searchLessons$ =  fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            );

        const initialLessons$ = this.loadLessons();
        this.lessons$ = concat(initialLessons$, searchLessons$);

    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(
            `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res => res["payload"])
            );
    }


}






/**
 * We are now getting the course information from the in-memory store, but we are still fetching the search

data from the backend, which makes sense.

We want the search to contain the most up to date values possible, while the course we already know

that it's data that it's not likely to change very often.

So we want to keep it in memory on the client side.

Let's then try out this new version of the course component.

We are going to refresh the application and we're going to navigate here to the course screen.

So as you can see, our course data and our thumbnail is being displayed here correctly is expected.

What we are going to do next is we are going to present a couple of extra SJS operators that are useful

in handling observables that are derived from stores.

So what is particular about these observable here course derived from the store?

It's that these observable and like old HTP observables that we have been using so far, these observable

here does not complete.

And this is because our store service observable here.

This course is array where all the data is getting derived from using these selected methods, these

observable here never completes.

So we are doing here multiple backend requests, for example, while saving a course.

But if these requests fail, then it's the observable that is returned here to the color of safe course

that is going to occur out.

But the observable of our service itself, the course is observable that will not occur out.

Let's then introduce a couple of new excuse operators that are going to help us to handle this particular

type of observable.
 */




