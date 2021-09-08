import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {


      /**
       * And in those situations we can resort to the use of a subject
       * as subject is at the same time an observer and an observable
       * Let's create a new subject. We are going to define here a
       * variable called subject and we are going to assign it a new
       * subject that we are going to instantiate.
       */

      // const subject = new Subject();

      /**
       * We can directly emit values with it, but we can also combine
       * it with other observables, although we could use a subject
       * here as a public member variable, for example, of this component
       * and share it directly with other components of the application.
       * That is usually not a good idea.
       * The subject is meant to be private to the part of the application
       * that is emitting a given set of data, the same way that here
       * in our HTTP observable, we wouldn't want other parts of the
       * program to get access here to this observer.
       * Only this part of the program can emit errors,
       * complete the observable or emit the backend response.
       * It would not be a very good idea to share this observer outside
       * of this method.
       */
      // const series$ = subject.asObservable();

      // series$.subscribe(console.log);

      // subject.next(1);
      // subject.next(2);
      // subject.next(3);
      // subject.complete();

      /**
       * We don't have any way of providing unsubscribe logic to our
       * observable that gets derived here from this subject.
       *
       * And we also run the risk of sharing accidentally the subject
       * with other parts of the application, which means that those
       * other parts of the application could potentially take over the
       * behavior of the observable by directly calling the next complete
       * or error on the subject, which is not intended by this reason,
       */

      /**
       * we should try to use subjects as little as possible.
       * Instead, we should try to derive our observables directly
       * from the source as much as possible, using methods such as,
       * for example, from promise to derive an observable from a promise
       * or simply the from method that allows us to derive an observable
       * directly from a browser event, for example.
       *  So these are the preferred ways for creating our own observable
       * by using these arrogates utility methods.
       *
       * from(document, 'keyup')
       */

      /**
       * However, if by some reason that is not practical or even possible,
       * then using a subject is a great way of creating a custom observable
       * notice that another very common use case for our subjects is a
       * multicasting. In the case of multicasting, we want to take one value
       * from one observable stream and remit that into multiple separate
       * output streams. As we will see, the notion of subject is going
       * to be essential for us to implement our own custom store solution.
       */

      /**
       * As we have discussed, we should only use a subject to create
       * our own observable if some of the available observable creation
       * methods that are access provides us such as the from method is not
       * a convenient solution for creating a given stream.
       */

      /**
       * However, in the rare occasions where we will be moving a subject we will
       * probably not be using here the default plain subject, we will most
       * likely, instead of using behavior subject, which is very similar to
       * the plain subject, but it also supports late subscriptions.
       * Let's give an example of a late subscription. So we are defining
       * here a subject and we are deriving from it and observable just like
       * before.
       */

      // const subject = new Subject();
      // const series$ = subject.asObservable();
      // series$.subscribe(val => console.log("as early subject " + val));

      // subject.next(1);
      // subject.next(2);
      // subject.next(3);

      // do not use ---> subject.complete();

      // setTimeout(() => {
      //   series$.subscribe(val => console.log("as late subject " + val));
      //   subject.next(4);
      // }, 3000);

      /**
       * But then we will have both the early and the late subscriber
       * receiving the value for this is because the value for was emitted
       * after both subscriptions took place.
       * The problem is that when we are writing asynchronous programs,
       * we very often want our lead subscribers to receive something
       * from the observable. Typically, we want our late subscribers to
       * receive the latest value emitted by the observable
       *
       * Let's say, for example, that the observable corresponds to
       * an HTTP request. And we have here a late subscriber to that
       * HTTP request.
       * Even though the subscription happened after the request
       * has been completed and we got the response from
       * the backend, we would still want to receive that value.
       * We want to be able to write our program in a way that our logic
       * still works independently of the timing of each subscription.
       * So in order to support that, we have a different type of subject,
       * which is called the behavior subject.
       * The goal of behavior subject is to always provide something to
       * subscribers. Even if the subscription happens late, we still
       * want to get the latest volume emitted by the observable
       * before the subscription.
       */

      const subject = new BehaviorSubject(0);
      const series$ = subject.asObservable();
      series$.subscribe(val => console.log("early subject " + val));

      subject.next(1);
      subject.next(2);
      subject.next(3);

      subject.complete();
      
     /**
      * do no use subject.complete() if you want setTimeout() to execute
      *
      * Now let's learn how behavior subject handles completion.
      * So if the completion happens here before the second subscription
      * takes place, then these late subscriber here will not receive any value.
      * So as you can see, only the early subscriber received here the
      * values zero, one, two and three.
      * And our subject then completive completion means that late subscribers
      * will no longer receive the last emitted value
      * So these logic that the behavior subject has of remembering the last
      * emitted value will only be effective
      * as long as the observable is running and it will not work after completion.
      * Behavior subject is probably the most commonly used type of subject,
      * and it's the one that we will be using to implement our store.
      * */

      setTimeout(() => {
        series$.subscribe(val => console.log("late subject " + val));
        subject.next(4);
      }, 3000);


    }


}






