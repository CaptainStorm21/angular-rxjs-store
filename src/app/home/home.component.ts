import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import { Store } from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

  constructor(
    private store: Store
  ) {
    /**
     * We are going to create a constructor for the home component and we're going to have the store objective
     * here.
     * So as you can see, we now can access the store service.
     * The store service is going to contain our data and we will be able to consume the data under the form
     * of an observable.
     */

  }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log("HTTP request executed")),
                map(res => Object.values(res["payload"]) ),
                shareReplay(),
                retryWhen(errors =>
                    errors.pipe(
                    delayWhen(() => timer(2000)
                    )
                ) )
            );

        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'BEGINNER'))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == 'ADVANCED'))
            );

    }

}


/**
 * In the last few lessons, we have introduced several types of our guests subjects.
 * We are now going to put subjects to a practical use by implementing a very
 * common design pattern in our application.
 * We are going to be implementing a centralized store in order to understand
 * what are the benefits of this approach, have a look here at our home component
 * that is displayed here. As you can see with the current design of the home component,
 * every time that we navigate into it by
 * using here the navigation menu, we are going to trigger here a new HTP request.
 * So we will be fetching our course data from the back end again and again.
 * Let's now confirm that that is indeed the case.
 * We are going to switch here to a larger window and we're going to trigger here our home component by
 * navigating, for example, to the about page and then back here to the home component.
 * So as you can see, we have three years here when HTTP request to slash EPA slash courses.
 * If we now head over here to The View course page and we click back to the home component, we're going
 * to see that again.
 * We do a duplicate EPA request, which is fetching the data from the server once again.
 * So this data did not change.
 * We are just fetching it back because we had not kept it in memory on the clay.
 * And so whenever we navigate between two routes and we discarded and recreated our home component, we
 * lost this data that we have here.
 * We would like to avoid that.
 * We have to make these EPA requests constantly to the server.
 * And instead we would like to be able to store the data here on the client side independently of the
 * home component.
 * So whenever the home component gets discarded, our data should not get discarded with it.
 * We need a central place in memory on the client to store our data.
 * Whenever our home component needs the data, it simply needs to subscribe to it and it's going to receive
 * the latest version of the data.
 * So we have here an indication of what our design will be.
 * We are going to design a centralized service that is going to contain our data in that service, is
 * going to expose a couple of observables.
 * That service is going to be responsible for fetching the data from the backend at the appropriate moment.
 * And also it's going to be responsible for storing the data in memory, providing it to the rest of the
 * application and there the form of unobservable observable.
 * Let's then see what this shared observable service will look like.
 * We're going to start creating it by going here to the Common Directory.
 * We're going to create here a file.
   */
