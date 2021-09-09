import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import { Observable} from 'rxjs';
import { Store } from '../common/store.service';

/**
 * When we start the application, we are going to call an initialization
 * method in our store that is going to then do a request to the backend,
 * doing any requests similar to this one, fetch the data from the
 * backend and then emit it to the rest of the application.
 */

/**
 * So in order to trigger the initialization logic of the store,
 * we are going to be using our application route component in the
 * root component. We are going to inject here our store and then
 * we are going to call an initialization operation on the store.
 * Let's then implement here the on init interface and by implementing
 * the engie on init method, we are going to be able to call the store.
 */

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

  constructor(private store: Store) {}

  ngOnInit() {

    /**
     * The component is a pure projection of state.
     * We simply define here our observable streams and we consume
     * the data that we need from the store using
     * Selecter methods.
     * Let's have a look at these new version of the home
     * component in action.
     */
      const courses$ = this.store.courses$;
      this.beginnerCourses$ = this.store.selectBeginnerCourses();
      this.advancedCourses$ = this.store.selectAdvancedCourses();

    }

}

