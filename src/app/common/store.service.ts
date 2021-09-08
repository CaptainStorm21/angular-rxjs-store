/**
 *  this is going to contain our centralized observable store.
 *  We are going to write this under the form of a class.
 *  So we are going to call the class store and we are going to make it an angular service.
 *  Since this application here is an angular application, there will be minimal angular related code in
 *  this class.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from '../model/course';

/**
 * We are only going to need here the injectable decorator.
 * Also, we need to configure this service in our application so that we can easily inject it in other
 * services and components, such as, for example, here, the home component.
 * So we are going to make this service injectable in the rest of the application by specifying here the
 * provi in property and we are going to assign it the value of root.
 * This configuration here simply means that there is only one store for the whole application.
 * We're going to go ahead and inject it here directly in our home component.
 */

@Injectable({
  // This configuration here simply means that there is only one store for the whole application.
  providedIn: 'root'
})
export class Store {

  /**
   * The question now is how are we going to define these observable?
   * This is one of those situations where it's really not convenient to use observable.
   * Create or one of the existing methods in our guest library.
   * So this is a good situation for using a subject to create these observable let's then define here a
   * private member variable, which is going to be our subject.
   * We're going to make this private to this class so that only this class has the ability for emitting
   * values for these observable.
   * We want to keep that power constrained here inside this glass.
   * We wouldn't want parts of the applications, such as, for example, the home component to be able to
   * emit a list of causes on behalf of the store itself.
   * Only the store has the power of meeting new values for these observable.
   * The subject is just a private implementation detail that we are using to essentially create these courses
   * observable.
   */



  /**
   * We want to keep that power constrained here inside this glass.
   * We wouldn't want parts of the applications, such as, for example,
   * the home component to be able toemit a list of causes on behalf of the store itself
   * Only the store has the power of meeting new values for these observable.
   * The subject is just a private implementation detail that we are using to essentially create these courses
   * observable.
   * So let's start by defining here a plain arrogant subject and we are going to build these observable
   * here by deriving it from the subject, just like we did before using the as observable method.
   * With this subject, we are going to be able to emit values here for the courses observable, which can
   * then be consumed in other parts of the application, such as, for example, the home component.
   * Let's now discuss what type of subject do we want to use for this store implementation.
   * It's important for our application that late subscriber's to this observable to also get the latest
   * emitted value.
   * So whenever we navigate throughout the application, going to the about screen, for example, and back
   * to the screen, we will have each time new instances of the home component created, each time the component
   * gets destroyed and recreated as we navigate back to the courses rolt.
   * So we want at the later instances of this component to also get the courses data.
   * This means that the subject that we are looking for is the behavior subject.
   * This is the subject implementation that is going to ensure that the late subscriber's always get the
   *   latest version of the course array.
   * So we are going to provide here an initial value for that array, which is going to be the empty array.
   * So initially there are no courses loaded in the store.
   * Notice also that we have specified here the parametric type course array in our behavior subject.
   */
  // fix for video 38 6:30
  // private subject = new Subject<Course[]>();

  private subject = new BehaviorSubject<Course[]>([]);


  // we are going to define the public API of our store.
  // curses$: Observable<Course[]>;
  /**
   * we are going to build these observable
   * here by deriving it from the subject, just like we did before using the as observable method.
   * With this subject, we are going to be able to emit values here for the courses observable, which can
   * then be consumed in other parts of the application, such as, for example, the home component.
   */
  courses$: Observable<Course[]> = this.subject.asObservable();

  /**
   * So this is where we are going to store these list of courses that we see here on the screen,
   * both the beginner courses and the advanced courses.
   * They will all be available here to the remainder of the application
   * by subscribing to these courses observable.
   */

  /**
   * Now that we have designed our stored service, let's then start implementing it.
   * We are going to load some data from the backend and we are going to emit it in these observable.
   */


}
